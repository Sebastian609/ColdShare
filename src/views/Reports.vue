<script setup>
import { ref, onMounted, computed } from "vue";
import db from "@/config/firebase";
import SideBar from "../components/SideBar/SideBar.vue";
import PanelHeader from "../components/Panels/PanelHeader.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import { ref as dbRef, onValue, query, orderByKey } from "firebase/database";
import * as XLSX from "xlsx"; // Importar xlsx para trabajar con Excel

const dataRef = dbRef(db, "/datosHistoricos");
const historicalData = ref([]);
const filtered = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
let startDate = ref(null);
let endDate = ref(null);

onMounted(() => {
  const lastDataQuery = query(dataRef, orderByKey());

  onValue(lastDataQuery, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      historicalData.value = Object.entries(data)
        .map(([key, value]) => ({
          id: key,
          time: new Date(value.Time), // Convertir a objeto Date
          temperature: value.Temperature + " °C",
          humidity: value.Humidity + " %"
        }))
        .filter(item => !!item.time) // Filtrar los valores con fecha válida
        .reverse();

      // Inicializar filtered con los datos históricos originales al inicio
      filtered.value = [...historicalData.value];
    }
  });
});

// Función para filtrar datos por rango de fechas
const filterData = () => {
  // Convertir las fechas a objetos Date si están definidas
  const start = startDate.value ? new Date(startDate.value) : null;
  const end = endDate.value ? new Date(endDate.value) : null;

  filtered.value = historicalData.value.filter(item => {
    const itemDate = item.time;

    if (!start && !end) return true; // Si no hay fechas definidas, mostrar todos los datos

    return (!start || itemDate >= start) && (!end || itemDate <= end);
  });

  // Reiniciar la paginación a la primera página después de filtrar
  currentPage.value = 1;
};

// Propiedades y métodos para la paginación de los datos filtrados
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filtered.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filtered.value.length / itemsPerPage.value));

// Lista de números de página
const pageNumbers = computed(() => {
  const numbers = [];
  const maxVisiblePages = 5; // Cantidad máxima de intervalos de páginas visibles
  let startPage = Math.max(currentPage.value - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    numbers.push(i);
  }
  return numbers;
});

// Métodos para manejar la paginación
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Función para exportar datos a Excel
const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filtered.value); // Convertir datos a hoja de Excel
  const workbook = XLSX.utils.book_new(); // Crear libro de Excel
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Filtrados"); // Añadir hoja al libro
  
  // Generar archivo Excel y descargar
  XLSX.writeFile(workbook, "datos_filtrados.xlsx");
};
</script>

<template>
  <body class="main page">
    <div class="navbar navbar-default" id="navbar">
      <a class="navbar-brand" href="#">
        <i class="icon-cloud"></i>
        ColdShare
      </a>
      <ul class="nav navbar-nav pull-right">
        <Navbar />
      </ul>
    </div>
    <div id="wrapper">
      <!-- Sidebar -->
      <section id="sidebar">
        <SideBar />
      </section>
      <!-- Tools -->
      <section id="tools">
        <ul class="breadcrumb" id="breadcrumb">
          <li class="title">Dashboard</li>
        </ul>
      </section>
      <!-- Content -->
      <div id="content">
        <div class="panel panel-default">
          <div class="panel-heading">
            <PanelHeader />
          </div>
          <div class="panel-body">
            <div>
              <h1>Datos Históricos</h1>
              <!-- Agregar inputs para fecha de inicio y fin en el template -->
              <div>
                <label class="datetime" for="startDate">Fecha de inicio:</label>
                <input type="datetime-local" id="startDate" v-model="startDate" />

                <label for="endDate">Fecha de fin:</label>
                <input type="datetime-local" id="endDate" v-model="endDate" />

                <button class="btn btn-primary" @click="filterData">Filtrar</button>
                <button class="btn btn-primary" @click="exportToExcel">Exportar a Excel</button> <!-- Botón para exportar a Excel -->
              </div>

              <table id="example" class="table table-bordered">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Temperatura</th>
                    <th>Humedad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in paginatedData" :key="data.id">
                    <td>{{ data.time.toLocaleString() }}</td> <!-- Mostrar fecha formateada -->
                    <td>{{ data.temperature }}</td>
                    <td>{{ data.humidity }}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Añadir controles de paginación -->
              <div class="mx-auto">
                <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">
                  Anterior
                </button>
                <span class="pagination pagination-sm"> Página {{ currentPage }} de {{ totalPages }}</span>
                <button
                  @click="nextPage"
                  class="btn btn-primary"
                  :disabled="currentPage * itemsPerPage.value >= filtered.length"
                >
                  Siguiente
                </button>
              </div>

              <!-- Lista de páginas -->
              <div class='panel-footer'>
                <ul class="pagination pagination-sm">
                  <li v-for="number in pageNumbers" :key="number" :class="{ active: number === currentPage }">
                    <a @click="currentPage = number">{{ number }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.pagination {
  margin-top: 10px;
  text-align: center;
}

.pagination li {
  display: inline-block;
  margin: 0 5px;
}

.pagination li.active a {
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
}

.pagination li a {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}
</style>
