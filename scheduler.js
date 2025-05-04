// scheduler.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const runScraper = require("./scraper");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");

  // Run every minute
  cron.schedule("* * * * *", async () => {
    console.log("Running scraper at", new Date().toLocaleTimeString());
    await runScraper();
  });
});
