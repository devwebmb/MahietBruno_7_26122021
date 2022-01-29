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
      <button v-if="isPosterAuthor" @click="modify = true">Modifier</button>
      <button v-if="isPosterAuthor" @click="deletePost()">
        Supprimer le message
      </button>
      <button v-if="isNotPosterAuthor" @click="addComment = true">
        Ajouter un commentaire
      </button>
    </article>
    <div v-if="modify">
      <form @submit.prevent="modifyPost()">
        <label>Message modifié :</label>
        <textarea cols="30" rows="10" v-model="modifyMessage"></textarea>
        <input type="submit" value="Publier le message modifié." />
      </form>
    </div>
    <div v-if="addComment">
      <form @submit.prevent="postComment()">
        <label>Entrer votre commentaire : </label>
        <textarea cols="30" rows="10" v-model="commentContent"></textarea>
        <input type="submit" value="Publier le commentaire" />
      </form>
    </div>
    <article
      v-for="(comment, index) in comments"
      :key="index"
      class="comment-article"
    >
      <div class="header">
        <span
          >Posté le {{ dateFormat(comment.createdAt) }} par {{ comment.author }}
        </span>
      </div>
      <div class="comment-content">{{ comment.comment }}</div>
      <button
        v-if="userId == comment.commenterId"
        @click="deleteComment(comment.id)"
      >
        Supprimer le commentaire
      </button>
    </article>
  </div>
</template>

<script>
export default {
  name: "GetOnePost",
  data() {
    return {
      post: [],
      comments: [],
      isPosterAuthor: false,
      isNotPosterAuthor: true,
      modify: false,
      modifyMessage: "",
      addComment: false,
      commentContent: "",
      author: localStorage.getItem("pseudo"),
      commenterId: localStorage.getItem("id"),
      userId: localStorage.getItem("id"),
      postId: this.$route.params.id,
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
      this.axios
        .delete(`http://localhost:3000/api/post/${this.postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.axios
            .delete(`http://localhost:3000/api/comment/post/${this.postId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + localStorage.getItem("token"),
              },
            })
            .then(() => {});
          alert("Votre message est supprimé.");
          this.$router.replace("/post");
        });
    },
    modifyPost() {
      this.axios
        .put(
          `http://localhost:3000/api/post/${this.postId}`,
          {
            post: this.modifyMessage,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          console.log(this.modifyMessage);
          alert("Votre message a bien été modifié");
          this.$router.replace("/post");
        });
    },
    postComment() {
      this.axios
        .post(
          "http://localhost:3000/api/comment",
          {
            comment: this.commentContent,
            author: this.author,
            postId: this.postId,
            commenterId: this.commenterId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          alert("Votre commentaire a bien été ajouté");
          this.$router.replace({
            name: "OnePost",
            params: { id: this.postId },
          });
          // this.$router.replace("/post");
        });
    },
    deleteComment(commentId) {
      this.axios
        .delete(`http://localhost:3000/api/comment/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("votre commentaire a bien été supprimé.");
          this.$router.replace(`/post`);
        });
    },
  },
  created() {
    const postId = this.$route.params.id;
    this.axios
      .get(`http://localhost:3000/api/post/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((posts) => {
        this.post = posts.data.data;
        console.log(this.post.posterId);
        console.log(this.userId);
        if (
          this.userId == this.post.posterId ||
          localStorage.getItem("isAdmin") == true
        ) {
          this.isPosterAuthor = true;
          this.isNotPosterAuthor = false;
        }
      });
    this.axios
      .get(`http://localhost:3000/api/comment/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((comments) => {
        this.comments = comments.data.comments;
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
