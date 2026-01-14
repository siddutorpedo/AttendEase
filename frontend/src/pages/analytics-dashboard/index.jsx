import React, { useState } from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import { useData } from '../../contexts/DataContext';

const AnalyticsDashboardContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const { students, subjects } = useData();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Generate dynamic student attendance data from admin students
  const generateAttendanceData = () => {
    const totalClasses = 30;
    return students.map((student, index) => {
      const attended = Math.floor(Math.random() * (totalClasses - 15) + 15);
      const absent = totalClasses - attended;
      const percentage = parseFloat(((attended / totalClasses) * 100).toFixed(1));
      
      let status = 'Excellent';
      if (percentage < 75) status = 'Low';
      else if (percentage < 85) status = 'Ok';
      else if (percentage < 90) status = 'Good';
      
      return {
        id: `STU${String(index + 1).padStart(3, '0')}`,
        name: student.name,
        roll: student.roll,
        totalClasses,
        attended,
        absent,
        percentage,
        status
      };
    });
  };

  const studentAttendanceData = generateAttendanceData();

  // Create classes from subjects
  const classes = subjects.map((subject, index) => ({
    id: `class-${index}`,
    name: subject.name,
    subjectCode: subject.code,
    academicDays: subject.academicDays || 200
  }));

  // Set default class on mount
  React.useEffect(() => {
    if (classes.length > 0 && !selectedClass) {
      setSelectedClass(classes[0].id);
    }
  }, [classes, selectedClass]);

  const filters = [
    { id: 'all', label: 'All Students' },
    { id: 'high', label: 'High (85%+)' },
    { id: 'medium', label: 'Medium (75-84%)' },
    { id: 'low', label: 'Low (<75%)' }
  ];

  const filteredStudents = studentAttendanceData.filter(student => {
    if (selectedFilter === 'high') return student.percentage >= 85;
    if (selectedFilter === 'medium') return student.percentage >= 75 && student.percentage < 85;
    if (selectedFilter === 'low') return student.percentage < 75;
    return true;
  });

  const totalStudents = students.length;
  const totalClasses = 30;
  const overallAttendance = Math.round(
    studentAttendanceData.reduce((sum, s) => sum + s.percentage, 0) / studentAttendanceData.length
  );
  const avgStudentPercentage = parseFloat(
    (studentAttendanceData.reduce((sum, s) => sum + s.percentage, 0) / studentAttendanceData.length).toFixed(1)
  );

  const handleExportCSV = () => {
    const headers = ['Student ID', 'Name', 'Total Classes', 'Attended', 'Absent', 'Percentage', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(s => `${s.id},${s.name},${s.totalClasses},${s.attended},${s.absent},${s.percentage},${s.status}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_report.csv';
    a.click();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Excellent': return 'bg-green-100 text-green-700';
      case 'Good': return 'bg-yellow-100 text-yellow-700';
      case 'Ok': return 'bg-orange-100 text-orange-700';
      case 'Low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };


  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''} bg-background min-h-screen`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="BarChart3" size={28} className="text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Attendance Analytics</h1>
            </div>
            <p className="text-muted-foreground">
              Analyze class attendance and student performance
            </p>
          </div>

          {/* Class Selector */}
          <div className="bg-card rounded-lg border border-border p-6">
            <label className="block text-sm font-medium text-foreground mb-3">Select Class</label>
            <select
              value={selectedClass || ''}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-1/2 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Students</p>
                  <p className="text-4xl font-bold text-foreground">{totalStudents}</p>
                </div>
                <Icon name="Users" size={24} className="text-blue-500" />
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Classes</p>
                  <p className="text-4xl font-bold text-foreground">{totalClasses}</p>
                </div>
                <Icon name="TrendingUp" size={24} className="text-green-500" />
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Overall Attendance %</p>
                  <p className="text-4xl font-bold text-green-600">{overallAttendance}%</p>
                </div>
                <Icon name="BarChart2" size={24} className="text-green-500" />
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Avg Student %</p>
                  <p className="text-4xl font-bold text-purple-600">{avgStudentPercentage}%</p>
                </div>
                <Icon name="Users" size={24} className="text-purple-500" />
              </div>
            </div>
          </div>

          {/* Student Attendance Details */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Student Attendance Details</h3>
              <button
                onClick={handleExportCSV}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
              >
                <Icon name="Download" size={16} />
                Export CSV
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="p-6 border-b border-border flex items-center gap-3 flex-wrap">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Student ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Total Classes</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Attended</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Absent</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Percentage</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{student.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{student.totalClasses}</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">{student.attended}</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">{student.absent}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{student.percentage}%</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 text-xs text-muted-foreground border-t border-border">
              Showing {filteredStudents.length} of {studentAttendanceData.length} students.
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const AnalyticsDashboard = () => {
  return (
    <SidebarProvider>
      <AnalyticsDashboardContent />
    </SidebarProvider>
  );
};

export default AnalyticsDashboard;