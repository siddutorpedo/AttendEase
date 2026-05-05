import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  getAttendanceBySubject,
  getAttendanceByClass,
  getPercentage,
  getDefaulters,
  getDashboardStats,
} from "../../controllers/attendanceController.js";
import auth from "../../middleware/auth.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";
import {
  markAttendanceSchema,
  paginationQuerySchema,
  thresholdQuerySchema,
} from "../../validators/attendanceValidator.js";

const router = express.Router();

// Dashboard stats (must be before parameterized routes)
router.get("/dashboard-stats", auth, getDashboardStats);

// Defaulters
router.get("/defaulters", auth, validate(thresholdQuerySchema, "query"), getDefaulters);

// GET all attendance
router.get("/", auth, validate(paginationQuerySchema, "query"), getAllAttendance);

// Mark attendance — teacher & admin
router.post("/mark", auth, authorize("admin", "teacher"), validate(markAttendanceSchema), markAttendance);

// By student
router.get("/student/:studentId", auth, getAttendanceByStudent);

// By subject
router.get("/subject/:subjectId", auth, validate(paginationQuerySchema, "query"), getAttendanceBySubject);

// By class
router.get("/class/:classId", auth, validate(paginationQuerySchema, "query"), getAttendanceByClass);

// Percentage
router.get("/percentage/:studentId", auth, getPercentage);

export default router;
