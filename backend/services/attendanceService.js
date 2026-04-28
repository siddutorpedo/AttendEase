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

  const targetDate = new Date(date);

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

  await Attendance.bulkWrite(bulkOps);
  return { message: "Attendance marked successfully", count: records.length };
};

/**
 * Get all attendance records (with optional pagination).
 */
export const getAll = async ({ page, limit, subjectId, from, to }) => {
  const query = {};
  if (subjectId) query.subject = subjectId;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  // If no pagination requested, return all (for frontend DataContext)
  if (!page) {
    const records = await Attendance.find(query)
      .populate("student")
      .populate("subject", "name code");
    return records;
  }

  const skip = (Number(page) - 1) * Number(limit || 50);
  const [records, total] = await Promise.all([
    Attendance.find(query)
      .populate("student")
      .populate("subject", "name code")
      .skip(skip)
      .limit(Number(limit || 50))
      .sort({ date: -1 }),
    Attendance.countDocuments(query),
  ]);

  return { records, total, page: Number(page), pages: Math.ceil(total / (limit || 50)) };
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
  const allStudents = await Student.find().populate("user", "name email");

  const results = [];

  for (const student of allStudents) {
    const query = { student: student._id };
    if (subjectId) query.subject = subjectId;

    const records = await Attendance.find(query);
    if (records.length === 0) continue; // skip students with no records

    const present = records.filter((r) => r.status === "present").length;
    const percentage = Math.round((present / records.length) * 100);

    if (percentage < threshold) {
      results.push({
        _id: student._id,
        name: student.user?.name || "",
        email: student.user?.email || "",
        rollNo: student.rollNo,
        branch: student.branch,
        year: student.year,
        section: student.section,
        total: records.length,
        present,
        absent: records.length - present,
        percentage,
      });
    }
  }

  return results.sort((a, b) => a.percentage - b.percentage);
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
