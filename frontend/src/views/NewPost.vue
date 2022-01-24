<template>
  <div><Header /><AddNewPost /></div>
</template>

<script>
import Header from "../components/Header.vue";
import AddNewPost from "../components/AddNewPost.vue";
export default {
  name: "NewPost",
  components: {
    Header,
    AddNewPost,
  },
};
</script>

<style></style>
