const express2 = require("express");
const req = require("express/lib/request");
const app2 = express2();
// const path2 = require("path");

// const PORT2 = process.env.PORT || 1234; // setting the port

const webSocketsServerPort = process.env.PORT || 1234;
const webSocketServer = require("websocket").server;
// const http = require("http");
// // Spinning the http server and the websocket server.
// const server = http.createServer();
const server = app2.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

app2.get("/", function (req, res) {
  wsServer.send("connected!!!");
  res.send("Server testing is ready!");
});

// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on("request", function (request) {
  var userID = getUniqueID();
  console.log(request);
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );
});

// // Unknown route handler
// app2.use((req, res) => res.status(404).send('You are in the wrong place! 😡'));

// // Global error handler
// app2.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign(defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).send(errorObj.message);
// });

// app2.listen(PORT2, () => console.log(`Testing server listening on port ${PORT2}`));

// module.exports = app2;
