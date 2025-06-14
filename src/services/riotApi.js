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