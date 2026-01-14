import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import QuickActionCard from './components/QuickActionCard';
import StatCard from './components/StatCard';
import RoleSelector from './components/RoleSelector';

const DashboardContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('teacher');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const availableRoles = [
    { value: 'teacher', label: 'Teacher View' },
    { value: 'admin', label: 'Administrator View' },
    { value: 'student', label: 'Student View' }
  ];

  const teacherQuickActions = [
    {
      icon: 'CheckSquare',
      title: 'Mark Attendance',
      description: 'Quick attendance marking for today\'s classes',
      onClick: () => navigate('/live-attendance'),
      variant: 'primary'
    },
    {
      icon: 'BarChart3',
      title: 'View Analytics',
      description: 'Access detailed attendance reports and insights',
      onClick: () => navigate('/analytics-dashboard'),
      variant: 'default'
    },
    {
      icon: 'Users',
      title: 'Student Profiles',
      description: 'Review individual student attendance records',
      onClick: () => navigate('/student-profile'),
      variant: 'default'
    },
    {
      icon: 'MessageSquare',
      title: 'Send Notifications',
      description: 'Communicate with students and parents',
      onClick: () => {},
      variant: 'success'
    }
  ];

  const adminQuickActions = [
    {
      icon: 'TrendingUp',
      title: 'Institutional Trends',
      description: 'View school-wide attendance patterns',
      onClick: () => navigate('/analytics-dashboard'),
      variant: 'primary'
    },
    {
      icon: 'AlertTriangle',
      title: 'At-Risk Students',
      description: 'Identify students with attendance concerns',
      onClick: () => navigate('/student-profile'),
      variant: 'warning'
    },
    {
      icon: 'FileText',
      title: 'Compliance Reports',
      description: 'Generate regulatory compliance documentation',
      onClick: () => {},
      variant: 'default'
    },
    {
      icon: 'Settings',
      title: 'System Settings',
      description: 'Configure attendance policies and rules',
      onClick: () => navigate('/admin-console'),
      variant: 'default'
    }
  ];

  const studentQuickActions = [
    {
      icon: 'Calendar',
      title: 'My Attendance',
      description: 'View your personal attendance record',
      onClick: () => navigate('/student-profile'),
      variant: 'primary'
    },
    {
      icon: 'Clock',
      title: 'Upcoming Classes',
      description: 'Check your schedule for today',
      onClick: () => {},
      variant: 'default'
    },
    {
      icon: 'FileText',
      title: 'Submit Excuse',
      description: 'Upload documentation for absences',
      onClick: () => {},
      variant: 'default'
    },
    {
      icon: 'Bell',
      title: 'Notifications',
      description: 'View attendance alerts and reminders',
      onClick: () => {},
      variant: 'success'
    }
  ];

  const teacherStats = [
    {
      icon: 'Users',
      title: 'Total Students',
      value: '156',
      change: '+12',
      changeType: 'positive',
      subtitle: 'Across 5 classes'
    },
    {
      icon: 'CheckCircle2',
      title: 'Present Today',
      value: '142',
      change: '91%',
      changeType: 'positive',
      subtitle: '14 absent students'
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

  const adminStats = [
    {
      icon: 'Building2',
      title: 'School Attendance',
      value: '92.3%',
      change: '+1.5%',
      changeType: 'positive',
      subtitle: 'Institution-wide'
    },
    {
      icon: 'Users',
      title: 'Total Enrollment',
      value: '1,247',
      change: '+23',
      changeType: 'positive',
      subtitle: 'Active students'
    },
    {
      icon: 'AlertTriangle',
      title: 'At-Risk Students',
      value: '34',
      change: '-5',
      changeType: 'positive',
      subtitle: 'Below 75% threshold'
    },
    {
      icon: 'FileCheck',
      title: 'Reports Generated',
      value: '127',
      change: '+18',
      changeType: 'positive',
      subtitle: 'This month'
    }
  ];

  const studentStats = [
    {
      icon: 'Calendar',
      title: 'My Attendance',
      value: '94.2%',
      change: '+3.1%',
      changeType: 'positive',
      subtitle: 'This semester'
    },
    {
      icon: 'CheckCircle2',
      title: 'Classes Attended',
      value: '142',
      change: '151 total',
      changeType: 'neutral',
      subtitle: '9 absences'
    },
    {
      icon: 'Clock',
      title: 'On-Time Rate',
      value: '96.8%',
      change: '+1.2%',
      changeType: 'positive',
      subtitle: 'Punctuality score'
    },
    {
      icon: 'Award',
      title: 'Attendance Rank',
      value: '#12',
      change: 'Top 10%',
      changeType: 'positive',
      subtitle: 'In your grade'
    }
  ];



  const getQuickActions = () => {
    switch (currentRole) {
      case 'admin':
        return adminQuickActions;
      case 'student':
        return studentQuickActions;
      default:
        return teacherQuickActions;
    }
  };

  const getStats = () => {
    switch (currentRole) {
      case 'admin':
        return adminStats;
      case 'student':
        return studentStats;
      default:
        return teacherStats;
    }
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''} bg-background min-h-screen`}>
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>

            <div className="flex items-center justify-end gap-3">
              <RoleSelector
                currentRole={currentRole}
                onRoleChange={setCurrentRole}
                availableRoles={availableRoles}
              />
              <button className="p-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors">
                <Icon name="Bell" size={20} className="text-foreground" />
              </button>
              <button className="p-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors">
                <Icon name="Settings" size={20} className="text-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getStats()?.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getQuickActions()?.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const Dashboard = () => {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
};

export default Dashboard;