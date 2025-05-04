const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { userId, email, name } = req.body;
  try {
    // Optional: check if already exists
    // const existing = await User.findOne({ userId });
    // if (existing) return res.status(200).json(existing);

    const newUser = { userId, email, name };
    // await User.create(newUser); // optional
    console.log("Synced user:", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
