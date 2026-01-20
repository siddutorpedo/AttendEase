import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import QuickActionCard from './components/QuickActionCard';
import StatCard from './components/StatCard';
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, subjects, attendance } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentRole = user?.role || "teacher";

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {currentTime.toLocaleTimeString()}
          </span>
          <button className="p-3 rounded-lg bg-card border border-border">
            <Icon name="Bell" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRole === "teacher" && (
          <>
            <StatCard label="Students" value={students?.length || 0} />
            <StatCard label="Subjects" value={subjects?.length || 0} />
            <StatCard label="Total Attendance" value={`${attendance?.length || 0} records`} />
          </>
        )}
        {currentRole === "admin" && (
          <>
            <StatCard label="Total Students" value={students?.length || 0} />
            <StatCard label="Total Subjects" value={subjects?.length || 0} />
            <StatCard label="System Attendance" value={`${attendance?.length || 0} records`} />
          </>
        )}
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
