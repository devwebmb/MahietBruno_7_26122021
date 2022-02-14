<template>
  <div id="all-posts-view" class="card-view">
    <router-link :to="{ name: 'AddPost' }">
      <button type="button" class="btn btn-primary">Nouveau message</button>
    </router-link>
    <div v-for="(post, index) in posts" :key="index">
      <div class="card border-primary mb-3" style="max-width: 35rem">
        <div class="card-header">
          Posté le {{ dateFormat(post.createdAt) }} par {{ post.author }}
        </div>
        <div class="card-body">
          <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
            <h4 class="card-title">{{ post.title }}</h4>
            <img :src="post.imgUrl" style="width: 300px" />
            <p class="card-text" id="card-all-posts">
              {{ post.post }}
            </p>
            <p class="card-text" v-if="upDisplay">
              {{ post.post }}
            </p>
          </router-link>

          <div v-if="downDisplay">
            <img
              src="../assets/images/arrow-down-solid.svg"
              alt="Image d'une flêche vers le bas"
              title="Afficher la suite du texte."
              @click="(downDisplay = false), (upDisplay = true)"
              class="arrow-hover"
            />
          </div>

          <div v-if="upDisplay">
            <img
              src="../assets/images/arrow-up-solid.svg"
              alt="Image d'une flêche vers le bas"
              title="Cacher le texte."
              @click="(downDisplay = true), (upDisplay = false)"
              class="arrow-hover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GetAllPosts",
  data() {
    return {
      posts: [],
      downDisplay: true,
      upDisplay: false,
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
        downDisplay: true,
        upDisplay: false,
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
