import mongoose from "mongoose";


const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    exercise: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Workouts = mongoose.model("Workouts", WorkoutSchema);

export default Workouts;
