const express = require("express");
const router = express.Router();
const keywordController = require("../controllers/keywords");

// Add keywords (array of strings)
router.post("/", keywordController.addKeywords);

// Get keywords by user ID
router.get("/:userId", keywordController.getKeywordsByUser);

module.exports = router;
