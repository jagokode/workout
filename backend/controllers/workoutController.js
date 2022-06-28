const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

// get all workouts
const allWorkout = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    if (workouts.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No workouts found" });

    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single workout
const singleWorkout = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId))
    return res.status(404).json({ success: false, error: "No such workout" });

  try {
    const workout = await Workout.findOne({ _id: workoutId });

    if (workout === null)
      return res
        .status(400)
        .json({ success: false, message: "No workout with the given id" });

    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add new workout
const addWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    return res.status(404).json({ error: "Workout does not exist" });

  try {
    const deletedWorkout = await Workout.findOneAndRemove({ _id: workoutId });

    if (!deletedWorkout)
      return res
        .status(400)
        .json({ success: false, error: "Can not delete non-exist workout" });

    res
      .status(200)
      .json({ success: true, message: "The workout deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    return res.status(404).json({ error: "Workout does not exist" });

  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: workoutId },
      { ...req.body },
      { new: true }
    );

    if (!updatedWorkout)
      return res.status(400).json({
        success: false,
        message: "Can not update the workout. Try again!",
      });

    res.status(200).json({ success: true, data: updatedWorkout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addWorkout,
  allWorkout,
  singleWorkout,
  deleteWorkout,
  updateWorkout,
};
