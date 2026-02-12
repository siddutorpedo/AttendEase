import express from "express";
import {
  createSubject,
  getSubjects,
  getSubjectsByClass,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

// List subjects (with optional filters)
router.get("/", getSubjects);

// List subjects for a specific class
router.get("/class/:classId", getSubjectsByClass);

// Create subject
router.post("/", createSubject);

// Update subject
router.put("/:id", updateSubject);

// Delete subject
router.delete("/:id", deleteSubject);

export default router;
