import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ student, onEdit }) => {
  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-primary/20">
              <Image
                src={student?.profileImage}
                alt={student?.profileImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2 shadow-elevated">
              <Icon name="CheckCircle" size={20} />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{student?.name}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Hash" size={16} />
                  {student?.studentId}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="GraduationCap" size={16} />
                  {student?.grade} - {student?.section}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  Enrolled: {student?.enrollmentDate}
                </span>
              </div>
            </div>
            <Button variant="outline" iconName="Edit" iconPosition="left" onClick={onEdit}>
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="TrendingUp" size={18} className="text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Attendance Rate</span>
              </div>
              <p className={`text-2xl font-bold ${getAttendanceColor(student?.attendanceRate)}`}>
                {student?.attendanceRate}%
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Calendar" size={18} className="text-secondary" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Days Present</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{student?.daysPresent}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="XCircle" size={18} className="text-error" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Days Absent</span>
              </div>
              <p className="text-2xl font-bold text-error">{student?.daysAbsent}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Clock" size={18} className="text-warning" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Late Arrivals</span>
              </div>
              <p className="text-2xl font-bold text-warning">{student?.lateArrivals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;