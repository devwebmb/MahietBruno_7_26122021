<template>
  <div>
    <nav class="navbar">
      <ul>
        <li><a href="">Tous les articles</a></li>
        <li><a href="">Mon compte</a></li>
        <li><a href="" @click="deconnect()">Se déconnecter</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    deconnect() {
      localStorage.removeItem("token");
      this.$router.replace("/");
    },
  },
};
</script>

<style>
.navbar {
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
  padding: 6px 12px;
  border-radius: 25px;
}
a:hover {
  color: black;
  background-color: #fd2d01;
  transition: 1s;
}
</style>
