const express = require("express");
// const ffmpegPath = require("ffmpeg-static");
// Stream = require("node-rtsp-stream");
const dbController = require("../src/express/controllers/dbController.js");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let server = app.listen(3000);

app.get("/", function (req, res) {
  res.send("Server is ready!");
});

app.use("/", dbController.addContract, function (req, res) {
  res.send("Added!");
});
