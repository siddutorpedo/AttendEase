import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { path: '/admin-console', label: 'Dashboard', icon: 'LayoutGrid' },
    { path: '/admin-console/students', label: 'Live Attendance', icon: 'Users' },
    { path: '/admin-console/subjects', label: 'Analytics', icon: 'BarChart3' },
    { path: '/admin-console/settings', label: 'Admin Console', icon: 'Settings' },
    { path: '/admin-console/support', label: 'Support Center', icon: 'HelpCircle' },
  ];

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/admin-console' && (location.pathname === '/admin-console' || location.pathname === '/admin-console/'));
  };

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="BookOpen" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">AttendEase</h2>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1 flex-1">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
              isActive(item.path) 
                ? 'bg-primary text-white' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
        >
          <Icon name="LogOut" size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
