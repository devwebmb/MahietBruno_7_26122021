<template>
  <div id="all-posts-view" class="card-view">
    <router-link :to="{ name: 'AddPost' }">
      <button type="button" class="btn btn-primary">Nouveau message</button>
    </router-link>

    <Post
      v-for="post in posts"
      :key="post"
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
  </div>
</template>

<script>
import Post from "../components/Post.vue";
export default {
  name: "GetAllPosts",
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    changeView() {
      this.downDisplay = !this.downDisplay;
      this.upDisplay = !this.upDisplay;
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
