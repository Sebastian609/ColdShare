<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const isActive = ref(false);
const router = useRouter();

onMounted(() => {
  // Retrieve user data from cookies
  const user = Cookies.get('user');
if(!user){
  router.push('/login');
}

  if (user) {
    console.log(user)
    const userData = JSON.parse(user);
    // Set isActive based on the user's isActive status
    isActive.value = userData.isActive === 1;
  }
});

const handleLogout = () => {
  // Remove the user cookie
  Cookies.remove('user');
  // Redirect to the login page
  router.push('/login');
};
</script>

<template>
  <i class="icon-align-justify icon-large" id="toggle"></i>
  <ul id="dock">
    <li class="launcher">
      <i class="icon-dashboard"></i>
      <router-link to="/">Dashboard</router-link>
    </li>
    <li class="launcher">
      <i class="icon-calendar"></i>
      <router-link to="/reports">Ver Informes</router-link>
    </li>
    <li v-if="isActive" class="launcher dropdown hover">
      <i class="icon-user"></i>
      <router-link to="/users">Usuarios </router-link>
      <ul class="dropdown-menu">
        <li class="dropdown-header">Launcher description</li>
        <li>
          <a href="#">Another action</a>
        </li>
        <li>
          <a href="#">Something else here</a>
        </li>
      </ul>
    </li>
    <li class="launcher">
      <i class="icon-off"></i>
      <a href="#" @click.prevent="handleLogout">Cerrar Sesión</a>
    </li>
  </ul>
</template>
