import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import QuickActionCard from "./components/QuickActionCard";
import StatCard from "./components/StatCard";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import attendanceService from "../../services/attendanceService";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, subjects, classes, attendance, loading } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashStats, setDashStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard stats from backend
  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const data = await attendanceService.getDashboardStats();
        if (!cancelled) setDashStats(data);
      } catch {
        // fallback to client-side calculation
      } finally {
        if (!cancelled) setStatsLoading(false);
      }
    };
    fetchStats();
    return () => { cancelled = true; };
  }, [attendance.length]);

  // Client-side fallback calculations
  const todaySummary = useMemo(() => {
    if (dashStats?.today) return dashStats.today;
    const today = new Date().toISOString().split("T")[0];
    const todayRecords = attendance.filter((r) => {
      const d = r.date ? new Date(r.date).toISOString().split("T")[0] : "";
      return d === today;
    });
    const present = todayRecords.filter((r) => r.status === "present").length;
    const absent = todayRecords.filter((r) => r.status === "absent").length;
    return {
      total: todayRecords.length,
      present,
      absent,
      percentage: todayRecords.length ? Math.round((present / todayRecords.length) * 100) : 0,
    };
  }, [dashStats, attendance]);

  const recentActivity = useMemo(() => {
    if (dashStats?.recent?.length) return dashStats.recent;
    // Client-side fallback: last 5 records from attendance
    return attendance
      .slice()
      .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
      .slice(0, 5)
      .map((r) => ({
        _id: r._id,
        studentName: r.student?.rollNo || "Unknown",
        rollNo: r.student?.rollNo || "-",
        subjectName: r.subject?.name || "Unknown",
        subjectCode: r.subject?.code || "",
        status: r.status,
        date: r.date,
      }));
  }, [dashStats, attendance]);

  // Per-subject attendance bar chart data
  const subjectChartData = useMemo(() => {
    if (!attendance.length || !subjects.length) return [];
    const subMap = {};
    subjects.forEach((s) => {
      subMap[s._id || s.id] = { name: s.code || s.name, total: 0, present: 0 };
    });
    attendance.forEach((r) => {
      const subId = r.subject?._id || r.subjectId || r.subject;
      if (subMap[subId]) {
        subMap[subId].total += 1;
        if (r.status === "present") subMap[subId].present += 1;
      }
    });
    return Object.values(subMap)
      .filter((s) => s.total > 0)
      .map((s) => ({
        name: s.name,
        percentage: Math.round((s.present / s.total) * 100),
        fill: Math.round((s.present / s.total) * 100) >= 75 ? "#22c55e" : "#ef4444",
      }));
  }, [attendance, subjects]);

  const totalStudents = dashStats?.totalStudents ?? students.length;
  const totalClasses = dashStats?.totalClasses ?? classes.length;
  const totalSubjects = dashStats?.totalSubjects ?? subjects.length;
  const overallPct = dashStats?.overallPercentage ?? (
    attendance.length
      ? Math.round((attendance.filter((r) => r.status === "present").length / attendance.length) * 100)
      : 0
  );

  if (loading && statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, {user?.name || "Teacher"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {currentTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-xs text-muted-foreground">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon="Users"
          title="Total Students"
          value={totalStudents}
          subtitle="Registered students"
        />
        <StatCard
          icon="BookOpen"
          title="Total Subjects"
          value={totalSubjects}
          subtitle={`${totalClasses} classes`}
        />
        <StatCard
          icon="ClipboardList"
          title="Overall Attendance"
          value={`${overallPct}%`}
          subtitle={`${dashStats?.totalRecords ?? attendance.length} records`}
          changeType={overallPct >= 75 ? "positive" : "negative"}
          change={overallPct >= 75 ? "Good" : "Low"}
        />
        <StatCard
          icon="CalendarCheck"
          title="Today's Attendance"
          value={todaySummary.total > 0 ? `${todaySummary.percentage}%` : "No data"}
          subtitle={todaySummary.total > 0 ? `${todaySummary.present}P / ${todaySummary.absent}A` : "Mark attendance to see"}
          changeType={todaySummary.percentage >= 75 ? "positive" : todaySummary.total > 0 ? "negative" : "neutral"}
        />
      </div>

      {/* Middle Row: Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject-wise Attendance Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Subject-wise Attendance</h2>
            <button
              onClick={() => navigate("/analytics")}
              className="text-xs text-primary hover:underline font-medium"
            >
              View Detailed →
            </button>
          </div>
          {subjectChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={subjectChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Attendance"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
                />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                  {subjectChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Icon name="BarChart3" size={40} className="mb-3 opacity-30" />
              <p className="text-sm">No attendance data to chart yet</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((r, i) => (
                <div key={r._id || i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${r.status === "present" ? "bg-green-500" : "bg-red-500"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {r.studentName || r.rollNo}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {r.subjectName} {r.subjectCode ? `(${r.subjectCode})` : ""}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    r.status === "present"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                  }`}>
                    {r.status === "present" ? "P" : "A"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Icon name="Clock" size={32} className="mb-2 opacity-30" />
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Today's Summary Bar */}
      {todaySummary.total > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Today's Summary</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {todaySummary.present} Present / {todaySummary.absent} Absent
                </span>
                <span className={`text-sm font-bold ${todaySummary.percentage >= 75 ? "text-green-600" : "text-red-500"}`}>
                  {todaySummary.percentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${todaySummary.percentage >= 75 ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: `${todaySummary.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <QuickActionCard
          title="Take Live Attendance"
          description="Mark attendance for your class"
          icon="Users"
          variant="primary"
          onClick={() => navigate("/live-attendance")}
        />
        <QuickActionCard
          title="View Analytics"
          description="Attendance reports & charts"
          icon="BarChart3"
          onClick={() => navigate("/analytics")}
        />
        <QuickActionCard
          title="Admin Console"
          description="Manage students & subjects"
          icon="Settings"
          onClick={() => navigate("/admin-console")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
