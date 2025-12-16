import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationBadge = ({ notifications }) => {
  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error/10 border-error/30 text-error',
      medium: 'bg-warning/10 border-warning/30 text-warning',
      low: 'bg-primary/10 border-primary/30 text-primary'
    };
    return colors?.[priority] || colors?.low;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-error text-error-foreground text-xs font-semibold rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Mark all read
        </button>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">No new notifications</p>
          </div>
        ) : (
          notifications?.map((notification) => (
            <div 
              key={notification?.id}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-soft ${
                notification?.read ? 'bg-muted/30 border-border' : getPriorityColor(notification?.priority)
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${notification?.read ? 'bg-muted' : 'bg-white/20'}`}>
                  <Icon name={notification?.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{notification?.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{notification?.message}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp)?.toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                {!notification?.read && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationBadge;