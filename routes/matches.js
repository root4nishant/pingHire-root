const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matches");

// Get all matched jobs for a user
router.get("/:userId", matchController.getMatchesByUser);

module.exports = router;
