import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    rollNo: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
    },

    branch: {
      type: String,
      required: [true, "Branch is required"],
      trim: true,
    },

    section: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
      min: 1,
      max: 6,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

// Indexes for common queries
studentSchema.index({ branch: 1, year: 1, section: 1 });
studentSchema.index({ classId: 1 });

export default mongoose.model("Student", studentSchema);
