const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("./models/Company");
const Keyword = require("./models/Keyword");
const Match = require("./models/Match");

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ Scraper connected to DB");
  runScraper();
});

async function runScraper() {
  const users = await Keyword.find();

  for (const user of users) {
    const { userId, words } = user;
    const companies = await Company.find({ userId });

    for (const company of companies) {
      try {
        const res = await axios.get(company.careerPageUrl);
        const $ = cheerio.load(res.data);
        const pageText = $("body").text();

        for (const keyword of words) {
          if (pageText.toLowerCase().includes(keyword.toLowerCase())) {
            const alreadyExists = await Match.findOne({
              userId,
              companyName: company.name,
              matchedKeyword: keyword,
            });

            if (!alreadyExists) {
              await Match.create({
                userId,
                companyName: company.name,
                jobTitle: `Keyword "${keyword}" found`,
                location: "Unknown",
                jobLink: company.careerPageUrl,
                matchedKeyword: keyword,
                dateFound: new Date(),
              });
              console.log(`Match found: ${company.name} - ${keyword}`);
            }
          }
        }
      } catch (err) {
        console.error(`Error scraping ${company.name}:`, err.message);
      }
    }
  }

  console.log("Scraping complete.");
  process.exit(0); // Exit script
}
