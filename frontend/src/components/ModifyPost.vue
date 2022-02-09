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
          <button type="submit" class="btn btn-primary">
            Modifier le post
          </button>
        </div> 
      </form>
    </div>
</template>

<script>
export default {
name: "ModifyPost",

}
</script>

<style>

</style>