import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const listUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({}, "email name role");
  console.log("Users in DB:", users);
  process.exit(0);
};

listUsers();
