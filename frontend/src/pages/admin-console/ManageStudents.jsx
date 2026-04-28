import React, { useState, useMemo } from "react";
import Icon from "../../components/AppIcon";
import { useData } from "../../contexts/DataContext";
import studentService from "../../services/studentService";

const ManageStudents = () => {
  const { students, setStudents, getAttendancePercentage } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("roll");
  const [sortDir, setSortDir] = useState("asc");

  /* DELETE STUDENT (ADMIN CONTROL) */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await studentService.delete(id);
      setStudents((prev) => prev.filter((s) => s._id !== id && s.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  const normalizedStudents = students || [];
  const trimmed = searchTerm.trim().toLowerCase();

  const processedStudents = useMemo(() => {
    let list = trimmed
      ? normalizedStudents.filter(
          (s) =>
            (s.name || "").toLowerCase().includes(trimmed) ||
            (s.roll || s.rollNo || "").toLowerCase().includes(trimmed) ||
            (s.email || "").toLowerCase().includes(trimmed)
        )
      : [...normalizedStudents];

    // Attach attendance %
    list = list.map((s) => ({
      ...s,
      attendancePct: getAttendancePercentage(s._id || s.id),
    }));

    // Sort
    list.sort((a, b) => {
      let va, vb;
      switch (sortField) {
        case "name":
          va = (a.name || "").toLowerCase();
          vb = (b.name || "").toLowerCase();
          break;
        case "branch":
          va = (a.branch || "").toLowerCase();
          vb = (b.branch || "").toLowerCase();
          break;
        case "percentage":
          va = a.attendancePct;
          vb = b.attendancePct;
          break;
        default:
          va = (a.roll || a.rollNo || "").toLowerCase();
          vb = (b.roll || b.rollNo || "").toLowerCase();
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [normalizedStudents, trimmed, sortField, sortDir, getAttendancePercentage]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Icon name="ArrowUpDown" size={12} className="opacity-40" />;
    return <Icon name={sortDir === "asc" ? "ArrowUp" : "ArrowDown"} size={12} className="text-primary" />;
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Registered Students</h2>
          <p className="text-sm text-muted-foreground mt-1">{processedStudents.length} students found</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 bg-card max-w-xs w-full focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
          <Icon name="Search" size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, roll or email..."
            className="flex-1 border-none outline-none text-sm bg-transparent placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {processedStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Icon name="Users" size={40} className="mb-3 opacity-30" />
            <p className="text-sm">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">#</th>
                  <th
                    className="text-left px-4 py-3 font-semibold text-muted-foreground cursor-pointer hover:text-foreground select-none"
                    onClick={() => toggleSort("roll")}
                  >
                    <span className="flex items-center gap-1">Roll No <SortIcon field="roll" /></span>
                  </th>
                  <th
                    className="text-left px-4 py-3 font-semibold text-muted-foreground cursor-pointer hover:text-foreground select-none"
                    onClick={() => toggleSort("name")}
                  >
                    <span className="flex items-center gap-1">Name <SortIcon field="name" /></span>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Email</th>
                  <th
                    className="text-left px-4 py-3 font-semibold text-muted-foreground cursor-pointer hover:text-foreground select-none"
                    onClick={() => toggleSort("branch")}
                  >
                    <span className="flex items-center gap-1">Branch <SortIcon field="branch" /></span>
                  </th>
                  <th
                    className="text-center px-4 py-3 font-semibold text-muted-foreground cursor-pointer hover:text-foreground select-none"
                    onClick={() => toggleSort("percentage")}
                  >
                    <span className="flex items-center justify-center gap-1">Attendance % <SortIcon field="percentage" /></span>
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedStudents.map((student, i) => {
                  const pct = student.attendancePct;
                  const isDefaulter = pct < 75 && pct > 0;
                  return (
                    <tr
                      key={student.id || student._id}
                      className={`border-t border-border transition-colors duration-150 ${
                        isDefaulter
                          ? "bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30"
                          : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{student.roll || student.rollNo}</td>
                      <td className="px-4 py-3 text-foreground">{student.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{student.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{student.branch}</td>
                      <td className="px-4 py-3 text-center">
                        {pct > 0 ? (
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              pct >= 75
                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                            }`}
                          >
                            {pct}%
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(student._id || student.id)}
                          className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all duration-200"
                          title="Delete student"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
