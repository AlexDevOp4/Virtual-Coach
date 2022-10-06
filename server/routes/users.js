import express from "express";
import { getUsers, addUser, addWorkouts,deleteExercises } from "../controller/User.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/addUser", addUser);
router.post("/addWorkout", addWorkouts);
router.delete("/:first_name", deleteExercises);

export default router;
