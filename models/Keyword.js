const mongoose = require("mongoose");

const KeywordSchema = new mongoose.Schema({
  userId: String,
  words: [String],
});

module.exports = mongoose.model("Keyword", KeywordSchema);
