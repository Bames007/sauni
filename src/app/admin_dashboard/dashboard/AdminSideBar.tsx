"use client";

import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Settings,
  BarChart3,
  Building2,
  Landmark,
  ClipboardList,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import { AdminData } from "./AdminHeader";

export const ADMIN_MENUS = {
  vc: [
    {
      label: "Dashboard",
      path: "/admin_dashboard/dashboard",
      icon: <LayoutDashboard size={20} />,
      component: "Dashboard",
    },
    {
      label: "User Management",
      path: "/admin/users",
      icon: <Users size={20} />,
      component: "UserManagement",
    },
    {
      label: "Student Applications",
      path: "/admin_dashboard/applications",
      icon: <FileText size={20} />,
      component: "Applications",
    },
    {
      label: "Application Payment",
      path: "/admin/finance",
      icon: <CreditCard size={20} />,
      component: "Finance",
    },
    {
      label: "System Settings",
      path: "/admin/system",
      icon: <Settings size={20} />,
      component: "Settings",
    },
    {
      label: "Analytics Reports",
      path: "/admin/analytics",
      icon: <BarChart3 size={20} />,
      component: "Analytics",
    },
  ],
  admin: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      component: "Dashboard",
    },
    {
      label: "User Management",
      path: "/admin/users",
      icon: <Users size={20} />,
      component: "UserManagement",
    },
    {
      label: "Student Applications",
      path: "/admin/applications",
      icon: <FileText size={20} />,
      component: "Applications",
    },
    {
      label: "Analytics Reports",
      path: "/admin/analytics",
      icon: <BarChart3 size={20} />,
      component: "Analytics",
    },
  ],
  accounts: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      component: "Dashboard",
    },
    {
      label: "Application Payment",
      path: "/admin/finance",
      icon: <CreditCard size={20} />,
      component: "Finance",
    },
    {
      label: "Payment Tracking",
      path: "/admin/payments",
      icon: <Landmark size={20} />,
      component: "Payments",
    },
  ],
  founder: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      component: "Dashboard",
    },
    {
      label: "User Management",
      path: "/admin/users",
      icon: <Users size={20} />,
      component: "UserManagement",
    },
    {
      label: "Student Applications",
      path: "/admin/applications",
      icon: <FileText size={20} />,
      component: "Applications",
    },
    {
      label: "Application Payment",
      path: "/admin/finance",
      icon: <CreditCard size={20} />,
      component: "Finance",
    },
    {
      label: "System Settings",
      path: "/admin/system",
      icon: <Settings size={20} />,
      component: "Settings",
    },
    {
      label: "Analytics Reports",
      path: "/admin/analytics",
      icon: <BarChart3 size={20} />,
      component: "Analytics",
    },
    {
      label: "Foundation",
      path: "/admin/foundation",
      icon: <Building2 size={20} />,
      component: "Foundation",
    },
  ],
};

interface SidebarProps {
  collapsed: boolean;
  role: string;
  adminData: AdminData;
  onNavigation: (path: string) => void;
  onLogout: () => void;
  onToggle: () => void;
  activePath: string;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  collapsed,
  role,
  adminData,
  onNavigation,
  onLogout,
  activePath,
}) => {
  const menuItems =
    ADMIN_MENUS[role as keyof typeof ADMIN_MENUS] || ADMIN_MENUS.admin;

  return (
    <div className="sidebar-container">
      <Sidebar
        collapsed={collapsed}
        style={{
          height: "100vh",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Premium Header */}
        <div className="sidebar-header">
          <div className="logo-section">
            {!collapsed ? (
              <div className="logo-full">
                <div className="logo-glow">
                  <div className="logo-image">
                    <Image
                      src="/sauni-logo.png"
                      alt="SAU"
                      width={72}
                      height={72}
                      priority
                      className="logo-img"
                    />
                    <div className="logo-shine"></div>
                  </div>
                </div>
                <div className="logo-text">
                  <span className="logo-primary">SOUTHERN</span>
                  <span className="logo-primary">ATLANTIC</span>
                  <span className="logo-primary">UNIVERSITY</span>
                </div>
              </div>
            ) : (
              <div className="logo-collapsed">
                <div className="logo-glow">
                  <Image
                    src="/sauni-logo.png"
                    alt="SAUNI"
                    width={32}
                    height={32}
                    priority
                    className="logo-img"
                  />
                  <div className="logo-shine"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Updated User Info Section */}
        {!collapsed ? (
          <div className="user-info-horizontal">
            <div className="avatar-container-horizontal">
              <div className="user-avatar-horizontal">
                {adminData.avatar ? (
                  <Image
                    src={adminData.avatar}
                    alt={adminData.displayName!}
                    width={44}
                    height={44}
                    className="avatar-img"
                  />
                ) : (
                  <User size={20} className="avatar-fallback" />
                )}
              </div>
              <div className="avatar-ring-horizontal"></div>
            </div>
            <div className="user-details-horizontal">
              <div className="user-name">Eddy Bames</div>
              <div className="user-role">
                <span className="role-badge">{role.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="user-info-collapsed">
            <div className="user-avatar-collapsed">
              <User size={20} />
            </div>
          </div>
        )}

        {/* Navigation Container - This will grow and take available space */}
        <div className="navigation-container">
          <Menu
            menuItemStyles={{
              button: {
                [`&.ps-active`]: {
                  background:
                    "linear-gradient(135deg, #017840 0%, #015C33 100%)",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 15px rgba(1, 120, 64, 0.3)",
                },
                [`&:hover`]: {
                  background: "rgba(1, 120, 64, 0.1)",
                  color: "#017840",
                  transform: "translateX(4px)",
                  "& .menu-icon": {
                    transform: "scale(1.1) translateX(2px)",
                  },
                },
                padding: "12px 16px",
                margin: "4px 12px",
                borderRadius: "10px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                color: "#017840",
                background: "transparent",
                position: "relative",
                overflow: "hidden",
              },
            }}
            rootStyles={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Regular Menu Items */}
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={
                  <div
                    className={`menu-icon ${activePath === item.path ? "active" : ""}`}
                  >
                    {React.cloneElement(item.icon, {
                      size: 20,
                      color: activePath === item.path ? "#FFFFFF" : "#017840",
                    })}
                  </div>
                }
                onClick={() => onNavigation(item.path)}
                active={activePath === item.path}
                className="menu-item"
              >
                {item.label}
                {activePath === item.path && (
                  <div className="active-indicator"></div>
                )}
              </MenuItem>
            ))}

            {/* Reports & Analytics Submenu */}
            <SubMenu
              label="Reports & Analytics"
              icon={
                <div className="menu-icon">
                  <ClipboardList size={20} color="#017840" />
                </div>
              }
              className="submenu"
            >
              <MenuItem
                onClick={() => onNavigation("/admin/reports/financial")}
                active={activePath === "/admin/reports/financial"}
                className="submenu-item"
              >
                Financial Reports
              </MenuItem>
              <MenuItem
                onClick={() => onNavigation("/admin/reports/admissions")}
                active={activePath === "/admin/reports/admissions"}
                className="submenu-item"
              >
                Admissions Reports
              </MenuItem>
              {(role === "vc" || role === "founder") && (
                <MenuItem
                  onClick={() => onNavigation("/admin/reports/executive")}
                  active={activePath === "/admin/reports/executive"}
                  className="submenu-item"
                >
                  Executive Summary
                </MenuItem>
              )}
            </SubMenu>

            {/* This spacer will push the menu content up and create space for bottom items */}
            <div style={{ flex: 1 }} />
          </Menu>
        </div>

        {/* Bottom Section - Always stays at bottom */}
        <div className="bottom-section">
          {/* Active Session Footer */}
          {!collapsed && (
            <div className="session-footer">
              <div className="session-container">
                <div className="session-info">
                  <div className="session-dot"></div>
                  <span className="session-text">
                    Active Session •{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          {!collapsed && (
            <div className="logout-container" onClick={onLogout}>
              <div className="logout-content">
                <div className="logout-icon">
                  <LogOut size={18} color="#FFFFFF" />
                </div>
                <span className="logout-text">Logout</span>
              </div>
            </div>
          )}
        </div>
      </Sidebar>

      {/* Cleaned CSS Styles */}
      <style jsx>{`
        .sidebar-container {
          position: relative;
        }

        .sidebar-header {
          display: flex;
          align-items: start;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(1, 120, 64, 0.8);
          backdrop-filter: blur(10px);
          position: relative;
        }

        .sidebar-header::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 20px;
          right: 20px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #bd9946, transparent);
        }

        .logo-full {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .logo-glow {
          position: relative;
          filter: drop-shadow(0 0 20px rgba(189, 153, 70, 0.3));
        }

        .logo-image {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 12px;
          overflow: hidden;
        }

        .logo-img {
          border-radius: 10px;
          filter: brightness(1.1);
        }

        .logo-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: skewX(-20deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-primary {
          font-weight: 900;
          font-size: 12px;
          background: #fff;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 1px;
        }

        .logo-collapsed {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 15px rgba(189, 153, 70, 0.4));
        }

        /* Updated User Info Styles */
        .user-info-horizontal {
          display: flex;
          align-items: center;
          padding: 20px;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.95);
        }

        .avatar-container-horizontal {
          position: relative;
          flex-shrink: 0;
        }

        .user-avatar-horizontal {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #017840, #bd9946);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .avatar-ring-horizontal {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 1px solid transparent;
          border-radius: 50%;
          background: linear-gradient(135deg, #017840, #bd9946) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .user-details-horizontal {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-info-horizontal .user-name {
          font-weight: 700;
          color: #017840;
          font-size: 14px;
          line-height: 1.2;
        }

        .user-info-horizontal .user-role {
          margin-bottom: 0;
        }

        .user-info-horizontal .role-badge {
          background: linear-gradient(135deg, #017840, #015c33);
          color: #ffffff;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
        }

        .user-info-collapsed {
          padding-top: 20px;
          padding: 20px 10px 5px 10px;
          display: flex;

          justify-content: center;
        }

        .user-avatar-collapsed {
          width: 44px;
          height: 44px;
          border-radius: 25%;
          background: linear-gradient(135deg, #017840, #bd9946);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .user-avatar-collapsed:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(1, 120, 64, 0.3);
        }

        .navigation-container {
          // padding: 16px 8px;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .menu-item {
          position: relative;
          font-weight: 600;
          font-size: 14px;
        }

        .active-indicator {
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 20px;
          background: linear-gradient(135deg, #bd9946, #f0c660);
          border-radius: 2px;
        }

        .menu-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .submenu {
          font-weight: 600;
        }

        .submenu-item {
          font-size: 13px;
          font-weight: 500;
        }

        /* Active Session Styles */
        .user-footer {
          padding: 0 16px 16px;
        }
        .bottom-section {
          margin-top: auto;
          padding: 16px;
        }
        .session-footer {
          margin-bottom: 12px;
        }

        .session-container {
          background: linear-gradient(135deg, #bd9946, #f0c660);
          border-radius: 12px;
          padding: 12px 16px;
          box-shadow: 0 4px 15px rgba(189, 153, 70, 0.3);
          animation: container-pulse 2s infinite;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes container-pulse {
          0%,
          100% {
            box-shadow: 0 4px 15px rgba(189, 153, 70, 0.3);
          }
          50% {
            box-shadow: 0 4px 20px rgba(189, 153, 70, 0.6);
          }
        }

        .session-info {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
        }

        .session-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffffff;
          animation: dot-pulse 1.5s infinite;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        @keyframes dot-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.8;
          }
        }

        .session-text {
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          letter-spacing: 0.3px;
        }

        /* Logout Container Styles */
        .logout-container {
          background: linear-gradient(135deg, #017840, #015c33);
          border-radius: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(1, 120, 64, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(1, 120, 64, 0.5);
          background: linear-gradient(135deg, #015c33, #014427);
        }

        .logout-content {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .logout-icon {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .logout-container:hover .logout-icon {
          transform: translateX(2px) scale(1.1);
        }

        .logout-text {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;
