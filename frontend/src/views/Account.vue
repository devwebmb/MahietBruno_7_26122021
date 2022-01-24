<template>
  <div><Header /><ProfileView /><GetUserPosts /></div>
</template>

<script>
import Header from "../components/Header.vue";
import GetUserPosts from "../components/GetUserPosts.vue";
import ProfileView from "../components/ProfileView.vue";
export default {
  name: "Account",
  components: {
    Header,
    ProfileView,
    GetUserPosts,
  },
};
</script>

<style></style>
