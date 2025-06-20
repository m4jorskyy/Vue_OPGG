//riotApi.js

const riotApiKey = import.meta.env.VITE_RIOT_API_KEY;
const region = "europe";

export async function getPuuid(gameName, tagLine) {
    const urlRequest = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;

    const response = await fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': riotApiKey
        }
    });

    if (!response.ok) {
        throw new Error(`Riot API error: ${response.statusText}`);
    }

    return await response.json();
}

export async function getMatchIds(gameName, tagLine, start = 0, count = 50) {
    const {puuid} = await getPuuid(gameName, tagLine);
    const urlRequest = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;
    const response = await fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': riotApiKey
        }
    });

    if (!response.ok) {
        throw new Error(`Riot API error: ${response.statusText}`);
    }

    return await response.json();
}

export async function getMatchDetails(puuid, matchId) {
    const urlRequest = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;

    const response = await fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': riotApiKey
        }
    });

    if (!response.ok) {
        throw new Error(`Riot API error: ${response.statusText}`);
    }

    return await response.json();
}

export async function extractMatchStats(rawMatch, puuid) {
    const matchId = rawMatch.metadata.matchId;
    const gameDuration = rawMatch.info.gameDuration;
    const participant = rawMatch.info.participants.find(p => p.puuid === puuid);
    const {kills, deaths, assists, championName, lane, win, teamPosition} = participant;

    return {matchId, gameDuration, kills, deaths, assists, championName, lane, win, teamPosition}
}