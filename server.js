const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errHandler = require("./middlewares/error");
const fs = require("fs");

dotenv.config({ path: "./config/config.env" });

// Route files
const animes = require("./routes/animes");

// Load ENV vars

const app = express();

// Body parser
app.use(express.json());

// DEV logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers

app.use("/api/v1/", animes);
app.use("/video", express.static(__dirname + "/uploads"));

// app.get("/video", function (req, res) {
//   const range = req.headers.range;
//   if (!range) {
//     res.status(400).send("Requires Range header");
//   } else {
//     const videoPath = "test.mp4";
//     const videoSize = fs.statSync(videoPath).size;
//     const CHUNK_SIZE = 10 ** 6;
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
//     const contentLength = end - start + 1;
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(206, headers);
//     const videoStream = fs.createReadStream(videoPath, { start, end });
//     videoStream.pipe(res);
//   }
// });

app.use(errHandler);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections (Close server)
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
