<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();

const submitForm = async (event) => {
  event.preventDefault();

  const payload = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await fetch('https://coldshare-api.svillarsegura.site/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication failed');
    }

    const data = await response.json();
    console.log('Success:', data);

    // Save user data in cookies
    Cookies.set('user', JSON.stringify(data), { expires: 7 }); // Expires in 7 days

    // Redirect to the dashboard
    router.push('/');
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <body class='login' >
    <div class='wrapper'>
      <div class='row'>
        <div class='col-lg-12'>
          <div class='brand text-center'>
            <h1>
              <div class='logo-icon'>
                <i class='icon-cloud '></i>
              </div>
              Coldshare
            </h1>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='col-lg-12'>
          <form @submit="submitForm">
            <fieldset class='text-center'>
              <legend>Login to your account</legend>
              <div class='form-group'>
                <input v-model="username" class='form-control' placeholder='Email address' type='text'>
              </div>
              <div class='form-group'>
                <input v-model="password" class='form-control' placeholder='Password' type='password'>
              </div>
              <div class='text-center'>
                <div class='checkbox'>
                  <!-- You can add a "Remember me" checkbox here if needed -->
                </div>
              </div>
              <div class="form-actions">
                <button class="btn btn-default" type="submit">Login</button>
              </div>
             
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>
