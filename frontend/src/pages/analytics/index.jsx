import { useMemo, useState } from "react";
import { useData } from "../../contexts/DataContext";
import Icon from "../../components/AppIcon";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";

export default function Analytics() {
  const { students, subjects, attendance } = useData();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const yearOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.year).filter((y) => y != null && y !== ""))).sort(),
    [students]
  );

  const branchOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.branch).filter(Boolean))),
    [students]
  );

  const sectionOptions = useMemo(
    () => Array.from(new Set(
      students
        .filter(s => (!selectedYear || String(s.year) === String(selectedYear)) && (!selectedBranch || s.branch === selectedBranch))
        .map(s => s.section)
    )).filter(Boolean),
    [students, selectedYear, selectedBranch]
  );
  const { overallPercentage } = useMemo(() => {
    if (!attendance?.length) return { overallPercentage: 0 };
    const present = attendance.filter((r) => r.status === "present").length;
    return { overallPercentage: Math.round((present / attendance.length) * 100) };
  }, [attendance]);

  // Per-student attendance for selected subject
  const studentStats = useMemo(() => {
    if (!selectedSubject || !attendance?.length) return [];

    // Filter attendance records for selected subject
    const subjectRecords = attendance.filter((r) => {
      const subId = r.subject?._id || r.subjectId || r.subject;
      return String(subId) === String(selectedSubject);
    });

    // Group by student
    const studentMap = {};
    subjectRecords.forEach((r) => {
      const studentId = r.student?._id || r.studentId || r.student;
      if (!studentMap[studentId]) {
        const student = students.find(
          (s) => String(s._id || s.id) === String(studentId)
        );

        // Skip if student doesn't match our filters
        if (!student) return;
        if (selectedYear && String(student.year) !== String(selectedYear)) return;
        if (selectedBranch && student.branch !== selectedBranch) return;
        if (selectedSection && student.section !== selectedSection) return;

        studentMap[studentId] = {
          id: studentId,
          name: student?.name || "Unknown",
          roll: student?.roll || student?.rollNo || "-",
          branch: student?.branch || "-",
          total: 0,
          present: 0,
        };
      }
      studentMap[studentId].total += 1;
      if (r.status === "present") {
        studentMap[studentId].present += 1;
      }
    });

    return Object.values(studentMap)
      .map((s) => ({
        ...s,
        percentage: s.total ? Math.round((s.present / s.total) * 100) : 0,
      }))
      .sort((a, b) => a.percentage - b.percentage); // worst attendance first
  }, [selectedSubject, attendance, students, selectedYear, selectedBranch, selectedSection]);

  // Count students below 75%
  const belowThreshold = studentStats.filter((s) => s.percentage < 75).length;

  // Chart data
  const barChartData = useMemo(
    () => studentStats.slice(0, 20).map((s) => ({
      name: s.roll,
      percentage: s.percentage,
      fill: s.percentage < 75 ? "#ef4444" : "#22c55e",
    })),
    [studentStats]
  );

  const pieData = useMemo(() => {
    if (!studentStats.length) return [];
    const above = studentStats.filter((s) => s.percentage >= 75).length;
    const below = studentStats.length - above;
    return [
      { name: "≥ 75%", value: above, fill: "#22c55e" },
      { name: "< 75%", value: below, fill: "#ef4444" },
    ];
  }, [studentStats]);

  // Get selected subject name
  const selectedSubjectName = subjects.find(
    (s) => String(s._id || s.id) === String(selectedSubject)
  )?.name;

  // ── CSV Export ──
  const exportCSV = () => {
    if (!studentStats.length) return;
    const headers = ["#", "Roll No", "Name", "Branch", "Present", "Total", "Percentage"];
    const rows = studentStats.map((s, i) => [
      i + 1, s.roll, `"${s.name}"`, s.branch, s.present, s.total, `${s.percentage}%`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_${selectedSubjectName || "report"}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor student attendance performance per subject
          </p>
        </div>
        {studentStats.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Icon name="Download" size={16} />
            Export CSV
          </button>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon name="CheckCircle2" size={20} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Overall Attendance
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">{overallPercentage}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            {attendance?.length ?? 0} total records
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <Icon name="Users" size={20} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Total Students
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {students?.length ?? 0}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <Icon name="BookOpen" size={20} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Total Subjects
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {subjects?.length ?? 0}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      {selectedSubject && studentStats.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Attendance % by Student (Top 20)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Attendance"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
                />
                <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                  {barChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 self-start">Threshold Breakdown</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Filters & Subject Selector */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Subject-wise Student Attendance
          </h2>
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[120px]"
            >
              <option value="">All Years</option>
              {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setSelectedSection("");
              }}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[120px]"
            >
              <option value="">All Branches</option>
              {branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[120px]"
            >
              <option value="">All Sections</option>
              {sectionOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[180px]"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s._id || s.id} value={s._id || s.id}>
                  {s.name} {s.code ? `(${s.code})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Alert: below threshold count */}
        {selectedSubject && belowThreshold > 0 && (
          <div className="flex items-center gap-2 px-4 py-3 mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-400">
              <span className="font-semibold">{belowThreshold} student{belowThreshold > 1 ? "s" : ""}</span>{" "}
              in <span className="font-semibold">{selectedSubjectName}</span> have below 75% attendance
            </p>
          </div>
        )}

        {/* No subject selected */}
        {!selectedSubject && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Icon name="BarChart3" size={48} className="mb-3 opacity-30" />
            <p className="text-sm">Select a subject to view student attendance breakdown</p>
          </div>
        )}

        {/* No records */}
        {selectedSubject && studentStats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Icon name="FileX" size={48} className="mb-3 opacity-30" />
            <p className="text-sm">No attendance records found for this subject</p>
          </div>
        )}

        {/* Student Table */}
        {selectedSubject && studentStats.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">#</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Roll No</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Branch</th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Present</th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Total</th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {studentStats.map((s, i) => {
                  const isBelowThreshold = s.percentage < 75;
                  return (
                    <tr
                      key={s.id}
                      className={`border-t border-border transition-colors duration-150 ${isBelowThreshold
                        ? "bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30"
                        : "hover:bg-muted/30"
                        }`}
                    >
                      <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{s.roll}</td>
                      <td className="px-4 py-3 text-foreground">{s.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.branch}</td>
                      <td className="px-4 py-3 text-center text-foreground">{s.present}</td>
                      <td className="px-4 py-3 text-center text-foreground">{s.total}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${isBelowThreshold
                            ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            }`}
                        >
                          {s.percentage}%
                        </span>
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
}
