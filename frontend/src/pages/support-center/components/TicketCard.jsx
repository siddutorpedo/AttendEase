import React from 'react';
import Icon from '../../../components/AppIcon';

const TicketCard = ({ ticketId, subject, status, priority, createdDate, lastUpdate, category }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'text-primary bg-primary/10';
      case 'in progress':
        return 'text-warning bg-warning/10';
      case 'resolved':
        return 'text-success bg-success/10';
      case 'closed':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-soft transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Ticket #{ticketId}</div>
          <h3 className="text-base font-semibold text-foreground">{subject}</h3>
        </div>
        <div className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Icon name="Tag" size={14} />
          <span>{category}</span>
        </div>
        <div className={`flex items-center gap-1 ${getPriorityColor(priority)}`}>
          <Icon name="AlertCircle" size={14} />
          <span>{priority} Priority</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          <Icon name="Calendar" size={14} />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Clock" size={14} />
          <span>Updated: {lastUpdate}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;