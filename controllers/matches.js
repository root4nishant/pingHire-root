const Match = require("../models/Match");

exports.getMatchesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const matches = await Match.find({ userId }).sort({ dateFound: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
