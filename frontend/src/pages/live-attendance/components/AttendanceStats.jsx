import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Present',
      value: stats?.present,
      percentage: stats?.presentPercentage,
      icon: 'CheckCircle2',
      color: 'success',
    },
    {
      label: 'Absent',
      value: stats?.absent,
      percentage: stats?.absentPercentage,
      icon: 'XCircle',
      color: 'error',
    },
    {
      label: 'Late',
      value: stats?.late,
      percentage: stats?.latePercentage,
      icon: 'Clock',
      color: 'warning',
    },
    {
      label: 'Excused',
      value: stats?.excused,
      percentage: stats?.excusedPercentage,
      icon: 'FileCheck',
      color: 'secondary',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat) => (
        <div
          key={stat?.label}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              {stat?.label}
            </span>
            <div
              className={`w-10 h-10 rounded-lg bg-${stat?.color}/10 flex items-center justify-center`}
            >
              <Icon name={stat?.icon} size={20} color={`var(--color-${stat?.color})`} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-foreground">{stat?.value}</span>
            <span className={`text-sm font-semibold text-${stat?.color}`}>
              {stat?.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;