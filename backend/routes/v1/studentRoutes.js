import express from "express";
import {
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "../../controllers/studentController.js";
import auth from "../../middleware/auth.js";
import authorize from "../../middleware/authorize.js";

const router = express.Router();

// GET all students — admin & teacher
router.get("/", getAllStudents);

// GET single student
router.get("/:id", auth, getStudentById);

// DELETE student — admin & teacher
router.delete("/:id", auth, authorize("admin", "teacher"), deleteStudent);

export default router;
