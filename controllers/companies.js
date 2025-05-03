const Company = require("../models/Company");

exports.addCompany = async (req, res) => {
  try {
    const { userId, name, careerPageUrl } = req.body;
    const company = new Company({ userId, name, careerPageUrl });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompaniesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const companies = await Company.find({ userId });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
