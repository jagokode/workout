const express = require("express");
const {
  addWorkout,
  allWorkout,
  singleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

// all workout
router.get("/", allWorkout);

// single workout
router.get("/:workoutId", singleWorkout);

// add new workout
router.post("/", addWorkout);

// delete a workout
router.delete("/:workoutId", deleteWorkout);

// update a workout
router.patch("/:workoutId", updateWorkout);

module.exports = router;
