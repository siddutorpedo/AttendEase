import express from "express";
import {
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "../../controllers/studentController.js";
import auth from "../../middleware/auth.js";
import authorize from "../../middleware/authorize.js";

import validate from "../../middleware/validate.js";
import { studentQuerySchema } from "../../validators/studentValidator.js";

const router = express.Router();

// GET all students — accessible by authenticated users (including students)
router.get("/", auth, validate(studentQuerySchema, "query"), getAllStudents);

// GET single student
router.get("/:id", auth, getStudentById);

// DELETE student — admin & teacher
router.delete("/:id", auth, authorize("admin", "teacher"), deleteStudent);

export default router;
