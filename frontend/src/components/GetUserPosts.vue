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
