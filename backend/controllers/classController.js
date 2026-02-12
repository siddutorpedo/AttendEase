import ClassModel from "../models/Class.js";

// Create class
export const createClass = async (req, res) => {
  try {
    const { branch, year, section } = req.body;

    if (!branch || !year || !section) {
      return res.status(400).json({ message: "branch, year and section are required" });
    }

    const cls = await ClassModel.create({ branch, year, section });
    res.status(201).json(cls);
  } catch (error) {
    console.error("Create Class Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all classes (optionally filtered)
export const getClasses = async (req, res) => {
  try {
    const { branch, year } = req.query;
    const query = {};
    if (branch) query.branch = branch;
    if (year) query.year = Number(year);

    const classes = await ClassModel.find(query);
    res.json(classes);
  } catch (error) {
    console.error("Get Classes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single class
export const getClassById = async (req, res) => {
  try {
    const cls = await ClassModel.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(cls);
  } catch (error) {
    console.error("Get Class Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update class
export const updateClass = async (req, res) => {
  try {
    const { branch, year, section } = req.body;
    const cls = await ClassModel.findByIdAndUpdate(
      req.params.id,
      { branch, year, section },
      { new: true }
    );
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(cls);
  } catch (error) {
    console.error("Update Class Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete class
export const deleteClass = async (req, res) => {
  try {
    await ClassModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Delete Class Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

