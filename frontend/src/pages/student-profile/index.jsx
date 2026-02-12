import React, { useState, useEffect } from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import AttendanceBySubject from './components/AttendanceBySubject';
import AttendanceDistribution from './components/AttendanceDistribution';
import SubjectAttendanceDetails from './components/SubjectAttendanceDetails';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const StudentProfileContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const { user } = useAuth();
  const { students, attendance, subjects, getAttendanceByStudent } = useData();
  const [selectedSubject, setSelectedSubject] = useState('');

  const loggedInStudent = students.find(
    (s) => String(s._id || s.id).toLowerCase() === String(user?.id || user?._id || '').toLowerCase()
  ) || students.find(
    (s) => s.name?.toLowerCase() === user?.name?.toLowerCase()
  );

  const [studentData, setStudentData] = useState({
    name: user?.name || "Student",
    studentId: user?.rollNo || "STU-0000",
    grade: "Grade 10",
    section: "Section A",
    enrollmentDate: "August 15, 2023",
    profileImage: "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "Student") + "&background=45B7D1&color=fff&size=256&bold=true&font-size=0.4",
    profileImageAlt: `Profile photo of ${user?.name}`,
    attendanceRate: 0,
    daysPresent: 0,
    daysAbsent: 0,
    lateArrivals: 5,
    email: loggedInStudent?.email || user?.email || "student@attendease.edu",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "March 12, 2009",
    address: "456 Oak Avenue, Springfield, IL 62701",
    parentName: "Maria Rodriguez",
    emergencyContact: "+1 (555) 234-5679",
    bloodGroup: "O+",
    medicalAlerts: "Mild asthma - inhaler available in nurse's office"
  });

  // Load profile photo from localStorage on mount
  useEffect(() => {
    const savedProfilePhoto = localStorage.getItem('studentProfilePhoto');
    if (savedProfilePhoto) {
      setStudentData(prev => ({
        ...prev,
        profileImage: savedProfilePhoto
      }));
    }
  }, []);

  // Recalculate attendance metrics when data changes
  useEffect(() => {
    if (!loggedInStudent) return;

    const studentId = loggedInStudent._id || loggedInStudent.id;
    const records = getAttendanceByStudent(studentId);

    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const absent = records.filter((r) => r.status === 'absent').length;

    const rate = total === 0 ? 0 : Math.round((present / total) * 100);

    setStudentData(prev => ({
      ...prev,
      attendanceRate: rate,
      daysPresent: present,
      daysAbsent: absent,
      email: loggedInStudent?.email || prev.email,
    }));
  }, [loggedInStudent, attendance, getAttendanceByStudent]);

  const handleProfilePhotoUpdate = (imageData) => {
    // Save to localStorage
    localStorage.setItem('studentProfilePhoto', imageData);
    
    // Update state
    setStudentData(prev => ({
      ...prev,
      profileImage: imageData
    }));
  };

  const studentIdForRecords = loggedInStudent?._id || loggedInStudent?.id;
  const attendanceRecords = studentIdForRecords ? getAttendanceByStudent(studentIdForRecords) : [];

  const subjectStatsMap = subjects.reduce((acc, sub) => {
    acc[sub._id || sub.id] = {
      id: sub._id || sub.id,
      name: sub.name,
      totalClasses: 0,
      classesAttended: 0,
      absences: 0,
    };
    return acc;
  }, {});

  attendanceRecords.forEach((rec) => {
    const key = rec.subject?._id || rec.subjectId || rec.subject;
    if (!subjectStatsMap[key]) return;
    subjectStatsMap[key].totalClasses += 1;
    if (rec.status === 'present') {
      subjectStatsMap[key].classesAttended += 1;
    }
    if (rec.status === 'absent') {
      subjectStatsMap[key].absences += 1;
    }
  });

  const subjectsForView = Object.values(subjectStatsMap);

  const attendanceBySubjectData = subjectsForView.map((s) => ({
    subject: s.name,
    attendance: s.classesAttended,
    absent: s.absences,
  }));

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="min-h-screen bg-background p-6">
          <ProfileHeader 
            student={studentData} 
            onEdit={handleEditProfile}
            onProfilePhotoUpdate={handleProfilePhotoUpdate}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AttendanceBySubject data={attendanceBySubjectData} />
            <AttendanceDistribution present={studentData.daysPresent} absent={studentData.daysAbsent} />
          </div>

          <div className="mb-6">
            <SubjectAttendanceDetails 
              subjects={subjects}
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
            />
          </div>
        </div>
      </main>
    </>);

};

const StudentProfile = () => {
  return (
    <SidebarProvider>
      <StudentProfileContent />
    </SidebarProvider>);

};

export default StudentProfile;