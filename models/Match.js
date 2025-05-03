const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  userId: String,
  companyName: String,
  jobTitle: String,
  location: String,
  jobLink: String,
  matchedKeyword: String,
  dateFound: Date,
});

module.exports = mongoose.model("Match", MatchSchema);
