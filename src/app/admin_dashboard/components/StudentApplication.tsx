"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ref,
  onValue,
  off,
  update,
  query,
  orderByChild,
} from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import {
  Search,
  Eye,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Shield,
  Filter,
  Download,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

import StatCard from "./application_components/StatCard";
import { allPrograms, ApplicationData } from "./type";
import ApplicationDetailModal from "./application_components/ApplicationDetails";
import { PDFTemplate } from "./application_components/PDFTemplate";

// Role-based access control
type UserRole = "admin" | "vc" | "founder" | "accounts";

const StudentApplication = () => {
  const [userRole] = useState<UserRole>("admin");
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationData | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
    waitlisted: 0,
  });

  // Role-based access control - Only admin can modify status
  const canModifyStatus = userRole === "admin";
  const canViewApplications = ["admin", "vc", "founder", "accounts"].includes(
    userRole
  );

  // Enhanced date formatting function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateStats = useCallback((apps: ApplicationData[]) => {
    setStats({
      total: apps.length,
      submitted: apps.filter((app) => app.status === "submitted").length,
      underReview: apps.filter((app) => app.status === "under_review").length,
      accepted: apps.filter((app) => app.status === "accepted").length,
      rejected: apps.filter((app) => app.status === "rejected").length,
      waitlisted: apps.filter((app) => app.status === "waitlisted").length,
    });
  }, []);

  useEffect(() => {
    const applicationsRef = query(
      ref(db, "applications/students"),
      orderByChild("submittedAt")
    );

    const fetchApplications = onValue(
      applicationsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const applicationsData: ApplicationData[] = [];
          snapshot.forEach((childSnapshot) => {
            applicationsData.push(childSnapshot.val());
          });
          setApplications(applicationsData);
          calculateStats(applicationsData);
        } else {
          setApplications([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    );

    return () => off(applicationsRef, "value", fetchApplications);
  }, [calculateStats]);

  const updateApplicationStatus = async (
    prospectiveId: string,
    newStatus: ApplicationData["status"]
  ) => {
    if (!canModifyStatus) {
      alert("You don't have permission to update application status");
      return;
    }

    try {
      const applicationRef = ref(db, `applications/students/${prospectiveId}`);
      await update(applicationRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("Failed to update application status");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.personalInfo.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      app.personalInfo.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      app.prospectiveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const programName =
      typeof app.programSelection.firstChoice === "string"
        ? app.programSelection.firstChoice
        : app.programSelection.firstChoice.name;
    const matchesProgram =
      programFilter === "all" || programName === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "status-submitted";
      case "under_review":
        return "status-under-review";
      case "accepted":
        return "status-accepted";
      case "rejected":
        return "status-rejected";
      case "waitlisted":
        return "status-waitlisted";
      default:
        return "status-default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="status-icon" />;
      case "under_review":
        return <Clock className="status-icon" />;
      case "accepted":
        return <CheckCircle className="status-icon" />;
      case "rejected":
        return <XCircle className="status-icon" />;
      case "waitlisted":
        return <AlertCircle className="status-icon" />;
      default:
        return <FileText className="status-icon" />;
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="modern-loader">
          <div className="loader-spinner"></div>
          <div className="loading-content">
            <h3 className="loading-title">Loading Applications</h3>
            <p className="loading-subtitle">Preparing student data...</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
        <style jsx>
          {`
            .loading-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
            }

            .modern-loader {
              background: white;
              padding: 2.5rem;
              border-radius: 1.5rem;
              box-shadow:
                0 20px 40px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(0, 0, 0, 0.05);
              text-align: center;
              min-width: 320px;
              animation: fadeInUp 0.6s ease-out;
            }

            .loader-spinner {
              width: 60px;
              height: 60px;
              border: 4px solid #f3f4f6;
              border-top: 4px solid #3b82f6;
              border-radius: 50%;
              margin: 0 auto 1.5rem;
              animation: spin 1.2s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
            }

            .loading-content {
              margin-bottom: 1.5rem;
            }

            .loading-title {
              font-size: 1.25rem;
              font-weight: 600;
              color: #1f2937;
              margin: 0 0 0.5rem 0;
            }

            .loading-subtitle {
              color: #6b7280;
              font-size: 0.875rem;
              margin: 0;
            }

            .progress-bar {
              width: 100%;
              height: 4px;
              background: #f3f4f6;
              border-radius: 2px;
              overflow: hidden;
            }

            .progress-fill {
              height: 100%;
              background: linear-gradient(90deg, #3b82f6, #60a5fa);
              border-radius: 2px;
              animation: progressPulse 2s ease-in-out infinite;
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            @keyframes progressPulse {
              0% {
                width: 0%;
                opacity: 1;
              }
              50% {
                width: 70%;
                opacity: 0.8;
              }
              100% {
                width: 100%;
                opacity: 0;
              }
            }

            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
              .loading-overlay {
                background: rgba(255, 255, 255, 0.95);
              }

              .modern-loader {
                background: #1f2937;
                box-shadow:
                  0 20px 40px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.1);
              }

              .loading-title {
                color: #f9fafb;
              }

              .loading-subtitle {
                color: #d1d5db;
              }

              .loader-spinner {
                border-color: #374151;
                border-top-color: #60a5fa;
              }

              .progress-bar {
                background: #374151;
              }
            }
          `}
        </style>
      </div>
    );
  }

  if (!canViewApplications) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-content">
          <Shield className="access-denied-icon" />
          <h1 className="access-denied-title">Access Denied</h1>
          <p className="access-denied-message">
            You don&apos;t have permission to view student applications. Please
            contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-applications-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title-section">
            <h1 className="main-title">Student Applications Dashboard</h1>
            <div className="user-info">
              <span className="user-role-badge">{userRole}</span>
              <span className="access-level-badge">
                {canModifyStatus ? "Full Access" : "View Only"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-main">
        {/* Stats Overview */}
        <div className="stats-section">
          <div className="stats-grid">
            <StatCard
              title="Total Applications"
              value={stats.total}
              icon={<User className="stat-icon" />}
              color="stat-icon-blue"
              description="All applications received"
              trend={{ value: 12, isPositive: true }}
              total={stats.total}
            />
            <StatCard
              title="Under Review"
              value={stats.underReview}
              icon={<Clock className="stat-icon" />}
              color="stat-icon-yellow"
              description="Currently being evaluated"
              trend={{ value: 8, isPositive: true }}
              total={stats.total}
            />
            <StatCard
              title="Accepted"
              value={stats.accepted}
              icon={<CheckCircle className="stat-icon" />}
              color="stat-icon-green"
              description="Approved for admission"
              trend={{ value: 15, isPositive: true }}
              total={stats.total}
            />
            <StatCard
              title="Waitlisted"
              value={stats.waitlisted}
              icon={<AlertCircle className="stat-icon" />}
              color="stat-icon-purple"
              description="On waiting list"
              trend={{ value: 5, isPositive: false }}
              total={stats.total}
            />
            <StatCard
              title="Submitted"
              value={stats.submitted}
              icon={<FileText className="stat-icon" />}
              color="stat-icon-gray"
              description="Awaiting review"
              trend={{ value: -3, isPositive: false }}
              total={stats.total}
            />
            <StatCard
              title="Rejected"
              value={stats.rejected}
              icon={<XCircle className="stat-icon" />}
              color="stat-icon-red"
              description="Not approved"
              trend={{ value: 2, isPositive: false }}
              total={stats.total}
            />
          </div>
        </div>

        {/* Combined Filters & Table Section */}
        <div className="applications-card">
          {/* Card Header */}
          <div className="card-header">
            <div className="card-title-section">
              <h2 className="card-title">Student Applications</h2>
              <p className="card-subtitle">
                {filteredApplications.length} of {applications.length}{" "}
                applications
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            <div className="card-actions">
              <button className="export-button">
                <Download className="export-icon" />
                Export
              </button>
            </div>
          </div>

          {/* Enhanced Filters and Search - Your Previous Implementation */}
          <div className="filters-section">
            <div className="filters-header">
              <div className="header-content">
                <div className="filters-title">
                  <Filter className="filters-title-icon" />
                  <h3>Application Filters</h3>
                </div>
                <div className="results-count">
                  <span className="count-highlight">
                    {filteredApplications.length}
                  </span>
                  <span>of {applications.length} applications</span>
                </div>
              </div>
            </div>

            <div className="filters-content">
              {/* Combined Search and Quick Filters */}
              <div className="search-filters-row">
                <div className="search-wrapper">
                  <div className="search-box">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button
                        className="clear-search"
                        onClick={() => setSearchTerm("")}
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="quick-filters">
                  <div className="filter-group compact">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="filter-select compact"
                    >
                      <option value="all">All Statuses</option>
                      <option value="submitted">📨 Submitted</option>
                      <option value="under_review">🔍 Review</option>
                      <option value="accepted">✅ Accepted</option>
                      <option value="rejected">❌ Rejected</option>
                      <option value="waitlisted">⏳ Waitlisted</option>
                    </select>
                  </div>

                  <div className="filter-group compact">
                    <select
                      value={programFilter}
                      onChange={(e) => setProgramFilter(e.target.value)}
                      className="filter-select compact"
                    >
                      <option value="all">All Programs</option>
                      {allPrograms.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="clear-filters-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setProgramFilter("all");
                    }}
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Active Filters - Always visible when active */}
              {(searchTerm ||
                statusFilter !== "all" ||
                programFilter !== "all") && (
                <div className="active-filters-section">
                  <div className="active-filters-header">
                    <span className="active-filters-label">Active Filters</span>
                    <button
                      className="clear-all-filters"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setProgramFilter("all");
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="active-filters-list">
                    {searchTerm && (
                      <div className="active-filter-tag">
                        <span className="filter-type">Search:</span>
                        <span className="filter-value">
                          &rdquo;{searchTerm}&ldquo;
                        </span>
                        <button
                          onClick={() => setSearchTerm("")}
                          aria-label="Remove search filter"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {statusFilter !== "all" && (
                      <div className="active-filter-tag">
                        <span className="filter-type">Status:</span>
                        <span className="filter-value">
                          {statusFilter.replace("_", " ")}
                        </span>
                        <button
                          onClick={() => setStatusFilter("all")}
                          aria-label="Remove status filter"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {programFilter !== "all" && (
                      <div className="active-filter-tag">
                        <span className="filter-type">Program:</span>
                        <span className="filter-value">{programFilter}</span>
                        <button
                          onClick={() => setProgramFilter("all")}
                          aria-label="Remove program filter"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Applications Table */}
          <div className="table-container">
            <div className="table-wrapper">
              <table className="applications-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-head">Student</th>
                    <th className="table-head">Program</th>
                    <th className="table-head">Status</th>
                    <th className="table-head">Applied</th>
                    <th className="table-head">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredApplications.map((application) => {
                    const programName =
                      typeof application.programSelection.firstChoice ===
                      "string"
                        ? application.programSelection.firstChoice
                        : application.programSelection.firstChoice.name;

                    return (
                      <tr key={application.prospectiveId} className="table-row">
                        <td className="table-cell">
                          <div className="student-info">
                            <div className="student-name">
                              {application.personalInfo.firstName}{" "}
                              {application.personalInfo.lastName}
                            </div>
                            <div className="student-id">
                              {application.prospectiveId}
                            </div>
                            <div className="student-email">
                              {application.contactInfo.email}
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="program-name" title={programName}>
                            {programName}
                          </div>
                        </td>
                        <td className="table-cell">
                          <span
                            className={`status-badge ${getStatusColor(application.status)}`}
                          >
                            {getStatusIcon(application.status)}
                            <span className="status-text">
                              {application.status.replace("_", " ")}
                            </span>
                          </span>
                        </td>
                        <td className="table-cell">
                          {formatDate(application.submittedAt)}
                        </td>
                        <td className="table-cell">
                          <div className="action-buttons">
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowApplicationModal(true);
                              }}
                              className="view-button"
                              title="View"
                            >
                              <Eye className="view-button-icon" />
                              View
                            </button>
                            {canModifyStatus && (
                              <select
                                value={application.status}
                                onChange={(e) =>
                                  updateApplicationStatus(
                                    application.prospectiveId,
                                    e.target.value as ApplicationData["status"]
                                  )
                                }
                                className="status-select"
                              >
                                <option value="submitted">Submitted</option>
                                <option value="under_review">
                                  Under Review
                                </option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                                <option value="waitlisted">Waitlisted</option>
                              </select>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredApplications.length === 0 && (
                <div className="empty-state">
                  <FileText className="empty-icon" />
                  <p className="empty-title">No applications found</p>
                  <p className="empty-message">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "No applications match your current filters"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showApplicationModal && selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setShowApplicationModal(false)}
          onStatusUpdate={updateApplicationStatus}
          formatDate={formatDate}
          canModifyStatus={canModifyStatus}
        />
      )}

      <style jsx>{`
        .filters-section {
          background: white;
          border-radius: 12px;
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 1px 2px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          margin-bottom: 2rem;
          overflow: hidden;
        }

        .filters-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          background: white;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filters-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .filters-title h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        .filters-title-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #3b82f6;
        }

        .results-count {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .count-highlight {
          font-weight: 700;
          color: #0f172a;
          font-size: 1rem;
        }

        .filters-content {
          padding: 1.5rem;
        }

        /* Combined Search and Filters Row */
        .search-filters-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .search-wrapper {
          flex: 1;
          min-width: 0; /* Prevents flex item from overflowing */
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .search-box:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: #6b7280;
          width: 1.25rem;
          height: 1.25rem;
          transition: color 0.2s;
        }

        .search-box:focus-within .search-icon {
          color: #3b82f6;
        }

        .search-input {
          flex: 1;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          font-family: "Inter", sans-serif;
          color: #1f2937;
          outline: none;
          width: 100%;
        }

        .search-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .clear-search {
          position: absolute;
          right: 0.75rem;
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          color: #6b7280;
          transition: all 0.15s ease;
        }

        .clear-search:hover {
          background: #e5e7eb;
          color: #374151;
        }

        /* Quick Filters */
        .quick-filters {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-shrink: 0;
        }

        .filter-group.compact {
          display: flex;
          flex-direction: column;
        }

        .filter-select.compact {
          padding: 0.75rem 2rem 0.75rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          font-family: "Inter", sans-serif;
          background: white;
          color: #1f2937;
          transition: all 0.2s ease;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1rem;
          min-width: 140px;
        }

        .filter-select.compact:hover {
          border-color: #9ca3af;
        }

        .filter-select.compact:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .clear-filters-btn {
          padding: 0.75rem 1rem;
          background: transparent;
          color: #6b7280;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: "Inter", sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: fit-content;
        }

        .clear-filters-btn:hover {
          background: #f8fafc;
          color: #374151;
          border-color: #9ca3af;
        }

        /* Active Filters Section */
        .active-filters-section {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid #f1f5f9;
        }

        .active-filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .active-filters-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .clear-all-filters {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .clear-all-filters:hover {
          background: #fef2f2;
        }

        .active-filters-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .active-filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #eff6ff;
          color: #1e40af;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid #dbeafe;
          transition: all 0.15s ease;
        }

        .active-filter-tag:hover {
          background: #dbeafe;
        }

        .filter-type {
          font-weight: 600;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-value {
          font-weight: 500;
        }

        .active-filter-tag button {
          background: #dbeafe;
          border: none;
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.75rem;
          color: #1e40af;
          transition: all 0.15s ease;
          margin-left: 0.25rem;
        }

        .active-filter-tag button:hover {
          background: #3b82f6;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .search-filters-row {
            flex-direction: column;
            gap: 1rem;
          }

          .quick-filters {
            width: 100%;
            justify-content: space-between;
          }

          .filter-select.compact {
            min-width: 120px;
            flex: 1;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .results-count {
            align-self: flex-start;
          }
        }

        @media (max-width: 640px) {
          .filters-content {
            padding: 1.25rem;
          }

          .quick-filters {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .filter-select.compact {
            min-width: auto;
            width: 100%;
          }

          .clear-filters-btn {
            width: 100%;
            text-align: center;
          }

          .active-filters-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .clear-all-filters {
            align-self: flex-end;
          }
        }

        @media (max-width: 480px) {
          .filters-section {
            border-radius: 8px;
            margin-bottom: 1.5rem;
          }

          .filters-header {
            padding: 1rem 1.25rem;
          }

          .filters-content {
            padding: 1rem;
          }

          .search-input {
            padding: 0.75rem 1rem 0.75rem 2.75rem;
            font-size: 0.9rem;
          }
        }
        //application new ones
        .student-applications-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        /* Header Styles - Your Previous Implementation */
        .dashboard-header {
          background: white;
          padding: 2rem 2rem 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-title-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .main-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1a202c;
          font-family: "Bebas Neue", sans-serif;
          margin: 0;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .user-info {
          display: flex;
          gap: 0.75rem;
        }

        .user-role-badge {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: capitalize;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .access-level-badge {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        /* Main Dashboard */
        .dashboard-main {
          padding: 1rem 2rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Stats Overview - Your Previous Implementation */
        .stats-section {
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        /* Applications Card */
        .applications-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-title-section {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          font-family: "Bebas Neue", sans-serif;
          margin: 0 0 0.5rem 0;
        }

        .card-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
        }

        .card-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .export-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #059669;
          color: white;
          padding: 0.625rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .export-button:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .export-icon {
          width: 1rem;
          height: 1rem;
        }

        /* Enhanced Filters and Search - Your Previous Implementation */
        .filters-section {
          background: white;
          border-radius: 0;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .filters-content {
          display: flex;
          gap: 1.5rem;
          align-items: flex-end;
        }

        .search-container {
          flex: 1;
        }

        .search-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 1.25rem;
          height: 1.25rem;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-family: "Gantari", sans-serif;
          transition: all 0.2s;
          background: #f9fafb;
        }

        .search-input:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
          background: white;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
          min-width: 400px;
        }

        .filter-select {
          flex: 1;
          padding: 0.875rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-family: "Gantari", sans-serif;
          background: #f9fafb;
          transition: all 0.2s;
        }

        .filter-select:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
          background: white;
        }

        /* Table Styles - Your Previous Implementation */
        .table-container {
          overflow-x: auto;
        }

        .table-wrapper {
          min-width: 800px;
        }

        .applications-table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-header {
          background: #f8fafc;
        }

        .table-head {
          padding: 1.25rem 1.5rem;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }

        .table-body {
          background: white;
        }

        .table-row {
          transition: background-color 0.2s;
          border-bottom: 1px solid #f3f4f6;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .table-cell {
          padding: 1.25rem 1.5rem;
          font-size: 0.95rem;
        }

        .student-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .student-name {
          font-weight: 600;
          color: #1f2937;
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.1rem;
        }

        .student-id {
          font-size: 0.875rem;
          color: #6b7280;
          font-family: monospace;
        }

        .student-email {
          font-size: 0.875rem;
          color: #3b82f6;
        }

        .program-name {
          font-weight: 500;
          color: #374151;
          max-width: 250px;
        }

        /* Status Badges - Improved Version */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: "Gantari", sans-serif;
          border: 1px solid;
        }

        .status-icon {
          width: 1rem;
          height: 1rem;
        }

        .status-submitted {
          background: #dbeafe;
          color: #1e40af;
          border-color: #bfdbfe;
        }

        .status-under-review {
          background: #fef3c7;
          color: #92400e;
          border-color: #fde68a;
        }

        .status-accepted {
          background: #d1fae5;
          color: #065f46;
          border-color: #a7f3d0;
        }

        .status-rejected {
          background: #fee2e2;
          color: #991b1b;
          border-color: #fecaca;
        }

        .status-waitlisted {
          background: #f3e8ff;
          color: #6b21a8;
          border-color: #e9d5ff;
        }

        .status-default {
          background: #f3f4f6;
          color: #374151;
          border-color: #e5e7eb;
        }

        .status-text {
          text-transform: capitalize;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .view-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #3b82f6;
          color: white;
          padding: 0.625rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: "Gantari", sans-serif;
          border: none;
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }

        .view-button:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .view-button-icon {
          width: 1rem;
          height: 1rem;
        }

        .status-select {
          padding: 0.625rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-family: "Gantari", sans-serif;
          background: white;
          min-width: 140px;
          transition: all 0.2s;
        }

        .status-select:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-icon {
          width: 5rem;
          height: 5rem;
          color: #d1d5db;
          margin: 0 auto 1.5rem;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #6b7280;
          font-family: "Bebas Neue", sans-serif;
          margin: 0 0 0.5rem 0;
        }

        .empty-message {
          color: #9ca3af;
          font-size: 1rem;
          margin: 0;
        }

        /* Loading State - Your Improved Version */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modern-loader {
          background: white;
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          text-align: center;
          min-width: 320px;
          animation: fadeInUp 0.6s ease-out;
        }

        .loader-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          animation: spin 1.2s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
        }

        .loading-content {
          margin-bottom: 1.5rem;
        }

        .loading-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }

        .loading-subtitle {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: #f3f4f6;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          border-radius: 2px;
          animation: progressPulse 2s ease-in-out infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes progressPulse {
          0% {
            width: 0%;
            opacity: 1;
          }
          50% {
            width: 70%;
            opacity: 0.8;
          }
          100% {
            width: 100%;
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Access Denied */
        .access-denied-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .access-denied-content {
          text-align: center;
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          max-width: 500px;
          width: 100%;
        }

        .access-denied-icon {
          width: 5rem;
          height: 5rem;
          color: #ef4444;
          margin: 0 auto 2rem;
        }

        .access-denied-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          font-family: "Bebas Neue", sans-serif;
          margin: 0 0 1rem 0;
        }

        .access-denied-message {
          color: #6b7280;
          font-size: 1.125rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .filters-content {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .filter-controls {
            min-width: auto;
          }
        }

        @media (max-width: 768px) {
          .dashboard-main {
            padding: 1rem;
          }

          .header-title-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .main-title {
            font-size: 2rem;
          }

          .card-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .filter-controls {
            flex-direction: column;
          }

          .action-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .view-button,
          .status-select {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

PDFTemplate.displayName = "PDFTemplate";

export const InfoFieldPDF: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="pdf-info-field">
    <strong className="pdf-info-label">{label}:</strong> {value}
  </div>
);

export const InfoField: React.FC<{
  label: string;
  value: string;
  icon?: LucideIcon;
  highlight?: boolean;
}> = ({ label, value, icon: Icon, highlight = false }) => {
  return (
    <div className={`info-field ${highlight ? "highlight" : ""}`}>
      <div className="info-field-header">
        {Icon && <Icon className="info-field-icon" />}
        <label className="info-field-label">{label}</label>
      </div>
      <p className="info-field-value">{value || "Not provided"}</p>
    </div>
  );
};

export default StudentApplication;
