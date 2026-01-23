import Attendance from "../models/Attendance.js";

// Mark attendance
export const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance by student
export const getAttendanceByStudent = async (req, res) => {
  try {
    const records = await Attendance.find({
      student: req.params.studentId
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
