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
      this.axios
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
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user.data));
          // this.axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${user.data.token}`;
          this.$router.replace("/post");
        });
    },
  },
};
</script>

<style></style>
