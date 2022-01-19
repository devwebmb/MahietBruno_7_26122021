<template>
  <div class="home">
    <div class="form-container">
      <ul>
        <li>
          <a href="" @click.prevent="loginForm = false">S'inscrire</a>
        </li>
        <li>
          <a href="" @click.prevent="loginForm = true">Se connecter</a>
        </li>
      </ul>
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
<style scoped>
.home {
  background-color: #ffd7d7;
  width: 40%;
  max-width: 400px;
  margin: 5% auto auto auto;
  border-radius: 25px;
}
ul {
  display: flex;
  justify-content: space-between;
  padding: 2% 10%;
  border: solid 2px #fc785d;
  border-radius: 25px 25px 0 0;
  margin-bottom: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 25px;
}
a:hover {
  color: black;
  background-color: #fd2d01;
  transition: 1s;
}
</style>
