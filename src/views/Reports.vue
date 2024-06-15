<script setup>
import { ref, onMounted } from "vue";
import db from "@/config/firebase";
import SideBar from "../components/SideBar/SideBar.vue";
import PanelHeader from "../components/Panels/PanelHeader.vue";
import Navbar from "../components/Navbar/Navbar.vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional

const dataRef = dbRef(db, "/datosHistoricos");
import {
  ref as dbRef,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";

const historicalData = ref([]);

onMounted(() => {
  const lastDataQuery = query(dataRef, orderByKey());

  onValue(lastDataQuery, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      historicalData.value = Object.entries(data)
        .map(([key, value]) => {
          if (
            String(key).trim() === "" ||
            String(value.time).trim() === "" ||
            String(value.temperature).trim() === "" ||
            String(value.humidity).trim() === ""
          ) {
            return null;
          }
          const dataValue = {
            id: key,
            time: value.Time,
            temperature: value.Temperature + " °C",
            humidity: value.Humidity + " %",
          };

          return dataValue;
        })
        .filter((item) => item !== null) // Filtrar los valores nulos
        .reverse();
    }

    console.log(historicalData.value);
  });
});

const options = {
  responsive: true,
  select: true,
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

              <div>
                <DataTable
                  :value="historicalData"
                  paginator
                  :rows="10"
                  :rowsPerPageOptions="[10, 20, 50]"
                  tableStyle="min-width: 12rem;"
                >
                  <Column
                    field="id"
                    header="Time"
                    style="width: 25%; color: #000"
                  ></Column>
                  <Column
                    field="humidity"
                    header="Humidity"
                    style="width: 25%; color: #000"
                  ></Column>
                  <Column
                    field="temperature"
                    header="Temperature"
                    style="width: 25%; color: #000"
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
