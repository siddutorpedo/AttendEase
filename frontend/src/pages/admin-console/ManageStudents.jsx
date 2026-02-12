import React, { useEffect } from "react";
import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";

const API = "http://localhost:5000/api/students";

const ManageStudents = () => {
  const { students, setStudents } = useData();

  /* LOAD STUDENTS FROM MONGODB */
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };

    loadStudents();
  }, [setStudents]);

  /* DELETE STUDENT (ADMIN CONTROL) */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Registered Students</h2>
      </div>

      {/* STUDENT LIST */}
      <div className="space-y-4">
        {students.length === 0 && (
          <p className="text-gray-500">No students registered yet.</p>
        )}

        {students.map((student) => (
          <div
            key={student._id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">
                Roll: {student.rollNo} | Branch: {student.branch}
              </p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>

            <button
              onClick={() => handleDelete(student._id)}
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
