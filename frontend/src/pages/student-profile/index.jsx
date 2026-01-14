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
  const { students } = useData();
  const [selectedSubject, setSelectedSubject] = useState('mathematics');

  // Get the logged-in student's data from admin list
  const loggedInStudent = students.find(s => s.name.toLowerCase() === user?.name.toLowerCase());

  const [studentData, setStudentData] = useState({
    name: user?.name || "Student",
    studentId: user?.rollNo || "STU-0000",
    grade: "Grade 10",
    section: "Section A",
    enrollmentDate: "August 15, 2023",
    profileImage: "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "Student") + "&background=45B7D1&color=fff&size=256&bold=true&font-size=0.4",
    profileImageAlt: `Profile photo of ${user?.name}`,
    attendanceRate: 92.5,
    daysPresent: 148,
    daysAbsent: 12,
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

  const handleProfilePhotoUpdate = (imageData) => {
    // Save to localStorage
    localStorage.setItem('studentProfilePhoto', imageData);
    
    // Update state
    setStudentData(prev => ({
      ...prev,
      profileImage: imageData
    }));
  };

  const attendanceRecords = [
  {
    subject: "Advanced Mathematics",
    teacher: "Dr. James Wilson",
    date: "December 10, 2025",
    time: "09:00 AM",
    status: "present",
    note: null
  },
  {
    subject: "English Literature",
    teacher: "Ms. Sarah Thompson",
    date: "December 9, 2025",
    time: "10:30 AM",
    status: "present",
    note: null
  },
  {
    subject: "Chemistry Lab",
    teacher: "Prof. Michael Chen",
    date: "December 8, 2025",
    time: "02:00 PM",
    status: "late",
    note: "Arrived 15 minutes late due to previous class running over"
  },
  {
    subject: "World History",
    teacher: "Mr. David Martinez",
    date: "December 7, 2025",
    time: "11:00 AM",
    status: "present",
    note: null
  },
  {
    subject: "Physical Education",
    teacher: "Coach Jennifer Brown",
    date: "December 6, 2025",
    time: "01:00 PM",
    status: "excused",
    note: "Medical appointment - documentation provided"
  },
  {
    subject: "Spanish Language",
    teacher: "Señora Isabella Garcia",
    date: "December 5, 2025",
    time: "09:30 AM",
    status: "present",
    note: null
  },
  {
    subject: "Biology",
    teacher: "Dr. Robert Anderson",
    date: "December 4, 2025",
    time: "10:00 AM",
    status: "absent",
    note: "Illness - parent notification sent"
  }];

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', totalClasses: 30, classesAttended: 28, absences: 2 },
    { id: 'physics', name: 'Physics', totalClasses: 28, classesAttended: 27, absences: 1 },
    { id: 'chemistry', name: 'Chemistry', totalClasses: 29, classesAttended: 28, absences: 1 },
    { id: 'english', name: 'English', totalClasses: 31, classesAttended: 29, absences: 2 }
  ];

  const attendanceBySubjectData = [
    { subject: 'Mathematics', attendance: 28, absent: 2 },
    { subject: 'Physics', attendance: 27, absent: 1 },
    { subject: 'Chemistry', attendance: 28, absent: 1 },
    { subject: 'English', attendance: 29, absent: 2 }
  ];

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