const express = require('express');
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');

const router = express.Router();

// adding a new user ROUTE HANDLER
router.post('/', userController.addUser, dbController.saveUser, (req, res) => {
  //return res.status(200).json(res.locals.result);
  return res.status(200).json('Successfully signed up');
});

module.exports = router;
