import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },

    code: {
      type: String,
      required: [true, "Subject code is required"],
      trim: true,
      unique: true,
      uppercase: true,
    },

    branch: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
      min: 1,
      max: 6,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

subjectSchema.index({ branch: 1, year: 1 });
subjectSchema.index({ teacher: 1 });

export default mongoose.model("Subject", subjectSchema);
