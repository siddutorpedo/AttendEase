import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import QuickActionCard from "./components/QuickActionCard";
import StatCard from "./components/StatCard";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, subjects, attendance, loading } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  const currentRole = user?.role || "teacher";

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <span className="text-sm text-muted-foreground">
          {currentTime.toLocaleTimeString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon="Users"
          title="Students"
          value={students.length}
        />
        <StatCard
          icon="BookOpen"
          title="Subjects"
          value={subjects.length}
        />
        <StatCard
          icon="ClipboardList"
          title="Total Attendance"
          value={`${attendance.length} records`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActionCard
          title="Take Live Attendance"
          description="Mark attendance for your class"
          icon="Users"
          onClick={() => navigate("/live-attendance")}
        />
        <QuickActionCard
          title="View Analytics"
          description="Check attendance reports"
          icon="BarChart3"
          onClick={() => navigate("/analytics")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
