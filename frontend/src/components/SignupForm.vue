<template>
  <div>
    <form @submit.prevent="signup()" class="homeForm">
      <fieldset>
        <legend><strong>Inscription</strong></legend>
        <div class="form-group">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <label for="email" class="form-label mt-4"
            ><strong>Adresse mail : </strong></label
          >
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="email"
            @click="error = false"
            required
          />
        </div>
        <div class="form-group">
          <label for="pseudo" class="form-label mt-4"
            ><strong>Pseudo : </strong></label
          >
          <input
            id="pseudo"
            name="pseudo"
            type="text"
            class="form-control"
            placeholder="Pseudo"
            v-model="pseudo"
            @click="error = false"
            required
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label mt-4"
            ><strong>Mot de passe :</strong>
          </label>
          <input
            name="password"
            id="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            v-model="password"
            @click="error = false"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary submit-btn">
          S'inscrire
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
      error: false,
    };
  },
  methods: {
    // fonction d'inscription
    signup() {
      this.error = false;
      this.axios
        .post(
          // inscription
          "http://localhost:3000/api/user/signup",
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
          this.axios
            .post(
              "http://localhost:3000/api/user/login", // connexion
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
              localStorage.setItem("user", JSON.stringify(user.data.data));
              localStorage.setItem("pseudo", user.data.data.pseudo);
              localStorage.setItem("email", user.data.data.email);
              localStorage.setItem("id", user.data.data.id);
              localStorage.setItem("isAdmin", user.data.data.isAdmin);
              localStorage.setItem("token", user.data.token);
              alert("Votre inscription est validé.");
              this.$router.replace("/post");
            });
        })
        .catch((e) => {
          this.error = e.response.data.message.replace("Validation error:", "");
        });
    },
  },
};
</script>

<style></style>
