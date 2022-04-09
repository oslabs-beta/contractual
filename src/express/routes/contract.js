const express = require("express");
const dbController = require("../controllers/dbController");
const cors = require("cors");

const router = express.Router();


// Create Contract Route
router.post("/contract", dbController.addContract, (req, res) => {
  return res.status(200).json("Added!");
});

module.exports = router;
