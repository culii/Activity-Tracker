const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    activityName: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    startTimeAndDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
