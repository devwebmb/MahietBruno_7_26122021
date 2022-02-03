<template>
  <div id="user-posts" class="card-view">
    <div v-for="post in posts" :key="post.id">
      <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
        <div class="card border-primary mb-3" style="max-width: 25rem">
          <div class="card-header">
            Posté le {{ dateFormat(post.createdAt) }}
          </div>
          <div class="card-body">
            <h4 class="card-title">{{ post.title }}</h4>
            <p class="card-text">
              {{ post.post }}
            </p>
          </div>
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
  methods: {
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
  },
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
