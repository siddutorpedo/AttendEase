import Student from "../models/Student.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

/**
 * Get all students with pagination and optional filters.
 * Handles both NEW format (student + user ref) and LEGACY format (student has name/email directly).
 */
export const getAll = async ({ page = 1, limit = 50, branch, year, section }) => {
  const query = {};
  if (branch) query.branch = branch;
  if (year) query.year = Number(year);
  if (section) query.section = section;

  const skip = (page - 1) * limit;

  const [students, total] = await Promise.all([
    Student.find(query)
      .populate("user", "name email role")
      .skip(skip)
      .limit(Number(limit))
      .sort({ rollNo: 1 }),
    Student.countDocuments(query),
  ]);

  // Flatten for frontend compatibility — handle both legacy and new formats
  const result = students.map((s) => {
    const doc = s.toObject ? s.toObject() : s;
    return {
      _id: doc._id,
      id: doc._id,
      // NEW format: name/email come from populated user
      // LEGACY format: name/email stored directly on student doc
      name: doc.user?.name || doc.name || "",
      email: doc.user?.email || doc.email || "",
      rollNo: doc.rollNo || doc.roll || "",
      roll: doc.rollNo || doc.roll || "",
      branch: doc.branch || "",
      year: doc.year,
      section: doc.section,
      classId: doc.classId,
      user: doc.user?._id || doc.user,
    };
  });

  return { students: result, total, page: Number(page), pages: Math.ceil(total / limit) };
};

/**
 * Get single student by ID.
 */
export const getById = async (id) => {
  const student = await Student.findById(id).populate("user", "name email role");
  if (!student) throw ApiError.notFound("Student not found");
  return student;
};

/**
 * Delete a single student and their user account.
 */
export const remove = async (id) => {
  if (!id) {
    throw ApiError.badRequest("Student ID is required");
  }

  const student = await Student.findById(id);
  if (!student) {
    throw ApiError.notFound("Student not found");
  }

  // Remove the linked user account (if it exists)
  if (student.user) {
    await User.findByIdAndDelete(student.user);
  }

  await Student.findByIdAndDelete(id);
  return { message: "Student deleted successfully" };
};
