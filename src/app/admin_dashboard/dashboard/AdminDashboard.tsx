"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminSidebar, { ADMIN_MENUS } from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import AdminMainContent from "./AdminMainContent";

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [adminData, setAdminData] = useState({ displayName: "Administrator" }); // Default state
  const router = useRouter();
  const searchParams = useSearchParams();
  const role =
    (searchParams.get("role") as keyof typeof ADMIN_MENUS) || "admin";

  const [activePath, setActivePath] = useState("/admin_dashboard/dashboard");
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  useEffect(() => {
    const storedData = sessionStorage.getItem("adminUser");
    if (storedData) {
      setAdminData(JSON.parse(storedData));
    }
  }, []);
  const menuItems = ADMIN_MENUS[role] || ADMIN_MENUS.admin;

  const handleNavigation = (path: string) => {
    setActivePath(path);
    const menuItem =
      menuItems.find((item) => item.path === path) ||
      menuItems.find((item) => item.path.includes(path.split("/")[2]));
    if (menuItem) {
      setActiveComponent(menuItem.component);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminUser");
    sessionStorage.removeItem("isAuthenticated");
    router.push("/admin_dashboard");
  };

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const getCurrentPageTitle = () => {
    const menuItem = menuItems.find(
      (item) => item.component === activeComponent
    );
    return menuItem ? menuItem.label : "Dashboard";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar
        collapsed={collapsed}
        role={role}
        adminData={adminData}
        onNavigation={handleNavigation}
        onLogout={handleLogout}
        onToggle={handleToggle}
        activePath={activePath}
      />

      <div className="admin-main">
        <AdminHeader
          collapsed={collapsed}
          onMenuToggle={handleToggle}
          adminData={adminData}
          role={role}
          currentPage={getCurrentPageTitle()}
        />
        <AdminMainContent
          activeComponent={activeComponent}
          menuItems={menuItems}
          onNavigation={handleNavigation}
        />
      </div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: #f8fafc;
        }

        .admin-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .page-content {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .page-content h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .page-content p {
          color: #64748b;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .content-placeholder {
          padding: 40px;
          text-align: center;
          color: #64748b;
          font-style: italic;
          border: 2px dashed #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
