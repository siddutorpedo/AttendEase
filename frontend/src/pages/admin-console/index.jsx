import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import classService from "../../services/classService";

const AdminConsole = () => {
  const navigate = useNavigate();
  const { classes, setClasses, students } = useData();

  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");

  const [showClassModal, setShowClassModal] = useState(false);
  const [classForm, setClassForm] = useState({ branch: "", year: "", section: "" });

  useEffect(() => {
    if (!classes || classes.length === 0) {
      classService.getAll()
        .then((data) => setClasses(data))
        .catch(() => {});
    }
  }, [classes, setClasses]);

  const handleOpenClassModal = () => {
    setClassForm({ branch: "", year: "", section: "" });
    setShowClassModal(true);
  };

  const handleSaveClass = async () => {
    if (!classForm.branch || !classForm.year || !classForm.section) {
      alert("Please fill all class fields");
      return;
    }
    try {
      const saved = await classService.create({
        branch: classForm.branch.trim(),
        year: Number(classForm.year),
        section: classForm.section.trim(),
      });
      setClasses((prev) => [...prev, saved]);
      setShowClassModal(false);
    } catch (e) {
      alert(e.response?.data?.message || e.message || "Failed to create class");
    }
  };

  const branchOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.branch))).filter(Boolean),
    [students]
  );
  const yearOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.year))).filter(Boolean),
    [students]
  );
  const sectionOptions = useMemo(
    () =>
      Array.from(
        new Set(
          students
            .filter(
              (s) =>
                (!year || String(s.year) === String(year)) &&
                (!branch || s.branch === branch)
            )
            .map((s) => s.section)
        )
      ).filter(Boolean),
    [students, year, branch]
  );

  const filteredStudents = useMemo(
    () =>
      students.filter((s) => {
        const matchesYear = !year || String(s.year) === String(year);
        const matchesBranch = !branch || s.branch === branch;
        const matchesSection = !section || s.section === section;
        return matchesYear && matchesBranch && matchesSection;
      }),
    [students, year, branch, section]
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Console</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-8">
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium">
          Home
        </button>

        <button
          onClick={() => navigate("/admin-console/manage-students")}
          className="px-4 py-2 rounded-md bg-muted text-foreground"
        >
          Manage Students
        </button>

        <button
          onClick={() => navigate("/admin-console/manage-subjects")}
          className="px-4 py-2 rounded-md bg-muted text-foreground"
        >
          Manage Subjects
        </button>
      </div>

      {/* Home Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Home</h2>
      </div>

      {/* Dropdown Filters */}
      <div className="flex gap-6">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-border rounded-md px-4 py-2 w-48"
        >
          <option value="">Select Year</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border border-border rounded-md px-4 py-2 w-48"
        >
          <option value="">Select Branch</option>
          {branchOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border border-border rounded-md px-4 py-2 w-48"
        >
          <option value="">Select Section</option>
          {sectionOptions.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>

      {/* Filtered student list */}
      <div className="mt-6">
        {filteredStudents.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 font-semibold bg-muted p-3">
              <span>Roll</span>
              <span>Name</span>
              <span>Branch</span>
              <span>Section</span>
            </div>
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="grid grid-cols-4 items-center p-3 border-t"
              >
                <span>{student.roll}</span>
                <span>{student.name}</span>
                <span>{student.branch}</span>
                <span>{student.section || "-"}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No students found for the selected filters.
          </p>
        )}
      </div>

      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Add Class</h3>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Branch (e.g. BCA)"
              value={classForm.branch}
              onChange={(e) =>
                setClassForm((prev) => ({ ...prev, branch: e.target.value }))
              }
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Year (e.g. 1, 2, 3)"
              type="number"
              value={classForm.year}
              onChange={(e) =>
                setClassForm((prev) => ({ ...prev, year: e.target.value }))
              }
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Section (e.g. A, B)"
              value={classForm.section}
              onChange={(e) =>
                setClassForm((prev) => ({ ...prev, section: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowClassModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleSaveClass}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConsole;
