import * as attendanceService from "../services/attendanceService.js";

export const markAttendance = async (req, res, next) => {
  try {
    const result = await attendanceService.markAttendance({
      ...req.body,
      markedBy: req.user?._id,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const result = await attendanceService.getAll(req.query);
    // If unpaginated (array), return directly for frontend compat
    res.json(Array.isArray(result) ? result : result.records);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByStudent = async (req, res, next) => {
  try {
    const records = await attendanceService.getByStudent(req.params.studentId);
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceBySubject = async (req, res, next) => {
  try {
    const records = await attendanceService.getBySubject(req.params.subjectId, req.query);
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByClass = async (req, res, next) => {
  try {
    const records = await attendanceService.getByClass(req.params.classId, req.query);
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const getPercentage = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { subjectId } = req.query;
    const result = await attendanceService.getPercentage(studentId, subjectId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
