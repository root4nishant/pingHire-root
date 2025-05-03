const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  userId: String,
  name: String,
  careerPageUrl: String,
});

module.exports = mongoose.model("Company", CompanySchema);
