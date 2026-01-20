import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      enum: ["BCA", "BCOM", "BA"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
