import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// v1 routes
import authRoutes from "./routes/v1/authRoutes.js";
import studentRoutes from "./routes/v1/studentRoutes.js";
import subjectRoutes from "./routes/v1/subjectRoutes.js";
import classRoutes from "./routes/v1/classRoutes.js";
import attendanceRoutes from "./routes/v1/attendanceRoutes.js";

// Legacy compatibility
import legacyRoutes from "./routes/legacy.js";

dotenv.config();

const app = express();

// ─── Security ────────────────────────────────────────────
app.use(helmet());

// ─── CORS ────────────────────────────────────────────────
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ─── Rate Limiting ───────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later" },
});
app.use(limiter);

// ─── Body Parsing ────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ─────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// ─── Health Check ────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── API v1 Routes ───────────────────────────────────────
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/attendance", attendanceRoutes);

// ─── Legacy Routes (backward compat for frontend) ───────
app.use("/api", legacyRoutes);

// ─── 404 Handler ─────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ────────────────────────────────
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 API v1:    http://localhost:${PORT}/api/v1`);
    console.log(`📋 Legacy:    http://localhost:${PORT}/api`);
    console.log(`❤️  Health:    http://localhost:${PORT}/health`);
  });
});
