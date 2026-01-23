import express from "express";
import {
  markAttendance,
  getAttendanceByStudent
} from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/attendance/mark
 * @desc    Mark student attendance
 * @access  Protected (Lecturer)
 */
router.post("/mark", authMiddleware, markAttendance);

/**
 * @route   GET /api/attendance/student/:studentId
 * @desc    Get attendance of a student
 * @access  Protected
 */
router.get("/student/:studentId", authMiddleware, getAttendanceByStudent);

export default router; // ✅ THIS FIXES YOUR ERROR
