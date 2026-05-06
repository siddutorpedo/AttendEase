import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import ApiError from "../utils/ApiError.js";

/**
 * Generate JWT token for a user.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * Register a new user.
 */
export const register = async (userData) => {
  const { name, email, password, role, ...studentInfo } = userData;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw ApiError.badRequest("User with this email already exists");
  }

  // Create base user
  const user = await User.create({
    name,
    email,
    password,
    role: role || "student",
  });

  let studentData = null;

  // If student, create student profile
  if (user.role === "student") {
    // Basic rollNo validation for student
    if (!studentInfo.rollNo) {
      throw ApiError.badRequest("Roll number is required for students");
    }

    const student = await Student.create({
      user: user._id,
      rollNo: studentInfo.rollNo,
      branch: studentInfo.branch || "Unknown",
      year: studentInfo.year || 1,
      section: studentInfo.section || "A",
    });

    studentData = {
      id: student._id,
      rollNo: student.rollNo,
      branch: student.branch,
      year: student.year,
      section: student.section,
    };
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    student: studentData,
    token: generateToken(user._id),
  };
};

/**
 * Login user.
 */
export const login = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  let studentData = null;

  // If student, fetch student details
  if (user.role === "student") {
    const student = await Student.findOne({ user: user._id });
    if (student) {
      studentData = {
        id: student._id,
        rollNo: student.rollNo,
        branch: student.branch,
        year: student.year,
        section: student.section,
      };
    }
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    student: studentData,
    token: generateToken(user._id),
  };
};

/**
 * Get current user data.
 */
export const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  let studentData = null;
  if (user.role === "student") {
    const student = await Student.findOne({ user: user._id });
    if (student) {
      studentData = {
        id: student._id,
        rollNo: student.rollNo,
        branch: student.branch,
        year: student.year,
        section: student.section,
      };
    }
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    ...(studentData && { student: studentData }),
  };
};
