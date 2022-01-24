<template>
  <div>
    <form @submit.prevent="addPost()">
      <label>Titre :</label>
      <input
        type="text"
        placeholder="Veuilez entre le titre de votre message"
        v-model="title"
      />
      <label>Message :</label>
      <textarea cols="30" rows="10" v-model="message"></textarea>
      <input type="submit" value="Publier le message" />
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
    };
  },
  methods: {
    addPost() {
      this.axios
        .post(
          "http://localhost:3000/api/post",
          {
            title: this.title,
            post: this.message,
            author: this.$user.data.pseudo,
            posterId: this.$user.data.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$token}`,
            },
          }
        )
        .then((message) => {
          alert("Votre message a été publié.");
          console.log(message);
          this.$router.replace("/post");
        });
    },
  },
};
</script>

<style></style>
