<!--MatchList-->

<script>
import MatchItem from "./MatchItem.vue";

export default {
  name: "MatchList",
  components: {
    MatchItem
  },
  props: {
    matches: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <h2 v-if="matches.length === 0">
    Brak ostatnich meczów
  </h2>

  <h2 v-else>
    Ostatnie mecze
  </h2>
  <MatchItem
  v-for="match in matches"
  :key="match.matchId"
  :match="match" />
</template>