<template>
  <SearchBar @search="goToSummoner" />
</template>
<script>
import SearchBar from '../components/SearchBar.vue';
export default {
  name: "HomeView",
  components: {
    SearchBar
  },
  methods: {
    goToSummoner({gameName, tagLine}) {
      this.$router.push({ name: "summoner", params: { gameName, tagLine } });
    }
  }
}
</script>
