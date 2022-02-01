<template>
  <div>
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
            <p class="card-text">
              {{ post.post }}
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <!-- <article v-for="(post, index) in posts" :key="index" class="post-article">
      <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
        <div class="header">
          <span
            >Posté le {{ dateFormat(post.createdAt) }} par {{ post.author }}
          </span>
        </div>
        <h2>{{ post.title }}</h2>
        <div class="post-content">{{ post.post }}</div>
      </router-link>
    </article> -->
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

<style scoped>
/* button {
  background-color: #fc785d;
  border: none;
  border-radius: 25px;
  color: black;
  font-weight: bold;
  padding: 5px 10px;
  margin-top: 2%;
}
.post-article {
  border: #fcd4d3 solid 2px;
  max-width: 600px;
  margin: 2% auto;
  border-radius: 25px;
}

.post-article .header {
  border-bottom: #fcd4d3 solid 2px;
}
h2 {
  border-bottom: #fcd4d3 solid 2px;
} */
</style>
