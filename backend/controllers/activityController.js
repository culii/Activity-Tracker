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
  // deconstructing what the user sends from req.body to allow cleaner code
  const { duration, startTimeAndDate, colour } = req.body;

  try {
    // convert name to lowercase
    const name = req.body.name.toLowerCase();

    let isNewTemplateCreated = false;
    // Check if a template with the same name exists in the DB
    let existingTemplate = await Activity.findOne({ name, template: true });

    // If a template does not already exist, create it
    if (!existingTemplate) {
      existingTemplate = new Activity({
        name,
        template: true,
        colour,
      });
      await existingTemplate.save();
      isNewTemplateCreated = true;
    }

    // if user provides duration and startTimeAndDate, check for overlap and then clone/save as new activity
    if (duration && startTimeAndDate) {
      // Calculate end time of the new activity
      const endTimeAndDate = new Date(
        new Date(startTimeAndDate).getTime() + duration * 60000
      );

      // Check if this activity overlaps with an existing one
      const overlappingActivity = await Activity.findOne({
        startTimeAndDate: { $lt: endTimeAndDate },
        endTimeAndDate: { $gt: startTimeAndDate },
        template: false,
      });

      if (overlappingActivity) {
        return res.status(400).json({
          success: false,
          message: "Activity overlaps with another scheduled activity.",
        });
      }

      const newActivity = new Activity({
        name: existingTemplate.name, // use name from the template
        duration,
        startTimeAndDate,
        endTimeAndDate,
        template: false,
        colour: existingTemplate.colour, // use colour from the template
      });

      await newActivity.save();

      const message = isNewTemplateCreated
        ? "New template activity and scheduled activity created successfully."
        : "Scheduled activity created successfully.";

      return res.status(200).json({
        success: true,
        message: message,
        data: newActivity,
      });
    } else {
      const message = isNewTemplateCreated
        ? "New template activity created."
        : "Template activity with the given name already exists.";

      return res.status(200).json({
        success: true,
        message: message,
        data: existingTemplate,
      });
    }
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
