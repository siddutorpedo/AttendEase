import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ───────── LOAD ALL DATA ─────────
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const token = localStorage.getItem("attendeaseToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
        const [studentsRes, subjectsRes, attendanceRes, classesRes] = await Promise.all([
          fetch("http://localhost:5000/api/students"),
          fetch("http://localhost:5000/api/subjects"),
          fetch("http://localhost:5000/api/attendance", headers ? { headers } : undefined),
          fetch("http://localhost:5000/api/classes"),
        ]);

        if (!studentsRes.ok || !subjectsRes.ok) {
          throw new Error("Students or subjects API response error");
        }

        const studentsData = await studentsRes.json();
        const subjectsData = await subjectsRes.json();
        const classesData = classesRes.ok ? await classesRes.json() : [];

        let attendanceData = [];
        if (attendanceRes.ok) {
          attendanceData = await attendanceRes.json();
        }

        // Normalize student/subject shapes for components
        const normalizedStudents = (studentsData || []).map((s) => ({
          ...s,
          id: s._id || s.id,
          roll: s.rollNo || s.roll,
          year: s.year,
          section: s.section,
        }));

        const normalizedSubjects = (subjectsData || []).map((sub) => ({
          ...sub,
          id: sub._id || sub.id,
        }));

        setStudents(normalizedStudents);
        setSubjects(normalizedSubjects);
        setClasses(classesData || []);
        setAttendance(attendanceData || []);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // ───────── ATTENDANCE ─────────
  const markAttendance = async ({ subjectId, date, records }) => {
    try {
      const token = localStorage.getItem("attendeaseToken");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      const res = await fetch("http://localhost:5000/api/attendance/mark", {
        method: "POST",
        headers,
        body: JSON.stringify({ subjectId, date, records }),
      });

      if (!res.ok) {
        throw new Error("Failed to mark attendance");
      }

      // Refresh attendance list after saving
      const allHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;
      const allRes = await fetch("http://localhost:5000/api/attendance", {
        headers: allHeaders,
      });

      if (allRes.ok) {
        const allData = await allRes.json();
        setAttendance(allData || []);
      }
    } catch (error) {
      console.error("Mark attendance failed:", error);
    }
  };

  // ───────── HELPERS ─────────
  const getAttendanceByStudent = (studentId) =>
    attendance.filter((a) => {
      const aStudentId = a.student?._id || a.studentId || a.student;
      return String(aStudentId) === String(studentId);
    });

  const getAttendancePercentage = (studentId) => {
    const records = getAttendanceByStudent(studentId);
    if (records.length === 0) return 0;

    const present = records.filter(r => r.status === "present").length;
    return Math.round((present / records.length) * 100);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    );
  }

  return (
    <DataContext.Provider
      value={{
        students,
        setStudents,
        subjects,
        setSubjects,
        classes,
        setClasses,
        attendance,
        setAttendance,
        markAttendance,
        getAttendanceByStudent,
        getAttendancePercentage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }
  return context;
};
