//index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SummonerView from '../views/SummonerView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/summoner/:gameName/:tagLine', name: 'summoner', component: SummonerView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router