<script setup>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { VueEllipseProgress } from "vue-ellipse-progress";

components: {
  CircleProgress;
}

name: "MyComponent";
components: {
  VueEllipseProgress;
}

const props = defineProps({
  title: String,
  time: String,
  data: Number,
  type: String,
});

const emits = defineEmits(['cambiarFavoritoNombre'])
</script>

<template>
  <div class="col columna">
   
      <h3 class="mb-4 " style="min-width: 100%">{{ title }}</h3>
      <p>{{ time }}</p>
      <div class="card-body mx-5 text-primary w-90">
        <div class="row">
          <div class="col">
            <vep
              :progress="data"
              color="#11E391"
              dash="60 0.9"
              animation="rs 700 200"
            
              size="180"
              dot="10 #0EBB77"
              fontSize="2rem"
              legent="true"
              legendValue="180"
              legendClass="legend-custom-style"
              gap="10"
       
            >
              <span slot="legend-value">{{ data }} {{ type }}</span>
            </vep>
          </div>
         
          
            
         
        </div>
      </div>
    </div>

</template>
