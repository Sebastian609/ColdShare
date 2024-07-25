<script setup>
import { ref } from 'vue';

const name = ref('');
const lastname = ref('');
const username = ref('');
const isAdmin = ref(false);
const password = ref('');

const submitForm = async (event) => {
  event.preventDefault();

  const payload = {
    name: name.value,
    lastname: lastname.value,
    username: username.value,
    isActive: 1,
    password: password.value,
    isAdmin: isAdmin.value ? 1 : 0,
  };

  try {
    const response = await fetch('https://coldshare-api.svillarsegura.site/api/user/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);
    // Handle success (e.g., show a success message, clear the form, etc.)
  } catch (error) {
    console.error('Error:', error);
    // Handle error (e.g., show an error message)
  }
};
</script>

<template>
  <form @submit="submitForm">
    <fieldset>
      <div class="form-group">
        <label class="control-label">Nombres</label>
        <input v-model="name" class="form-control" placeholder="Enter name" type="text" required/>
      </div>
      <div class="form-group">
        <label class="control-label">Apellidos</label>
        <input v-model="lastname" class="form-control" placeholder="Enter lastname" type="text" required/>
      </div>
      <div class="form-group">
        <label class="control-label">Nombre de Usuario</label>
        <input v-model="username" class="form-control" placeholder="Enter username" type="text" required/>
      </div>
      <div class="form-group">
        <label class="control-label">Checkbox</label>
        <div>
          <input v-model="isAdmin" type="checkbox" />
          Administrador
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">Contraseña</label>
        <input v-model="password" class="form-control" placeholder="Enter password" type="password" required/>
      </div>
    </fieldset>
    <div class="form-actions">
      <button class="btn btn-default" type="submit">Guardar</button>
    </div>
  </form>
</template>
