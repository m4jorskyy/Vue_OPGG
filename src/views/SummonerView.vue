<!--SummonerView-->
<script>
import {extractMatchStats, getMatchDetails, getMatchIds, getPuuid} from '../services/riotApi.js';
import MatchList from "../components/MatchList.vue";
import StatsSummary from "../components/StatsSummary.vue";
import db from '../db/matchCache.js';
import StatsByChampion from "../components/StatsByChampion.vue";

export default {
  name: 'SummonerView',
  components: {StatsByChampion, MostPlayed: StatsByChampion, StatsSummary, MatchList},
  data() {
    return {
      gameName: this.$route.params.gameName,
      tagLine: this.$route.params.tagLine,
      puuid: null,
      matches: [],
      loading: false,
      error: '',
      allMatches: [],
      visibleMatches: [],
      nextIndex: 0,
      pageSize: 5,
      selectedMatch: null,
      selectedLoading: false
    };
  },
  async created() {
    this.loading = true;
    try {
      const cacheKey = `${this.gameName}#${this.tagLine}`;
      const cached = await db.matches.get(cacheKey);

      if (cached) {
        this.allMatches = cached.data;
        this.visibleMatches = this.allMatches.slice(0, this.pageSize);
        this.nextIndex = this.pageSize;
        return;
      }

      const summoner = await getPuuid(this.gameName, this.tagLine);
      this.puuid = summoner.puuid;

      const matchIds = await getMatchIds(this.gameName, this.tagLine);
      let statsList = [];

      for (const matchId of matchIds) {
        const raw = await getMatchDetails(this.puuid, matchId);
        const stats = await extractMatchStats(raw, this.puuid);
        statsList.push(stats);
      }

      this.allMatches = statsList;
      this.visibleMatches = this.allMatches.slice(0, this.pageSize);
      this.nextIndex = this.pageSize;

      const safeMatches = JSON.parse(JSON.stringify(this.allMatches));
      await db.matches.put({
        id: cacheKey,
        data: safeMatches
      });

    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    showMore() {
      const end = this.nextIndex + this.pageSize;
      this.visibleMatches = this.allMatches.slice(0, end);
      this.nextIndex = end;
    },
    async onSelectMatch(matchId) {
      this.selectedLoading = true;
      try {
        this.selectedMatch = await getMatchDetails(this.puuid, matchId);
        this.selectedLoading = false;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.selectedLoading = false;
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <h1>Profil: {{ gameName }}#{{ tagLine }}</h1>

    <p v-if="loading">Ładowanie danych…</p>

    <p v-if="error">{{ error }}</p>

    <div v-if="!loading && !error" class="main-layout">
      <div class="main-column">
        <MatchList :matches="visibleMatches" @select="onSelectMatch"/>
        <div v-if="selectedLoading">Ładowanie szczegółów meczu…</div>
        <div v-else-if="selectedMatch">
          <pre>{{ selectedMatch }}</pre>
        </div>
        <button class="load-more-btn" @click="showMore" :disabled="nextIndex >= allMatches.length">
          Załaduj więcej
        </button>
      </div>
      <div class="sidebar">
        <StatsSummary :matches="allMatches" />
        <StatsByChampion :matches="allMatches" />
      </div>
    </div>

  </div>
</template>

<style scoped>
.load-more-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.load-more-btn:hover {
  background-color: #4338ca;
}

.load-more-btn:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

</style>