<template>
  <div>
    <article class="post-article">
      <div class="header">
        <span
          >Posté le {{ dateFormat(post.createdAt) }} par {{ post.author }}</span
        >
      </div>
      <h2>{{ post.title }}</h2>
      <div class="post-content">{{ post.post }}</div>
      <div v-if="modify"></div>
      <button v-if="isPosterAuthor" @click="modify = true">Modifier</button>
      <button v-if="isPosterAuthor" @click="deletePost()">
        Supprimer le message
      </button>
    </article>
    <div v-if="modify">
      <form @submit.prevent="modifyPost()">
        <label>Message modifié :</label>
        <textarea cols="30" rows="10" v-model="modifyMessage"></textarea>
        <input type="submit" value="Publier le message modifié." />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "GetOnePost",
  data() {
    return {
      post: [],
      isPosterAuthor: false,
      modify: false,
      modifyMessage: "",
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
    deletePost() {
      const postId = this.$route.params.id;
      this.axios
        .delete(`http://localhost:3000/api/post/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$token}`,
          },
        })
        .then(() => {
          alert("Votre message est supprimé.");
          this.$router.replace("/post");
        });
    },
    modifyPost() {
      const postId = this.$route.params.id;
      this.axios
        .put(
          `http://localhost:3000/api/post/${postId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$token}`,
            },
          },
          {
            post: this.modifyMessage,
          }
        )
        .then(() => {
          console.log(this.modifyMessage);
          alert("Votre message a bien été modifié");
          this.$router.replace("/post");
        });
    },
  },
  created() {
    const postId = this.$route.params.id;
    this.axios
      .get(`http://localhost:3000/api/post/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$token}`,
        },
      })
      .then((post) => {
        this.post = post.data.data;
        if (
          this.$user.data.id === this.post.posterId ||
          this.$user.data.isAdmin === 1
        ) {
          this.isPosterAuthor = true;
        }
      });
  },
};
</script>

<style>
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
}
</style>
