const express2 = require("express");
const app2 = express2();
const path2 = require("path");

const PORT2 = process.env.PORT || 1234; // setting the port

// const socketIO = require("socket.io");
// const http = require("http");
// const PORT2 = process.env.PORT || 1234; // setting the port
// let server = http.createServer(app2);
// let io = socketIO(server);

// // make connection with user from server side
// io.on("connection", (socket) => {
//   console.log("New user connected");
//   //emit message from server to user
//   socket.emit("newMessage", {
//     from: "jen@mds",
//     text: "hepppp",
//     createdAt: 123,
//   });

//   // listen for message from user
//   socket.on("createMessage", (newMessage) => {
//     console.log("newMessage", newMessage);
//   });

//   // when server disconnects from user
//   socket.on("disconnect", () => {
//     console.log("disconnected from user");
//   });
// });

// server.listen(PORT2, () =>
//   console.log(`Testing server listening on port ${PORT2}`)
// );



// Unknown route handler
app2.use((req, res) => res.status(404).send('You are in the wrong place! 😡'));

// Global error handler
app2.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app2.listen(PORT2, () => console.log(`Testing server listening on port ${PORT2}`));

module.exports = app2;
