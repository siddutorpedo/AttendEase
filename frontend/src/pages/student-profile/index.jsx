import React from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import PersonalInformation from './components/PersonalInformation';
import AttendanceTimeline from './components/AttendanceTimeline';
import AcademicPerformance from './components/AcademicPerformance';
import GoalsAndInterventions from './components/GoalsAndInterventions';
import CommunicationHistory from './components/CommunicationHistory';
import UpcomingClasses from './components/UpcomingClasses';
import ExcuseDocumentation from './components/ExcuseDocumentation';

const StudentProfileContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();

  const studentData = {
    name: "Emily Rodriguez",
    studentId: "STU-2024-1847",
    grade: "Grade 10",
    section: "Section A",
    enrollmentDate: "August 15, 2023",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e101b075-1763301339880.png",
    profileImageAlt: "Professional student photo of Hispanic teenage girl with long dark hair wearing navy blue school uniform blazer with white collar",
    attendanceRate: 92.5,
    daysPresent: 148,
    daysAbsent: 12,
    lateArrivals: 5,
    email: "emily.rodriguez@attendease.edu",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "March 12, 2009",
    address: "456 Oak Avenue, Springfield, IL 62701",
    parentName: "Maria Rodriguez",
    emergencyContact: "+1 (555) 234-5679",
    bloodGroup: "O+",
    medicalAlerts: "Mild asthma - inhaler available in nurse's office"
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


  const performanceData = [
  { month: "Aug", attendance: 95, performance: 88 },
  { month: "Sep", attendance: 92, performance: 90 },
  { month: "Oct", attendance: 89, performance: 85 },
  { month: "Nov", attendance: 94, performance: 92 },
  { month: "Dec", attendance: 93, performance: 91 }];


  const subjectGrades = [
  { subject: "Math", grade: 92 },
  { subject: "English", grade: 88 },
  { subject: "Chemistry", grade: 90 },
  { subject: "History", grade: 85 },
  { subject: "Spanish", grade: 87 },
  { subject: "Biology", grade: 89 }];


  const goals = [
  {
    title: "Improve Attendance Rate to 95%",
    description: "Maintain consistent attendance throughout the semester",
    current: 148,
    target: 160,
    targetDate: "June 15, 2026",
    status: "on-track"
  },
  {
    title: "Reduce Late Arrivals",
    description: "Arrive on time for all morning classes",
    current: 5,
    target: 0,
    targetDate: "March 31, 2026",
    status: "at-risk"
  }];


  const interventions = [
  {
    type: "Attendance Counseling",
    description: "Discussed strategies for improving morning routine and time management",
    counselor: "Ms. Patricia Johnson",
    date: "November 15, 2025"
  },
  {
    type: "Parent Meeting",
    description: "Collaborative meeting with parents to address attendance concerns and develop support plan",
    counselor: "Dr. Thomas Anderson",
    date: "October 28, 2025"
  }];


  const communications = [
  {
    type: "email",
    subject: "Attendance Improvement Notice",
    sender: "Dr. Thomas Anderson",
    recipient: "Maria Rodriguez (Parent)",
    date: "December 9, 2025",
    message: "Emily has shown significant improvement in her attendance this month. We're pleased with her progress and commitment to being present in class.",
    attachments: null
  },
  {
    type: "sms",
    subject: "Absence Alert",
    sender: "AttendEase System",
    recipient: "Maria Rodriguez",
    date: "December 4, 2025",
    message: "Emily was marked absent from Biology class today. Please contact the school if this is unexpected.",
    attachments: null
  },
  {
    type: "meeting",
    subject: "Progress Review Meeting",
    sender: "Ms. Patricia Johnson",
    recipient: "Emily Rodriguez & Maria Rodriguez",
    date: "November 15, 2025",
    message: "Discussed Emily's attendance patterns and academic performance. Created action plan for improvement with specific goals and timelines.",
    attachments: ["Meeting_Notes.pdf", "Action_Plan.pdf"]
  }];


  const upcomingClasses = [
  {
    time: "09:00",
    period: "Period 1",
    subject: "Advanced Mathematics",
    teacher: "Dr. James Wilson",
    room: "Room 204",
    status: "scheduled"
  },
  {
    time: "10:30",
    period: "Period 2",
    subject: "English Literature",
    teacher: "Ms. Sarah Thompson",
    room: "Room 118",
    status: "scheduled"
  },
  {
    time: "12:00",
    period: "Lunch",
    subject: "Lunch Break",
    teacher: "-",
    room: "Cafeteria",
    status: "scheduled"
  },
  {
    time: "01:00",
    period: "Period 3",
    subject: "Chemistry Lab",
    teacher: "Prof. Michael Chen",
    room: "Lab 301",
    status: "scheduled"
  }];


  const excuseSubmissions = [
  {
    reason: "Medical Appointment",
    description: "Orthodontist appointment for braces adjustment",
    absenceDate: "December 6, 2025",
    submittedDate: "December 5, 2025",
    status: "approved",
    reviewedBy: "Dr. Thomas Anderson",
    document: "Medical_Certificate.pdf"
  },
  {
    reason: "Illness",
    description: "Flu symptoms - fever and body aches",
    absenceDate: "December 4, 2025",
    submittedDate: "December 4, 2025",
    status: "approved",
    reviewedBy: "Ms. Patricia Johnson",
    document: "Doctor_Note.pdf"
  },
  {
    reason: "Family Emergency",
    description: "Grandmother hospitalized - family visit required",
    absenceDate: "November 20, 2025",
    submittedDate: "November 19, 2025",
    status: "approved",
    reviewedBy: "Dr. Thomas Anderson",
    document: null
  }];


  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleAddGoal = () => {
    console.log("Add goal clicked");
  };

  const handleSendMessage = () => {
    console.log("Send message clicked");
  };

  const handleSubmitExcuse = (formData) => {
    console.log("Excuse submitted:", formData);
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="min-h-screen bg-background p-6">
          <ProfileHeader student={studentData} onEdit={handleEditProfile} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <AttendanceTimeline records={attendanceRecords} />
            </div>
            <div>
              <UpcomingClasses classes={upcomingClasses} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PersonalInformation student={studentData} />
            <AcademicPerformance
              performanceData={performanceData}
              subjectGrades={subjectGrades} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <GoalsAndInterventions
              goals={goals}
              interventions={interventions}
              onAddGoal={handleAddGoal} />

            <CommunicationHistory
              communications={communications}
              onSendMessage={handleSendMessage} />

          </div>

          <div className="mb-6">
            <ExcuseDocumentation
              submissions={excuseSubmissions}
              onSubmit={handleSubmitExcuse} />

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