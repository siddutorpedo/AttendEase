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

const LiveAttendanceContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();

  const mockClasses = [
  {
    id: 'cs101',
    name: 'CS 101',
    subject: 'Introduction to Programming',
    studentCount: 45,
    schedule: 'Mon, Wed, Fri 9:00 AM'
  },
  {
    id: 'math201',
    name: 'MATH 201',
    subject: 'Calculus II',
    studentCount: 38,
    schedule: 'Tue, Thu 10:30 AM'
  },
  {
    id: 'eng102',
    name: 'ENG 102',
    subject: 'English Literature',
    studentCount: 42,
    schedule: 'Mon, Wed 2:00 PM'
  }];


  const mockStudents = [
  {
    id: 'st001',
    name: 'Sarah Johnson',
    rollNumber: 'CS2024001',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99ce68c-1763293773878.png",
    avatarAlt:
    'Professional headshot of young woman with brown hair wearing blue blazer smiling at camera',
    status: 'present',
    lastMarkedTime: '9:05 AM',
    attendanceRate: 92,
    hasAttendanceConcern: false
  },
  {
    id: 'st002',
    name: 'Michael Chen',
    rollNumber: 'CS2024002',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
    avatarAlt:
    'Professional headshot of Asian man with black hair wearing gray suit and glasses',
    status: 'absent',
    lastMarkedTime: null,
    attendanceRate: 68,
    hasAttendanceConcern: true
  },
  {
    id: 'st003',
    name: 'Emily Rodriguez',
    rollNumber: 'CS2024003',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    avatarAlt:
    'Professional headshot of Hispanic woman with long dark hair wearing white blouse',
    status: 'late',
    lastMarkedTime: '9:15 AM',
    attendanceRate: 85,
    hasAttendanceConcern: false
  },
  {
    id: 'st004',
    name: 'David Thompson',
    rollNumber: 'CS2024004',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1737de3d0-1763299932237.png",
    avatarAlt:
    'Professional headshot of man with short blonde hair wearing navy blue shirt',
    status: 'present',
    lastMarkedTime: '9:02 AM',
    attendanceRate: 95,
    hasAttendanceConcern: false
  },
  {
    id: 'st005',
    name: 'Priya Patel',
    rollNumber: 'CS2024005',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc96d634-1763295460493.png",
    avatarAlt:
    'Professional headshot of Indian woman with black hair wearing red traditional attire',
    status: 'excused',
    lastMarkedTime: '8:55 AM',
    attendanceRate: 88,
    hasAttendanceConcern: false
  },
  {
    id: 'st006',
    name: 'James Wilson',
    rollNumber: 'CS2024006',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1faa738ad-1763294932464.png",
    avatarAlt:
    'Professional headshot of African American man with short hair wearing black suit',
    status: 'unmarked',
    lastMarkedTime: null,
    attendanceRate: 78,
    hasAttendanceConcern: false
  },
  {
    id: 'st007',
    name: 'Sophia Martinez',
    rollNumber: 'CS2024007',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14fbbc1e3-1765215925472.png",
    avatarAlt:
    'Professional headshot of woman with curly brown hair wearing green sweater',
    status: 'present',
    lastMarkedTime: '9:01 AM',
    attendanceRate: 91,
    hasAttendanceConcern: false
  },
  {
    id: 'st008',
    name: "Ryan O'Connor",
    rollNumber: 'CS2024008',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce6710c7-1763295988454.png",
    avatarAlt:
    'Professional headshot of man with red hair and beard wearing plaid shirt',
    status: 'unmarked',
    lastMarkedTime: null,
    attendanceRate: 82,
    hasAttendanceConcern: false
  },
  {
    id: 'st009',
    name: 'Aisha Khan',
    rollNumber: 'CS2024009',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e34b60fa-1763296065037.png",
    avatarAlt:
    'Professional headshot of woman with hijab wearing purple dress smiling warmly',
    status: 'absent',
    lastMarkedTime: null,
    attendanceRate: 65,
    hasAttendanceConcern: true
  },
  {
    id: 'st010',
    name: 'Daniel Kim',
    rollNumber: 'CS2024010',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc879078-1763296717393.png",
    avatarAlt:
    'Professional headshot of Korean man with black hair wearing white shirt and tie',
    status: 'present',
    lastMarkedTime: '9:03 AM',
    attendanceRate: 94,
    hasAttendanceConcern: false
  },
  {
    id: 'st011',
    name: 'Isabella Garcia',
    rollNumber: 'CS2024011',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12388c5e5-1763298058472.png",
    avatarAlt:
    'Professional headshot of woman with long black hair wearing yellow blouse',
    status: 'late',
    lastMarkedTime: '9:20 AM',
    attendanceRate: 80,
    hasAttendanceConcern: false
  },
  {
    id: 'st012',
    name: 'Marcus Brown',
    rollNumber: 'CS2024012',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1104fed-1763295038097.png",
    avatarAlt:
    'Professional headshot of man with short dark hair wearing gray sweater',
    status: 'unmarked',
    lastMarkedTime: null,
    attendanceRate: 87,
    hasAttendanceConcern: false
  }];


  const [selectedClass, setSelectedClass] = useState('cs101');
  const [students, setStudents] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

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
    setStudents((prev) => {
      const newStudents = prev.map((student) => {
        if (student.id === studentId) {
          const currentTime = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          let newStatus = status;
          if (!status) {
            const statusCycle = ['unmarked', 'present', 'absent', 'late', 'excused'];
            const currentIndex = statusCycle.indexOf(student.status);
            newStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
          }

          setUndoStack((stack) => [
          ...stack,
          { studentId, previousStatus: student.status }]
          );

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
      return newStudents;
    });
  };

  const handleMarkAll = (status) => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    setStudents((prev) => {
      const undoData = prev.map((s) => ({
        studentId: s.id,
        previousStatus: s.status
      }));
      setUndoStack((stack) => [...stack, ...undoData]);

      return prev.map((student) => ({
        ...student,
        status,
        lastMarkedTime: currentTime
      }));
    });

    playSuccessSound();
    showSuccessToast(`All students marked as ${status}`);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const lastAction = undoStack[undoStack.length - 1];
    setStudents((prev) =>
    prev.map((student) =>
    student.id === lastAction.studentId ?
    { ...student, status: lastAction.previousStatus } :
    student
    )
    );

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

    setStudents((prev) =>
    prev.map((student) =>
    selectedStudents.includes(student.id) ?
    { ...student, status: action, lastMarkedTime: currentTime } :
    student
    )
    );

    setSelectedStudents([]);
    playSuccessSound();
    showSuccessToast(`Bulk action applied to ${selectedStudents.length} students`);
  };

  const handleScanQR = () => {
    showSuccessToast('QR Scanner opened - Feature coming soon');
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
    late: students.filter((s) => s.status === 'late').length,
    excused: students.filter((s) => s.status === 'excused').length,
    unmarked: students.filter((s) => s.status === 'unmarked').length,
    concerns: students.filter((s) => s.hasAttendanceConcern).length
  };

  const stats = {
    present: counts.present,
    presentPercentage: Math.round(counts.present / students.length * 100),
    absent: counts.absent,
    absentPercentage: Math.round(counts.absent / students.length * 100),
    late: counts.late,
    latePercentage: Math.round(counts.late / students.length * 100),
    excused: counts.excused,
    excusedPercentage: Math.round(counts.excused / students.length * 100)
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="p-6 space-y-6 bg-background min-h-screen">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Live Attendance
              </h1>
              <p className="text-muted-foreground">
                Mark and manage student attendance in real-time
              </p>
            </div>
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              onClick={() => showSuccessToast('Export feature coming soon')}>

              Export Report
            </Button>
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
                  onSearchChange={setSearchQuery}
                  onScanQR={handleScanQR} />

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