<template>
  <div>
    <div class="form-container">
      <form class="connect-form" @submit.prevent="login()">
        <h3>Connexion</h3>
        <label>Email :</label>
        <input type="email" v-model="email" /><br />
        <label>Mot de passe :</label>
        <input type="password" v-model="password" />
        <input type="submit" value="Se connecter" class="submit-button" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post(
          "http://localhost:3000/api/user/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          localStorage.setItem("token", data.data.token);
          this.$router.replace("/post");
        });
    },
  },
};
</script>

<style></style>
