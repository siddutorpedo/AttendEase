import express from "express";
import {
  registerStudent,
  loginStudent,
  getAllStudents,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

/* STUDENT */
router.post("/register", registerStudent);
router.post("/login", loginStudent);

/* ADMIN */
router.get("/", getAllStudents);
router.delete("/:id", deleteStudent)

export default router;
