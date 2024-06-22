<template>
    <div id="chart">
      <!-- Gráfico de Humedad -->
      <apexchart type="line" height="350" :options="chartOptionsHumidity" :series="chartSeriesHumidity"></apexchart>
      
      <!-- Gráfico de Temperatura -->
      <apexchart type="line" height="350" :options="chartOptionsTemperature" :series="chartSeriesTemperature"></apexchart>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { ref as dbRef, onValue, query, orderByKey, limitToLast } from "firebase/database";
  import db from '@/config/firebase';
  
  const dataRef = dbRef(db, "/datosHistoricos");
  
  // Declarar chartSeries y chartOptions como ref para Humedad y Temperatura
  const chartSeriesHumidity = ref([{ 
    name: "Humedad",
    data: []
  }]);
  
  const chartSeriesTemperature = ref([{ 
    name: "Temperatura",
    data: []
  }]);
  
  const chartOptionsHumidity = ref({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Humedad',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: []
    }
  });
  
  const chartOptionsTemperature = ref({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Temperatura',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: []
    }
  });
  
  onMounted(() => {
    const lastDataQuery = query(dataRef, orderByKey(), limitToLast(30));
  
    onValue(lastDataQuery, (snapshot) => {
      const data = snapshot.val();
  
      if (data) {
        const newData = Object.entries(data)
          .map(([key, value]) => {
            // Verificar si todos los campos necesarios están presentes
            if (
              !value.Humidity ||
              !value.Temperature ||
              !value.Time
            ) {
              return null; // Si falta alguno de los campos, devolver null
            }
  
            return {
              id: key,
              time: value.Time,
              temperature: value.Temperature,
              humidity: value.Humidity,
            };
          })
          .filter(item => item !== null);
  
        // Almacenar datos de Humedad y Temperatura en variables reactivas
        const humidityData = newData.map(item => item.humidity);
        const temperatureData = newData.map(item => item.temperature);
        const timeData = newData.map(item => item.time);
  
        // Actualizar series y categorías del gráfico de Humedad
        chartSeriesHumidity.value[0].data = humidityData;
        chartOptionsHumidity.value.xaxis.categories = timeData;
  
        // Actualizar series y categorías del gráfico de Temperatura
        chartSeriesTemperature.value[0].data = temperatureData;
        chartOptionsTemperature.value.xaxis.categories = timeData;
      }
    });
  });
  </script>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: {
      apexchart: VueApexCharts,
    },
    
    // Puedes usar computed para pasar las variables reactivas a props
    computed: {
      // Definir propiedades computadas para pasar las variables reactivas a `apexchart`
      chartSeriesHumidityComputed() {
        return this.chartSeriesHumidity;
      },
      chartSeriesTemperatureComputed() {
        return this.chartSeriesTemperature;
      },
      chartOptionsHumidityComputed() {
        return this.chartOptionsHumidity;
      },
      chartOptionsTemperatureComputed() {
        return this.chartOptionsTemperature;
      }
    }
  });
  </script>
  