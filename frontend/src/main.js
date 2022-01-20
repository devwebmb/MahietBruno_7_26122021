import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// createApp(App).use(router).mount("#app");
const app = createApp(App);
app.config.globalProperties.axios = axios;
if (localStorage.user != undefined) {
  app.config.globalProperties.$token = JSON.parse(localStorage.user).token;
  app.config.globalProperties.$user = JSON.parse(localStorage.user);
}
app.use(router);
app.mount("#app");
