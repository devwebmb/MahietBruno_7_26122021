<template>
  <div><Header /><Profile-view /></div>
</template>

<script>
import Header from "../components/Header.vue";
import ProfileView from "../components/ProfileView.vue";
export default {
  name: "Account",
  components: {
    Header,
    ProfileView,
  },
};
</script>

<style></style>
