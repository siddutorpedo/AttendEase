import React, { useState, useEffect } from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentCard from './components/StudentCard';
import AttendanceControls from './components/AttendanceControls';
import QuickFilters from './components/QuickFilters';
import ClassSelector from './components/ClassSelector';
import SearchBar from './components/SearchBar';
import BulkActionModal from './components/BulkActionModal';
import AttendanceStats from './components/AttendanceStats';
import SuccessToast from './components/SuccessToast';
import { useData } from '../../contexts/DataContext';

const LiveAttendanceContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const { students: adminStudents, subjects: adminSubjects, markAttendance, getAttendanceByDateAndSubject } = useData();

  // Convert admin students to attendance format
  const getStudentsWithAttendance = () => {
    return adminStudents.map((student, index) => {
      // Generate avatar URL with student initials
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
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Load attendance records for selected date and class
  useEffect(() => {
    const attendanceRecords = getAttendanceByDateAndSubject(selectedClass, selectedDate);
    const students = getStudentsWithAttendance();
    
    // Update student statuses based on attendance records
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

  // Get students for the current selected class
  const students = studentsAttendance[selectedClass] || getStudentsWithAttendance();

  const sessionInfo = {
    date: new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    session: 'Morning Session (9:00 AM - 12:00 PM)'
  };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleMarkAttendance = (studentId, status = null) => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Determine the status
    let newStatus = status;
    if (!status) {
      const currentStudentStatus = students.find(s => s.id === studentId)?.status;
      newStatus = currentStudentStatus === 'present' ? 'absent' : 'present';
    }

    // Mark attendance in central data structure
    markAttendance(studentId, selectedClass, selectedDate, newStatus);

    // Update local UI state
    setStudentsAttendance((prev) => {
      const classStudents = prev[selectedClass] || [];
      const newStudents = classStudents.map((student) => {
        if (student.id === studentId) {
          setUndoStack((stack) => [
            ...stack,
            { studentId, previousStatus: student.status, classId: selectedClass, date: selectedDate }
          ]);

          return {
            ...student,
            status: newStatus,
            lastMarkedTime: newStatus !== 'unmarked' ? currentTime : null
          };
        }
        return student;
      });

      playSuccessSound();
      showSuccessToast('Attendance marked successfully');
      return {
        ...prev,
        [selectedClass]: newStudents
      };
    });
  };

  const handleMarkAll = (status) => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    setStudentsAttendance((prev) => {
      const classStudents = prev[selectedClass] || [];
      const undoData = classStudents.map((s) => ({
        studentId: s.id,
        previousStatus: s.status,
        classId: selectedClass,
        date: selectedDate
      }));
      setUndoStack((stack) => [...stack, ...undoData]);

      return {
        ...prev,
        [selectedClass]: classStudents.map((student) => ({
          ...student,
          status,
          lastMarkedTime: currentTime
        }))
      };
    });

    // Mark all students in central data
    students.forEach(student => {
      markAttendance(student.id, selectedClass, selectedDate, status);
    });

    playSuccessSound();
    showSuccessToast(`All students marked as ${status}`);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const lastAction = undoStack[undoStack.length - 1];
    
    setStudentsAttendance((prev) => {
      const classStudents = prev[lastAction.classId] || [];
      return {
        ...prev,
        [lastAction.classId]: classStudents.map((student) =>
          student.id === lastAction.studentId ?
            { ...student, status: lastAction.previousStatus } :
            student
        )
      };
    });

    setUndoStack((stack) => stack.slice(0, -1));
    showSuccessToast('Action undone');
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showSuccessToast('Attendance data synced successfully');
    }, 2000);
  };

  const handleBulkAction = (action) => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    setStudentsAttendance((prev) => {
      const classStudents = prev[selectedClass] || [];
      return {
        ...prev,
        [selectedClass]: classStudents.map((student) =>
          selectedStudents.includes(student.id) ?
            { ...student, status: action, lastMarkedTime: currentTime } :
            student
        )
      };
    });

    // Mark attendance in central data for all selected students
    selectedStudents.forEach(studentId => {
      markAttendance(studentId, selectedClass, selectedDate, action);
    });

    setSelectedStudents([]);
    playSuccessSound();
    showSuccessToast(`Bulk action applied to ${selectedStudents.length} students`);
  };

  const playSuccessSound = () => {
    // Remove the malformed base64 audio string and use a simple approach
    const audio = new Audio();
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
    activeFilter === 'all' ||
    activeFilter === 'concerns' && student.hasAttendanceConcern ||
    activeFilter === 'unmarked' && student.status === 'unmarked' ||
    student.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: students.length,
    present: students.filter((s) => s.status === 'present').length,
    absent: students.filter((s) => s.status === 'absent').length,
    unmarked: students.filter((s) => s.status === 'unmarked').length,
    concerns: students.filter((s) => s.hasAttendanceConcern).length
  };

  const stats = {
    present: counts.present,
    presentPercentage: Math.round(counts.present / students.length * 100),
    absent: counts.absent,
    absentPercentage: Math.round(counts.absent / students.length * 100)
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="p-6 space-y-6 bg-background min-h-screen">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Live Attendance
            </h1>
            <p className="text-muted-foreground">
              Mark and manage student attendance in real-time
            </p>
          </div>

          {/* Session Info and Date Picker */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground mb-1">Date</p>
              <p className="text-lg font-semibold text-foreground">{sessionInfo.date}</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground mb-1">Select Date</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground mb-1">Session</p>
              <p className="text-sm font-medium text-foreground">{sessionInfo.session}</p>
            </div>
          </div>

          <ClassSelector
            classes={mockClasses}
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
            sessionInfo={sessionInfo} />


          <AttendanceStats stats={stats} />

          <AttendanceControls
            onMarkAll={handleMarkAll}
            onUndo={handleUndo}
            onSync={handleSync}
            canUndo={undoStack.length > 0}
            isSyncing={isSyncing}
            isOffline={isOffline}
            selectedCount={
            students.filter((s) => s.status !== 'unmarked').length
            }
            totalCount={students.length} />


          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <QuickFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={counts} />

              <div className="flex gap-3 w-full lg:w-auto">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery} />

                {selectedStudents.length > 0 &&
                <Button
                  variant="default"
                  iconName="CheckSquare"
                  onClick={() => setIsBulkModalOpen(true)}>

                    Bulk Action ({selectedStudents.length})
                  </Button>
                }
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) =>
              <StudentCard
                key={student.id}
                student={student}
                onMarkAttendance={handleMarkAttendance}
                onToggleSelection={toggleStudentSelection}
                isSelected={selectedStudents.includes(student.id)} />

              )}
            </div>

            {filteredStudents.length === 0 &&
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No students found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            }
          </div>
        </div>

        <BulkActionModal
          isOpen={isBulkModalOpen}
          onClose={() => setIsBulkModalOpen(false)}
          selectedStudents={selectedStudents}
          onApply={handleBulkAction} />


        <SuccessToast
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)} />

      </main>
    </>);

};

const LiveAttendance = () => {
  return (
    <SidebarProvider>
      <LiveAttendanceContent />
    </SidebarProvider>);

};

export default LiveAttendance;