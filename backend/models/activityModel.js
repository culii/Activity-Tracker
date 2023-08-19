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
      default: null,
      required: false,
    },
    startTimeAndDate: {
      type: Date,
      default: null,
      required: false,
    },
    endTimeAndDate: {
      type: Date,
      default: null,
      required: false,
    },
    isTemplate: {
      // To determine if this is just a template (no date/duration)
      type: Boolean,
      default: false,
    },
    colour: {
      type: String,
      default: "#8AE8F4",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
