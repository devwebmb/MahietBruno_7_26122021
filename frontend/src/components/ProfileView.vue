<template>
  <div class="profile">
    <div class="user">
      <span>Pseudo : {{ pseudo }}</span>
      <span>Email : {{ email }}</span>
    </div>
    <button class="delete-profile" @click="deleteUser()">
      Supprimer le compte
    </button>
    <h2>Mes messages</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pseudo: localStorage.getItem("pseudo"),
      email: localStorage.getItem("email"),
      userId: localStorage.getItem("id"),
    };
  },
  name: "ProfileView",
  methods: {
    deleteUser() {
      this.axios
        .delete(`http://localhost:3000/api/user/${this.userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.axios
            .delete(`http://localhost:3000/api/post/user/${this.userId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + localStorage.getItem("token"),
              },
            })
            .then(() => {
              this.axios.delete(
                `http://localhost:3000/api/comment/user/${this.userId}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ` + localStorage.getItem("token"),
                  },
                }
              );
            })
            .then(() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              localStorage.removeItem("pseudo");
              localStorage.removeItem("email");
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("id");

              this.$router.replace("/");
            });
        });
    },
  },
};
</script>

<style></style>
