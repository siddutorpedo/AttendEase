import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceOverview = ({ data }) => {
  const calculatePercentage = (present, total) => {
    return ((present / total) * 100)?.toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Attendance Overview</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
          <span>View Details</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
      <div className="space-y-4">
        {data?.map((item) => {
          const percentage = calculatePercentage(item?.present, item?.total);
          const isLow = percentage < 75;
          
          return (
            <div key={item?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{item?.className}</span>
                  {isLow && (
                    <Icon name="AlertTriangle" size={14} className="text-warning" />
                  )}
                </div>
                <span className={`text-sm font-semibold ${isLow ? 'text-warning' : 'text-success'}`}>
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-warning' : 'bg-success'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item?.present} present</span>
                <span>{item?.absent} absent</span>
                <span>{item?.total} total</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceOverview;