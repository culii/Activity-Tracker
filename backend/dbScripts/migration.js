require("dotenv").config();
const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI;
const Activity = require("../models/activityModel.js");

// Connect to the database
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.error("Connection error", error);
    process.exit(1);
  });

// Perform the migration
async function migrateData() {
  const activities = await Activity.find({ name: { $exists: true } });

  const promises = activities.map(async (activity) => {
    activity.activityName = activity.name;
    delete activity.name;
    return activity.save();
  });

  await Promise.all(promises);
  console.log("Migration completed.");

  mongoose.disconnect();
}

migrateData();
