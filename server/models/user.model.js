
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      minLength: 3,
    },
    last_name: {
      type: String,
      required: true,
      minLength: 3,
    },
    age: {
      type: Number,
      required: true,
      minLength: 3,
    },
    weight: {
      type: String,
      required: true,
      minLength: 3,
    },
    workouts: [
      {
        type: Object,
        ref: "Workouts",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;

