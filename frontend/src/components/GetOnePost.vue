<template>
  <div>
    <div id="get-one-post" class="card-view" v-if="postView">
      <div class="card border-primary mb-3" style="max-width: 35rem">
        <div class="card-header">
          <span
            >Posté le {{ dateFormat(post.createdAt) }} par
            {{ post.author }}</span
          >
          <br />
          <span v-if="post.createdAt !== post.updatedAt">
            Modifié le {{ dateFormat(post.updatedAt) }}
          </span>
          <br />
          <span v-if="post.commentsCount > 1"
            ><strong>{{ post.commentsCount }} commentaires</strong></span
          >
          <span v-if="post.commentsCount <= 1"
            ><strong>{{ post.commentsCount }} commentaire</strong></span
          >
        </div>

        <div class="card-body">
          <h4 class="card-title">{{ post.title }}</h4>
          <img :src="post.imgUrl" class="post-image" />
          <p class="card-text" id="card-all-posts" v-if="downDisplay">
            {{ post.post }}
          </p>
          <p class="card-text" v-if="upDisplay">
            {{ post.post }}
          </p>
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
          <div id="post-buttons">
            <button
              v-if="isPosterAuthor || this.isAdmin"
              @click="(modify = true), (postView = false)"
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
          </div>
          <button
            @click="addComment = true"
            type="button"
            class="btn btn-primary"
          >
            Ajouter un commentaire
          </button>
          <br />
        </div>
      </div>

      <div v-if="addComment" id="add-comment">
        <form @submit.prevent="postComment()">
          <div class="form-group">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <label class="form-label mt-4">Entrer votre commentaire :</label>
            <textarea
              class="form-control"
              rows="3"
              style="max-width: 35rem"
              v-model="commentContent"
              placeholder="Entrer ici votre commentaire"
              @click="error = false"
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
            Commenté le {{ dateFormat(comment.createdAt) }} par
            {{ comment.author }}
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

    <div id="modify-post" v-if="modify">
      <form @submit.prevent="modifyPost()">
        <div class="form-group">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <div class="modify-image" v-if="imageDisplay">
            <img
              :src="post.imgUrl"
              style="width: 150px"
              v-if="post.imgUrl != ''"
            />
            <img
              src="../assets/images/trash.svg"
              alt="Logo d'une poubelle"
              class="trash-logo"
              title="Supprimer l'image"
              @click="(file = ''), (imageDisplay = false)"
              v-if="post.imgUrl != ''"
            />
          </div>
          <br />
          <div class="form-group">
            <label class="form-label mt-4"
              >Choisir une autre image ou ajouter une image :</label
            >
            <input
              class="form-control form-file"
              type="file"
              @change="handleFileUpload($event)"
            />
            <label class="form-label mt-4" v-if="previewDisplay"
              >Visualisation de l'image choisie :
            </label>
            <br />
            <div class="modify-image" v-if="previewDisplay">
              <img
                :src="url"
                v-if="url"
                alt="Prévisualisation de l'image"
                style="width: 150px"
              />
              <img
                src="../assets/images/trash.svg"
                alt="Logo d'une poubelle"
                class="trash-logo"
                title="Supprimer l'image choisie"
                @click="(url = ''), (previewDisplay = false), (file = '')"
              />
            </div>
          </div>
          <label class="form-label mt-4">Modifier votre post : </label>
          <div id="modify-content">
            <textarea
              class="form-control"
              rows="3"
              style="max-width: 35rem"
              v-model="modifyMessage"
              @click="error = false"
            ></textarea>
            <img
              src="../assets/images/eraser-solid.svg"
              alt="Logo d'une gomme"
              @click="modifyMessage = ''"
              title="Effacer le texte"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Modifier le post
          </button>
        </div>
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
      postImgUrl: "",
      comments: [],
      file: "",
      url: null,
      imageDisplay: true,
      previewDisplay: false,
      downDisplay: false,
      upDisplay: true,
      error: false,
      postView: true,
      isPosterAuthor: false,
      modify: false,
      modifyMessage: "",
      addComment: false,
      commentsCount: 0,
      commentContent: "",
      author: localStorage.getItem("pseudo"),
      commenterId: localStorage.getItem("id"),
      userId: localStorage.getItem("id"),
      isAdmin: localStorage.getItem("isAdmin"),
      postId: this.$route.params.id,
    };
  },

  methods: {
    handleFileUpload(event) {
      this.previewDisplay = true;
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
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
          this.modifyMessage = posts.data.data.post;
          this.postImgUrl = posts.data.data.imgUrl;
          this.commentsCount = posts.data.data.commentsCount;
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
      this.error = false;
      let formData = new FormData();
      formData.append("imgUrl", this.file);
      formData.append("post", this.modifyMessage);
      this.axios
        .put(`http://localhost:3000/api/post/${this.postId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre message a bien été modifié");
          this.modifyMessage = "";
          this.modify = false;
          this.postView = true;
          this.previewDisplay = false;
          this.imageDisplay = true;
          this.getOnePost();
        })
        .catch((e) => {
          this.error = e.response.data.message
            .replace("Validation error:", "")
            .split(",")[0];
        });
    },

    postComment() {
      this.error = false;
      this.commentsCount++;
      const count = this.commentsCount;
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
          let formData = new FormData();
          formData.append("commentsCount", count);
          this.axios
            .put(`http://localhost:3000/api/post/${this.postId}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ` + localStorage.getItem("token"),
              },
            })
            .then(() => {
              alert("Votre commentaire a bien été ajouté");
              this.commentContent = "";
              this.addComment = false;
              this.getOnePost();
            });
        })
        .catch((e) => {
          this.error = e.response.data.message
            .replace("Validation error:", "")
            .split(",")[0];
        });
    },

    deleteComment(commentId) {
      this.commentsCount--;
      const count = this.commentsCount;
      this.axios
        .delete(`http://localhost:3000/api/comment/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          let formData = new FormData();
          formData.append("commentsCount", count);
          this.axios
            .put(`http://localhost:3000/api/post/${this.postId}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ` + localStorage.getItem("token"),
              },
            })
            .then(() => {
              alert("votre commentaire a bien été supprimé.");
              this.getOnePost();
            });
        });
    },
  },
  created() {
    this.getOnePost();
  },
};
</script>

<style></style>
