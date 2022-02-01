<template>
  <div>
    <ul class="nav nav-pills bg-primary">
      <li class="nav-item">
        <router-link :to="{ name: 'Post' }">
          <a class="nav-link">Tous les messages</a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Account' }">
          <a class="nav-link">Mon compte</a>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="" @click="deconnect()">Se déconnecter</a>
      </li>
    </ul>
  </div>
  <!-- <div>
    <nav class="navbar">
      <ul>
        <li>
          <router-link :to="{ name: 'Post' }">
            <a>Tous les messages</a>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Account' }"><a>Mon compte</a></router-link>
        </li>
        <li><a href="" @click="deconnect()">Se déconnecter</a></li>
      </ul>
    </nav>
  </div> -->
</template>

<script>
export default {
  name: "Header",
  methods: {
    deconnect() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("pseudo");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("id");

      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
/* .navbar {
  background-color: #ffd7d7;
  max-width: 600px;
  margin: auto;
  border-radius: 25px;
}
ul {
  margin-bottom: 0;
  display: flex;
  margin: auto;
  width: 100%;
  justify-content: space-between;
  padding: 6px 12px;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 6px;
  border-radius: 25px;
}
a:hover {
  color: black;
  background-color: #fd2d01;
  transition: 1s;
} */
</style>
