import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ─── Normalization ───────────────────────────────────────────
// Pre-save hook to strip time from date (ensure midnight UTC)
attendanceSchema.pre("save", function (next) {
  if (this.date) {
    this.date.setUTCHours(0, 0, 0, 0);
  }
  next();
});

// ─── Uniqueness ──────────────────────────────────────────────
// Prevent duplicate attendance for same student + subject + date
attendanceSchema.index(
  { student: 1, subject: 1, date: 1 },
  { unique: true }
);

// Fast lookups by subject and student
attendanceSchema.index({ subject: 1, date: 1 });
attendanceSchema.index({ student: 1 });

export default mongoose.model("Attendance", attendanceSchema);
