<!--StatsByChampion-->
<script>
export default {
  name: "StatsByChampion",
  props: {
    matches: {
      type: Array,
      required: true
    }
  },
  computed: {
    statsByChampion() {
      let statsByChampion = {}
      statsByChampion = this.matches.reduce((acc, match) => {
        if (!acc[match.championName]) {
          acc[match.championName] = {
            count: 0,
            kills: 0,
            deaths: 0,
            assists: 0
          };
        }
        acc[match.championName].count += 1;
        acc[match.championName].kills += match.kills;
        acc[match.championName].deaths += match.deaths;
        acc[match.championName].assists += match.assists;

        return acc;
      }, {});

      return Object.entries(statsByChampion)
          .map(([name, stats]) => ({
            name,
            count: stats.count,
            avgKDA: (stats.kills + stats.assists) / stats.deaths
          })).sort((a, b) => b.count - a.count).slice(0, 5);
    }
  }
}
</script>

<template>
  <div class="most-played">
    <h3>Najczęściej grane postacie</h3>
    <ul>
      <li v-for="champ in statsByChampion" :key="champ.name">
        {{ champ.name }} - {{ champ.count }}, KDA: {{ champ.avgKDA.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.most-played {
  background: var(--color-card);
  padding: var(--spacing);
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: var(--spacing);
}

.most-played h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.most-played ul {
  list-style: none;
}

.most-played li {
  margin-bottom: 0.25rem;
}
</style>
