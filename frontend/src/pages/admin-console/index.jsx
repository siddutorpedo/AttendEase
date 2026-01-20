import { useState } from "react";
import ManageStudents from "./ManageStudents";
import ManageSubjects from "./ManageSubjects";

export default function AdminConsole() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Console</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded ${
            activeTab === "students"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Manage Students
        </button>

        <button
          onClick={() => setActiveTab("subjects")}
          className={`px-4 py-2 rounded ${
            activeTab === "subjects"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Manage Subjects
        </button>
      </div>

      {/* Content */}
      {activeTab === "students" && <ManageStudents />}
      {activeTab === "subjects" && <ManageSubjects />}
    </div>
  );
}
