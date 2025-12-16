import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthMonitor = () => {
  const healthMetrics = [
    {
      id: 1,
      name: "API Response Time",
      value: "142ms",
      status: "healthy",
      description: "Average response time across all endpoints",
      icon: "Zap"
    },
    {
      id: 2,
      name: "Database Performance",
      value: "98.7%",
      status: "healthy",
      description: "Query execution success rate",
      icon: "Database"
    },
    {
      id: 3,
      name: "Server Uptime",
      value: "99.99%",
      status: "healthy",
      description: "System availability in last 30 days",
      icon: "Server"
    },
    {
      id: 4,
      name: "Storage Usage",
      value: "67%",
      status: "warning",
      description: "Current storage capacity utilization",
      icon: "HardDrive"
    },
    {
      id: 5,
      name: "Active Sessions",
      value: "1,247",
      status: "healthy",
      description: "Currently logged in users",
      icon: "Users"
    },
    {
      id: 6,
      name: "Error Rate",
      value: "0.03%",
      status: "healthy",
      description: "System error occurrence rate",
      icon: "AlertTriangle"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'critical':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">System Health Monitor</h3>
          <p className="text-sm text-muted-foreground">Real-time system performance metrics</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">All Systems Operational</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthMetrics?.map((metric) => (
          <div 
            key={metric?.id}
            className="p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(metric?.status)}`}>
                <Icon name={metric?.icon} size={20} color={`var(--color-${metric?.status === 'healthy' ? 'success' : metric?.status === 'warning' ? 'warning' : 'error'})`} />
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(metric?.status)} ${getStatusColor(metric?.status)}`}>
                {metric?.status}
              </div>
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">{metric?.name}</h4>
            <p className="text-2xl font-bold text-foreground mb-2">{metric?.value}</p>
            <p className="text-xs text-muted-foreground">{metric?.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">Last updated: 2025-12-11 05:17 AM</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200">
            <Icon name="RefreshCw" size={16} />
            Refresh Metrics
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;