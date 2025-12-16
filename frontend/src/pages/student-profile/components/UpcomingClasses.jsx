import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingClasses = ({ classes }) => {
  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Calendar" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Upcoming Classes</h2>
      </div>
      <div className="space-y-3">
        {classes?.map((classItem, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-300">
            <div className="flex-shrink-0 w-16 text-center">
              <p className="text-2xl font-bold text-primary">{classItem?.time}</p>
              <p className="text-xs text-muted-foreground">{classItem?.period}</p>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1">{classItem?.subject}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="User" size={12} />
                  {classItem?.teacher}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={12} />
                  {classItem?.room}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                classItem?.status === 'scheduled' ? 'bg-primary/10 text-primary' :
                classItem?.status === 'in-progress'? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
              }`}>
                {classItem?.status === 'scheduled' ? 'Scheduled' : 
                 classItem?.status === 'in-progress' ? 'In Progress' : 'Completed'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;