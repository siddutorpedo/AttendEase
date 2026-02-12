import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import classRoutes from "./routes/classRoutes.js";

dotenv.config();

const app = express();

/* ✅ CORS FIX */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* Routes */
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/classes", classRoutes);

/* MongoDB connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
