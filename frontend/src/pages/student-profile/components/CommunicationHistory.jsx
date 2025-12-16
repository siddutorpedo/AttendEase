import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunicationHistory = ({ communications, onSendMessage }) => {
  const getMessageIcon = (type) => {
    switch (type) {
      case 'email':
        return { name: 'Mail', color: 'text-primary' };
      case 'sms':
        return { name: 'MessageSquare', color: 'text-secondary' };
      case 'call':
        return { name: 'Phone', color: 'text-success' };
      case 'meeting':
        return { name: 'Users', color: 'text-warning' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="MessageCircle" size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Communication History</h2>
        </div>
        <Button variant="outline" size="sm" iconName="Send" iconPosition="left" onClick={onSendMessage}>
          Send Message
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {communications?.map((comm, index) => {
          const icon = getMessageIcon(comm?.type);
          return (
            <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Icon name={icon?.name} size={20} className={icon?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{comm?.subject}</h3>
                    <p className="text-xs text-muted-foreground">
                      {comm?.sender} → {comm?.recipient}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{comm?.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{comm?.message}</p>
                {comm?.attachments && comm?.attachments?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {comm?.attachments?.map((attachment, idx) => (
                      <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                        <Icon name="Paperclip" size={12} />
                        <span>{attachment}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationHistory;