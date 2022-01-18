<template>
  <div class="form-container">
    <ul>
      <li><a href="" class="active">S'inscrire</a></li>
      <li><a href="" class="active">Se connecter</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
ul {
  display: flex;
  justify-content: space-between;
  padding: 2% 10%;
  border: solid 2px #fc785d;
  border-radius: 25px 25px 0 0;
  margin-bottom: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 25px;
}
a:hover {
  color: black;
  background-color: #fd2d01;
  transition: 1s;
}
</style>
