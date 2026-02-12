import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // Short subject code like CS101
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    // Optional branch for easier filtering in UI
    branch: {
      type: String,
      required: false,
      trim: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: false, // keep optional to avoid blocking simple setups
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
