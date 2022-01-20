<template>
  <div>
    <article class="post-article">
      <div class="header">
        <span
          >Posté le {{ dateFormat(post.createdAt) }} par {{ post.author }}</span
        >
      </div>
      <h2>{{ post.title }}</h2>
      <div class="post-content">{{ post.post }}</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "GetOnePost",
  data() {
    return {
      post: [],
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
  },
  created() {
    const postId = this.$route.params.id;
    this.axios
      .get(`http://localhost:3000/api/post/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$token}`,
        },
      })
      .then((post) => {
        this.post = post.data.data;
        console.log(post.data.data);
      });
  },
};
</script>

<style>
.post-article {
  border: #fcd4d3 solid 2px;
  max-width: 600px;
  margin: 2% auto;
  border-radius: 25px;
}

.post-article .header {
  border-bottom: #fcd4d3 solid 2px;
}
h2 {
  border-bottom: #fcd4d3 solid 2px;
}
</style>
