<template>
  <div class="card border-primary mb-3" style="max-width: 35rem">
    <div class="card-header">
      <span>Posté le {{ createdAt }} par {{ author }}</span>
      <br />
      <span v-if="createdAt !== updatedAt">Modifié le {{ updatedAt }}</span>
      <br />
      <span v-if="commentsCount > 1"
        ><strong>{{ commentsCount }} commentaires</strong></span
      >
      <span v-if="commentsCount <= 1"
        ><strong>{{ commentsCount }} commentaire</strong></span
      >
    </div>
    <div class="card-body">
      <div v-if="downDisplay">
        <router-link :to="{ name: 'OnePost', params: { id: id } }">
          <h4 class="card-title">{{ title }}</h4>
          <img :src="imgUrl" class="post-image" />
          <p class="card-text" id="card-all-posts">
            {{ post }}
          </p>
        </router-link>
        <div>
          <img
            src="../assets/images/arrow-down-solid.svg"
            alt="Image d'une flêche vers le bas"
            title="Afficher la suite du texte."
            class="arrow-hover"
            @click="(upDisplay = true), (downDisplay = false)"
          />
        </div>
      </div>
      <div v-if="upDisplay">
        <router-link :to="{ name: 'OnePost', params: { id: id } }">
          <h4 class="card-title">{{ title }}</h4>
          <img :src="imgUrl" style="width: 300px" />
          <p class="card-text">
            {{ post }}
          </p>
        </router-link>
        <div>
          <img
            src="../assets/images/arrow-up-solid.svg"
            alt="Image d'une flêche vers le bas"
            title="Cacher le texte."
            class="arrow-hover"
            @click="(upDisplay = false), (downDisplay = true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterId: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    commentsCount: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      downDisplay: true,
      upDisplay: false,
    };
  },
};
</script>

<style></style>
