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
  req.body.password = req.body.password || "default123";
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

/* UPDATE student */
router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

/* DELETE student */
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

export default router;
