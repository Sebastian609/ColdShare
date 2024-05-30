// main.js
import { createApp } from 'vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdn.jsdelivr.net/npm/vue-ellipse-progress/dist/vue-ellipse-progress.umd.min.js";    
import "https://unpkg.com/boxicons@2.1.3/dist/boxicons.js";
import "./ui/hierapolis-gh-pages/assets/stylesheets/application-a07755f5.css"

import App from './App.vue';

import VueEllipseProgress from 'vue-ellipse-progress';



const app = createApp(App);


app.use(VueEllipseProgress, 'vep')




app.mount('#app');
