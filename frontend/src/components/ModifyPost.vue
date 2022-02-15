<template>
  <div id="modify-post" v-if="modify">
    <form @submit.prevent="modifyPost()">
      <div class="form-group">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div class="modify-image" v-if="imageDisplay">
          <img
            :src="post.imgUrl"
            style="width: 150px"
            v-if="post.imgUrl !== ''"
          />
          <img
            src="../assets/images/trash.svg"
            alt="Logo d'une poubelle"
            class="trash-logo"
            title="Supprimer l'image"
            @click="(file = ''), (imageDisplay = false), (error = false)"
            v-if="post.imgUrl !== ''"
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
            v-model="modifyMessage"
            @click="error = false"
          ></textarea>
          <img
            src="../assets/images/eraser-solid.svg"
            alt="Logo d'une gomme"
            @click="modifyMessage = ''"
            title="Effacer le texte"
          />
        </div>
        <button type="submit" class="btn btn-primary">Modifier le post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
