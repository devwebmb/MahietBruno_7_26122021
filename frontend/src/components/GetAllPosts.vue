<template>
  <div id="all-posts-view" class="card-view">
    <router-link :to="{ name: 'AddPost' }">
      <button type="button" class="btn btn-primary">Nouveau message</button>
    </router-link>
    <div v-for="(post, index) in posts" :key="index">
      <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
        <div class="card border-primary mb-3" style="max-width: 25rem">
          <div class="card-header">
            Posté le {{ dateFormat(post.createdAt) }} par {{ post.author }}
          </div>
          <div class="card-body">
            <h4 class="card-title">{{ post.title }}</h4>
            <img :src="post.imgUrl" style="width: 300px" />
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
  name: "GetAllPosts",
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
    this.axios
      .get("http://localhost:3000/api/post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((post) => {
        this.posts = post.data.data;
      });
  },
};
</script>

<style></style>
