<script setup>
import { ref, onMounted } from 'vue';
import Pagination from "@/components/Shared/Pagination/Pagination.vue";

const users = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://coldshare-api.svillarsegura.site/api/user/getall');
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div class='panel panel-default grid'>
    <div class='panel-body filters'>
      <div class='row'>
        <div class='col-md-3'>
          <div class='input-group'>
            <input class='form-control' placeholder='Busqueda Rapida...' type='text'>
            <span class='input-group-btn'>
              <button class='btn' type='button'>
                <i class='icon-search'></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <table class='table'>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th class='actions'>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" :class="user.isActive === 1 ? 'active' : 'disabled'">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.username }}</td>
          <td class='action'>
          <router-link class='btn btn-info' :to="`/users/${user.id}`"> 
            <i class='icon-edit'></i>
          </router-link>
           
            
          </td>
        </tr>
      </tbody>
    </table>
    <div class='panel-footer'>
      <Pagination/>
    </div>
  </div>
</template>

<style>
/* Add your styles here if needed */
</style>
