<template>
  <div id="add-post">
    <form @submit.prevent="addPost()">
      <div class="form-group">
        <label class="form-label mt-4">Titre :</label>
        <input
          type="text"
          class="form-control"
          placeholder="Entrer votre titre"
          v-model="title"
        />
        <label class="form-label mt-4">Message : </label>
        <textarea
          class="form-control"
          rows="3"
          style="max-width: 35rem"
          v-model="message"
          placeholder="Entrer ici votre message"
        ></textarea>
        <div class="form-group">
          <label for="formFile" class="form-label mt-4">Image :</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="handleFileUpload($event)"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Ajouter le message
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddNewPost",
  data() {
    return {
      title: "",
      message: "",
      file: "",
      author: localStorage.getItem("pseudo"),
      posterId: localStorage.getItem("id"),
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    addPost() {
      let formData = new FormData();
      formData.append("imgUrl", this.file);
      formData.append("title", this.title);
      formData.append("author", this.author);
      formData.append("post", this.message);
      formData.append("posterId", this.posterId);
      console.log(formData);
      this.axios
        .post(`http://localhost:3000/api/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre mesage a été ajouté.");
          this.$router.replace("/post");
        });
    },
  },
};
</script>

<style></style>
