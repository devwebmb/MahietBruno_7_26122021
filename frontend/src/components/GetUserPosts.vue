<template>
  <div class="user-posts">
    <div v-for="post in posts" :key="post.id">
      <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
        <div class="post">
          {{ post.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GetUserPosts",
  data() {
    return {
      posts: [],
    };
  },
  methods: {},
  created() {
    const userId = localStorage.getItem("id");
    this.axios
      .get("http://localhost:3000/api/post/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((post) => {
        const allPosts = post.data.data;
        const posterPosts = allPosts.filter(function (el) {
          return el.posterId == userId;
        });
        this.posts = posterPosts;
      });
  },
};
</script>

<style></style>
