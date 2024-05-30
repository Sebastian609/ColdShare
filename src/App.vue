<script setup>
import { ref, onMounted } from "vue";
import SensorData from "./components/SensorData.vue";
import {
  ref as dbRef,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";

import "./ui/hierapolis-gh-pages/assets/stylesheets/application-a07755f5.css";

import db from "./config/firebase";

const dataRef = dbRef(db, "/DHT11");

const latestTemperature = ref("");
const latestHumidity = ref("");
const favorito = ref("");

const cambiarFavorito = (title) => {
  favorito.value = title;
};

onMounted(() => {
  const lastDataQuery = query(dataRef, orderByKey(), limitToLast(2));

  onValue(lastDataQuery, (snapshot) => {
    // Imprime el snapshot para verificar su contenido
    const data = snapshot.val();

    if (data) {
      // Ajusta según la estructura de tus datos
      latestTemperature.value = data.Temperature;
      latestHumidity.value = data.Humidity;
    }
  });
});
</script>

<template>
  <body class="main page">
    <!-- Navbar -->
    <div class="navbar navbar-default" id="navbar">
      <a class="navbar-brand" href="#">
        <i class="icon-beer"></i>
        Hierapolis
      </a>
      <ul class="nav navbar-nav pull-right">
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            <i class="icon-envelope"></i>
            Messages
            <span class="badge">5</span>
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a href="#">New message</a>
            </li>
            <li>
              <a href="#">Inbox</a>
            </li>
            <li>
              <a href="#">Out box</a>
            </li>
            <li>
              <a href="#">Trash</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="icon-cog"></i>
            Settings
          </a>
        </li>
        <li class="dropdown user">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            <i class="icon-user"></i>
            <strong>John DOE</strong>
            <img class="img-rounded" src="http://placehold.it/20x20/ccc/777" />
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a href="#">Edit Profile</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="/">Sign out</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="wrapper">
      <!-- Sidebar -->
      <section id="sidebar">
        <i class="icon-align-justify icon-large" id="toggle"></i>
        <ul id="dock">
          <li class="active launcher">
            <i class="icon-dashboard"></i>
            <a href="dashboard.html">Dashboard</a>
          </li>
          <li class="launcher">
            <i class="icon-file-text-alt"></i>
            <a href="forms.html">Forms</a>
          </li>
          <li class="launcher">
            <i class="icon-table"></i>
            <a href="tables.html">Tables</a>
          </li>
          <li class="launcher dropdown hover">
            <i class="icon-flag"></i>
            <a href="#">Reports</a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Launcher description</li>
              <li>
                <a href="#">Action</a>
              </li>
              <li>
                <a href="#">Another action</a>
              </li>
              <li>
                <a href="#">Something else here</a>
              </li>
            </ul>
          </li>
          <li class="launcher">
            <i class="icon-bookmark"></i>
            <a href="#">Bookmarks</a>
          </li>
          <li class="launcher">
            <i class="icon-cloud"></i>
            <a href="#">Backup</a>
          </li>
          <li class="launcher">
            <i class="icon-bug"></i>
            <a href="#">Feedback</a>
          </li>
        </ul>
        <div data-toggle="tooltip" id="beaker" title="Made by lab2023"></div>
      </section>
      <!-- Tools -->
      <section id="tools">
        <ul class="breadcrumb" id="breadcrumb">
          <li class="title">Dashboard</li>
          <li><a href="#">Lorem</a></li>
          <li class="active"><a href="#">ipsum</a></li>
        </ul>
        <div id="toolbar">
          <div class="btn-group">
            <a
              class="btn"
              data-toggle="toolbar-tooltip"
              href="#"
              title="Building"
            >
              <i class="icon-building"></i>
            </a>
            <a
              class="btn"
              data-toggle="toolbar-tooltip"
              href="#"
              title="Laptop"
            >
              <i class="icon-laptop"></i>
            </a>
            <a
              class="btn"
              data-toggle="toolbar-tooltip"
              href="#"
              title="Calendar"
            >
              <i class="icon-calendar"></i>
              <span class="badge">3</span>
            </a>
            <a class="btn" data-toggle="toolbar-tooltip" href="#" title="Lemon">
              <i class="icon-lemon"></i>
            </a>
          </div>
          <div class="label label-danger">Danger</div>
          <div class="label label-info">Info</div>
        </div>
      </section>
      <!-- Content -->
      <div id="content">
        <div class="panel panel-default">
          <div class="panel-heading">
            <i class="icon-beer icon-large"></i>
            Cold Share
            <div class="panel-tools">
              <div class="btn-group">
                <a class="btn btn-sucess" href="#">
                  <i class="icon-refresh"></i>
                  Refrescar Estadisticas
                </a>
                <a
                  class="btn"
                  data-toggle="toolbar-tooltip"
                  href="#"
                  title="Toggle"
                >
                  <i class="icon-chevron-down"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <div class="page-header">
              <h4>Lecturas</h4>
            </div>
            <div class="row text-center">
              <SensorData
                type="C°"
                title="Temperatura"
                :data="latestTemperature"
                @cambiarFavoritoNombre="cambiarFavorito"
              ></SensorData>
              <SensorData
                type="%"
                title="Humedad"
                :data="latestHumidity"
                @cambiarFavoritoNombre="cambiarFavorito"
              ></SensorData>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
