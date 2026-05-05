import * as attendanceService from "../services/attendanceService.js";

export const markAttendance = async (req, res, next) => {
  try {
    const result = await attendanceService.markAttendance({
      ...req.body,
      markedBy: req.user?._id,
    });
    res.status(200).json({
      success: true,
      message: result.message,
      count: result.count,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const result = await attendanceService.getAll(req.query);
    res.json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByStudent = async (req, res, next) => {
  try {
    const records = await attendanceService.getByStudent(req.params.studentId);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceBySubject = async (req, res, next) => {
  try {
    const records = await attendanceService.getBySubject(req.params.subjectId, req.query);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByClass = async (req, res, next) => {
  try {
    const records = await attendanceService.getByClass(req.params.classId, req.query);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getPercentage = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { subjectId } = req.query;
    const result = await attendanceService.getPercentage(studentId, subjectId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getDefaulters = async (req, res, next) => {
  try {
    const threshold = req.query.threshold ? Number(req.query.threshold) : 75;
    const result = await attendanceService.getDefaulters(threshold, req.query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const result = await attendanceService.getDashboardStats();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
