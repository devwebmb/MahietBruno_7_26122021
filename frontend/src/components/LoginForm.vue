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
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user.data.data));
          localStorage.setItem("pseudo", user.data.data.pseudo);
          localStorage.setItem("email", user.data.data.email);
          localStorage.setItem("id", user.data.data.id);
          localStorage.setItem("isAdmin", user.data.data.isAdmin);
          localStorage.setItem("token", user.data.token);
          this.$router.replace("/post");
        });
    },
  },
};
</script>

<style></style>
