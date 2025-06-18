<!--SummonerView-->
<script>
import {
  getPuuid,
  getMatchIds,
  getMatchDetails,
  extractMatchStats
} from '../services/riotApi.js';
import MatchList from "../components/MatchList.vue";
import StatsSummary from "../components/StatsSummary.vue";

export default {
  name: 'SummonerView',
  components: {StatsSummary, MatchList},
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

<template>
  <div class="container">
    <h1>Profil: {{ gameName }}#{{ tagLine }}</h1>

    <p v-if="loading">Ładowanie danych…</p>

    <p v-if="error">{{ error }}</p>

    <div v-if="!loading && !error">
      <MatchList :matches="matches"/>
      <StatsSummary :matches="matches" />
    </div>
  </div>
</template>