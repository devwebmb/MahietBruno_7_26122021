<template>
  <div>
    <Header />
    <GetOnePost />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import GetOnePost from "../components/GetOnePost";
export default {
  name: "OnePost",
  components: {
    GetOnePost,
    Header,
  },
};
</script>

<style></style>
