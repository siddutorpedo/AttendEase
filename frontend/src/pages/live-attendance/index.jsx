import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import StudentRow from "./StudentRow";
import SubjectSelector from "./SubjectSelector";

const LiveAttendance = () => {
  const { students, subjects, markAttendance } = useData();

  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceMap, setAttendanceMap] = useState({});

  useEffect(() => {
    // reset attendance when subject changes
    setAttendanceMap({});
  }, [selectedSubject]);

  const markAll = (status) => {
    const updated = {};
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleMark = (studentId, status) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = async () => {
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const records = Object.entries(attendanceMap).map(
      ([studentId, status]) => ({
        studentId,
        status,
      })
    );

    try {
      await markAttendance({
        subjectId: selectedSubject,
        date: today,
        records,
      });
      alert("Attendance saved successfully");
    } catch {
      alert("Failed to save attendance");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Live Attendance</h1>

      <SubjectSelector
        subjects={subjects}
        value={selectedSubject}
        onChange={setSelectedSubject}
      />

      {!selectedSubject && (
        <p className="text-muted-foreground">Select a subject to start</p>
      )}

      {selectedSubject && (
        <>
          <div className="flex gap-3">
            <button
              onClick={() => markAll("present")}
              className="px-4 py-2 bg-success text-white rounded"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAll("absent")}
              className="px-4 py-2 bg-error text-white rounded"
            >
              Mark All Absent
            </button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 font-semibold bg-muted p-3">
              <span>Roll</span>
              <span>Name</span>
              <span>Branch</span>
              <span>Status</span>
            </div>

            {students.map(student => (
              <StudentRow
                key={student.id}
                student={student}
                status={attendanceMap[student.id]}
                onMark={handleMark}
              />
            ))}
          </div>

          <button
            onClick={saveAttendance}
            className="px-6 py-3 bg-primary text-white rounded"
          >
            Save Attendance
          </button>
        </>
      )}
    </div>
  );
};

export default LiveAttendance;
