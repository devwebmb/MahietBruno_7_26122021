<template>
  <div id="all-posts-view" class="card-view">
    <router-link :to="{ name: 'AddPost' }">
      <button type="button" class="btn btn-primary">Nouveau message</button>
    </router-link>
    <div v-for="(post, index) in posts" :key="index">
      <div class="card border-primary mb-3" style="max-width: 35rem">
        <div class="card-header">
          <span
            >Posté le {{ dateFormat(post.createdAt) }} par
            {{ post.author }}</span
          >
          <br />
          <span v-if="post.createdAt !== post.updatedAt"
            >Modifié le {{ dateFormat(post.updatedAt) }}</span
          >
          <br />
          <span v-if="post.commentsCount > 1"
            ><strong>{{ post.commentsCount }} commentaires</strong></span
          >
          <span v-if="post.commentsCount <= 1"
            ><strong>{{ post.commentsCount }} commentaire</strong></span
          >
        </div>
        <div class="card-body">
          <div v-if="downDisplay">
            <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
              <h4 class="card-title">{{ post.title }}</h4>
              <img :src="post.imgUrl" class="post-image" />
              <p class="card-text" id="card-all-posts">
                {{ post.post }}
              </p>
            </router-link>
            <div>
              <img
                src="../assets/images/arrow-down-solid.svg"
                alt="Image d'une flêche vers le bas"
                title="Afficher la suite du texte."
                class="arrow-hover"
                @click="changeView()"
              />
            </div>
          </div>
          <div v-if="upDisplay">
            <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
              <h4 class="card-title">{{ post.title }}</h4>
              <img :src="post.imgUrl" style="width: 300px" />
              <p class="card-text">
                {{ post.post }}
              </p>
            </router-link>
            <div>
              <img
                src="../assets/images/arrow-up-solid.svg"
                alt="Image d'une flêche vers le bas"
                title="Cacher le texte."
                class="arrow-hover"
                @click="changeView()"
              />
            </div>
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
    changeView() {
      this.downDisplay = !this.downDisplay;
      this.upDisplay = !this.upDisplay;
    },
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
