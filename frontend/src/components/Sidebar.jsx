import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from './AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Define navigation items with role restrictions
  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard', allowedRoles: ['lecturer'] },
    { path: '/live-attendance', label: 'Live Attendance', icon: 'Users', allowedRoles: ['lecturer'] },
    { path: '/analytics', label: 'Analytics', icon: 'BarChart3', allowedRoles: ['lecturer'] },
    { path: '/student-profile', label: 'Student Profile', icon: 'UserCircle', allowedRoles: ['student'] },
    { path: '/admin-console', label: 'Admin Console', icon: 'Settings', allowedRoles: ['lecturer'] },
    { path: '/support-center', label: 'Support Center', icon: 'HelpCircle', allowedRoles: ['student', 'lecturer'] },
  ];

  // Filter items based on user role
  const availableItems = navigationItems.filter(item =>
    item.allowedRoles.includes(user?.type)
  );

  // Get all items but separate by availability
  const filteredItems = {
    available: navigationItems.filter(item => item.allowedRoles.includes(user?.type)),
    disabled: navigationItems.filter(item => !item.allowedRoles.includes(user?.type))
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleDisabledClick = (e) => {
    e.preventDefault();
    // Do nothing on click for disabled items
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <Icon name="GraduationCap" size={24} />
            </div>
            <span className="sidebar-logo-text">AttendEase</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="hidden lg:block p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              size={20}
            />
          </button>
        </div>

        <nav className="sidebar-nav">
          {/* Available Navigation Items */}
          {filteredItems.available?.map((item) => (
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

          {/* Disabled Navigation Items (for students) */}
          {filteredItems.disabled?.length > 0 && user?.type === 'student' && (
            <>
              <div className="px-3 py-2 mt-4 mb-2">
                <p className="text-xs font-semibold text-muted-foreground/60 uppercase">
                  Lecturer Features
                </p>
              </div>
              {filteredItems.disabled?.map((item) => (
                <div
                  key={item?.path}
                  onClick={handleDisabledClick}
                  className="sidebar-nav-item opacity-40 cursor-not-allowed"
                  role="button"
                  tabIndex={-1}
                  title={`${item?.label} is only available for lecturers`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="sidebar-nav-item-text">{item?.label}</span>
                  <Icon name="Lock" size={14} className="ml-auto opacity-60" />
                </div>
              ))}
            </>
          )}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4 bg-card">
          <div className="mb-3">
            <p className="text-xs text-muted-foreground uppercase font-semibold">
              {user?.type === 'student' ? '👨‍🎓 Student' : '👨‍🏫 Lecturer'}
            </p>
            <p className="text-sm font-medium text-foreground truncate">{user?.fullName || user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
          >
            <Icon name="LogOut" size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;