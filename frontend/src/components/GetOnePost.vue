<template>
  <div id="get-one-post">
    <div class="card border-primary mb-3" style="max-width: 35rem">
      <div class="card-header">
        Posté le {{ dateFormat(post.createdAt) }} par {{ post.author }}
      </div>
      <div class="card-body">
        <h4 class="card-title">{{ post.title }}</h4>
        <p class="card-text">
          {{ post.post }}
        </p>
        <button
          v-if="isPosterAuthor || this.isAdmin"
          @click="modify = true"
          type="button"
          class="btn btn-primary"
        >
          Modifier
        </button>
        <button
          v-if="isPosterAuthor || this.isAdmin"
          @click="deletePost()"
          type="button"
          class="btn btn-primary"
        >
          Supprimer
        </button>
        <button
          @click="addComment = true"
          type="button"
          class="btn btn-primary"
        >
          Ajouter un commentaire
        </button>
      </div>
    </div>
    <div v-if="modify">
      <form @submit.prevent="modifyPost()">
        <div class="form-group">
          <label class="form-label mt-4">Modifier votre commentaire :</label>
          <textarea
            class="form-control"
            rows="3"
            style="max-width: 35rem"
            v-model="modifyMessage"
          ></textarea>
          <button type="submit" class="btn btn-primary">
            Modifier le commentaire
          </button>
        </div>
      </form>
    </div>
    <div v-if="addComment">
      <form @submit.prevent="postComment()">
        <div class="form-group">
          <label class="form-label mt-4">Entrer votre commentaire :</label>
          <textarea
            class="form-control"
            rows="3"
            style="max-width: 35rem"
            v-model="commentContent"
          ></textarea>
          <button type="submit" class="btn btn-primary">
            Ajouter le commentaire
          </button>
        </div>
      </form>
    </div>
    <div
      v-for="(comment, index) in comments"
      :key="index"
      class="comment-article"
    >
      <div class="card border-primary mb-3" style="max-width: 20rem">
        <div class="card-header">
          Posté le {{ dateFormat(comment.createdAt) }} par {{ comment.author }}
        </div>
        <div class="card-body">
          <p class="card-text">
            {{ comment.comment }}
          </p>
          <button
            type="submit"
            class="btn btn-primary"
            v-if="userId == comment.commenterId"
            @click="deleteComment(comment.id)"
          >
            Supprimer le commentaire
          </button>
        </div>
      </div>
    </div>
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
      modify: false,
      modifyMessage: "",
      addComment: false,
      commentContent: "",
      author: localStorage.getItem("pseudo"),
      commenterId: localStorage.getItem("id"),
      userId: localStorage.getItem("id"),
      isAdmin: localStorage.getItem("isAdmin"),
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
    getOnePost() {
      this.axios
        .get(`http://localhost:3000/api/post/${this.postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((posts) => {
          this.post = posts.data.data;
          if (this.userId == this.post.posterId) {
            this.isPosterAuthor = true;
          }
        });
      this.axios
        .get(`http://localhost:3000/api/comment/${this.postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((comments) => {
          this.comments = comments.data.comments;
        });
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
          alert("Votre message a bien été modifié");
          // this.$router.replace("/post");
          //this.getOnePost();
          location.reload();
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
          //this.$router.replace("/post");
          location.reload();
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
          //this.$router.replace(`/post`);
          location.reload();
        });
    },
  },
  created() {
    this.getOnePost();
  },
};
</script>

<style></style>
