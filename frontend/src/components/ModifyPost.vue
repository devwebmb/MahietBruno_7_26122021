<template>
  <div id="modify-post">
    <form @submit.prevent="modifyPost()">
      <div class="form-group">
        <label class="form-label mt-4">Modifier votre post :</label>
        <textarea
          class="form-control"
          rows="3"
          style="max-width: 35rem"
          v-model="modifyMessage"
        ></textarea>
        <button type="submit" class="btn btn-primary">Modifier le post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ModifyPost",
  data() {
    return {
      modifyMessage: "",
      postId: this.$route.params.id,
    };
  },
  methods: {
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
          this.modifyMessage = "";
          this.modify = false;
          // this.getOnePost();
        });
    },
  },
};
</script>

<style></style>
