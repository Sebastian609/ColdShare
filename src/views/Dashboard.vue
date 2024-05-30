<script setup>
import { ref, onMounted } from "vue";
import { initializeApp } from "firebase/app";
import firebaseConfig from "/src/config/firebase.js";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";

import SensorData from "/src/components/SensorData.vue";
import Nav from "/src/components/Nav.vue";

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const dataRef = dbRef(db, "/DHT11");
const latestTemperature = ref(0);
const latestHumidity = ref(0);
const favorito = ref("");

const cambiarFavorito = (title) => {
  favorito.value = title;
};

const stringToDouble = (string) => {
  if (string != "" || string != undefined) {
    const number = parseFloat(string);
    return number;
  }
  return  0
};

onMounted(() => {
  const lastDataQuery = query(dataRef, orderByKey(), limitToLast(2));

  onValue(lastDataQuery, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      latestTemperature.value = stringToDouble(data.Temperature);
      latestHumidity.value = stringToDouble(data.Humidity);
    }
  });
});
</script>

<template>
  <Nav class="bg-sky-500 w-full py-8"></Nav>
  <h1 class="mb-4">Mi Favorito : {{ favorito }} </h1>
  <div class="container">
    <div class="row">
      <SensorData
        type="C°"
        title="Temperatura"
        :data=latestTemperature
        @cambiarFavoritoNombre="cambiarFavorito"
      ></SensorData>
      <SensorData
        type="%"
        title="Humedad"
        :data=latestHumidity
        @cambiarFavoritoNombre="cambiarFavorito"
      ></SensorData>
    </div>
    <BlogPost></BlogPost>
  </div>
</template>
