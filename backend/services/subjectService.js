import Subject from "../models/Subject.js";
import ApiError from "../utils/ApiError.js";

/**
 * Get all subjects with optional filters.
 */
export const getAll = async ({ branch, year, classId }) => {
  const query = {};
  if (branch) query.branch = branch;
  if (year) query.year = Number(year);
  if (classId) query.classId = classId;

  const subjects = await Subject.find(query)
    .populate("teacher", "name email")
    .sort({ code: 1 });

  return subjects;
};

/**
 * Get subjects by class ID.
 */
export const getByClass = async (classId) => {
  return Subject.find({ classId }).populate("teacher", "name email");
};

/**
 * Create a new subject.
 */
export const create = async (data) => {
  const existing = await Subject.findOne({ code: data.code });
  if (existing) {
    throw ApiError.conflict(`Subject with code '${data.code}' already exists`);
  }
  return Subject.create(data);
};

/**
 * Update a subject by ID.
 */
export const update = async (id, data) => {
  const subject = await Subject.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!subject) throw ApiError.notFound("Subject not found");
  return subject;
};

/**
 * Delete a subject by ID.
 */
export const remove = async (id) => {
  const subject = await Subject.findByIdAndDelete(id);
  if (!subject) throw ApiError.notFound("Subject not found");
  return { message: "Subject deleted successfully" };
};
