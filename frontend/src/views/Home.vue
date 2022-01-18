<template>
  <div class="home">
    <HomeView />
    <Signup />
    <Login />
  </div>
</template>

<script>
import HomeView from "../components/HomeView.vue";
import Signup from "../components/SignupForm.vue";
import Login from "../components/LoginForm.vue";

export default {
  name: "Home",
  components: {
    HomeView,
    Signup,
    Login,
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
</style>
