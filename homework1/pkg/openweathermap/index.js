// Ovoj fajl vi e za biznis logikata servis

const config = require("../config");

const CACHE = {};


const getCityWeather = async(city) => {
    let now = new Date().getTime() / 1000; 

    console.log("CACHE", CACHE);

    if(
        CACHE[city] &&
        now < CACHE[city].timestamp + config.getSection("weather").cache_expiry
    ){
        console.log("Data is from the cache");
        return CACHE[city];
    }

    const URL = `${
        config.getSection("weather").API_URL
    }/weather?q=${city}&units=metric&appId=${
        config.getSection("weather").api_key
    }`;

    try{
        const res = await fetch(URL);
        const data = await res.json();

        CACHE[city] = {
            timestamp: new Date().getTime()/1000,
            data: data
        }
    }catch(err){
        throw err;
    }
    
 }

const getFiveDaysForecastForCity = async (lat, lon) => {
    const URL = `${
        config.getSection("weather").API_URL
    }/forecast?lat=${lat}&lon=${lon}&appId=${
        config.getSection("weather").api_key
    }`;

    try{
        const res = await fetch(URL);
        const data = await res.json();

        console.log("city", data.city);
    }catch(err){
        throw err;
    }
}

module.exports = {
    getCityWeather,
    getFiveDaysForecastForCity
}