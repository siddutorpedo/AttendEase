import express from "express";
import Subject from "../models/Subject.js";

const router = express.Router();

/* GET all subjects */
router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

/* ADD subject */
router.post("/", async (req, res) => {
  const subject = await Subject.create(req.body);
  res.status(201).json(subject);
});

export default router;
