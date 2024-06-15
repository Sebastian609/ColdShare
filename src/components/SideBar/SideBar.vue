<script setup>

</script>
<template>
    <i class="icon-align-justify icon-large" id="toggle"></i>
        <ul id="dock">
          <li class="active launcher">
            <i class="icon-dashboard"></i>
            <router-link to="/">Dashboard</router-link>
          </li>
          <li class="launcher">
            <i class="icon-calendar"></i>
            <router-link to="/reports">Ver Informes</router-link>
         
          </li>
          <li class='launcher dropdown hover'>
            <i class='icon-flag'></i>
            <a href='#'>Reports</a>
            <ul class='dropdown-menu'>
              <li class='dropdown-header'>Launcher description</li>
              <li>
               
              </li>
              <li>
                <a href='#'>Another action</a>
              </li>
              <li>
                <a href='#'>Something else here</a>
              </li>
            </ul>
          </li>
        </ul>
        
</template>