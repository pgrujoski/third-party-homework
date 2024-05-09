const config = require("../config");

const CACHE = {};

const fetchDataFromAPI = async (url, cacheKey) => {
    let now = new Date().getTime() / 1000;

    console.log("Cache Key:", cacheKey)

    if (CACHE[cacheKey] && now < CACHE[cacheKey].timestamp + config.getSection("RickAndMortyAPI").cache_expiry) {
        console.log("Data is from the cache");
        return CACHE[cacheKey].data;
    }

    try {
        const res = await fetch(url);
        const data = await res.json();

        CACHE[cacheKey] = {
            timestamp: new Date().getTime() / 1000,
            data: data
        };

        return data;
    } catch (err) {
        throw err;
    }
};

const getCharacter = async (id) => {
    const URL = `${config.getSection("RickAndMortyAPI").API_URL}/character/${id}`;
    const cacheKey = `character_${id}`;

    return await fetchDataFromAPI(URL, cacheKey);
};

const getLocation = async (id) => {
    const URL = `${config.getSection("RickAndMortyAPI").API_URL}/location/${id}`;
    const cacheKey = `location_${id}`;

    return await fetchDataFromAPI(URL, cacheKey);
};

const getEpisode = async (id) => {
    const URL = `${config.getSection("RickAndMortyAPI").API_URL}/episode/${id}`;
    const cacheKey = `episode_${id}`;

    return await fetchDataFromAPI(URL, cacheKey);
};

module.exports = {
    getCharacter,
    getLocation,
    getEpisode
};
