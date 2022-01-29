<template>
  <div class="form-container">
    <form class="connect-form" @submit.prevent="signup()">
      <h3>Inscription</h3>
      <label>Email :</label>
      <input type="email" v-model="email" /><br />
      <label>Pseudo :</label>
      <input type="text" v-model="pseudo" /><br />
      <label>Mot de passe :</label>
      <input type="password" v-model="password" />
      <input type="submit" value="S'inscrire" class="submit-button" />
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
    };
  },
  methods: {
    signup() {
      this.axios
        .post(
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
          alert("Votre inscription est validé.");
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
              localStorage.setItem("user", JSON.stringify(user.data.data));
              localStorage.setItem("pseudo", user.data.data.pseudo);
              localStorage.setItem("email", user.data.data.email);
              localStorage.setItem("id", user.data.data.id);
              localStorage.setItem("isAdmin", user.data.data.isAdmin);
              localStorage.setItem("token", user.data.token);
              this.$router.replace("/post");
            });
        });
    },
  },
};
</script>

<style>
.connect-form {
  border: solid 2px #fc785d;
  border-top: none;
  border-radius: 0 0 25px 25px;
}
h3 {
  color: black;
  padding-top: 6px;
}
label {
  font-weight: bold;
  color: black;
  width: 30%;
}
input {
  width: 60%;
  margin: 10px;
}
.submit-button {
  background-color: #fc785d;
  border: none;
  border-radius: 25px;
  color: black;
  font-weight: bold;
  padding: 5px;
}
.submit-button:hover {
  background-color: #fd2d01;
  transition: 1s;
}
@media screen and (max-width: 400px) {
  .connect-form {
    display: flex;
    flex-direction: column;
  }
  label,
  input {
    width: 80%;
    margin: auto;
  }
  .submit-button {
    margin: 4% auto;
  }
}
</style>
