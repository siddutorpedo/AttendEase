import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    branch: { type: String, required: true }, // BCA, BCOM
    year: { type: Number, required: true }, // 1, 2, 3
    section: { type: String, required: true }, // A, B
  },
  {
    timestamps: true,
  }
);

// Virtual friendly name, e.g. "BCA 1 A"
classSchema.virtual("displayName").get(function () {
  return `${this.branch} ${this.year} ${this.section}`;
});

classSchema.set("toJSON", { virtuals: true });
classSchema.set("toObject", { virtuals: true });

export default mongoose.model("Class", classSchema);
