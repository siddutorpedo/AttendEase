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
      unique: true,
    },

    branch: {
      type: String,
      enum: ["BCA", "BCOM", "BA"],
      default: "BCA",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
