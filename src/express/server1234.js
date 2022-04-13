const express2 = require('express');
const app2 = express2();
const path2 = require('path');

const PORT2 = 1234

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

app2.listen(PORT2, () => console.log(`App2 listening on port ${PORT2}`));

module.exports = app2;
