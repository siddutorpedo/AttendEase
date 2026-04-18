import express from "express";
import {
  getSubjects,
  getSubjectsByClass,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../../controllers/subjectController.js";
import auth from "../../middleware/auth.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";
import { createSubjectSchema, updateSubjectSchema } from "../../validators/subjectValidator.js";

const router = express.Router();

// GET all subjects (public — frontend needs it)
router.get("/", getSubjects);

// GET by class
router.get("/class/:classId", getSubjectsByClass);

// CREATE — admin & teacher
router.post("/", auth, authorize("admin", "teacher"), validate(createSubjectSchema), createSubject);

// UPDATE — admin & teacher
router.put("/:id", auth, authorize("admin", "teacher"), validate(updateSubjectSchema), updateSubject);

// DELETE — admin & teacher
router.delete("/:id", auth, authorize("admin", "teacher"), deleteSubject);

export default router;
