const asyncHandler = require("../middlewares/async");
//const db = require('../config/database')

exports.addAnime = asyncHandler(async (req, res, next) => {
  const {
    name,
    length,
    description,
    genres,
    releaseDate,
    seasonRelease,
    wallpaper,
    episodeLength,
    rating,
    state,
    scraplink,
  } = req.body;
  const insert = `INSERT INTO animes(anime_name,length,description,genres,date_release,season_release,wallpaperlink,episode_length,rating,state,scraplink) VALUES ('${name}','${length}','${description}','${genres}','${releaseDate}','${seasonRelease}','${wallpaper}','${episodeLength}','${rating}','${state}','${scraplink}');`;
  db.query(insert, function (err, result, fields) {
    if (err) {
      res.status(500).json({ success: false, message: err });
      console.log("err :>> ", err);
    } else {
      res
        .status(200)
        .json({
          success: true,
          message: "Successfuly added",
          animeId: result.insertId,
        });
    }
  });
});

exports.addAnimeEpisode = asyncHandler(async (req, res, next) => {
  const { animeId, animeEpisode, animeName, episodeLink } = req.body;
  const insert = `INSERT INTO episodes(anime_id,anime_name,episode_number) VALUES('${animeId}','${animeName}','${animeEpisode}'); `;
  db.query(insert, function (err, result, fields) {
    if (err) {
      res.status(500).json({ success: false, message: err });
      console.log("err :>> ", err);
    } else {
      if (result.insertId) {
        const insertLink = `INSERT INTO links(episode_id,link) VALUES('${result.insertId}','${episodeLink}')`;
        db.query(insertLink, function (err, result, fields) {
          if (err) {
            res.status(500).json({ success: false, message: err });
            console.log("err2 :>> ", err);
          } else {
            res
              .status(200)
              .json({ success: true, message: "Succesfully added episode" });
          }
        });
      }
    }
  });
});
