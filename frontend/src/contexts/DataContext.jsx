import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import studentService from "../services/studentService";
import subjectService from "../services/subjectService";
import attendanceService from "../services/attendanceService";
import classService from "../services/classService";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // ───────── LOAD ALL DATA ─────────
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [studentsData, subjectsData, classesData] = await Promise.all([
          studentService.getAll().catch(() => []),
          subjectService.getAll().catch(() => []),
          classService.getAll().catch(() => []),
        ]);

        // Attendance requires auth — might fail if not logged in
        let attendanceData = [];
        try {
          attendanceData = await attendanceService.getAll();
        } catch {
          // silently fail — user might not be logged in
        }

        // Normalize shapes for components
        const studentsList = Array.isArray(studentsData) ? studentsData : (studentsData?.students || []);
        const normalizedStudents = studentsList.map((s) => ({
          ...s,
          id: s._id || s.id,
          roll: s.rollNo || s.roll,
        }));

        const subjectsList = Array.isArray(subjectsData) ? subjectsData : (subjectsData?.subjects || []);
        const normalizedSubjects = subjectsList.map((sub) => ({
          ...sub,
          id: sub._id || sub.id,
        }));

        setStudents(normalizedStudents);
        setSubjects(normalizedSubjects);
        setClasses(classesData || []);
        setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError(err.message);
        setStudents([]);
        setSubjects([]);
        setClasses([]);
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [refreshKey]);

  const refreshData = useCallback(() => setRefreshKey((k) => k + 1), []);

  // ───────── ATTENDANCE ─────────
  const markAttendance = useCallback(async ({ subjectId, date, records }) => {
    await attendanceService.mark({ subjectId, date, records });
    // Refresh attendance after marking
    try {
      const fresh = await attendanceService.getAll();
      setAttendance(Array.isArray(fresh) ? fresh : []);
    } catch {
      // ignore refresh failure
    }
  }, []);

  // ───────── HELPERS ─────────
  const getAttendanceByStudent = useCallback(
    (studentId) =>
      attendance.filter((a) => {
        const aStudentId = a.student?._id || a.studentId || a.student;
        return String(aStudentId) === String(studentId);
      }),
    [attendance]
  );

  const getAttendancePercentage = useCallback(
    (studentId) => {
      const records = getAttendanceByStudent(studentId);
      if (records.length === 0) return 0;
      const present = records.filter((r) => r.status === "present").length;
      return Math.round((present / records.length) * 100);
    },
    [getAttendanceByStudent]
  );

  const value = useMemo(
    () => ({
      students,
      setStudents,
      subjects,
      setSubjects,
      classes,
      setClasses,
      attendance,
      setAttendance,
      loading,
      error,
      refreshData,
      markAttendance,
      getAttendanceByStudent,
      getAttendancePercentage,
    }),
    [students, subjects, classes, attendance, loading, error, refreshData, markAttendance, getAttendanceByStudent, getAttendancePercentage]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }
  return context;
};
