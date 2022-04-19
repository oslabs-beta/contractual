const express = require('express');
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');

const router = express.Router();

// user login ROUTE HANDLER
router.post(
  '/',
  userController.checkUser,
  dbController.checkUser,
  dbController.getAccessList,
  (req, res) => {
    // frontend receives and store userId in redux
    return res.status(200).json(res.locals.loginData);
  }
);
module.exports = router;
