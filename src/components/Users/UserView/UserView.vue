<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import SideBar from "@/components/SideBar/SideBar.vue";
const route = useRoute();

const name = ref("");
const lastname = ref("");
const username = ref("");
const isAdmin = ref(false);
const isActive = ref(false);
const password = ref("");

const user = ref(null);
const id = route.params.id;

onMounted(async () => {
  try {
    const response = await fetch(
      `https://coldshare-api.svillarsegura.site/api/user/find/${id}`
    );
    const data = await response.json();
    user.value = data;

    name.value = user.value.name;
    lastname.value = user.value.lastname;
    username.value = user.value.username;
    isAdmin.value = user.value.isAdmin === 1;
    isActive.value = user.value.isActive === 1;
    password.value = user.value.password; // Password field should typically remain empty for security reasons
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const submitForm = async (event) => {
  event.preventDefault();

  const payload = {
    id: id,
    name: name.value,
    lastname: lastname.value,
    username: username.value,
    isActive: isActive.value ? 1 : 0,
    password: password.value,
    isAdmin: isAdmin.value ? 1 : 0,
  };
  console.log(payload);

  try {
    const response = await fetch(
      "https://coldshare-api.svillarsegura.site/api/user/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Success:", data);
    alert("guardado con exito");
  } catch (error) {
    console.error("Error:", error);
    alert("error, no se puedo guardar");
  }
};
</script>

<template>
  <body class="main-page">
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
        <li class="subtitle">{{ id }}</li>
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
          <li class="subtitle">{{ id }}</li>
        </ul>
      </section>

      <div id="content">
        <div class="panel panel-default">
          <div class="panel-heading">
            <i class="icon-user icon-large"></i>

            #{{ id }}
          </div>
          <div class="panel-body">
            <form @submit="submitForm">
              <fieldset>
                <div class="form-group">
                  <label class="control-label">Nombres</label>
                  <input
                    v-model="name"
                    class="form-control"
                    placeholder="Enter name"
                    type="text"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label">Apellidos</label>
                  <input
                    v-model="lastname"
                    class="form-control"
                    placeholder="Enter lastname"
                    type="text"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label">Nombre de Usuario</label>
                  <input
                    v-model="username"
                    class="form-control"
                    placeholder="Enter username"
                    type="text"
                  />
                </div>
                <div class="form-group">
                  <div>
                    <input v-model="isAdmin" type="checkbox" />
                    Administrador
                  </div>

                  <div>
                    <input v-model="isActive" type="checkbox" />
                    Activo
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">Contraseña</label>
                  <input
                    v-model="password"
                    class="form-control"
                    placeholder="Enter password"
                    type="password"
                  />
                </div>
              </fieldset>
              <div class="form-actions">
                <button class="btn btn-default" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
