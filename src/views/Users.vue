<script setup>
import CreateUser from "../components/Users/CreateUser/CreateUser.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import ListUsers from "@/components/Users/ListUsers/ListUser.vue";
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
    <section id="tools">
      <ul class="breadcrumb" id="breadcrumb">
        <li class="title">Usuarios</li>
      </ul>
    </section>
    <div id="wrapper">
      <!-- Sidebar -->
      <section id="sidebar">
        <SideBar />
      </section>

      <section id="tools">
        <ul class="breadcrumb" id="breadcrumb">
          <li class="title">Users</li>
        </ul>
      </section>

      <div id="content">
        <div class="panel panel-default">
          <div class="panel-heading">
            <i class="icon-edit icon-large"></i>
            Crear Usuaro
          </div>
          <div class="panel-body">
            <CreateUser />
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">
            <i class="icon-table icon-large"></i>
            Usuarios
          </div>
          <div class="panel-body">
            <ListUsers />
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
