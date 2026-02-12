import React from "react";

const StudentRow = ({ student, status, onMark }) => {
  return (
    <div className="grid grid-cols-4 items-center p-3 border-t">
      <span>{student.roll}</span>
      <span>{student.name}</span>
      <span>{student.branch}</span>

      <div className="flex gap-2">
        <button
          onClick={() => onMark(student.id, "present")}
          className={`px-3 py-1 rounded ${
            status === "present"
              ? "bg-success text-white"
              : "border"
          }`}
        >
          Present
        </button>

        <button
          onClick={() => onMark(student.id, "absent")}
          className={`px-3 py-1 rounded ${
            status === "absent"
              ? "bg-error text-white"
              : "border"
          }`}
        >
          Absent
        </button>
      </div>
    </div>
  );
};

export default StudentRow;
