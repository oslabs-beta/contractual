const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
// Routes Import
const contractRouter = require(path.resolve(
  __dirname,
  "../src/express/user_info_server/routes/contract.js"
));

const signupRouter = require(path.resolve(
  __dirname,
  "../src/express/user_info_server/routes/signup.js"
));

const loginRouter = require(path.resolve(
  __dirname,
  "../src/express/user_info_server/routes/login.js"
));

const PORT = 4321;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes Handler

app.get("/", function (req, res) {
  res.send("User Server is ready!");
});

app.use("/contract", contractRouter);
app.use("/register", signupRouter);
app.use("/login", loginRouter);

// Unknown route handler
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

app.listen(PORT, () => console.log(`User server listening on port ${PORT}`));

module.exports = app;
