const {
    getCharacter,
    getLocation,
    getEpisode
} = require("../pkg/rickandmorty")

const getCharacterById = async (req, res) => {
    try {
        const characterId = req.params.id;
        const character = await getCharacter(characterId);
        res.send(character);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const getLocationById = async (req, res) => {
    try {
        const locationId = req.params.id;
        const location = await getLocation(locationId);
        res.send(location);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const getEpisodeById = async (req, res) => {
    try {
        const episodeId = req.params.id;
        const episode = await getEpisode(episodeId);
        res.send(episode);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    getCharacterById,
    getLocationById,
    getEpisodeById
};
