import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import QuickActionCard from './components/QuickActionCard';
import StatCard from './components/StatCard';
import ActivityFeed from './components/ActivityFeed';
import UpcomingClasses from './components/UpcomingClasses';
import AttendanceOverview from './components/AttendanceOverview';
import NotificationBadge from './components/NotificationBadge';
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

  const now = new Date();
  const recentActivities = [
    {
      id: 1,
      type: 'attendance',
      title: 'Attendance Marked',
      description: 'Mathematics - Grade 10A (28/30 present)',
      timestamp: new Date(now.getTime() - 1800000)
    },
    {
      id: 2,
      type: 'alert',
      title: 'Low Attendance Alert',
      description: 'Sarah Johnson - Below 75% threshold',
      timestamp: new Date(now.getTime() - 3600000)
    },
    {
      id: 3,
      type: 'report',
      title: 'Weekly Report Generated',
      description: 'Attendance summary for Dec 4-8, 2025',
      timestamp: new Date(now.getTime() - 7200000)
    },
    {
      id: 4,
      type: 'message',
      title: 'Parent Communication',
      description: 'Sent absence notification to 5 parents',
      timestamp: new Date(now.getTime() - 10800000)
    },
    {
      id: 5,
      type: 'update',
      title: 'System Update',
      description: 'New analytics features now available',
      timestamp: new Date(now.getTime() - 86400000)
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      className: 'Grade 10A',
      room: 'Room 204',
      startTime: new Date(2025, 11, 11, 9, 0),
      endTime: new Date(2025, 11, 11, 9, 45),
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Physics',
      className: 'Grade 11B',
      room: 'Lab 3',
      startTime: new Date(2025, 11, 11, 10, 0),
      endTime: new Date(2025, 11, 11, 10, 45),
      status: 'upcoming'
    },
    {
      id: 3,
      subject: 'Chemistry',
      className: 'Grade 10C',
      room: 'Lab 2',
      startTime: new Date(2025, 11, 11, 11, 30),
      endTime: new Date(2025, 11, 11, 12, 15),
      status: 'upcoming'
    },
    {
      id: 4,
      subject: 'Biology',
      className: 'Grade 12A',
      room: 'Room 301',
      startTime: new Date(2025, 11, 11, 14, 0),
      endTime: new Date(2025, 11, 11, 14, 45),
      status: 'upcoming'
    }
  ];

  const attendanceOverviewData = [
    {
      id: 1,
      className: 'Grade 10A - Mathematics',
      present: 28,
      absent: 2,
      total: 30
    },
    {
      id: 2,
      className: 'Grade 11B - Physics',
      present: 24,
      absent: 1,
      total: 25
    },
    {
      id: 3,
      className: 'Grade 10C - Chemistry',
      present: 21,
      absent: 6,
      total: 27
    },
    {
      id: 4,
      className: 'Grade 12A - Biology',
      present: 26,
      absent: 2,
      total: 28
    }
  ];

  const notifications = [
    {
      id: 1,
      icon: 'AlertTriangle',
      title: 'Low Attendance Alert',
      message: 'Sarah Johnson has fallen below 75% attendance threshold',
      timestamp: new Date(now.getTime() - 1800000),
      priority: 'high',
      read: false
    },
    {
      id: 2,
      icon: 'FileText',
      title: 'Report Ready',
      message: 'Your weekly attendance report is ready for download',
      timestamp: new Date(now.getTime() - 3600000),
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      icon: 'MessageSquare',
      title: 'Parent Response',
      message: 'Mrs. Anderson responded to absence notification',
      timestamp: new Date(now.getTime() - 7200000),
      priority: 'low',
      read: true
    },
    {
      id: 4,
      icon: 'Bell',
      title: 'System Reminder',
      message: "Don't forget to mark attendance for Period 3",
      timestamp: new Date(now.getTime() - 10800000),
      priority: 'medium',
      read: false
    }
  ];

  const weatherData = {
    location: 'School Campus',
    temperature: 24,
    condition: 'sunny',
    description: 'Perfect weather for outdoor activities',
    humidity: 65,
    windSpeed: 12,
    visibility: 10
  };

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

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getUserName = () => {
    switch (currentRole) {
      case 'admin':
        return 'Dr. Michael Chen';
      case 'student':
        return 'Emma Wilson';
      default:
        return 'Prof. Sarah Anderson';
    }
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''} bg-background min-h-screen`}>
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {getGreeting()}, {getUserName()}
                </h1>
                <p className="text-muted-foreground">
                  {currentTime?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {currentRole === 'teacher' && (
                  <AttendanceOverview data={attendanceOverviewData} />
                )}
                <ActivityFeed activities={recentActivities} />
              </div>
              <div className="space-y-6">
                {(currentRole === 'teacher' || currentRole === 'student') && (
                  <UpcomingClasses classes={upcomingClasses} />
                )}
                <NotificationBadge notifications={notifications} />
              </div>
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