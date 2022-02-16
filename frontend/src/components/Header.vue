<template>
  <div id="navbar">
    <div class="home-logo">
      <img
        src="../assets/images/logo-recadre-font.png"
        alt="Logo et nom de l'entreprise"
      />
    </div>
    <nav class="navbar navbar-expand-sm bg-primary">
      <ul class="navbar-nav">
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
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    deconnect() {
      localStorage.removeItem("user"); // suppression du localstrorage
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

<style></style>
