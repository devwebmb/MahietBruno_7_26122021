<template>
  <div id="user-posts" class="card-view">
    <Post
      v-for="post in posts"
      :key="post.id"
      :author="post.author"
      :post="post.post"
      :title="post.title"
      :posterId="post.posterId"
      :imgUrl="post.imgUrl"
      :updatedAt="
        new Date(post.updatedAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      "
      :commentsCount="post.commentsCount"
      :createdAt="
        new Date(post.createdAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      "
      :id="post.id"
    ></Post>
    <!-- <div v-for="post in posts" :key="post.id">
      <div class="card border-primary mb-3" style="max-width: 35rem">
        <div class="card-header">
          <span>Posté le {{ dateFormat(post.createdAt) }}</span>
          <br />
          <span v-if="post.createdAt !== post.updatedAt"
            >Modifié le {{ dateFormat(post.updatedAt) }}</span
          >
        </div>
        <div class="card-body">
          <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
            <h4 class="card-title">{{ post.title }}</h4>
            <p class="card-text" id="card-all-posts" v-if="downDisplay">
              {{ post.post }}
            </p>
            <p class="card-text" v-if="upDisplay">
              {{ post.post }}
            </p>
          </router-link>
          <div v-if="downDisplay" class="arrow">
            <img
              src="../assets/images/arrow-down-solid.svg"
              alt="Image d'une flêche vers le bas"
              title="Afficher la suite du texte."
              @click="(downDisplay = false), (upDisplay = true)"
              class="arrow-hover"
            />
          </div>

          <div v-if="upDisplay" class="arrow">
            <img
              src="../assets/images/arrow-up-solid.svg"
              alt="Image d'une flêche vers le bas"
              title="Cacher le texte."
              @click="(downDisplay = true), (upDisplay = false)"
              class="arrow-hover"
            />
          </div>
        </div>
        <button
          @click="deletePost(post.id)"
          type="button"
          class="btn btn-primary"
        >
          Supprimer
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import Post from "../components/Post.vue";
export default {
  name: "GetUserPosts",
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getUserposts() {
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
    deletePost(postId) {
      const id = postId;
      this.axios
        .delete(`http://localhost:3000/api/post/` + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.axios
            .delete(`http://localhost:3000/api/comment/post/` + id, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + localStorage.getItem("token"),
              },
            })
            .then(() => {});
          alert("Votre message est supprimé.");
          this.getUserposts();
        });
    },
  },
  created() {
    this.getUserposts();
  },
};
</script>

<style></style>
