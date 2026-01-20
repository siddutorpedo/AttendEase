import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Core data
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // ───────────────── ATTENDANCE ─────────────────
  const markAttendance = ({
    studentId,
    subjectId,
    date,
    status, // "present" | "absent"
  }) => {
    setAttendance(prev => [
      ...prev,
      {
        id: Date.now(),
        studentId,
        subjectId,
        date,
        status,
      },
    ]);
  };

  // ───────────────── HELPERS ─────────────────
  const getAttendanceByStudent = (studentId) =>
    attendance.filter(a => a.studentId === studentId);

  const getAttendancePercentage = (studentId) => {
    const records = getAttendanceByStudent(studentId);
    if (records.length === 0) return 0;

    const present = records.filter(r => r.status === "present").length;
    return Math.round((present / records.length) * 100);
  };

  return (
    <DataContext.Provider
      value={{
        // state
        students,
        setStudents,
        subjects,
        setSubjects,
        attendance,
        setAttendance,

        // attendance
        markAttendance,

        // helpers
        getAttendanceByStudent,
        getAttendancePercentage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
