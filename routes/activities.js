const express = require("express");

const router = express.Router();

// GET all activities
router.get("/", (req, res) => {
  res.json({ mssg: "GET all activities" });
});

// GET a singele activity
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a singele activity" });
});

// POST a new activity
router.post("/", (req, res) => {
  res.json({ mssg: "POST a new activity" });
});

// DELETE an activity
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE an activity" });
});

// UPDATE an activity
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE an activity" });
});

module.exports = router;
