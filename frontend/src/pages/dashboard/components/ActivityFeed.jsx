import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      attendance: 'CheckCircle2',
      alert: 'AlertCircle',
      report: 'FileText',
      message: 'MessageSquare',
      update: 'RefreshCw'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      attendance: 'bg-green-100 text-green-700',
      alert: 'bg-yellow-100 text-yellow-700',
      report: 'bg-blue-100 text-blue-700',
      message: 'bg-purple-100 text-purple-700',
      update: 'bg-gray-100 text-gray-700'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-700';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className={`p-2 rounded-lg ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium mb-1">{activity?.title}</p>
              <p className="text-xs text-gray-600">{activity?.description}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatTime(activity?.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;