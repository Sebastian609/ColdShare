<script setup>
import { ref, onMounted } from "vue";
import { initializeApp } from "firebase/app";

import {
  getDatabase,
  ref as dbRef,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";

import SensorData from "./components/SensorData.vue";
import Nav from "./components/Nav.vue";
import Users from "./components/Users.vue";
import BlogPost from "./components/BlogPost.vue";


const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const dataRef = dbRef(db, "/DHT11");

const latestTemperature = ref("");
const latestHumidity = ref("");
const favorito = ref("");

const cambiarFavorito = (title)=> {
  favorito.value = title;
}

onMounted(() => {
  const lastDataQuery = query(dataRef, orderByKey(), limitToLast(2));

  onValue(lastDataQuery, (snapshot) => {
    // Imprime el snapshot para verificar su contenido
    const data = snapshot.val();
    console.log(data);
    if (data) {
      // Ajusta según la estructura de tus datos
      latestTemperature.value = data.Temperature;
      latestHumidity.value = data.Humidity;

    }
  });
});
</script>

<template>
  <Nav class="mb-5"></Nav>

  <h1 class="mb-4">Mi Favorito : {{ favorito }} </h1>
  <div class="container">
    <div class="row">
      <SensorData
        type="C°"
        title="Temperatura"
        :data="latestTemperature"
        @cambiarFavoritoNombre="cambiarFavorito"
      ></SensorData>
      <SensorData type="%" title="Humedad" :data="latestHumidity" @cambiarFavoritoNombre="cambiarFavorito"></SensorData>
    </div>
    <BlogPost></BlogPost> 
  </div>
</template>

