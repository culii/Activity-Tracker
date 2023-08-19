require("dotenv").config();
const mongoose = require("mongoose");
const Activity = require("../models/activityModel.js"); // Adjust the path accordingly

const dbURI = process.env.MONGO_URI;

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

async function deleteAllActivities() {
  await Activity.deleteMany({});
  console.log("All documents in 'activities' collection have been deleted.");

  mongoose.disconnect();
}

deleteAllActivities();
