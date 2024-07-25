// main.js
import { createApp } from "vue";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdn.jsdelivr.net/npm/vue-ellipse-progress/dist/vue-ellipse-progress.umd.min.js";
import "https://unpkg.com/boxicons@2.1.3/dist/boxicons.js";
import "./ui/hierapolis-gh-pages/assets/stylesheets/application-a07755f5.css";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import PrimeVue from "primevue/config";

import VueEllipseProgress from "vue-ellipse-progress";
import Lara from "@primevue/themes/aura";
import Dashboard from "./views/Dashboard.vue";
import Reports from "./views/Reports.vue";
import Users from "./views/Users.vue";
import Login from "./views//Login.vue";
import UserView from "./components/Users/UserView/UserView.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/reports", component: Reports },
  { path: "/users", component: Users },
  {
    path: "/users/:id",
    name: "usuario",
    component: UserView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

router.beforeEach((to, from, next) => {
  const user = Cookies.get("user");

  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

app.use(VueEllipseProgress, "vep");
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
});
app.mount("#app");
