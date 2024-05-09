const express = require("express");

const config = require("./pkg/config");
const { getCharacterById, getEpisodeById, getLocationById } = require("./handlers/rickmorty");

const api = express();

api.get("/api/v1/rickmorty/character/:id", getCharacterById);
api.get("/api/v1/rickmorty/location/:id", getLocationById);
api.get("/api/v1/rickmorty/episode/:id", getEpisodeById);

api.listen(config.getSection("RickAndMortyAPI").port, (err) => {
    err 
        ? console.log(err)
        : console.log(
            `Server started on port ${config.getSection("RickAndMortyAPI").port}`
        )
});