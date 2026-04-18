import ClassModel from "../models/Class.js";
import ApiError from "../utils/ApiError.js";

export const getAll = async ({ branch, year }) => {
  const query = {};
  if (branch) query.branch = branch;
  if (year) query.year = Number(year);

  return ClassModel.find(query).sort({ branch: 1, year: 1, section: 1 });
};

export const getById = async (id) => {
  const cls = await ClassModel.findById(id);
  if (!cls) throw ApiError.notFound("Class not found");
  return cls;
};

export const create = async (data) => {
  return ClassModel.create(data);
};

export const update = async (id, data) => {
  const cls = await ClassModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!cls) throw ApiError.notFound("Class not found");
  return cls;
};

export const remove = async (id) => {
  const cls = await ClassModel.findByIdAndDelete(id);
  if (!cls) throw ApiError.notFound("Class not found");
  return { message: "Class deleted successfully" };
};
