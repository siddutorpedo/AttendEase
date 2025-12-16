import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceTimeline = ({ records }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'absent':
        return { name: 'XCircle', color: 'text-error' };
      case 'late':
        return { name: 'Clock', color: 'text-warning' };
      case 'excused':
        return { name: 'FileText', color: 'text-secondary' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      present: 'bg-success/10 text-success',
      absent: 'bg-error/10 text-error',
      late: 'bg-warning/10 text-warning',
      excused: 'bg-secondary/10 text-secondary'
    };
    return badges?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Attendance Timeline</h2>
        </div>
        <span className="text-sm text-muted-foreground">Last 30 days</span>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {records?.map((record, index) => {
          const statusIcon = getStatusIcon(record?.status);
          return (
            <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Icon name={statusIcon?.name} size={24} className={statusIcon?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{record?.subject}</h3>
                    <p className="text-xs text-muted-foreground">{record?.teacher}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(record?.status)}`}>
                    {record?.status?.charAt(0)?.toUpperCase() + record?.status?.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {record?.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {record?.time}
                  </span>
                </div>
                {record?.note && (
                  <p className="mt-2 text-sm text-muted-foreground italic">{record?.note}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTimeline;