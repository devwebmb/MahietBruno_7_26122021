<template>
  <div class="home">
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
  background-color: #fcd4d4;
  width: 95%;
  max-width: 400px;
  margin: 5% auto auto auto;
  border-radius: 25px;
}
ul {
  display: flex;
  justify-content: space-between;
  padding: 6% 10%;
  border-radius: 25px 25px 0 0;
  margin-bottom: 0;
}
li {
  list-style: none;
  transition: 0.5s;
}
a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 25px;
  background-color: #eb6864;
}
a:hover {
  color: white;
  background-color: #c85855;
}
li:hover {
  transform: scale(1.1);
}
</style>
