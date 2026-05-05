import * as studentService from "../services/studentService.js";

export const getAllStudents = async (req, res, next) => {
  try {
    const { data, meta } = await studentService.getAll(req.query);
    res.json({
      success: true,
      data: data,
      meta: meta,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getById(req.params.id);
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const result = await studentService.remove(req.params.id);
    res.json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};
