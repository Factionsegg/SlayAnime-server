const express = require('express')
const {
    addAnime,
    addAnimeEpisode
} = require('../controllers/animeController')

const router = express.Router()

router.post('/addAnime',addAnime)
router.post('/addAnimeEpisode',addAnimeEpisode)

module.exports = router;