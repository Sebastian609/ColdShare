<script setup>
//imports

import { ref, computed } from "vue";
import ButtonsPost from "./ButtonsPost.vue";
import Paginator from "./Paginator.vue";
import LoadingSpinner from "./LoaingSpinner.vue"

//variables reactivas

const posts = ref([]);
const start = ref(0);
const pages = ref(0);
const postxPage = ref(10);
const totalPosts = ref(100);
const end = ref(postxPage.value);
const loading = ref(true); 

//funciones

pages.value = Math.ceil(totalPosts.value / postxPage.value);

const next = () => {
  start.value = end.value;
  end.value = end.value + postxPage.value;
};

const previus = () => {
  start.value = start.value - postxPage.value;
  end.value = end.value - postxPage.value;
};

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    posts.value = data;
    // Calcular newEnd después de que se carguen los datos
  });

//funciones computadas

const maxLength = computed(() => {
  posts.value.length
});
</script>

<template>
  <div class="row">
    <div v-for="(post, index) in posts.slice(start, end)" :key="index">
      <div class="col">
        <div class="card h-100 mb-4">
          <div class="card-body text-start w-100">
            <h5 class="card-title">{{ post.id + ". " + post.title }}</h5>
            <p class="card-text justify-content-start">{{ post.body }}</p>
          </div>
          <div class="card-footer w-100">
            <ButtonsPost></ButtonsPost>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Paginator
    @next="next"
    @previus="previus"
    @verifyStart="verifyStart"
    @verifyEnd="verifyEnd"
    :start="start"
    :end="end"
    :maxLength="maxLength"
  ></Paginator>
</template>
