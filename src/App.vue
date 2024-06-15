<template>
  <div id="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Dashboard from './views/Dashboard.vue';

// Importa componentes necesarios


export default {
  name: 'App',

  components: {
   Dashboard
  }
};
</script>

