import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const StudentCard = ({ student, onMarkAttendance, isSelected }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success border-success/20';
      case 'absent':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return 'CheckCircle2';
      case 'absent':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div
      className={`bg-card border rounded-lg p-4 transition-all duration-300 hover:shadow-elevated cursor-pointer ${
        isSelected ? 'ring-2 ring-primary' : 'border-border'
      } ${student?.hasAttendanceConcern ? 'border-l-4 border-l-warning' : ''}`}
      onClick={() => onMarkAttendance(student?.id)}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <Image
              src={student?.avatar}
              alt={student?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {student?.hasAttendanceConcern && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={12} color="#FFFFFF" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {student?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Roll: {student?.rollNumber}
              </p>
            </div>
            {(student?.status === 'present' || student?.status === 'absent') && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  student?.status
                )}`}
              >
                <Icon
                  name={getStatusIcon(student?.status)}
                  size={12}
                  className="inline mr-1"
                />
                {student?.status?.charAt(0)?.toUpperCase() + student?.status?.slice(1)}
              </span>
            )}
          </div>

          {student?.lastMarkedTime && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
              <Icon name="Clock" size={12} />
              Marked at {student?.lastMarkedTime}
            </p>
          )}

          {student?.attendanceRate !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    student?.attendanceRate >= 75
                      ? 'bg-success'
                      : student?.attendanceRate >= 50
                      ? 'bg-warning' :'bg-error'
                  }`}
                  style={{ width: `${student?.attendanceRate}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {student?.attendanceRate}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;