const Keyword = require("../models/Keyword");

exports.addKeywords = async (req, res) => {
  try {
    const { userId, words } = req.body;

    let keywordDoc = await Keyword.findOne({ userId });
    if (keywordDoc) {
      keywordDoc.words = [...new Set([...keywordDoc.words, ...words])];
      await keywordDoc.save();
    } else {
      keywordDoc = new Keyword({ userId, words });
      await keywordDoc.save();
    }

    res.status(201).json(keywordDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKeywordsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const keywords = await Keyword.findOne({ userId });
    res.json(keywords || { userId, words: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
