import mongoose from "mongoose";
import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import ApiError from "../utils/ApiError.js";

/**
 * Mark attendance (batch).
 * Uses bulkWrite with upsert to prevent duplicates.
 */
export const markAttendance = async ({ subjectId, date, records, markedBy }) => {
  if (!records || records.length === 0) {
    throw ApiError.badRequest("No attendance records provided");
  }

  // Normalize targetDate to midnight UTC for consistent matching
  const targetDate = new Date(date);
  targetDate.setUTCHours(0, 0, 0, 0);

  const bulkOps = records.map((r) => ({
    updateOne: {
      filter: {
        student: r.studentId,
        subject: subjectId,
        date: targetDate,
      },
      update: {
        $set: {
          status: r.status,
          markedBy,
        },
      },
      upsert: true,
    },
  }));

  try {
    await Attendance.bulkWrite(bulkOps);
    return { message: "Attendance processed successfully", count: records.length };
  } catch (error) {
    if (error.code === 11000) {
      throw ApiError.conflict("Duplicate attendance entry detected for this date.");
    }
    throw error;
  }
};

/**
 * Get all attendance records (with optional pagination).
 */
export const getAll = async ({ page, limit = 50, subjectId, from, to }) => {
  const query = {};
  if (subjectId) query.subject = subjectId;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  const currentPage = Number(page) || 1;
  const currentLimit = Math.min(Number(limit), 100); // Cap at 100
  const skip = (currentPage - 1) * currentLimit;

  const [records, total] = await Promise.all([
    Attendance.find(query)
      .populate("student")
      .populate("subject", "name code")
      .skip(skip)
      .limit(currentLimit)
      .sort({ date: -1 }),
    Attendance.countDocuments(query),
  ]);

  return {
    data: records,
    meta: {
      total,
      page: currentPage,
      limit: currentLimit,
      pages: Math.ceil(total / currentLimit),
    },
  };
};

/**
 * Get attendance by student ID.
 */
export const getByStudent = async (studentId) => {
  return Attendance.find({ student: studentId }).populate("subject", "name code");
};

/**
 * Get attendance by subject ID.
 */
export const getBySubject = async (subjectId, { from, to } = {}) => {
  const query = { subject: subjectId };
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  return Attendance.find(query).populate("student subject");
};

/**
 * Get attendance by class (find students in class, then their records).
 */
export const getByClass = async (classId, { subjectId, from, to } = {}) => {
  const studentsInClass = await Student.find({ classId }).select("_id");
  const studentIds = studentsInClass.map((s) => s._id);

  const query = { student: { $in: studentIds } };
  if (subjectId) query.subject = subjectId;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  return Attendance.find(query).populate("student subject");
};

/**
 * Calculate attendance percentage for a student in a subject.
 */
export const getPercentage = async (studentId, subjectId) => {
  const records = await Attendance.find({
    student: studentId,
    ...(subjectId && { subject: subjectId }),
  });

  if (records.length === 0) return { total: 0, present: 0, percentage: 0 };

  const present = records.filter((r) => r.status === "present").length;
  return {
    total: records.length,
    present,
    percentage: Math.round((present / records.length) * 100),
  };
};

/**
 * Get all students with attendance below threshold (defaulters).
 */
export const getDefaulters = async (threshold = 75, { subjectId } = {}) => {
  const match = {};
  if (subjectId) match.subject = new mongoose.Types.ObjectId(subjectId);

  const pipeline = [
    { $match: match },
    {
      $group: {
        _id: "$student",
        total: { $sum: 1 },
        present: {
          $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        student: "$_id",
        total: 1,
        present: 1,
        absent: { $subtract: ["$total", "$present"] },
        percentage: {
          $round: [{ $multiply: [{ $divide: ["$present", "$total"] }, 100] }, 0],
        },
      },
    },
    { $match: { percentage: { $lt: threshold } } },
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "studentInfo",
      },
    },
    { $unwind: "$studentInfo" },
    {
      $lookup: {
        from: "users",
        localField: "studentInfo.user",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: "$student",
        name: "$userInfo.name",
        email: "$userInfo.email",
        rollNo: "$studentInfo.rollNo",
        branch: "$studentInfo.branch",
        year: "$studentInfo.year",
        section: "$studentInfo.section",
        total: 1,
        present: 1,
        absent: 1,
        percentage: 1,
      },
    },
    { $sort: { percentage: 1 } },
  ];

  return Attendance.aggregate(pipeline);
};

/**
 * Get aggregated dashboard statistics.
 */
export const getDashboardStats = async () => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

  // Count totals
  const [totalStudents, totalClasses, totalSubjects, totalRecords] = await Promise.all([
    Student.countDocuments(),
    (await import("../models/Class.js")).default.countDocuments(),
    (await import("../models/Subject.js")).default.countDocuments(),
    Attendance.countDocuments(),
  ]);

  // Today's attendance
  const todayRecords = await Attendance.find({
    date: { $gte: todayStart, $lt: todayEnd },
  });

  const todayPresent = todayRecords.filter((r) => r.status === "present").length;
  const todayAbsent = todayRecords.filter((r) => r.status === "absent").length;

  // Recent 5 attendance records
  const recentRecords = await Attendance.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("student")
    .populate("subject", "name code");

  const recent = recentRecords.map((r) => ({
    _id: r._id,
    studentName: r.student?.user?.name || r.student?.rollNo || "Unknown",
    rollNo: r.student?.rollNo || "-",
    subjectName: r.subject?.name || "Unknown",
    subjectCode: r.subject?.code || "",
    status: r.status,
    date: r.date,
  }));

  // Overall attendance %
  const allRecords = await Attendance.find();
  const overallPresent = allRecords.filter((r) => r.status === "present").length;
  const overallPercentage = allRecords.length
    ? Math.round((overallPresent / allRecords.length) * 100)
    : 0;

  return {
    totalStudents,
    totalClasses,
    totalSubjects,
    totalRecords,
    today: {
      total: todayRecords.length,
      present: todayPresent,
      absent: todayAbsent,
      percentage: todayRecords.length
        ? Math.round((todayPresent / todayRecords.length) * 100)
        : 0,
    },
    overallPercentage,
    recent,
  };
};
