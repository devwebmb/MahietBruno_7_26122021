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
import axios from "axios";
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
      axios
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
            .then((user) => {
              localStorage.setItem("user", JSON.stringify(user.data));
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
</style>
