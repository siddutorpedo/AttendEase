import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/live-attendance', label: 'Live Attendance', icon: 'Users' },
    { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3' },
    { path: '/student-profile', label: 'Student Profile', icon: 'UserCircle' },
    { path: '/admin-console', label: 'Admin Console', icon: 'Settings' },
    { path: '/support-center', label: 'Support Center', icon: 'HelpCircle' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="sidebar-toggle"
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Icon name="GraduationCap" size={24} color="#FFFFFF" />
            </div>
            <span className="sidebar-logo-text">AttendEase</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="hidden lg:block p-2 rounded-lg hover:bg-muted transition-colors duration-300"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              size={20}
            />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigationItems?.map((item) => (
            <div
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`sidebar-nav-item ${
                location?.pathname === item?.path ? 'active' : ''
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' || e?.key === ' ') {
                  handleNavigation(item?.path);
                }
              }}
            >
              <Icon name={item?.icon} size={20} />
              <span className="sidebar-nav-item-text">{item?.label}</span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;