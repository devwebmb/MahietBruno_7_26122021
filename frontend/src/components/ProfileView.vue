<template>
  <div id="profile-view">
    <div class="user">
      <span><strong>Pseudo : </strong>{{ pseudo }}</span>
      <br />
      <span><strong>Email : </strong>{{ email }}</span>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="deleteUser()"
      v-if="isAdmin === 'false'"
    >
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
      isAdmin: localStorage.getItem("isAdmin"),
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
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("pseudo");
          localStorage.removeItem("email");
          localStorage.removeItem("isAdmin");
          localStorage.removeItem("id");
          this.$router.replace("/");
        });
    },
  },
};
</script>

<style></style>
