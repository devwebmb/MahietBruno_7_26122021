<template>
  <div>
    <form @submit.prevent="login()" class="homeForm">
      <fieldset>
        <legend><strong>Connexion</strong></legend>
        <div class="form-group">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <label for="email" class="form-label mt-4"
            ><strong>Adresse mail : </strong></label
          >
          <input
            name="email"
            id="email"
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="email"
            @click="error = false"
            required
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label mt-4"
            ><strong>Mot de passe :</strong>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            v-model="password"
            @click="error = false"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary submit-btn">
          Se connecter
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    login() {
      this.error = false;
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
          localStorage.setItem("user", JSON.stringify(user.data.data)); // envoie de données dans le localstorage
          localStorage.setItem("pseudo", user.data.data.pseudo);
          localStorage.setItem("email", user.data.data.email);
          localStorage.setItem("id", user.data.data.id);
          localStorage.setItem("isAdmin", user.data.data.isAdmin);
          localStorage.setItem("token", user.data.token);
          this.$router.replace("/post");
        })
        .catch((e) => {
          this.error = e.response.data.message.replace("Validation error:", "");
        });
    },
  },
};
</script>

<style></style>
