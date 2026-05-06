import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import ApiError from "../utils/ApiError.js";
import sendEmail from "../utils/email.js";

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

    // Auto-resolve or create Class for the student
    let classDoc;
    if (branch && year && section) {
      classDoc = await Class.findOne({
        branch: new RegExp(`^${branch}$`, "i"),
        year: Number(year),
        section: new RegExp(`^${section}$`, "i"),
      });

      if (!classDoc) {
        classDoc = await Class.create({
          branch: branch.toUpperCase(),
          year: Number(year),
          section: section.toUpperCase(),
        });
      }
    }

    await Student.create({
      user: user._id,
      rollNo,
      branch: branch ? branch.toUpperCase() : branch,
      year: year ? Number(year) : year,
      section: section ? section.toUpperCase() : section,
      classId: classDoc ? classDoc._id : undefined,
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

/**
 * Generate 6-digit OTP and send to user's email.
 */
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.notFound("No user found with that email address");
  }

  // 1. Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. Save OTP and Expiry to user
  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  // 3. Send email
  const message = `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "AttendEase Password Reset OTP",
      message,
    });
  } catch (err) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    throw ApiError.internal("There was an error sending the email. Try again later!");
  }
};

/**
 * Verify OTP and reset password.
 */
export const resetPassword = async ({ email, otp, newPassword }) => {
  const user = await User.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordOTPExpiry: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    throw ApiError.badRequest("OTP is invalid or has expired");
  }

  // Update password and clear OTP fields
  user.password = newPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpiry = undefined;

  await user.save(); // This will trigger the pre-save hook to hash the password

  return { message: "Password reset successful" };
};
