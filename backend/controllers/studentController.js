import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER STUDENT ================= */
export const registerStudent = async (req, res) => {
  try {
    const { name, email, rollNo, branch, year, section, password } = req.body;

    if (!name || !email || !rollNo || !branch || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStudent = await Student.findOne({
      $or: [{ email }, { rollNo }],
    });

    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      rollNo,
      branch,
      year,
      section,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Student registered successfully",
      studentId: student._id,
    });
  } catch (error) {
    console.error("Register Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN STUDENT ================= */
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNo: student.rollNo,
        branch: student.branch,
      },
    });
  } catch (error) {
    console.error("Login Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL STUDENTS (ADMIN) ================= */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json(students);
  } catch (error) {
    console.error("Fetch Students Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE STUDENT (ADMIN) ================= */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
