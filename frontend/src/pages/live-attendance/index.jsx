import React, { useEffect, useMemo, useState } from "react";
import { useData } from "../../contexts/DataContext";
import StudentRow from "./StudentRow";
import SubjectSelector from "./SubjectSelector";

const LiveAttendance = () => {
  const { students, subjects, markAttendance } = useData();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceMap, setAttendanceMap] = useState({});

  const yearOptions = useMemo(
    () =>
      Array.from(
        new Set(
          students
            .map((s) => s.year)
            .filter((y) => y != null && y !== "")
        )
      ).sort(),
    [students]
  );
  const branchOptions = useMemo(
    () =>
      Array.from(new Set(students.map((s) => s.branch).filter(Boolean))),
    [students]
  );
  const sectionOptions = useMemo(
    () =>
      Array.from(
        new Set(
          students
            .filter(
              (s) =>
                (!selectedYear || String(s.year) === String(selectedYear)) &&
                (!selectedBranch || s.branch === selectedBranch)
            )
            .map((s) => s.section)
        )
      ).filter(Boolean),
    [students, selectedYear, selectedBranch]
  );

  const filteredStudents = useMemo(() => {
    if (!selectedYear || !selectedBranch || !selectedSection) return [];
    return students.filter((s) => {
      const matchesBranch = s.branch === selectedBranch;
      const matchesYear =
        s.year != null
          ? String(s.year) === String(selectedYear)
          : true;
      const matchesSection = s.section === selectedSection;
      return matchesBranch && matchesYear && matchesSection;
    });
  }, [students, selectedYear, selectedBranch, selectedSection]);

  useEffect(() => {
    setAttendanceMap({});
  }, [selectedSubject, selectedYear, selectedBranch, selectedSection]);

  const markAll = (status) => {
    const updated = {};
    filteredStudents.forEach((s) => {
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

      {/* Year, Branch, Section, Subject - all alongside each other */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-border rounded-md px-4 py-2.5 min-w-[180px] bg-white"
        >
          <option value="">Select Year</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={selectedBranch}
          onChange={(e) => {
            setSelectedBranch(e.target.value);
            setSelectedSection("");
          }}
          className="border border-border rounded-md px-4 py-2.5 min-w-[180px] bg-white"
        >
          <option value="">Select Branch</option>
          {branchOptions.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border border-border rounded-md px-4 py-2.5 min-w-[180px] bg-white"
        >
          <option value="">Select Section</option>
          {sectionOptions.map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>

        <div className="min-w-[240px]">
          <SubjectSelector
            subjects={subjects}
            value={selectedSubject}
            onChange={setSelectedSubject}
          />
        </div>
      </div>

      {(!selectedYear || !selectedBranch || !selectedSection) && (
        <p className="text-sm text-muted-foreground">
          Select Year, Branch and Section to filter students
        </p>
      )}

      {selectedYear && selectedBranch && selectedSection && !selectedSubject && (
        <p className="text-muted-foreground">Select a subject to start</p>
      )}

      {selectedSubject && selectedYear && selectedBranch && selectedSection && (
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

            {filteredStudents.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                status={attendanceMap[student.id]}
                onMark={handleMark}
              />
            ))}
            {filteredStudents.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">
                No students found for the selected Year, Branch and Section.
              </div>
            )}
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
