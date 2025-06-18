<!--MatchItem-->

<script>
export default {
  name: "MatchItem",
  props: {
    match: {
      type: Object,
      required: true,
    }
  },
  computed: {
    resultLabel() {
      return this.match.win ? "WIN" : "LOSS";
    },
    formattedDuration() {
      const total = this.match.gameDuration;   // zamiast match.duration
      const minutes = Math.floor(total / 60);
      const seconds = total % 60;
      const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${secStr}`;
    }
  }
}
</script>

<template>
  <div class="matchItem">
    <span>{{ resultLabel }} &nbsp</span>
    <span>Czas gry: {{ formattedDuration }} &nbsp</span>
    <span>Nazwa bohatera: {{ match.championName }} &nbsp</span>
    <span>Aleja: {{ match.lane }} &nbsp</span>
    <span>KDA: {{ match.kills }}/{{ match.deaths }}/{{ match.assists }}</span>
  </div>

</template>