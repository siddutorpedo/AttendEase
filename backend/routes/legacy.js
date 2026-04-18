/**
 * Legacy route compatibility layer.
 *
 * The frontend calls /api/students, /api/subjects, etc.
 * This file maps those EXACT paths to the new v1 handlers
 * so the frontend doesn't break.
 *
 * Additionally handles the old /api/students/login and
 * /api/students/register endpoints by routing them to auth.
 */
import express from "express";
import { register, login } from "../controllers/authController.js";
import validate from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

import studentRoutes from "./v1/studentRoutes.js";
import subjectRoutes from "./v1/subjectRoutes.js";
import attendanceRoutes from "./v1/attendanceRoutes.js";
import classRoutes from "./v1/classRoutes.js";

const router = express.Router();

// ── Student auth (legacy paths) ──────────────────────────
// Frontend calls POST /api/students/register and /api/students/login
router.post("/students/register", validate(registerSchema), register);
router.post("/students/login", validate(loginSchema), login);

// ── Resource routes (same paths as before) ───────────────
router.use("/students", studentRoutes);
router.use("/subjects", subjectRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/classes", classRoutes);

export default router;
