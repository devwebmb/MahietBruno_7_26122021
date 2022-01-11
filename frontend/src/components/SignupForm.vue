<template>
  <div>
    <div class="nav">
      <router-link to="/">Accueil</router-link>
    </div>
    <div>
      <form @submit.prevent="signup()">
        <div class="mb-3">
          <label for="" class="form-label">Email : </label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email_signup"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Pseudo : </label>
          <input
            v-model="pseudo"
            type="text"
            class="form-control"
            id="pseudo_signup"
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password_signup"
          />
        </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignupForm",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
    };
  },
  methods: {
    signup() {
      console.log(this.email);
      console.log(this.pseudo);
      console.log(this.password);
      axios
        .post(
          "http://localhost:3000/api/auth/signup",
          {
            email: this.email,
            pseudo: this.pseudo,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          alert("utilisateur créé");
        });
    },
  },
};
</script>

<style scoped>
form {
  width: 300px;
  margin: auto;
}
</style>
