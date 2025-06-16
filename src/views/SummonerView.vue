<template>
  <div>
    <h1>Profil: {{ gameName }}#{{ tagLine }}</h1>

    <p v-if="loading">Ładowanie danych…</p>

    <p v-if="error">{{ error }}</p>

    <div v-if="!loading && !error">
      <div v-for="match in matches" :key="match.matchId">
        <span>{{ match.win ? 'WIN' : 'LOSS'}} &nbsp</span>
        <span>Czas gry: {{ Math.floor(match.gameDuration / 60) }}:{{(match.gameDuration % 60) > 10 ? (match.gameDuration % 60) : "0" + (match.gameDuration % 60) }} &nbsp</span>
        <span>Nazwa bohatera: {{ match.championName }} &nbsp</span>
        <span>Aleja: {{ match.lane }} &nbsp</span>
        <span>KDA: {{ match.kills }}/{{ match.deaths }}/{{match.assists}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPuuid,
  getMatchIds,
  getMatchDetails,
    extractMatchStats
} from '../services/riotApi.js';

export default {
  name: 'SummonerView',
  data() {
    return {
      gameName: this.$route.params.gameName,
      tagLine: this.$route.params.tagLine,
      puuid: null,
      matches: [],
      loading: false,
      error: null
    };
  },
  async created() {
    this.loading = true;
    try {
      const summoner = await getPuuid(this.gameName, this.tagLine);
      this.puuid = summoner.puuid;

      const matchIds = await getMatchIds(this.gameName, this.tagLine);

      let statsList = [];

      for (const matchId of matchIds) {
        const raw = await getMatchDetails(this.puuid, matchId);
        const stats = await extractMatchStats(raw, this.puuid);
        statsList.push(stats)
      }

      this.matches = statsList;

    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }
};
</script>
