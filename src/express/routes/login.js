const express = require('express');
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');

const router = express.Router();

// user login ROUTE HANDLER
router.post(
  '/',
  userController.checkUser,
  dbController.checkUser,
  (req, res) => {
    // frontend receives and store userId in redux
    return res.status(200).json(`Hello, ${res.locals.name}!`);
  }
);
module.exports = router;
