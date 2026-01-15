import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Dashboard from './Dashboard';
import LiveAttendanceWrapper from './LiveAttendanceWrapper';
import AnalyticsWrapper from './AnalyticsWrapper';
import Settings from './Settings';
import SupportCenter from './SupportCenter';

const AdminConsole = () => {
  const location = useLocation();

  const getPageContent = () => {
    const path = location.pathname;
    
    if (path === '/admin-console' || path === '/admin-console/') {
      return <Dashboard />;
    } else if (path === '/admin-console/students') {
      return <LiveAttendanceWrapper />;
    } else if (path === '/admin-console/subjects') {
      return <AnalyticsWrapper />;
    } else if (path === '/admin-console/settings') {
      return <Settings />;
    } else if (path === '/admin-console/support') {
      return <SupportCenter />;
    } else {
      return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {getPageContent()}
      </main>
    </div>
  );
};

export default AdminConsole;