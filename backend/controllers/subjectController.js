import Subject from "../models/Subject.js";

// Create subject
export const createSubject = async (req, res) => {
  try {
    const { name, code, branch, classId } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "name and code are required" });
    }

    const subject = await Subject.create({ name, code, branch, classId });
    res.status(201).json(subject);
  } catch (error) {
    console.error("Create Subject Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all subjects (optionally filtered)
export const getSubjects = async (req, res) => {
  try {
    const { classId, branch, year } = req.query;
    const query = {};
    if (classId) query.classId = classId;
    if (branch) query.branch = branch;
    // year can be used client-side with Class model; ignore here or extend schema if needed

    const subjects = await Subject.find(query);
    res.json(subjects);
  } catch (error) {
    console.error("Get Subjects Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get subjects by class (param style)
export const getSubjectsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const subjects = await Subject.find({ classId });
    res.json(subjects);
  } catch (error) {
    console.error("Get Subjects By Class Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update subject
export const updateSubject = async (req, res) => {
  try {
    const { name, code, branch, classId } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, code, branch, classId },
      { new: true }
    );
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    console.error("Update Subject Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete subject
export const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch (error) {
    console.error("Delete Subject Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
