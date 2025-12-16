import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AuditLogViewer = () => {
  const [selectedAction, setSelectedAction] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-12-11 05:15:23",
      user: "Dr. Sarah Mitchell",
      action: "User Created",
      details: "Created new teacher account for Prof. James Anderson",
      ipAddress: "192.168.1.45",
      severity: "info"
    },
    {
      id: 2,
      timestamp: "2025-12-11 04:58:12",
      user: "Lisa Thompson",
      action: "Settings Modified",
      details: "Updated attendance notification settings for Computer Science department",
      ipAddress: "192.168.1.67",
      severity: "warning"
    },
    {
      id: 3,
      timestamp: "2025-12-11 04:42:05",
      user: "System",
      action: "Backup Completed",
      details: "Automated daily backup completed successfully - 2.4GB archived",
      ipAddress: "Internal",
      severity: "success"
    },
    {
      id: 4,
      timestamp: "2025-12-11 04:30:18",
      user: "Dr. Sarah Mitchell",
      action: "Permission Changed",
      details: "Modified role permissions for Support Staff group",
      ipAddress: "192.168.1.45",
      severity: "warning"
    },
    {
      id: 5,
      timestamp: "2025-12-11 03:55:47",
      user: "System",
      action: "Security Alert",
      details: "Multiple failed login attempts detected from IP 203.45.67.89",
      ipAddress: "203.45.67.89",
      severity: "error"
    },
    {
      id: 6,
      timestamp: "2025-12-11 03:20:33",
      user: "Lisa Thompson",
      action: "Data Export",
      details: "Exported student attendance records for Fall 2025 semester",
      ipAddress: "192.168.1.67",
      severity: "info"
    }
  ];

  const actionOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'user', label: 'User Management' },
    { value: 'settings', label: 'Settings Changes' },
    { value: 'security', label: 'Security Events' },
    { value: 'data', label: 'Data Operations' }
  ];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Audit Log Viewer</h3>
            <p className="text-sm text-muted-foreground">Track all system activities and changes</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Filter by action"
              className="w-full sm:w-48"
            />
          </div>
        </div>
      </div>
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {auditLogs?.map((log) => (
          <div key={log?.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className={`mt-1 ${getSeverityColor(log?.severity)}`}>
                <Icon name={getSeverityIcon(log?.severity)} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-foreground">{log?.action}</h4>
                  <span className="text-xs text-muted-foreground">{log?.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{log?.details}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Icon name="User" size={14} />
                    <span>{log?.user}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Globe" size={14} />
                    <span>{log?.ipAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
        <p className="text-sm text-muted-foreground">Showing 6 of 1,247 log entries</p>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200">
          <Icon name="Download" size={16} />
          Export Logs
        </button>
      </div>
    </div>
  );
};

export default AuditLogViewer;