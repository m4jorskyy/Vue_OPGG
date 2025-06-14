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
  <form @submit.prevent="onSubmit">
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
</template>