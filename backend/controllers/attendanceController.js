import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Subject from "../models/Subject.js";

// Mark attendance (supports batch)
export const markAttendance = async (req, res) => {
  try {
    const { subjectId, date, records } = req.body;

    // Single-record fallback for backward compatibility
    if (!records) {
      const attendance = await Attendance.create(req.body);
      return res.status(201).json(attendance);
    }

    if (!subjectId || !date || !Array.isArray(records)) {
      return res
        .status(400)
        .json({ message: "subjectId, date and records array are required" });
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
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(bulkOps);

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Mark Attendance Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get attendance by student
export const getAttendanceByStudent = async (req, res) => {
  try {
    const records = await Attendance.find({
      student: req.params.studentId,
    }).populate("subject");
    res.json(records);
  } catch (error) {
    console.error("Get Attendance By Student Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get global attendance (for dashboard)
export const getAllAttendance = async (_req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    console.error("Get All Attendance Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Class-level attendance with optional filters
export const getAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { subjectId, from, to } = req.query;

    // Find students in this class
    const studentsInClass = await Student.find({ classId }).select("_id");
    const studentIds = studentsInClass.map((s) => s._id);

    const query = { student: { $in: studentIds } };
    if (subjectId) query.subject = subjectId;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    const records = await Attendance.find(query).populate("student subject");
    res.json(records);
  } catch (error) {
    console.error("Get Attendance By Class Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Subject-level attendance
export const getAttendanceBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { from, to } = req.query;

    const query = { subject: subjectId };
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    const records = await Attendance.find(query).populate("student subject");
    res.json(records);
  } catch (error) {
    console.error("Get Attendance By Subject Error:", error);
    res.status(500).json({ message: error.message });
  }
};
