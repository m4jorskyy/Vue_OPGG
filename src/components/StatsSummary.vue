<script>
export default {
  name: "StatsSummary",
  props: {
    matches: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalGames() {
      return this.matches.length;
    },
    wins() {
      if (!this.totalGames) return '—';
      let counter = 0;
      for(let i = 0; i < this.totalGames; i++){
        if(this.matches[i].win) {
          counter++;
        }
      }
      return counter;
    },
    winRate(){
      if (!this.totalGames) return '—';
      return ((this.wins / this.totalGames) * 100).toFixed(0).toString() + "%";
    },
    avgKDA() {
      if (!this.totalGames) return '—';
      let kills = 0;
      let deaths = 0;
      let assists = 0;
      for(let i = 0; i < this.totalGames; i++){
        kills += this.matches[i].kills
        deaths += this.matches[i].deaths
        assists += this.matches[i].assists
      }
      return ((kills + assists) / deaths).toFixed(2);
    }
  }
}
</script>

<template>
  <div class="stats-summary">
    <h2>
      Podsumowanie
    </h2>
    <p>
      WR: {{ winRate }}
    </p>
    <p>
      KDA: {{ avgKDA }}
    </p>

  </div>
</template>

<style scoped>
.stats-summary {
  background: var(--color-card);
  padding: var(--spacing);
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: var(--spacing);
}
.stats-summary h2 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}
.stats-summary p {
  margin-bottom: 0.25rem;
}

</style>