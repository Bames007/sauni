"use client";

import React from "react";
import StudentApplication from "../components/StudentApplication";
import StudentApplicationPayment from "../components/StudentApplicationPayment";

interface MainContentProps {
  activeComponent: string;
  menuItems: any[];
  onNavigation: (path: string) => void;
}

const AdminMainContent: React.FC<MainContentProps> = ({
  activeComponent,
  menuItems,
  onNavigation,
}) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return (
          <DashboardContent menuItems={menuItems} onNavigation={onNavigation} />
        );
      case "UserManagement":
        return <UserManagementContent />;
      case "Applications":
        return <StudentApplication />;
      case "Finance":
        return <StudentApplicationPayment />;
      case "Settings":
        return <SettingsContent />;
      case "Analytics":
        return <AnalyticsContent />;
      case "Payments":
        return <PaymentsContent />;
      case "Foundation":
        return <FoundationContent />;
      default:
        return (
          <DashboardContent menuItems={menuItems} onNavigation={onNavigation} />
        );
    }
  };

  return (
    <div className="main-content">
      <div className="content-wrapper">{renderComponent()}</div>
      <style jsx>{`
        .main-content {
          flex: 1;
          background: #f8fafc;
          overflow-y: auto;
        }

        .content-wrapper {
          padding: 24px;
          min-height: 100%;
        }
      `}</style>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent: React.FC<{
  menuItems: any[];
  onNavigation: (path: string) => void;
}> = ({ menuItems, onNavigation }) => {
  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to SAUNI Admin</h1>
        <p>
          Manage your institution efficiently with our comprehensive admin tools
        </p>
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {menuItems.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className="action-card"
              onClick={() => onNavigation(item.path)}
            >
              <div className="action-icon">{item.icon}</div>
              <div className="action-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="section">
        <h2>Overview</h2>
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">1,234</div>
              <div className="stat-label">Total Users</div>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">567</div>
              <div className="stat-label">Applications</div>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-value">₦12.5M</div>
              <div className="stat-label">Revenue</div>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">89%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-section {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 32px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .welcome-section h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
        }

        .welcome-section p {
          margin: 0;
          opacity: 0.9;
          font-size: 16px;
        }

        .section {
          margin-bottom: 32px;
        }

        .section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .action-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #3b82f6;
        }

        .action-icon {
          font-size: 32px;
          margin-bottom: 12px;
          transition: transform 0.3s ease;
        }

        .action-card:hover .action-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .action-label {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .stat-card.primary {
          border-left: 4px solid #3b82f6;
        }

        .stat-card.success {
          border-left: 4px solid #10b981;
        }

        .stat-card.warning {
          border-left: 4px solid #f59e0b;
        }

        .stat-card.info {
          border-left: 4px solid #06b6d4;
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

// Placeholder components for other sections
const UserManagementContent = () => (
  <div className="page-content">
    <h1>User Management</h1>
    <p>Manage system users and permissions</p>
    <div className="content-placeholder">
      User management content will appear here...
    </div>
  </div>
);

const ApplicationsContent = () => (
  <div className="page-content">
    <h1>Student Applications</h1>
    <p>Review and process student applications</p>
    <div className="content-placeholder">
      Applications content will appear here...
    </div>
  </div>
);

const FinanceContent = () => (
  <div className="page-content">
    <h1>Financial Records</h1>
    <p>View and manage financial transactions</p>
    <div className="content-placeholder">
      Finance content will appear here...
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="page-content">
    <h1>System Settings</h1>
    <p>Configure system preferences</p>
    <div className="content-placeholder">
      Settings content will appear here...
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div className="page-content">
    <h1>Analytics Reports</h1>
    <p>View detailed analytics and insights</p>
    <div className="content-placeholder">
      Analytics content will appear here...
    </div>
  </div>
);

const PaymentsContent = () => (
  <div className="page-content">
    <h1>Payment Tracking</h1>
    <p>Monitor payment status and history</p>
    <div className="content-placeholder">
      Payments content will appear here...
    </div>
  </div>
);

const FoundationContent = () => (
  <div className="page-content">
    <h1>Foundation</h1>
    <p>Foundation management and reports</p>
    <div className="content-placeholder">
      Foundation content will appear here...
    </div>
  </div>
);

export default AdminMainContent;
