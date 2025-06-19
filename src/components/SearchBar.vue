<!--SearchBar.vue-->

<script>
export default {
  name: "SearchBar",
  emits: ["search"],
  data() {
    return {
      gameName: '',
      tagLine: '',
      loading: false,
      error: false,
      puuid: ""
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      this.error = false;
      this.$emit("search", {
        gameName: this.gameName,
        tagLine: this.tagLine
      });
      this.gameName = "";
      this.tagLine = "";
    }
  }
};
</script>

<template>
  <div class="container">
    <form class="search-bar" @submit.prevent="onSubmit">
      <input v-model="gameName"
             type="text"
             placeholder="Podaj summoner name"
             required/>
      <br>
      <input v-model="tagLine"
             type="text"
             placeholder="Podaj tagline"
             required/>
      <br>
      <button type="submit">Szukaj</button>
    </form>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: var(--spacing);
  margin-bottom: var(--spacing);
}
.search-bar input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}
.search-bar button {
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

</style>