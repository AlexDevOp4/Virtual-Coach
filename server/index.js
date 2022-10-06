import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
main().catch((err) => console.log(err));

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

async function main() {
  await mongoose.connect(uri);

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

import userRouter from "./routes/users.js";

app.use("/users", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
