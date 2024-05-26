// main.js
import { createApp } from 'vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdn.jsdelivr.net/npm/vue-ellipse-progress/dist/vue-ellipse-progress.umd.min.js";    
import "https://unpkg.com/boxicons@2.1.3/dist/boxicons.js";

import App from './App.vue';
import SensorData from './components/SensorData.vue';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { formToJSON } from 'axios';
import ButtonsPost from "./components/ButtonsPost.vue";
import VueEllipseProgress from 'vue-ellipse-progress';



const firebaseConfig = {
    apiKey: "AIzaSyB0Rg_3H6CZXUKETI1koz3U7jvHcHmyymE",
    authDomain: "esp8266-cba86.firebaseapp.com",
    databaseURL: "https://esp8266-cba86-default-rtdb.firebaseio.com",
    projectId: "esp8266-cba86",
    storageBucket: "esp8266-cba86.appspot.com",
    messagingSenderId: "1014669048825",
    appId: "1:1014669048825:web:0fd48dc4627a124dad5b28",
    measurementId: "G-S4X1Q7FK7E"
};

const app = createApp(App);
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
app.use(VueEllipseProgress, 'vep')
app.use(ButtonsPost,'ButtonsPost');

app.config.globalProperties.$db = db;  // Haciendo que   la base de datos esté disponible globalmente

app.mount('#app');
