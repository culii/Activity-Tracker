const Activity = require("../models/activityModel");
const mongoose = require("mongoose");

// get all activities
const getActivities = async (req, res) => {
  try {
    const scheduledActivities = await Activity.find({ isTemplate: false }).sort(
      { createdAt: -1 }
    );
    const templateActivities = await Activity.find({ isTemplate: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: {
        scheduledActivities,
        templateActivities,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// get a single activity
const getActivity = async (req, res) => {
  // grab id from params
  const { id } = req.params;
  // check if valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such activity" });
  }
  // find workout using mongodb type id
  const activity = await Activity.findById(id);
  // err handle
  if (!activity) {
    // return to stop func on err
    return res.status(404).json({ error: "No such activity" });
  }

  res.status(200).json(activity);
};

// create new activity
const createActivity = async (req, res) => {
  const { duration, startTimeAndDate, colour } = req.body;
  const activityName = req.body.activityName.toLowerCase();

  try {
    let existingTemplate = await Activity.findOne({
      activityName,
      isTemplate: true,
    });

    let templateActivity = null;
    let scheduledActivity = null;

    // If a template does not already exist, create it
    if (!existingTemplate) {
      existingTemplate = new Activity({
        activityName,
        isTemplate: true,
        colour,
      });
      await existingTemplate.save();
      templateActivity = existingTemplate;
    }

    if (duration && startTimeAndDate) {
      const endTimeAndDate = new Date(
        new Date(startTimeAndDate).getTime() + duration * 60000
      );

      const overlappingActivity = await Activity.findOne({
        startTimeAndDate: { $lt: endTimeAndDate },
        endTimeAndDate: { $gt: startTimeAndDate },
        isTemplate: false,
      });

      if (overlappingActivity) {
        return res.status(400).json({
          success: false,
          message: "Activity overlaps with another scheduled activity.",
        });
      }

      const newActivity = new Activity({
        activityName: existingTemplate.activityName,
        duration,
        startTimeAndDate,
        endTimeAndDate,
        isTemplate: false,
        colour: existingTemplate.colour,
      });

      await newActivity.save();
      scheduledActivity = newActivity;
    }

    res.status(200).json({
      success: true,
      message: templateActivity
        ? "New template activity and scheduled activity created successfully."
        : "Scheduled activity created successfully.",
      data: {
        templateActivity,
        scheduledActivity,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// delete an activity
const deleteActivity = async (req, res) => {
  // grab id from route params
  const { id } = req.params;
  // is valid?
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such activity" });
  }
  // find doc and delete where _id = id
  const activity = await Activity.findOneAndDelete({ _id: id });
  // if no activity
  if (!activity) {
    return res.status(404).json({ error: "No such activity" });
  }

  res.status(200).json(activity);
};

// update an activity
const updateActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such activity" });
  }

  const activity = await Activity.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!activity) {
    return res.status(404).json({ error: "No such activity" });
  }

  res.status(200).json(activity);
};

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  deleteActivity,
  updateActivity,
};
