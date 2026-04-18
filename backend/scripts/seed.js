/**
 * Database seeder — creates default admin and teacher accounts.
 * Run: node scripts/seed.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Default admin
    const adminExists = await User.findOne({ email: "admin@attendease.edu" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@attendease.edu",
        password: "admin123",
        role: "admin",
      });
      console.log("👤 Admin created: admin@attendease.edu / admin123");
    } else {
      console.log("👤 Admin already exists");
    }

    // Default teacher
    const teacherExists = await User.findOne({ email: "teacher@attendease.edu" });
    if (!teacherExists) {
      await User.create({
        name: "Teacher",
        email: "teacher@attendease.edu",
        password: "teacher123",
        role: "teacher",
      });
      console.log("👨‍🏫 Teacher created: teacher@attendease.edu / teacher123");
    } else {
      console.log("👨‍🏫 Teacher already exists");
    }

    console.log("\n✅ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seed();
