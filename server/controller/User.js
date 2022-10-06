import User from "../models/user.model.js";
import Workout from "../models/workouts.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    return res.json(users);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const addUser = async (req, res) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    weight: req.body.weight,
  };

  try {
    const newUser = await User(user);

    await newUser.save();

    return res.json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const addWorkouts = async (req, res) => {
  const workout = {
    exercise: req.body.exercise,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    date: req.body.date,
  };

  try {
    const filter = { first_name: req.body.first_name };
    const user = await User.findOneAndUpdate(
      filter,
      { $push: { workouts: workout } },
      { new: true }
    );

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};

export const deleteExercises = async (req, res) => {
  const filter = { first_name: req.params.first_name };
  try {
    await User.findOneAndUpdate(
      filter,

      { $pull: { workouts: { exercise: req.body.exercise } } },

      { new: true }
    );

    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
};
