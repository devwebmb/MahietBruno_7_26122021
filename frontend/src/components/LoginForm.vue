<template>
  <div>
    <form @submit.prevent="login()" class="homeForm">
      <fieldset>
        <legend><strong>Connexion</strong></legend>
        <div class="form-group">
          <label for="email" class="form-label mt-4"
            ><strong>Adresse mail : </strong></label
          >
          <input
            name="email"
            id="email"
            type="email"
            class="form-control"
            placeholder="Entrer votre adresse mail"
            v-model="email"
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
            placeholder="Choisissez un mot de passe"
            v-model="password"
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
