const express2 = require("express");
const app2 = express2();
const server = require("http").createServer(app2);
const WebSocket = require("ws");
// console.log(process.cwd());
const dbController = require(path.resolve(
  __dirname,
  "../src/express/testing_server/controllers/dbController.js"
));

app2.use(express.json());
app2.use(express.urlencoded({ extended: true }));

const wss = new WebSocket.Server({ server: server });

let currentContract = {};

// receive current contract from contractual frontend
app2.get("/contract/:token", dbController.getContent, (req, res) => {
  console.log("updated contract:", currentContract);
  return res.status(200).json({ success: true });
});

wss.on("connection", (ws) => {
  // Log when new client connect to this server
  console.log("********* New Client Connected");
  ws.send("Welcome New Client");
  // Trigger when server receives anything from a client
  ws.on("message", (message) => {
    console.log(`received: %s`, message);
    ws.send(`2. SERVER 1234 GOT YOUR MESSAGE: ${message}`);
  });
  app2.use("/", middleware1(check type),MW2(generate response),(req, res) => {
    console.log(req.path);
    console.log(req.method);
    currentContract = { haha: "haha" };
    console.log(currentContract);
    //send a websocket message here
    ws.send(
      JSON.stringify({
        endpoint: "/login",
        method: "POST",
        status: "success",
        time: "11:18:21 Feb 05",
        error: "",
      })
    );
    res.status(200).send("AYOOOOOOOOOOOO!!!!!");
    // throw new Error();
  });
});

// app2.use('/', (req, res) => {
//   //send a websocket message here
//   console.log('HIT!!!!!!!!');
//   ws.send('sent from middleware!!!!!!!!!!!!!!!!!!!!!!');
//   res.status(200).send('AYOOOOOOOOOOOO!!!!!');
//   // throw new Error();
// });
server.listen(1234, () => console.log(`LISTENING ON PORT 1234`));

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

module.exports = app2;
