<!--MatchItem-->

<script>
import {getMatchDetails} from "../services/riotApi.js";

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
  },
  methods: {
    async fetchDetails() {
      this.loading = true;
      try {
        this.details = await getMatchDetails(this.puuid, this.match.matchId)
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false;
      }
    },
    select() {
      this.open = !this.open;
      if (this.open && !this.details) {
        this.fetchDetails();
      }
    },
    itemList(participant) {
      return [
        participant.item0,
        participant.item1,
        participant.item2,
        participant.item3,
        participant.item4,
        participant.item5,
        participant.item6
      ].filter(id => id && id !== 0);
    }
  },
  data() {
    return {
      open: false,
      details: null,
      loading: false,
      error: null
    }
  }
}
</script>

<template>
  <div class="match-item" @click="select">
    <span :class="['result', match.win ? 'win' : 'loss']">{{ resultLabel }} &nbsp</span>
    <span>Czas gry: {{ formattedDuration }} &nbsp</span>
    <span><img
        class="champion-icon"
        :src="`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/champion/${match.championName}.png`"
        :alt="match.championName"
    /></span>
    <span>Aleja: {{ match.lane || match.teamPosition }} &nbsp</span>
    <span>KDA: {{ match.kills }}/{{ match.deaths }}/{{ match.assists }}</span>

    <div v-if="open" class="match-expansion">
      <div v-if="loading">Ładowanie…</div>
      <div v-else-if="error">Błąd: {{ error }}</div>
      <div v-else>
        <div class="teams">
          <div class="team winners">
            <h4>Wygrana drużyna</h4>
            <div v-for="p in details.info.participants.filter(x => x.win)" :key="p.puuid" class="participant-card">
              <h5>{{ p.summonerName }} ({{ p.teamPosition || p.lane }})</h5>
              <img
                  class="champion-icon"
                  :src="`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/champion/${p.championName}.png`"
                  :alt="p.championName"
              />
              <p>Champion: {{ p.championName }}</p>
              <p>K/D/A: {{ p.kills }}/{{ p.deaths }}/{{ p.assists }}</p>
              <p>Gold: {{ p.goldEarned }}, CS: {{ p.totalMinionsKilled + p.neutralMinionsKilled }}</p>

              <div class="items">
                <img
                    v-for="id in itemList(p)"
                    :key="id"
                    :src="`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/item/${id}.png`"
                    class="item-icon"
                    alt="Item"
                />
              </div>
            </div>
          </div>
          <div class="team losers">
            <h4>Przegrana drużyna</h4>
            <div v-for="p in details.info.participants.filter(x => !x.win)" :key="p.puuid" class="participant-card">
              <h5>{{ p.summonerName }} ({{ p.teamPosition || p.lane }})</h5>
              <img
                  class="champion-icon"
                  :src="`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/champion/${p.championName}.png`"
                  :alt="p.championName"
              />
              <p>Champion: {{ p.championName }}</p>
              <p>K/D/A: {{ p.kills }}/{{ p.deaths }}/{{ p.assists }}</p>
              <p>Gold: {{ p.goldEarned }}, CS: {{ p.totalMinionsKilled + p.neutralMinionsKilled }}</p>

              <!-- lista itemów -->
              <div class="items">
                <img
                    v-for="id in itemList(p)"
                    :key="id"
                    :src="`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/item/${id}.png`"
                    class="item-icon"
                    alt="Item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.match-item {
  background: var(--color-card);
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing);
  padding: var(--spacing);
  margin-bottom: var(--spacing);
  align-items: center;
  cursor: pointer;
}

.result {
  font-weight: bold;
  color: var(--color-win);
}

.loss {
  color: var(--color-loss);
}

.match-expansion {
  margin-top: var(--spacing);
  padding: var(--spacing);
  background: var(--color-bg);
  border-radius: 0.5rem;
}

.participant-card {
  flex: 1 1 calc(50% - var(--spacing));
  background: var(--color-card);
  padding: var(--spacing);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.participant-card h5 {
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.items {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.item-icon {
  width: 32px;
  height: 32px;
}

.champion-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.teams {
  display: flex;
  gap: var(--spacing);
}

.team {
  flex: 1;
}

.team.winners {
  border: 2px solid var(--color-win);
  padding: var(--spacing);
  border-radius: 0.5rem;
}

.team.losers {
  border: 2px solid var(--color-loss);
  padding: var(--spacing);
  border-radius: 0.5rem;
}

.team h4 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
}
</style>