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
  const { students: adminStudents, subjects: adminSubjects } = useData();

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
        id: `st${String(index + 1).padStart(3, '0')}`,
        name: student.name,
        rollNumber: student.roll,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=${color}&color=fff&size=128&bold=true&font-size=0.4`,
        avatarAlt: `Avatar of ${student.name}`,
        status: 'present',
        lastMarkedTime: '9:05 AM',
        attendanceRate: Math.floor(Math.random() * (95 - 65 + 1)) + 65,
        hasAttendanceConcern: false
      };
    });
  };

  const mockClasses = adminSubjects.map((subject, index) => ({
    id: subject.code.toLowerCase(),
    name: subject.code,
    subject: subject.name,
    studentCount: adminStudents.length,
    schedule: 'Mon, Wed, Fri 9:00 AM'
  }));

  const [selectedClass, setSelectedClass] = useState(mockClasses[0]?.id || 'cs101');
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

  // Initialize attendance records for each class
  useEffect(() => {
    const initialAttendance = {};
    mockClasses.forEach((classItem) => {
      if (!initialAttendance[classItem.id]) {
        initialAttendance[classItem.id] = getStudentsWithAttendance();
      }
    });
    setStudentsAttendance(initialAttendance);
  }, [mockClasses.length]);

  // Get students for the current selected class
  const students = studentsAttendance[selectedClass] || getStudentsWithAttendance();

  const sessionInfo = {
    date: new Date().toLocaleDateString('en-US', {
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
    setStudentsAttendance((prev) => {
      const classStudents = prev[selectedClass] || [];
      const newStudents = classStudents.map((student) => {
        if (student.id === studentId) {
          const currentTime = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          let newStatus = status;
          if (!status) {
            // Toggle between present and absent
            newStatus = student.status === 'present' ? 'absent' : 'present';
          }

          setUndoStack((stack) => [
            ...stack,
            { studentId, previousStatus: student.status, classId: selectedClass }
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
        classId: selectedClass
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