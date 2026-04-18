import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js";
import ApiError from "../utils/ApiError.js";

/**
 * Generate JWT token for a user.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * Register a new user.
 * If role=student, also creates a Student profile.
 */
export const register = async (data) => {
  const { name, email, password, role, rollNo, branch, year, section } = data;

  // Check duplicate email
  const existing = await User.findOne({ email });
  if (existing) {
    throw ApiError.conflict("Email already registered");
  }

  // Create user
  const user = await User.create({ name, email, password, role });

  // If student, create student profile
  if (role === "student") {
    // Check duplicate rollNo
    const existingRoll = await Student.findOne({ rollNo });
    if (existingRoll) {
      // Rollback user creation
      await User.findByIdAndDelete(user._id);
      throw ApiError.conflict("Roll number already exists");
    }

    await Student.create({
      user: user._id,
      rollNo,
      branch,
      year,
      section,
    });
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

/**
 * Login an existing user (any role).
 */
export const login = async ({ email, password }) => {
  // +password because password has select:false
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const token = generateToken(user);

  // If student, include student-profile info
  let studentProfile = null;
  if (user.role === "student") {
    studentProfile = await Student.findOne({ user: user._id });
  }

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...(studentProfile && {
      student: {
        id: studentProfile._id,
        rollNo: studentProfile.rollNo,
        branch: studentProfile.branch,
        year: studentProfile.year,
        section: studentProfile.section,
      },
    }),
  };
};

/**
 * Get current user profile.
 */
export const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  let studentProfile = null;
  if (user.role === "student") {
    studentProfile = await Student.findOne({ user: userId });
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ...(studentProfile && {
      student: {
        id: studentProfile._id,
        rollNo: studentProfile.rollNo,
        branch: studentProfile.branch,
        year: studentProfile.year,
        section: studentProfile.section,
      },
    }),
  };
};
