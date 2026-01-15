import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import { useData } from '../../contexts/DataContext';

const StatCard = ({ icon, title, value, change, changeType, subtitle }) => {
  const changeColors = {
    positive: 'text-teal-600',
    negative: 'text-red-600',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${changeColors?.[changeType]}`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon, title, description, onClick, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card hover:bg-muted border-border',
    primary: 'bg-primary/10 hover:bg-primary/20 border-primary/30',
    success: 'bg-success/10 hover:bg-success/20 border-success/30',
    warning: 'bg-warning/10 hover:bg-warning/20 border-warning/30'
  };

  return (
    <button
      onClick={onClick}
      className={`${variantStyles?.[variant]} border rounded-lg p-6 transition-all hover:shadow-sm cursor-pointer text-left w-full`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${variant === 'default' ? 'bg-primary/10' : 'bg-white/20'}`}>
          <Icon name={icon} size={24} className={variant === 'default' ? 'text-primary' : 'text-foreground'} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Icon name="ChevronRight" size={20} className="text-muted-foreground mt-1" />
      </div>
    </button>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { students, subjects } = useData();
  const [currentRole, setCurrentRole] = useState('teacher');

  const teacherStats = [
    {
      icon: 'Users',
      title: 'Total Students',
      value: students.length.toString(),
      change: '+12',
      changeType: 'positive',
      subtitle: `Across ${subjects.length} classes`
    },
    {
      icon: 'CheckCircle2',
      title: 'Present Today',
      value: Math.floor(students.length * 0.91).toString(),
      change: '91%',
      changeType: 'positive',
      subtitle: `${Math.floor(students.length * 0.09)} absent students`
    },
    {
      icon: 'TrendingUp',
      title: 'Weekly Average',
      value: '88.5%',
      change: '+2.3%',
      changeType: 'positive',
      subtitle: 'vs last week'
    },
    {
      icon: 'AlertCircle',
      title: 'Alerts',
      value: '8',
      change: '-3',
      changeType: 'positive',
      subtitle: 'Pending actions'
    }
  ];

  const teacherQuickActions = [
    {
      icon: 'CheckSquare',
      title: 'Mark Attendance',
      description: 'Quick attendance marking for today\'s classes',
      onClick: () => navigate('/admin-console/students'),
      variant: 'primary'
    },
    {
      icon: 'BarChart3',
      title: 'View Analytics',
      description: 'Access detailed attendance reports and insights',
      onClick: () => navigate('/admin-console/subjects'),
      variant: 'default'
    },
    {
      icon: 'Users',
      title: 'Student Profiles',
      description: 'Review individual student attendance records',
      onClick: () => {},
      variant: 'default'
    },
    {
      icon: 'MessageSquare',
      title: 'Send Notifications',
      description: 'Communicate with students and parents',
      onClick: () => {},
      variant: 'default'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        
        {/* Top Right Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon name="User" size={20} className="text-foreground" />
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-transparent text-foreground font-medium focus:outline-none cursor-pointer"
            >
              <option value="teacher">Teacher View</option>
              <option value="admin">Administrator View</option>
              <option value="student">Student View</option>
            </select>
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <Icon name="Bell" size={20} className="text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition">
            <Icon name="Settings" size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {teacherStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teacherQuickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
