import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingClasses = ({ classes }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    return date?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-primary/10 text-primary',
      ongoing: 'bg-success/10 text-success',
      completed: 'bg-muted text-muted-foreground'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {classes?.map((classItem) => (
          <div 
            key={classItem?.id} 
            className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex flex-col items-center justify-center min-w-[60px]">
              <span className="text-xs text-muted-foreground">
                {formatTime(classItem?.startTime)}
              </span>
              <Icon name="ArrowDown" size={12} className="text-muted-foreground my-1" />
              <span className="text-xs text-muted-foreground">
                {formatTime(classItem?.endTime)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1">{classItem?.subject}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Users" size={12} />
                <span>{classItem?.className}</span>
                <span>•</span>
                <Icon name="MapPin" size={12} />
                <span>{classItem?.room}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem?.status)}`}>
              {classItem?.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;