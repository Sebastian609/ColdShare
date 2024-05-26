<script setup>
import { ref } from "vue";

const users = ref([]);

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => (users.value = data));
</script>

<template>
  <div class="row">
    <div v-for="user in users" :key="user.id" class="col-md-4">
      <div class="card bg-light mb-4">
        <div class="card-header w-100">{{ user.name }}</div>
        <div class="card-body">
          <h5 class="card-title">{{ user.email }}</h5>
          <div class="row">
            <div class="col">
              <button class="btn btn-primary">Ver Post</button>
            </div>
            <div class="col">
              <button class="btn btn-success">Ver Perfil</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
