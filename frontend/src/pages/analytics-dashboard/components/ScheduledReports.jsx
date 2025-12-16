import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduledReports = ({ reports }) => {
  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case 'daily':
        return 'Calendar';
      case 'weekly':
        return 'CalendarDays';
      case 'monthly':
        return 'CalendarRange';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'paused':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Schedule
        </Button>
      </div>
      <div className="space-y-3">
        {reports?.map((report) => (
          <div 
            key={report?.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={getFrequencyIcon(report?.frequency)} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">{report?.name}</h4>
              <p className="text-xs text-muted-foreground">
                {report?.frequency?.charAt(0)?.toUpperCase() + report?.frequency?.slice(1)} • Next: {report?.nextRun}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(report?.status)}`}>
                {report?.status?.charAt(0)?.toUpperCase() + report?.status?.slice(1)}
              </span>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors duration-300">
                <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledReports;