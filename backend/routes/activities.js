const express = require("express");
const {
  getActivities,
  getActivity,
  createActivity,
  deleteActivity,
  updateActivity,
} = require("../controllers/activityController");

const router = express.Router();

// GET all activities
router.get("/", getActivities);

// GET a singele activity
router.get("/:id", getActivity);

// POST a new activity
router.post("/", createActivity);

// DELETE an activity
router.delete("/:id", deleteActivity);

// UPDATE an activity
router.patch("/:id", updateActivity);

module.exports = router;
