import React, { useState } from "react";
import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";

const API = "http://localhost:5000/api/students";

const ManageStudents = () => {
  const { students, setStudents } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  /* DELETE STUDENT (ADMIN CONTROL) */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setStudents((prev) => prev.filter((s) => s._id !== id && s.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const normalizedStudents = students || [];
  const trimmed = searchTerm.trim().toLowerCase();
  const visibleStudents = trimmed
    ? normalizedStudents.filter((s) =>
        (s.name || "").toLowerCase().includes(trimmed)
      )
    : normalizedStudents;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Registered Students</h2>
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 bg-white max-w-xs w-full">
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="flex-1 border-none outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      {/* STUDENT LIST */}
      <div className="space-y-4">
        {visibleStudents.length === 0 && (
          <p className="text-gray-500">No students found.</p>
        )}

        {visibleStudents.map((student) => (
          <div
            key={student.id || student._id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">
                Roll: {student.roll || student.rollNo} | Branch: {student.branch}
              </p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>

            <button
              onClick={() => handleDelete(student._id || student.id)}
              className="p-2 text-red-500 hover:bg-red-100 rounded"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ManageStudents;
