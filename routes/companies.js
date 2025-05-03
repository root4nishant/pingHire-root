const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Add company
router.post("/", async (req, res) => {
  try {
    const { userId, name, careerPageUrl } = req.body;
    const company = new Company({ userId, name, careerPageUrl });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (optional) Get companies for a user
router.get("/:userId", async (req, res) => {
  const companies = await Company.find({ userId: req.params.userId });
  res.json(companies);
});

module.exports = router;
