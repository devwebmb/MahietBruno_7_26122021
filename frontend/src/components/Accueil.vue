<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/api/auth/signup">S'inscrire</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "Accueil",
};
</script>

<style></style>
