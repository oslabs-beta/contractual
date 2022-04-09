const express = require("express");
const dbController = require("../controllers/dbController");
const cors = require("cors");

const router = express.Router();
// // Get one with param
router.get("/:token", dbController.getContent, (req, res) => {
  return res.status(200).json(res.locals.content);
});

// Create Contract Route
router.post("/", dbController.addContract, (req, res) => {
  return res.status(200).json("Added!");
});

module.exports = router;
