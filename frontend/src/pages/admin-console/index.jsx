import React from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import StatsCard from './components/StatsCard';
import UserManagementTable from './components/UserManagementTable';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import AuditLogViewer from './components/AuditLogViewer';
import ComplianceChecklist from './components/ComplianceChecklist';
import IntegrationHub from './components/IntegrationHub';

const AdminConsoleContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();

  const statsData = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12.5%",
      changeType: "increase",
      icon: "Users",
      iconBg: "bg-gradient-to-br from-primary to-secondary"
    },
    {
      title: "Active Sessions",
      value: "892",
      change: "+8.3%",
      changeType: "increase",
      icon: "Activity",
      iconBg: "bg-gradient-to-br from-secondary to-primary"
    },
    {
      title: "System Uptime",
      value: "99.99%",
      change: "+0.02%",
      changeType: "increase",
      icon: "Server",
      iconBg: "bg-gradient-to-br from-success to-secondary"
    },
    {
      title: "Storage Used",
      value: "67%",
      change: "+5.2%",
      changeType: "increase",
      icon: "HardDrive",
      iconBg: "bg-gradient-to-br from-warning to-accent"
    }
  ];

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="min-h-screen bg-background">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-8 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Settings" size={32} color="#FFFFFF" />
                <h1 className="text-3xl lg:text-4xl font-bold">Admin Console</h1>
              </div>
              <p className="text-primary-foreground/90 text-base lg:text-lg">
                Comprehensive system management and institutional configuration
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData?.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* System Health Monitor */}
            <div className="mb-8">
              <SystemHealthMonitor />
            </div>

            {/* User Management Table */}
            <div className="mb-8">
              <UserManagementTable />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Audit Log Viewer */}
              <div>
                <AuditLogViewer />
              </div>

              {/* Compliance Checklist */}
              <div>
                <ComplianceChecklist />
              </div>
            </div>

            {/* Integration Hub */}
            <div className="mb-8">
              <IntegrationHub />
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted hover:shadow-soft transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Database" size={24} color="var(--color-primary)" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Backup Now</span>
                </button>

                <button className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted hover:shadow-soft transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon name="FileText" size={24} color="var(--color-secondary)" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Generate Report</span>
                </button>

                <button className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted hover:shadow-soft transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Icon name="Bell" size={24} color="var(--color-warning)" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Send Alert</span>
                </button>

                <button className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted hover:shadow-soft transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Icon name="Download" size={24} color="var(--color-success)" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Export Data</span>
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-foreground mb-2">Security & Compliance</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    AttendEase maintains FERPA, COPPA, and SOC 2 compliance with enterprise-grade security protocols. All administrative actions are logged and encrypted.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">FERPA Compliant</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">COPPA Certified</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">SOC 2 Type II</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const AdminConsole = () => {
  return (
    <SidebarProvider>
      <AdminConsoleContent />
    </SidebarProvider>
  );
};

export default AdminConsole;