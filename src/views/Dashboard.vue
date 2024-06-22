<script setup>
import { ref, onMounted } from "vue";
import SideBar from "../components/SideBar/SideBar.vue"
import Sensors from "../components/SensorData/Sensors.vue";
import PanelHeader from "../components/Panels/PanelHeader.vue"
import Navbar from "../components/Navbar/Navbar.vue"
import Chart from "../components/Chart/Chart.vue"

</script>

<template>
  <body class="main page">
    <div class="navbar navbar-default" id="navbar">
      <a class="  navbar-brand" href="#">
        <i class="icon-cloud"></i>
        ColdShare
      </a>
      <ul class="nav navbar-nav pull-right">
        <Navbar/>
      </ul>
    </div>
    <div id="wrapper">
      <!-- Sidebar -->
      <section id="sidebar">
        <SideBar/>
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
            <PanelHeader/>
          </div>

          <div class="panel-body">
            <Sensors />
          </div>

          <div class="panel-body">
            <Chart></Chart>
          </div>
          
        </div>
        
      </div>
    </div>
  </body>
</template>
