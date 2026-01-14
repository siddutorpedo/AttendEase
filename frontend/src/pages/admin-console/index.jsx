import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import ManageStudents from './ManageStudents';
import ManageSubjects from './ManageSubjects';
import Settings from './Settings';

const AdminConsole = () => {
  const location = useLocation();

  const getPageContent = () => {
    const path = location.pathname;
    
    if (path === '/admin-console/students') {
      return <ManageStudents />;
    } else if (path === '/admin-console/subjects') {
      return <ManageSubjects />;
    } else if (path === '/admin-console/settings') {
      return <Settings />;
    } else {
      return <ManageStudents />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50">
        <div className="p-8">
          {getPageContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminConsole;