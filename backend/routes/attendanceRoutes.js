import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  markAttendance,
  getAttendanceByStudent,
  getAllAttendance,
  getAttendanceByClass,
  getAttendanceBySubject,
} from "../controllers/attendanceController.js";

const router = express.Router();

// Global list (for dashboard/DataContext)
router.get("/", authMiddleware, getAllAttendance);

// Mark student attendance (batch supported)
router.post("/mark", authMiddleware, markAttendance);

// Get attendance of a student
router.get("/student/:studentId", authMiddleware, getAttendanceByStudent);

// Class-level attendance
router.get("/class/:classId", getAttendanceByClass);

// Subject-level attendance
router.get("/subject/:subjectId", getAttendanceBySubject);

export default router;
