<template>
  <div><Header /> <GetAllPosts /></div>
</template>

<script>
import Header from "../components/Header.vue";
import GetAllPosts from "../components/GetAllPosts.vue";
export default {
  name: "Post",
  components: {
    Header,
    GetAllPosts,
  },
};
</script>

<style></style>
