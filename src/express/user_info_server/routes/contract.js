const express = require('express');
const dbController = require('../controllers/dbController');
const cors = require('cors');

const router = express.Router();

// // Get content with token Route
router.post('/details', dbController.getContent, (req, res) => {
  return res.status(200).json(res.locals.content);
});

router.patch('/', dbController.updateContent, (req, res) => {
  return res.status(200).json("success");
});

// Create Contract Route
router.post('/add', dbController.addContract, (req, res) => {
  return res.status(200).json(res.locals.token);
});

module.exports = router;
