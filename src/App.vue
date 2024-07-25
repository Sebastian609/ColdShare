<template>
  <div id="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Login from './views/Login.vue';

export default {
  name: 'ColdShare',

  components: {
    Login
  }
};
</script>
