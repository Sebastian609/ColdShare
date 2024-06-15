<script setup>
import SensorData from '../SensorData.vue';
import { ref } from 'vue';
import {
  ref as dbRef,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import { onMounted } from 'vue';
import db from '@/config/firebase';
const dataRef = dbRef(db, "/DHT11");



const latestTemperature = ref("");
const latestHumidity = ref("");
const time =  ref("");
const favorito = ref("");

const cambiarFavorito = (title) => {
  favorito.value = title;
};

onMounted(() => {
  const lastDataQuery = query(dataRef, orderByKey(), limitToLast(3));

  onValue(lastDataQuery, (snapshot) => {
    
    const data = snapshot.val();

    if (data) {
    console.log(data);
      // Ajusta según la estructura de tus datos
      latestTemperature.value = data.Temperature;
      latestHumidity.value = data.Humidity; console.log(data.Humidity);
      time.value = data.Time;
    }
  });
});

</script>

<template>
  <div class="page-header">
    <h4>Lecturas</h4>
  </div>
  <div class="row text-center">
    <SensorData
      type="C°"
      title="Temperatura"
      :data="latestTemperature"
      :time="time"
      @cambiarFavoritoNombre="cambiarFavorito"
    ></SensorData>
    <SensorData
      type="%"
      time="time"
      title="Humedad"
      :time="time"
      :data="latestHumidity"
      @cambiarFavoritoNombre="cambiarFavorito"
    ></SensorData>

    
  </div>
</template>
