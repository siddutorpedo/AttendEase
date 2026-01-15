import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import { useData } from '../../contexts/DataContext';

const AnalyticsWrapper = () => {
  const { students, subjects, getAttendanceStats } = useData();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  const generateAttendanceData = () => {
    const selectedSubject = subjects.find(s => s.id === selectedClass);
    if (!selectedSubject) return [];

    return students.map((student, index) => {
      const stats = getAttendanceStats(student.id, selectedClass, dateRange.from, dateRange.to);
      
      let status = 'Excellent';
      if (stats.percentage < 75) status = 'Low';
      else if (stats.percentage < 85) status = 'Ok';
      else if (stats.percentage < 90) status = 'Good';
      
      return {
        id: `STU${String(index + 1).padStart(3, '0')}`,
        name: student.name,
        roll: student.roll,
        totalClasses: stats.totalClasses,
        attended: stats.presentCount,
        absent: stats.absentCount,
        percentage: parseFloat(stats.percentage),
        status
      };
    });
  };

  const studentAttendanceData = generateAttendanceData();

  const classes = subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    subjectCode: subject.code,
    academicDays: subject.academicDays || 200
  }));

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
    studentAttendanceData.reduce((sum, s) => sum + s.percentage, 0) / (studentAttendanceData.length || 1)
  );
  const avgStudentPercentage = parseFloat(
    (studentAttendanceData.reduce((sum, s) => sum + s.percentage, 0) / (studentAttendanceData.length || 1)).toFixed(1)
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
      case 'Good': return 'bg-blue-100 text-blue-700';
      case 'Ok': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="BarChart3" size={32} className="text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Attendance Analytics</h1>
        </div>
        <p className="text-muted-foreground">Analyze class attendance and student performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Select Class</label>
          <select
            value={selectedClass || ''}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Students</p>
              <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
            </div>
            <Icon name="Users" size={32} className="text-primary" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Classes</p>
              <p className="text-3xl font-bold text-foreground">{totalClasses}</p>
            </div>
            <Icon name="Calendar" size={32} className="text-teal-500" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Overall Attendance %</p>
              <p className="text-3xl font-bold text-primary">{overallAttendance}%</p>
            </div>
            <Icon name="TrendingUp" size={32} className="text-green-500" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Student %</p>
              <p className="text-3xl font-bold text-purple-500">{avgStudentPercentage}%</p>
            </div>
            <Icon name="BarChart3" size={32} className="text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Student Attendance Details</h2>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Icon name="Download" size={18} />
            Export CSV
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedFilter === f.id
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Student ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Total Classes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Attended</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Absent</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Percentage</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-4 py-3 text-sm text-foreground">{student.id}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{student.name}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{student.totalClasses}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{student.attended}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{student.absent}</td>
                  <td className="px-4 py-3 text-sm text-foreground font-semibold">{student.percentage}%</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWrapper;
