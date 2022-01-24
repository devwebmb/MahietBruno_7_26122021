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
          localStorage.removeItem("user");
          this.$router.replace("/");
        });
    },
  },
};
</script>

<style></style>
