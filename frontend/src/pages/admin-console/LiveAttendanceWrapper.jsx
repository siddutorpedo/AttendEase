import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentCard from '../live-attendance/components/StudentCard';
import AttendanceControls from '../live-attendance/components/AttendanceControls';
import QuickFilters from '../live-attendance/components/QuickFilters';
import ClassSelector from '../live-attendance/components/ClassSelector';
import SearchBar from '../live-attendance/components/SearchBar';
import BulkActionModal from '../live-attendance/components/BulkActionModal';
import AttendanceStats from '../live-attendance/components/AttendanceStats';
import SuccessToast from '../live-attendance/components/SuccessToast';
import { useData } from '../../contexts/DataContext';

const LiveAttendanceWrapper = () => {
  const { students: adminStudents, subjects: adminSubjects, markAttendance, getAttendanceByDateAndSubject } = useData();

  const getStudentsWithAttendance = () => {
    return adminStudents.map((student, index) => {
      const initials = student.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
      
      const colors = [
        'FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8',
        'F7DC6F', 'BB8FCE', '85C1E2', 'F8B88B', 'B19CD9'
      ];
      const color = colors[index % colors.length];
      
      return {
        id: student.id,
        name: student.name,
        rollNumber: student.roll,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=${color}&color=fff&size=128&bold=true&font-size=0.4`,
        avatarAlt: `Avatar of ${student.name}`,
        status: 'unmarked',
        lastMarkedTime: null,
        attendanceRate: 0,
        hasAttendanceConcern: false
      };
    });
  };

  const mockClasses = adminSubjects.map((subject) => ({
    id: subject.id,
    name: subject.code,
    subject: subject.name,
    studentCount: adminStudents.length,
    schedule: 'Mon, Wed, Fri 9:00 AM'
  }));

  const [selectedClass, setSelectedClass] = useState(mockClasses[0]?.id || 1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [studentsAttendance, setStudentsAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const attendanceRecords = getAttendanceByDateAndSubject(selectedClass, selectedDate);
    const students = getStudentsWithAttendance();
    
    const updatedStudents = students.map(student => {
      const record = attendanceRecords.find(r => r.studentId === student.id);
      if (record) {
        return {
          ...student,
          status: record.status,
          lastMarkedTime: new Date(record.markedAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        };
      }
      return student;
    });

    setStudentsAttendance(prev => ({
      ...prev,
      [selectedClass]: updatedStudents
    }));
  }, [selectedDate, selectedClass]);

  const students = studentsAttendance[selectedClass] || getStudentsWithAttendance();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNumber.toString().includes(searchQuery);
    const matchesFilter = activeFilter === 'all' || student.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const presentCount = filteredStudents.filter(s => s.status === 'present').length;
  const absentCount = filteredStudents.filter(s => s.status === 'absent').length;

  const handleMarkAttendance = (studentId, status = null) => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Determine the status - toggle if no status provided
    let newStatus = status;
    if (!status) {
      const currentStudentStatus = students.find(s => s.id === studentId)?.status;
      newStatus = currentStudentStatus === 'present' ? 'absent' : 'present';
    }

    setUndoStack([...undoStack, selectedClass]);
    setStudentsAttendance(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass]?.map(s =>
        s.id === studentId ? { ...s, status: newStatus, lastMarkedTime: currentTime } : s
      ) || []
    }));
    markAttendance(studentId, selectedClass, selectedDate, newStatus);
  };

  const handleMarkAllPresent = () => {
    setUndoStack([...undoStack, selectedClass]);
    setStudentsAttendance(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass]?.map(s => ({ ...s, status: 'present' })) || []
    }));
    filteredStudents.forEach(student => {
      markAttendance(student.id, selectedClass, selectedDate, 'present');
    });
  };

  const handleMarkAllAbsent = () => {
    setUndoStack([...undoStack, selectedClass]);
    setStudentsAttendance(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass]?.map(s => ({ ...s, status: 'absent' })) || []
    }));
    filteredStudents.forEach(student => {
      markAttendance(student.id, selectedClass, selectedDate, 'absent');
    });
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      setUndoStack(undoStack.slice(0, -1));
      setStudentsAttendance(prev => ({
        ...prev,
        [selectedClass]: getStudentsWithAttendance()
      }));
    }
  };

  const handleSync = async () => {
    setShowToast(true);
    setToastMessage('Attendance synced successfully!');
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Attendance</h1>
        <p className="text-muted-foreground">Mark and manage student attendance in real-time</p>
      </div>

      <AttendanceControls
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        presentCount={presentCount}
        absentCount={absentCount}
        onMarkAllPresent={handleMarkAllPresent}
        onMarkAllAbsent={handleMarkAllAbsent}
        onUndo={handleUndo}
        canUndo={undoStack.length > 0}
        onSync={handleSync}
        markedCount={filteredStudents.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1">
          <ClassSelector
            classes={mockClasses}
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
          />
        </div>

        <div className="lg:col-span-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, roll number"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <QuickFilters
          filters={[
            { id: 'all', label: 'All Students', count: students.length },
            { id: 'present', label: 'Present', count: presentCount },
            { id: 'absent', label: 'Absent', count: absentCount }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStudents.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onMarkAttendance={handleMarkAttendance}
          />
        ))}
      </div>

      {showToast && <SuccessToast message={toastMessage} />}
    </div>
  );
};

export default LiveAttendanceWrapper;
