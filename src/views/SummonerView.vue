<template>
  <div>
    <h1>Profil: {{ gameName }}#{{ tagLine }}</h1>

    <!-- stan ładowania -->
    <p v-if="loading">Ładowanie danych…</p>

    <p>{{ puuid }}</p>

    <!-- błąd -->
    <p v-if="error">{{ error }}</p>

    <!-- gdy mamy mecze -->
    <div v-if="!loading && !error">
      <!-- tu później komponenty MatchList i StatsSummary -->
      <div v-for="match in matches" :key="match.id">
        {{ match }} <!-- na początek wypisz surowe dane -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPuuid,
  //getMatchHistory,
  //getMatchDetails
} from '../services/riotApi.js';

export default {
  name: 'SummonerView',
  data() {
    return {
      gameName: this.$route.params.gameName,
      tagLine:  this.$route.params.tagLine,
      puuid:    null,
      matches:  [],
      loading:  false,
      error:    null
    };
  },
  async created() {
    this.loading = true;
    try {
      // 1. pobierz puuid
      const summoner = await getPuuid(this.gameName, this.tagLine);
      this.puuid = summoner.puuid; // sprawdź klucz w konsoli

    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }
};
</script>
