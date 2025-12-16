import React, { useState } from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import MetricCard from './components/MetricCard';
import AttendanceChart from './components/AttendanceChart';
import AtRiskStudents from './components/AtRiskStudents';
import ClassPerformance from './components/ClassPerformance';
import DateRangeSelector from './components/DateRangeSelector';
import ExportReports from './components/ExportReports';
import TrendAnalysis from './components/TrendAnalysis';
import ScheduledReports from './components/ScheduledReports';

const AnalyticsDashboardContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [selectedView, setSelectedView] = useState('overview');

  const metricsData = [
  {
    title: "Overall Attendance Rate",
    value: "94.2%",
    change: "+2.3%",
    changeType: "positive",
    icon: "Users",
    iconColor: "bg-gradient-to-br from-primary to-secondary",
    trend: true
  },
  {
    title: "At-Risk Students",
    value: "23",
    change: "-5",
    changeType: "positive",
    icon: "AlertTriangle",
    iconColor: "bg-gradient-to-br from-warning to-error",
    trend: true
  },
  {
    title: "Average Class Size",
    value: "28.5",
    change: "+1.2",
    changeType: "neutral",
    icon: "GraduationCap",
    iconColor: "bg-gradient-to-br from-secondary to-primary",
    trend: true
  },
  {
    title: "Chronic Absenteeism",
    value: "4.8%",
    change: "-1.2%",
    changeType: "positive",
    icon: "TrendingDown",
    iconColor: "bg-gradient-to-br from-success to-secondary",
    trend: true
  }];


  const weeklyAttendanceData = [
  { name: 'Mon', attendance: 95, target: 95 },
  { name: 'Tue', attendance: 93, target: 95 },
  { name: 'Wed', attendance: 96, target: 95 },
  { name: 'Thu', attendance: 94, target: 95 },
  { name: 'Fri', attendance: 92, target: 95 }];


  const monthlyAttendanceData = [
  { name: 'Week 1', attendance: 94, target: 95 },
  { name: 'Week 2', attendance: 95, target: 95 },
  { name: 'Week 3', attendance: 93, target: 95 },
  { name: 'Week 4', attendance: 96, target: 95 }];


  const atRiskStudentsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    studentId: "STU2023001",
    class: "Grade 10-A",
    attendanceRate: 72,
    riskLevel: "high",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10f2a5121-1763301808135.png",
    avatarAlt: "Professional headshot of young woman with long brown hair wearing blue school uniform"
  },
  {
    id: 2,
    name: "Michael Chen",
    studentId: "STU2023045",
    class: "Grade 11-B",
    attendanceRate: 81,
    riskLevel: "medium",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1503498df-1763291727218.png",
    avatarAlt: "Professional headshot of Asian male student with short black hair in white shirt"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    studentId: "STU2023089",
    class: "Grade 9-C",
    attendanceRate: 68,
    riskLevel: "high",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a36548bd-1763296665300.png",
    avatarAlt: "Professional headshot of Hispanic female student with curly dark hair wearing red sweater"
  },
  {
    id: 4,
    name: "David Thompson",
    studentId: "STU2023112",
    class: "Grade 12-A",
    attendanceRate: 85,
    riskLevel: "medium",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    avatarAlt: "Professional headshot of Caucasian male student with blonde hair in navy blazer"
  },
  {
    id: 5,
    name: "Aisha Patel",
    studentId: "STU2023156",
    class: "Grade 10-B",
    attendanceRate: 75,
    riskLevel: "high",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18e23b0ba-1763300956208.png",
    avatarAlt: "Professional headshot of Indian female student with long black hair wearing green traditional dress"
  }];


  const classPerformanceData = [
  {
    id: 1,
    name: "Mathematics - Grade 10",
    teacher: "Prof. Anderson",
    students: 32,
    attendanceRate: 96,
    trend: "+3% this month"
  },
  {
    id: 2,
    name: "English Literature - Grade 11",
    teacher: "Dr. Williams",
    students: 28,
    attendanceRate: 89,
    trend: "-2% this month"
  },
  {
    id: 3,
    name: "Physics - Grade 12",
    teacher: "Prof. Martinez",
    students: 25,
    attendanceRate: 94,
    trend: "+1% this month"
  },
  {
    id: 4,
    name: "History - Grade 9",
    teacher: "Ms. Taylor",
    students: 30,
    attendanceRate: 92,
    trend: "Stable"
  },
  {
    id: 5,
    name: "Chemistry - Grade 11",
    teacher: "Dr. Brown",
    students: 27,
    attendanceRate: 87,
    trend: "-4% this month"
  }];


  const trendAnalysisData = [
  {
    id: 1,
    title: "Monday Morning Attendance",
    description: "Consistent improvement in Monday morning attendance rates across all grades",
    period: "Last 8 weeks",
    change: "+5.2%",
    type: "improving"
  },
  {
    id: 2,
    title: "Post-Holiday Attendance",
    description: "Decline in attendance rates following extended holiday breaks",
    period: "Last 3 quarters",
    change: "-3.8%",
    type: "declining"
  },
  {
    id: 3,
    title: "Senior Class Engagement",
    description: "Grade 12 students maintaining stable attendance throughout semester",
    period: "Current semester",
    change: "±0.5%",
    type: "stable"
  },
  {
    id: 4,
    title: "Weather Impact Analysis",
    description: "Significant correlation between severe weather and attendance drops",
    period: "Winter months",
    change: "-7.2%",
    type: "declining"
  }];


  const scheduledReportsData = [
  {
    id: 1,
    name: "Daily Attendance Summary",
    frequency: "daily",
    nextRun: "Tomorrow 8:00 AM",
    status: "active"
  },
  {
    id: 2,
    name: "Weekly Performance Report",
    frequency: "weekly",
    nextRun: "Monday 9:00 AM",
    status: "active"
  },
  {
    id: 3,
    name: "Monthly Compliance Report",
    frequency: "monthly",
    nextRun: "Dec 1, 2025",
    status: "active"
  },
  {
    id: 4,
    name: "Quarterly Analytics Review",
    frequency: "monthly",
    nextRun: "Jan 1, 2026",
    status: "paused"
  }];


  const handleDateRangeChange = (range) => {
    console.log('Date range changed to:', range);
  };

  const views = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
  { id: 'reports', label: 'Reports', icon: 'FileText' },
  { id: 'predictions', label: 'Predictions', icon: 'Brain' }];


  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''} bg-background min-h-screen`}>
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Transform attendance data into actionable educational intelligence
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors duration-300">
                <Icon name="RefreshCw" size={16} />
                <span className="text-sm font-medium">Refresh</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                <Icon name="Download" size={16} />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 bg-muted rounded-lg w-fit">
            {views?.map((view) =>
            <button
              key={view?.id}
              onClick={() => setSelectedView(view?.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedView === view?.id ?
              'bg-card text-foreground shadow-soft' :
              'text-muted-foreground hover:text-foreground'}`
              }>

                <Icon name={view?.icon} size={16} />
                <span className="text-sm font-medium">{view?.label}</span>
              </button>
            )}
          </div>

          <DateRangeSelector onRangeChange={handleDateRangeChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData?.map((metric, index) =>
            <MetricCard key={index} {...metric} />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceChart
              data={weeklyAttendanceData}
              type="line"
              title="Weekly Attendance Trends"
              height={300} />

            <AttendanceChart
              data={monthlyAttendanceData}
              type="bar"
              title="Monthly Performance"
              height={300} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AtRiskStudents students={atRiskStudentsData} />
            </div>
            <ClassPerformance classes={classPerformanceData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendAnalysis trends={trendAnalysisData} />
            <ScheduledReports reports={scheduledReportsData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="Brain" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Predictive Insights</h3>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  AI-Powered
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <Icon name="AlertTriangle" size={20} className="text-warning mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        Increased Absenteeism Risk
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Grade 11-B shows 15% higher probability of attendance decline in next 2 weeks based on historical patterns and current trends
                      </p>
                      <button className="text-xs text-warning hover:text-warning/80 font-medium">
                        View Recommendations →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-success mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        Positive Engagement Trend
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Mathematics classes showing sustained improvement with 92% confidence of maintaining 95%+ attendance through semester end
                      </p>
                      <button className="text-xs text-success hover:text-success/80 font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        Intervention Opportunity
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Early intervention for 8 students could prevent chronic absenteeism classification. Recommended actions available
                      </p>
                      <button className="text-xs text-primary hover:text-primary/80 font-medium">
                        Create Action Plan →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ExportReports />
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon name="MessageSquare" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Collaborative Annotations</h3>
              </div>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 flex items-center gap-1">
                <Icon name="Plus" size={16} />
                <span>Add Note</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  JD
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">Dr. Jane Davis</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notable improvement in Grade 10 attendance after implementing morning mentorship program. Consider expanding to other grades.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold">
                  MS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">Michael Smith</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Weather-related absences spiking. Recommend proactive communication with parents about remote learning options during severe weather.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>);

};

const AnalyticsDashboard = () => {
  return (
    <SidebarProvider>
      <AnalyticsDashboardContent />
    </SidebarProvider>);

};

export default AnalyticsDashboard;