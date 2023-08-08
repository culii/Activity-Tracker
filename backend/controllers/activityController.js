const Activity = require("../models/activityModel");
const mongoose = require("mongoose");

// get all activities
const getActivities = async (req, res) => {
  const activities = await Activity.find({}).sort({ createdAt: -1 });

  res.status(200).json(activities);
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
  const { activityName, duration, startTimeAndDate } = req.body;
  // add doc to db
  try {
    const activity = await Activity.create({
      activityName,
      duration,
      startTimeAndDate,
    });
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an activity
const deleteActivity = async (req, res) => {
  // grab id from route params
  const { id } = req.params;
  //is valid?
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
