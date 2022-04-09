const express = require("express");
const app = express();
const path = require("path");
// const ffmpegPath = require("ffmpeg-static");
// Stream = require("node-rtsp-stream");

const PORT = 3000;

//console.log(process.cwd());
const contractRouter = require(path.resolve(
  __dirname,
  "../src/express/routes/contract.js"
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes Handler
app.use("/contract", contractRouter);

app.get("/", function (req, res) {
  res.send("Server is ready!");
});

// Local error handler
app.use((req, res) => res.status(404).send("You are in the wrong place! 😡"));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = app;
