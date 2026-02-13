import React, { useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import StatCard from "../dashboard/components/StatCard";

export default function Analytics() {
  const { students, subjects, attendance } = useData();

  const { overallPercentage, subjectStats, topStudents } = useMemo(() => {
    if (!attendance?.length) {
      return {
        overallPercentage: 0,
        subjectStats: [],
        topStudents: [],
      };
    }

    const total = attendance.length;
    const presentCount = attendance.filter((r) => r.status === "present").length;
    const overallPercentage = Math.round((presentCount / total) * 100);

    const subjectMap = {};
    const studentMap = {};

    attendance.forEach((r) => {
      const subjectId = r.subject?._id || r.subjectId || r.subject;
      const studentId = r.student?._id || r.studentId || r.student;

      if (!subjectMap[subjectId]) {
        const subject = subjects.find(
          (s) => String(s._id || s.id) === String(subjectId)
        );
        subjectMap[subjectId] = {
          id: subjectId,
          name: subject?.name || "Unknown",
          total: 0,
          present: 0,
        };
      }

      if (!studentMap[studentId]) {
        const student = students.find(
          (s) => String(s._id || s.id) === String(studentId)
        );
        studentMap[studentId] = {
          id: studentId,
          name: student?.name || "Unknown",
          roll: student?.roll || student?.rollNo || "-",
          total: 0,
          present: 0,
        };
      }

      subjectMap[subjectId].total += 1;
      studentMap[studentId].total += 1;

      if (r.status === "present") {
        subjectMap[subjectId].present += 1;
        studentMap[studentId].present += 1;
      }
    });

    const subjectStats = Object.values(subjectMap)
      .map((s) => ({
        ...s,
        percentage: s.total ? Math.round((s.present / s.total) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const topStudents = Object.values(studentMap)
      .map((s) => ({
        ...s,
        percentage: s.total ? Math.round((s.present / s.total) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    return { overallPercentage, subjectStats, topStudents };
  }, [attendance, students, subjects]);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Overview of attendance performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon="CheckCircle2"
          title="Overall Attendance"
          value={`${overallPercentage}%`}
          subtitle={`${attendance?.length ?? 0} total records`}
        />
        <StatCard icon="Users" title="Total Students" value={students?.length ?? 0} />
        <StatCard icon="BookOpen" title="Total Subjects" value={subjects?.length ?? 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Subject-wise Attendance</h2>
          {subjectStats.length === 0 ? (
            <p className="text-sm text-muted-foreground">No attendance records yet.</p>
          ) : (
            <div className="space-y-3">
              {subjectStats.map((s) => (
                <div key={s.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground">
                      {s.percentage}% ({s.present}/{s.total})
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${s.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Top Students by Attendance</h2>
          {topStudents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No attendance records yet.</p>
          ) : (
            <div className="space-y-2">
              {topStudents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between text-sm py-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Roll: {s.roll}</p>
                  </div>
                  <span className="font-semibold">{s.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
