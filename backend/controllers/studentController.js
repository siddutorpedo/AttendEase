import * as studentService from "../services/studentService.js";

export const getAllStudents = async (req, res, next) => {
  try {
    const result = await studentService.getAll(req.query);
    // Legacy compat: frontend expects flat array from GET /api/students
    res.json(result.students);
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getById(req.params.id);
    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const result = await studentService.remove(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
