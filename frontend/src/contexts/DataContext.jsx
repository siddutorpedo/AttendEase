import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', roll: '001', email: 'john@example.com', branch: 'BCA' },
    { id: 2, name: 'Jane Smith', roll: '002', email: 'jane@example.com', branch: 'BCA' },
    { id: 3, name: 'Bob Johnson', roll: '003', email: 'bob@example.com', branch: 'BCOM' },
    { id: 4, name: 'Rhushi', roll: '2032', email: 'rhushi@gmail.com', branch: 'BCA' }
  ]);

  const [subjects, setSubjects] = useState([
    { id: 1, code: 'CS101', name: 'Data Structures', credits: 4, branch: 'BCA', academicDays: 200 },
    { id: 2, code: 'CS102', name: 'Algorithms', credits: 4, branch: 'BCA', academicDays: 200 },
    { id: 3, code: 'COM101', name: 'Accounting', credits: 3, branch: 'BCOM', academicDays: 200 }
  ]);

  const [settings, setSettings] = useState({
    academicDaysWithoutSunday: 200
  });

  // Central attendance data structure
  const [attendanceRecords, setAttendanceRecords] = useState([
    // Example format: { id, studentId, subjectId, date, status ('present'/'absent'/'late'), markedAt, markedBy }
  ]);

  // Utility function to mark attendance
  const markAttendance = (studentId, subjectId, date, status) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    const existingRecord = attendanceRecords.find(
      r => r.studentId === studentId && r.subjectId === subjectId && r.date === dateStr
    );

    if (existingRecord) {
      // Update existing record
      setAttendanceRecords(attendanceRecords.map(r =>
        r.id === existingRecord.id ? { ...r, status, markedAt: new Date().toISOString() } : r
      ));
    } else {
      // Create new record
      const newRecord = {
        id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        studentId,
        subjectId,
        date: dateStr,
        status,
        markedAt: new Date().toISOString(),
        markedBy: 'lecturer'
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }
  };

  // Utility function to get attendance stats
  const getAttendanceStats = (studentId, subjectId, fromDate, toDate) => {
    const fromDateStr = new Date(fromDate).toISOString().split('T')[0];
    const toDateStr = new Date(toDate).toISOString().split('T')[0];

    const records = attendanceRecords.filter(
      r => r.studentId === studentId &&
           r.subjectId === subjectId &&
           r.date >= fromDateStr &&
           r.date <= toDateStr
    );

    const presentCount = records.filter(r => r.status === 'present').length;
    const absentCount = records.filter(r => r.status === 'absent').length;
    const lateCount = records.filter(r => r.status === 'late').length;
    const totalClasses = presentCount + absentCount + lateCount;
    const percentage = totalClasses > 0 ? ((presentCount / totalClasses) * 100).toFixed(1) : 0;

    return {
      presentCount,
      absentCount,
      lateCount,
      totalClasses,
      percentage,
      records
    };
  };

  // Utility function to get attendance records by date and subject
  const getAttendanceByDateAndSubject = (subjectId, date) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return attendanceRecords.filter(r => r.subjectId === subjectId && r.date === dateStr);
  };

  // Utility function to get all records for a student
  const getStudentAttendanceRecords = (studentId) => {
    return attendanceRecords.filter(r => r.studentId === studentId);
  };

  return (
    <DataContext.Provider
      value={{
        students,
        setStudents,
        subjects,
        setSubjects,
        settings,
        setSettings,
        attendanceRecords,
        setAttendanceRecords,
        markAttendance,
        getAttendanceStats,
        getAttendanceByDateAndSubject,
        getStudentAttendanceRecords
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
