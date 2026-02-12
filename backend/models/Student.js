import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true, // ✅ student types branch
    },

    // Section (A, B, etc.)
    section: {
      type: String,
      required: false,
      trim: true,
    },

    // Academic year (1,2,3...)
    year: {
      type: Number,
      required: false,
    },

    // Optional reference to Class to support class-level reporting
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: false,
    },

    // Simple role field to distinguish between student/teacher/admin
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
