"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  User,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Settings,
  Mail,
  AlertCircle,
  CheckCircle2,
  X,
  ChevronDown,
} from "lucide-react";
import { Gantari, Bebas_Neue } from "next/font/google";

const gantari = Gantari({
  variable: "--font-gantari",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export interface AdminData {
  displayName?: string;
  email?: string;
  id: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

interface AdminHeaderProps {
  collapsed: boolean;
  onMenuToggle: () => void;
  adminData: AdminData;
  role: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  collapsed,
  onMenuToggle,
  adminData,
  role,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !searchValue
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchValue]);

  const notifications = [
    {
      id: 1,
      type: "info",
      message: "New student application received from John Smith",
      time: "5 minutes ago",
      icon: Mail,
      unread: true,
    },
    {
      id: 2,
      type: "warning",
      message: "System backup required for database maintenance",
      time: "1 hour ago",
      icon: AlertCircle,
      unread: true,
    },
    {
      id: 3,
      type: "success",
      message: "Payment of $2,500 processed successfully",
      time: "2 hours ago",
      icon: CheckCircle2,
      unread: false,
    },
  ];

  const userMenuItems = [
    {
      label: "My Profile",
      icon: User,
      action: () => console.log("Profile clicked"),
    },
    {
      label: "Account Settings",
      icon: Settings,
      action: () => console.log("Settings clicked"),
    },
    {
      label: "Sign Out",
      icon: LogOut,
      action: () => console.log("Logout clicked"),
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className={`admin-header ${gantari.className}`}>
      <div className="admin-header-container">
        <div className="admin-header-inner">
          {/* Left Section */}
          <div className="admin-header-left">
            <button
              onClick={onMenuToggle}
              className="menu-toggle-button"
              aria-label={collapsed ? "Expand menu" : "Collapse menu"}
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Right Section */}
          <div className="admin-header-right">
            {/* Search Bar */}
            <div ref={searchRef} className="search-container">
              <div
                className={`search-wrapper ${isSearchExpanded ? "expanded" : "collapsed"}`}
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search dashboard..."
                  className={`search-input ${isSearchExpanded ? "visible" : "hidden"}`}
                  onFocus={() => setIsSearchExpanded(true)}
                />
                <button
                  onClick={() => {
                    if (isSearchExpanded && searchValue) {
                      setSearchValue("");
                    } else {
                      setIsSearchExpanded(!isSearchExpanded);
                    }
                  }}
                  className="search-icon-button"
                >
                  {isSearchExpanded && searchValue ? (
                    <X size={18} />
                  ) : (
                    <Search size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div ref={notificationRef} className="notification-container">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`notification-button ${isNotificationOpen ? "active" : ""}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="dropdown-menu notification-dropdown">
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <p>
                      {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="dropdown-content">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${notification.unread ? "unread" : ""}`}
                      >
                        <div
                          className={`notification-icon ${notification.type}`}
                        >
                          <notification.icon size={16} />
                        </div>
                        <div className="notification-content">
                          <p className="notification-message">
                            {notification.message}
                          </p>
                          <p className="notification-time">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="unread-indicator" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <button className="view-all-button">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div ref={userMenuRef} className="user-menu-container">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`user-menu-button ${isUserMenuOpen ? "active" : ""}`}
              >
                <div className="user-avatar">
                  <User size={16} className="user-avatar-svg" />
                </div>
                <div className="user-info">
                  <div className={`user-name ${bebasNeue.className}`}>
                    <span>{adminData.displayName || "Admin User"}</span>
                    <ChevronDown size={16} className="chevron-icon" />
                  </div>
                  <span className="user-role">{role.toLowerCase()}</span>
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="dropdown-menu user-dropdown">
                  <div className="dropdown-header user-info-header">
                    <p className={`user-name-header ${bebasNeue.className}`}>
                      {adminData.displayName || "Admin User"}
                    </p>
                    <p className="user-email">
                      {adminData.email || "admin@example.com"}
                    </p>
                  </div>
                  <div className="dropdown-items">
                    {userMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="dropdown-item"
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Admin Header Styles */
        .admin-header {
          width: 100%;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
          margin: 0;
          padding: 0;
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.95);
        }

        .admin-header-container {
          width: 100%;
          padding: 0 1rem;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .admin-header-container {
            padding: 0 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .admin-header-container {
            padding: 0 2rem;
          }
        }

        .admin-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4.5rem;
          margin: 0;
          padding: 0;
        }

        .admin-header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }

        .admin-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0;
          padding: 0;
        }

        /* Menu Toggle Button */
        .menu-toggle-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(5, 150, 105, 0.3);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .menu-toggle-button:hover {
          background: linear-gradient(135deg, #047857, #065f46);
          box-shadow: 0 6px 8px rgba(5, 150, 105, 0.4);
          transform: translateY(-1px);
        }

        /* Page Title Section */
        .page-title-section {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1.2;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .breadcrumb-item {
          transition: color 0.2s ease;
        }

        .breadcrumb-item.current {
          color: #059669;
          font-weight: 500;
        }

        .breadcrumb-separator {
          color: #9ca3af;
        }

        /* Search Bar Styles */
        .search-container {
          position: relative;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #f8fafc;
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .search-wrapper.expanded {
          width: 20rem;
          background: white;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .search-wrapper.collapsed {
          width: 2.5rem;
        }

        .search-wrapper.collapsed:hover {
          background: #e2e8f0;
        }

        .search-input {
          width: 100%;
          height: 2.5rem;
          background: transparent;
          border: none;
          padding: 0 0.75rem 0 1rem;
          font-size: 0.875rem;
          color: #374151;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-input.visible {
          opacity: 1;
          visibility: visible;
        }

        .search-input.hidden {
          opacity: 0;
          visibility: hidden;
          width: 0;
        }

        .search-icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .search-icon-button:hover {
          color: #059669;
        }

        /* Notification and User Menu Styles */
        .notification-button,
        .user-menu-button {
          position: relative;
          display: flex;
          align-items: center;
          background: #f8fafc;
          border-radius: 0.75rem;
          color: #64748b;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .notification-button {
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
        }

        .user-menu-button {
          padding: 0.375rem;
          gap: 0.75rem;
          min-width: 0;
        }

        .notification-button:hover,
        .user-menu-button:hover,
        .notification-button.active,
        .user-menu-button.active {
          background: white;
          color: #059669;
          border-color: #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .notification-badge {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          min-width: 1.25rem;
          height: 1.25rem;
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* User Avatar and Info */
        .user-avatar {
          width: 2rem;
          height: 2rem;
          background: linear-gradient(135deg, #059669, #047857);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        .user-avatar-svg {
          color: white;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;
          min-width: 0;
        }

        .user-name {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
        }

        .user-role {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: capitalize;
        }

        .chevron-icon {
          transition: transform 0.2s ease;
          color: #9ca3af;
        }

        .user-menu-button.active .chevron-icon {
          transform: rotate(180deg);
        }

        /* Dropdown Menus */
        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          margin-top: 0.5rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          z-index: 1000;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .notification-dropdown {
          width: 24rem;
        }

        .user-dropdown {
          width: 16rem;
        }

        .dropdown-header {
          padding: 1.25rem 1.25rem 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .dropdown-header h3 {
          font-weight: 600;
          color: #111827;
          margin: 0;
          font-size: 1rem;
        }

        .dropdown-header p {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0.25rem 0 0 0;
        }

        .user-info-header {
          padding: 1.25rem;
        }

        .user-name-large {
          font-weight: 600;
          color: #111827;
          margin: 0;
          font-size: 1rem;
        }

        .user-email {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0.25rem 0 0 0;
        }

        .dropdown-content {
          max-height: 20rem;
          overflow-y: auto;
        }

        .dropdown-items {
          padding: 0.5rem;
        }

        .notification-item {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f8fafc;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          position: relative;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }

        .notification-item:hover {
          background: #f8fafc;
        }

        .notification-item.unread {
          background: #f0fdf9;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .notification-icon.info {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .notification-icon.warning {
          background: #fef3c7;
          color: #d97706;
        }

        .notification-icon.success {
          background: #dcfce7;
          color: #16a34a;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-message {
          font-size: 0.875rem;
          color: #111827;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .notification-time {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0.25rem 0 0 0;
        }

        .unread-indicator {
          width: 0.375rem;
          height: 0.375rem;
          background: #059669;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.5rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem;
          color: #374151;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 0.5rem;
        }

        .dropdown-item:hover {
          background: #f8fafc;
          color: #059669;
        }

        .dropdown-item svg {
          color: #64748b;
          transition: color 0.2s ease;
        }

        .dropdown-item:hover svg {
          color: #059669;
        }

        .dropdown-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid #f1f5f9;
        }

        .view-all-button {
          width: 100%;
          text-align: center;
          padding: 0.75rem;
          font-size: 0.875rem;
          color: #059669;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 0.5rem;
          transition: background-color 0.2s ease;
        }

        .view-all-button:hover {
          background: #f0fdf9;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .admin-header-inner {
            height: 4rem;
          }

          .page-title {
            font-size: 1.25rem;
          }

          .breadcrumb {
            display: none;
          }

          .search-wrapper.expanded {
            width: 16rem;
          }

          .notification-dropdown {
            width: 20rem;
            right: -1rem;
          }

          .user-dropdown {
            width: 14rem;
            right: -0.5rem;
          }

          .user-info {
            display: none;
          }

          .user-menu-button {
            padding: 0.5rem;
          }
        }

        @media (max-width: 640px) {
          .admin-header-right {
            gap: 0.5rem;
          }

          .search-wrapper.expanded {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: calc(100vw - 2rem);
            max-width: 20rem;
            z-index: 100;
          }

          .page-title {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;
