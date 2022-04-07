// (
//   function() {
//       "use strict";
//       let express = require('express');
//       let app = express();
//       app.get('/', function(req, res) {
//          res.send("Hello world! Contractual is here!");
//       });
//       let server = app.listen(3000, function () {
//           console.log('Express server listening on port ' + server.address().port);
//       });
//       module.exports = app;
//   }()
// );

const express = require("express");
// const ffmpegPath = require("ffmpeg-static");
// Stream = require("node-rtsp-stream");

let app = express();

let server = app.listen(3000);

app.get("/", function (req, res) {
  res.send("Server is ready!");
});
