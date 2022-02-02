<template>
  <div class="home">
    <div id="home-logo">
      <img src="../assets/images/logo-recadre-font.png" alt="" />
    </div>
    <div class="homeForm">
      <div id="home-menu">
        <button
          @click.prevent="loginForm = false"
          type="button"
          class="btn btn-primary"
        >
          S'inscrire
        </button>
        <button
          @click.prevent="loginForm = true"
          type="button"
          class="btn btn-primary"
        >
          Se connecter
        </button>
      </div>
      <Signup v-if="!loginForm"></Signup>
      <Login v-else></Login>
    </div>
  </div>
</template>

<script>
import Signup from "../components/SignupForm.vue";
import Login from "../components/LoginForm.vue";

export default {
  name: "Home",
  components: {
    Signup,
    Login,
  },
  data() {
    return {
      loginForm: true,
    };
  },
};
</script>
<style></style>
