import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { path: '/admin-console/students', label: 'Manage Students', icon: 'UserCheck' },
    { path: '/admin-console/subjects', label: 'Manage Subjects', icon: 'BookOpen' },
    { path: '/admin-console/settings', label: 'Settings', icon: 'Settings' },
  ];

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-[#172033] text-white min-h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary/80 flex items-center justify-center">
            <Icon name="GraduationCap" size={20} color="#fff" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Admin Panel</h2>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1 flex-1">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              isActive(item.path) ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <Icon name={item.icon} size={18} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          <Icon name="LogOut" size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
