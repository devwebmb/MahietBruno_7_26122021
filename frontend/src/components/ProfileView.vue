<template>
  <div class="profile">
    <div class="user">
      <span>Pseudo : {{ this.$user.data.pseudo }}</span>
      <span>Email : {{ this.$user.data.email }}</span>
    </div>
    <button class="delete-profile" @click="deleteUser()">
      Supprimer le compte
    </button>
    <h2>Mes messages</h2>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  methods: {
    deleteUser() {
      const userId = this.$user.data.id;
      this.axios
        .delete("http://localhost:3000/api/user/" + `${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$token}`,
          },
        })
        .then(() => {
          this.axios
            .get(`http://localhost:3000/api/post`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.$token}`,
              },
            })
            .then((posts) => {
              const allPosts = posts.data.data;
              const postsToDelete = allPosts.filter(function (el) {
                return el.posterId === userId;
              });
              for (let i = 0; i <= postsToDelete.length; i++) {
                this.axios
                  .delete(
                    `http://localhost:3000/api/post/${postsToDelete[i].id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$token}`,
                      },
                    }
                  )
                  .then(() => {});
              }
            });
          this.axios
            .get(`http://localhost:3000/api/comment`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.$token}`,
              },
            })
            .then((comments) => {
              const allComments = comments.data.data;
              const commentsToDelete = allComments.filter(function (el) {
                return el.commenterId === userId;
              });
              for (let i = 0; i <= commentsToDelete.length; i++) {
                this.axios
                  .delete(
                    `http://localhost:3000/api/comment/${commentsToDelete[i].id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$token}`,
                      },
                    }
                  )
                  .then(() => {});
              }
            });
          localStorage.removeItem("user");
          alert("Votre compte a bien été supprimé");
          this.$router.replace("/");
        });
    },
  },
};
</script>

<style></style>
