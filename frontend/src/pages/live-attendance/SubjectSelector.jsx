import React from "react";

const SubjectSelector = ({ subjects, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-3 rounded w-full max-w-md"
    >
      <option value="">Select Subject</option>
      {subjects.map(sub => (
        <option key={sub.id} value={sub.id}>
          {sub.name}
        </option>
      ))}
    </select>
  );
};

export default SubjectSelector;
