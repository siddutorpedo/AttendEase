import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

/* GET all students */
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/* ADD student */
router.post("/", async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

export default router;
