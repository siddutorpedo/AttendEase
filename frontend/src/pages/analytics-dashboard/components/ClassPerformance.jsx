import React from 'react';
import Icon from '../../../components/AppIcon';

const ClassPerformance = ({ classes }) => {
  const getPerformanceColor = (rate) => {
    if (rate >= 95) return 'text-success';
    if (rate >= 85) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceIcon = (rate) => {
    if (rate >= 95) return 'CheckCircle2';
    if (rate >= 85) return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Class Performance</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 flex items-center gap-1">
          <span>View All</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
      <div className="space-y-4">
        {classes?.map((classItem) => (
          <div key={classItem?.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon 
                  name={getPerformanceIcon(classItem?.attendanceRate)} 
                  size={20} 
                  className={getPerformanceColor(classItem?.attendanceRate)}
                />
                <div>
                  <h4 className="text-sm font-medium text-foreground">{classItem?.name}</h4>
                  <p className="text-xs text-muted-foreground">{classItem?.teacher} • {classItem?.students} students</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getPerformanceColor(classItem?.attendanceRate)}`}>
                  {classItem?.attendanceRate}%
                </p>
                <p className="text-xs text-muted-foreground">{classItem?.trend}</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  classItem?.attendanceRate >= 95 ? 'bg-success' :
                  classItem?.attendanceRate >= 85 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${classItem?.attendanceRate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPerformance;