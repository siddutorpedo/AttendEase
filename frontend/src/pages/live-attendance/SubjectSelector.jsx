import React from "react";

const SubjectSelector = ({ subjects, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-border rounded-md px-4 py-2.5 w-full min-w-[240px] bg-white"
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
