// axe d'amélioration
<template>
  <div id="modify-post">
    <form @submit.prevent="modifyPost()">
      <div class="form-group">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div class="modify-image" v-if="imageDisplay">
          <img :src="imgUrl" style="width: 150px" v-if="imgUrl !== ''" />
          <img
            src="../assets/images/trash.svg"
            alt="Logo d'une poubelle"
            class="trash-logo"
            title="Supprimer l'image"
            @click="(file = ''), (imageDisplay = false), (error = false)"
            v-if="imgUrl !== ''"
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
            @click="error = false"
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
            v-model="messagetoPost"
            @click="error = false"
          ></textarea>
          <img
            src="../assets/images/eraser-solid.svg"
            alt="Logo d'une gomme"
            title="Effacer le texte"
            @click="messagetoPost = ''"
          />
        </div>
        <button type="submit" class="btn btn-primary">Modifier le post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    modifyMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      file: "",
      url: null,
      imageDisplay: true,
      previewDisplay: false,
      error: false,
      postId: this.$route.params.id,
      messagetoPost: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.previewDisplay = true;
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    modifyPost() {
      let formData = new FormData();
      formData.append("imgUrl", this.file);
      formData.append("post", this.messagetoPost);
      this.axios
        .put(`http://localhost:3000/api/post/${this.postId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre message a bien été modifié");
          this.messagetoPost = "";
          this.previewDisplay = false;
          this.imageDisplay = true;
          this.$router.replace("/post/");
        })
        .catch((e) => {
          this.error = e.response.data.message
            .replace("Validation error:", "")
            .split(",")[0];
        });
    },
  },
  mounted() {
    this.messagetoPost = this.modifyMessage;
  },
};
</script>

<style></style>
