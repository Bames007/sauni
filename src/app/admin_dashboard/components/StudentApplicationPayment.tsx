"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ref,
  onValue,
  off,
  query,
  orderByChild,
  update,
} from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import {
  Search,
  Eye,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Users,
  Receipt,
  Shield,
  Filter,
  Download,
  FileText,
  XCircle,
} from "lucide-react";

export interface Payment {
  id: string;
  amount: number;
  description: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "processing" | "failed";
  type: "application_fee" | "tuition_deposit" | "full_tuition";
  paystackReference?: string;
  paidAt?: string;
  metadata?: {
    prospectiveId: string;
    studentName: string;
    program: string;
    paymentId: string;
  };
}

// Role-based access control
type UserRole = "admin" | "vc" | "founder" | "accounts";

const StudentPayment = ({ userRole = "accounts" }: { userRole?: UserRole }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    confirmedRevenue: 0,
    pendingRevenue: 0,
    totalTransactions: 0,
    studentsWithPayments: 0,
    averagePayment: 0,
  });

  // Role-based access control
  const canManagePayments = userRole === "accounts";
  const canViewPayments = ["admin", "founder", "accounts"].includes(userRole);
  const canViewFinancialSummary = ["founder", "accounts"].includes(userRole);

  // Enhanced date formatting function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateStats = useCallback((pays: Payment[]) => {
    const confirmedPayments = pays.filter((p) => p.status === "paid");
    const pendingPayments = pays.filter(
      (p) => p.status === "pending" || p.status === "processing"
    );

    const totalRevenue = pays.reduce((sum, payment) => sum + payment.amount, 0);
    const confirmedRevenue = confirmedPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const pendingRevenue = pendingPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const uniqueStudents = new Set(pays.map((p) => p.metadata?.prospectiveId))
      .size;
    const averagePayment =
      confirmedPayments.length > 0
        ? confirmedRevenue / confirmedPayments.length
        : 0;

    setStats({
      totalRevenue,
      confirmedRevenue,
      pendingRevenue,
      totalTransactions: pays.length,
      studentsWithPayments: uniqueStudents,
      averagePayment,
    });
  }, []);

  // Fetch payments data
  useEffect(() => {
    const paymentsRef = query(ref(db, "payments"), orderByChild("dueDate"));

    const fetchPayments = onValue(
      paymentsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const paymentsData: Payment[] = [];
          snapshot.forEach((childSnapshot) => {
            paymentsData.push(childSnapshot.val());
          });
          setPayments(paymentsData);
          calculateStats(paymentsData);
        } else {
          setPayments([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      }
    );

    return () => off(paymentsRef, "value", fetchPayments);
  }, [calculateStats]);

  const updatePaymentStatus = async (
    paymentId: string,
    newStatus: Payment["status"]
  ) => {
    if (!canManagePayments) {
      alert("You don't have permission to update payment status");
      return;
    }

    try {
      const paymentRef = ref(db, `payments/${paymentId}`);
      await update(paymentRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        ...(newStatus === "paid" && { paidAt: new Date().toISOString() }),
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status");
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.metadata?.studentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.metadata?.prospectiveId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.paystackReference
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesProgram =
      programFilter === "all" || payment.metadata?.program === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "status-accepted";
      case "processing":
        return "status-under-review";
      case "pending":
        return "status-submitted";
      case "overdue":
        return "status-rejected";
      case "failed":
        return "status-rejected";
      default:
        return "status-default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="status-icon" />;
      case "processing":
        return <Clock className="status-icon" />;
      case "pending":
        return <FileText className="status-icon" />;
      case "overdue":
        return <AlertCircle className="status-icon" />;
      case "failed":
        return <XCircle className="status-icon" />;
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
            <h3 className="loading-title">Loading Payment Records</h3>
            <p className="loading-subtitle">Preparing financial data...</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
        <style jsx>{`
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #017840;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modern-loader {
            background: rgba(255, 255, 255, 0.1);
            padding: 2.5rem;
            border-radius: 1.5rem;
            border: 2px solid #bd9946;
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(189, 153, 70, 0.3);
            text-align: center;
            min-width: 320px;
            animation: fadeInUp 0.6s ease-out;
            backdrop-filter: blur(12px);
          }

          .loader-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.2);
            border-top: 4px solid #bd9946;
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
            color: white;
            margin: 0 0 0.5rem 0;
          }

          .loading-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.875rem;
            margin: 0;
          }

          .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #bd9946, #d4af37);
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
        `}</style>
      </div>
    );
  }

  if (!canViewPayments) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-content">
          <Shield className="access-denied-icon" />
          <h1 className="access-denied-title">Access Denied</h1>
          <p className="access-denied-message">
            You don't have permission to view payment information. Please
            contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-payments-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title-section">
            <h1 className="main-title">Payment Management Dashboard</h1>
            <div className="user-info">
              <span className="user-role-badge">{userRole}</span>
              <span className="access-level-badge">
                {canManagePayments ? "Full Access" : "View Only"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-main">
        {/* Stats Overview */}
        {canViewFinancialSummary && (
          <div className="stats-section">
            <div className="stats-grid">
              <StatCard
                title="Total Revenue"
                value={formatCurrency(stats.totalRevenue)}
                icon={<DollarSign className="stat-icon" />}
                color="stat-icon-green"
                description="All payment records"
                trend={{ value: 12.5, isPositive: true }}
                total={stats.totalRevenue}
              />
              <StatCard
                title="Confirmed Revenue"
                value={formatCurrency(stats.confirmedRevenue)}
                icon={<CheckCircle className="stat-icon" />}
                color="stat-icon-blue"
                description="Verified payments"
                trend={{ value: 8.2, isPositive: true }}
                total={stats.totalRevenue}
              />
              <StatCard
                title="Pending Revenue"
                value={formatCurrency(stats.pendingRevenue)}
                icon={<Clock className="stat-icon" />}
                color="stat-icon-yellow"
                description="Awaiting confirmation"
                trend={{ value: -3.1, isPositive: false }}
                total={stats.totalRevenue}
              />
              <StatCard
                title="Students Paid"
                value={stats.studentsWithPayments.toString()}
                icon={<Users className="stat-icon" />}
                color="stat-icon-purple"
                description="Unique students"
                trend={{ value: 15.7, isPositive: true }}
                total={stats.studentsWithPayments}
              />
              <StatCard
                title="Total Transactions"
                value={stats.totalTransactions.toString()}
                icon={<Receipt className="stat-icon" />}
                color="stat-icon-gray"
                description="All transactions"
                trend={{ value: 5.2, isPositive: true }}
                total={stats.totalTransactions}
              />
              <StatCard
                title="Average Payment"
                value={formatCurrency(stats.averagePayment)}
                icon={<TrendingUp className="stat-icon" />}
                color="stat-icon-emerald"
                description="Per transaction"
                trend={{ value: 2.3, isPositive: true }}
                total={stats.averagePayment}
              />
            </div>
          </div>
        )}

        {/* Combined Filters & Table Section */}
        <div className="applications-card">
          {/* Card Header */}
          <div className="card-header">
            <div className="card-title-section">
              <h2 className="card-title">Payment Records</h2>
              <p className="card-subtitle">
                {filteredPayments.length} of {payments.length} payments
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            <div className="card-actions">
              {canManagePayments && (
                <button className="export-button">
                  <Download className="export-icon" />
                  Export
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Filters and Search */}
          <div className="filters-section">
            <div className="filters-header">
              <div className="header-content">
                <div className="filters-title">
                  <Filter className="filters-title-icon" />
                  <h3>Payment Filters</h3>
                </div>
                <div className="results-count">
                  <span className="count-highlight">
                    {filteredPayments.length}
                  </span>
                  <span>of {payments.length} payments</span>
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
                      placeholder="Search payments by student, ID, or reference..."
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
                      <option value="pending">⏳ Pending</option>
                      <option value="processing">🔍 Processing</option>
                      <option value="paid">✅ Paid</option>
                      <option value="overdue">⚠️ Overdue</option>
                      <option value="failed">❌ Failed</option>
                    </select>
                  </div>

                  <div className="filter-group compact">
                    <select
                      value={programFilter}
                      onChange={(e) => setProgramFilter(e.target.value)}
                      className="filter-select compact"
                    >
                      <option value="all">All Programs</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business Administration">
                        Business Administration
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
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

              {/* Active Filters */}
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
                        <span className="filter-value">"{searchTerm}"</span>
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

          {/* Payments Table */}
          <div className="table-container">
            <div className="table-wrapper">
              <table className="applications-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-head">Student & Program</th>
                    <th className="table-head">Payment Details</th>
                    <th className="table-head">Amount</th>
                    <th className="table-head">Status</th>
                    <th className="table-head">Date</th>
                    <th className="table-head">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredPayments.map((payment) => (
                    <PaymentRow
                      key={payment.id}
                      payment={payment}
                      onView={() => {
                        setSelectedPayment(payment);
                        setShowPaymentModal(true);
                      }}
                      onStatusUpdate={
                        canManagePayments ? updatePaymentStatus : undefined
                      }
                      formatDate={formatDate}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </tbody>
              </table>

              {filteredPayments.length === 0 && (
                <div className="empty-state">
                  <Receipt className="empty-icon" />
                  <p className="empty-title">No payments found</p>
                  <p className="empty-message">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "No payments match your current filters"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Detail Modal */}
      {showPaymentModal && selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setShowPaymentModal(false)}
          onStatusUpdate={canManagePayments ? updatePaymentStatus : undefined}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          canManage={canManagePayments}
        />
      )}

      <style jsx>{`
        .student-payments-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        /* Header Styles */
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

        /* Stats Overview */
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

        /* Enhanced Filters and Search */
        .filters-section {
          background: white;
          border-radius: 0;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
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

        .search-filters-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .search-wrapper {
          flex: 1;
          min-width: 0;
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

        /* Table Styles */
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

        /* Status Badges */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: "Inter", sans-serif;
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
          font-family: "Inter", sans-serif;
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
          font-family: "Inter", sans-serif;
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

// Supporting Components
const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  trend: { value: number; isPositive: boolean };
  total: number;
}> = ({ title, value, icon, color, description, trend, total }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className={`stat-icon-container ${color}`}>{icon}</div>
        <div
          className={`stat-trend ${trend.isPositive ? "positive" : "negative"}`}
        >
          <TrendingUp
            className={`trend-icon ${!trend.isPositive ? "negative" : ""}`}
          />
          {Math.abs(trend.value)}%
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
        <p className="stat-description">{description}</p>
      </div>
      <style jsx>{`
        .stat-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .stat-icon-container {
          padding: 0.75rem;
          border-radius: 0.75rem;
          color: white;
        }

        .stat-icon-blue {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        }

        .stat-icon-green {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .stat-icon-yellow {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }

        .stat-icon-purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }

        .stat-icon-gray {
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
        }

        .stat-icon-emerald {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: "Inter", sans-serif;
        }

        .stat-trend.positive {
          background: #d1fae5;
          color: #065f46;
        }

        .stat-trend.negative {
          background: #fee2e2;
          color: #991b1b;
        }

        .trend-icon {
          width: 0.875rem;
          height: 0.875rem;
        }

        .trend-icon.negative {
          transform: rotate(180deg);
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1f2937;
          font-family: "Bebas Neue", sans-serif;
          margin: 0;
          line-height: 1;
        }

        .stat-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }

        .stat-description {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

const PaymentRow: React.FC<{
  payment: Payment;
  onView: () => void;
  onStatusUpdate?: (id: string, status: Payment["status"]) => void;
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
}> = ({ payment, onView, onStatusUpdate, formatDate, formatCurrency }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "status-accepted";
      case "processing":
        return "status-under-review";
      case "pending":
        return "status-submitted";
      case "overdue":
        return "status-rejected";
      case "failed":
        return "status-rejected";
      default:
        return "status-default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="status-icon" />;
      case "processing":
        return <Clock className="status-icon" />;
      case "pending":
        return <FileText className="status-icon" />;
      case "overdue":
        return <AlertCircle className="status-icon" />;
      case "failed":
        return <XCircle className="status-icon" />;
      default:
        return <FileText className="status-icon" />;
    }
  };

  return (
    <tr key={payment.id} className="table-row">
      <td className="table-cell">
        <div className="student-info">
          <div className="student-name">
            {payment.metadata?.studentName || "Unknown Student"}
          </div>
          <div className="student-id">
            {payment.metadata?.prospectiveId || "N/A"}
          </div>
          <div className="student-program">
            {payment.metadata?.program || "No Program"}
          </div>
        </div>
      </td>
      <td className="table-cell">
        <div className="payment-details">
          <div className="payment-description">{payment.description}</div>
          <div className="payment-type">
            {payment.type.replace("_", " ").toUpperCase()}
          </div>
          {payment.paystackReference && (
            <div className="payment-reference">
              Ref: {payment.paystackReference}
            </div>
          )}
        </div>
      </td>
      <td className="table-cell">
        <div className="payment-amount">{formatCurrency(payment.amount)}</div>
      </td>
      <td className="table-cell">
        <span className={`status-badge ${getStatusColor(payment.status)}`}>
          {getStatusIcon(payment.status)}
          <span className="status-text">{payment.status}</span>
        </span>
      </td>
      <td className="table-cell">
        <div className="payment-date">
          {payment.paidAt
            ? formatDate(payment.paidAt)
            : formatDate(payment.dueDate)}
        </div>
        <div className="date-label">{payment.paidAt ? "Paid" : "Due"}</div>
      </td>
      <td className="table-cell">
        <div className="action-buttons">
          <button onClick={onView} className="view-button" title="View Details">
            <Eye className="view-button-icon" />
            View
          </button>
          {onStatusUpdate && (
            <select
              value={payment.status}
              onChange={(e) =>
                onStatusUpdate(payment.id, e.target.value as Payment["status"])
              }
              className="status-select"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="failed">Failed</option>
            </select>
          )}
        </div>
      </td>
      <style jsx>{`
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

        .student-program {
          font-size: 0.875rem;
          color: #3b82f6;
        }

        .payment-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .payment-description {
          font-weight: 600;
          color: #374151;
        }

        .payment-type {
          font-size: 0.875rem;
          color: #6b7280;
          text-transform: capitalize;
        }

        .payment-reference {
          font-size: 0.75rem;
          color: #9ca3af;
          font-family: monospace;
        }

        .payment-amount {
          font-weight: 700;
          color: #059669;
          font-size: 1.1rem;
        }

        .payment-date {
          font-weight: 500;
          color: #374151;
        }

        .date-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
        }
      `}</style>
    </tr>
  );
};

const PaymentDetailModal: React.FC<{
  payment: Payment;
  onClose: () => void;
  onStatusUpdate?: (id: string, status: Payment["status"]) => void;
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  canManage: boolean;
}> = ({
  payment,
  onClose,
  onStatusUpdate,
  formatDate,
  formatCurrency,
  canManage,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Payment Details</h3>
          <button onClick={onClose} className="close-button">
            <X className="close-icon" />
          </button>
        </div>

        <div className="modal-body">
          {/* Student Information */}
          <div className="info-section">
            <h4 className="section-title">Student Information</h4>
            <div className="info-grid">
              <InfoField
                label="Student Name"
                value={payment.metadata?.studentName || "Unknown"}
              />
              <InfoField
                label="Student ID"
                value={payment.metadata?.prospectiveId || "N/A"}
              />
              <InfoField
                label="Program"
                value={payment.metadata?.program || "Not specified"}
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="info-section">
            <h4 className="section-title">Payment Information</h4>
            <div className="info-grid">
              <InfoField label="Description" value={payment.description} />
              <InfoField
                label="Amount"
                value={formatCurrency(payment.amount)}
                highlight
              />
              <InfoField
                label="Type"
                value={payment.type.replace("_", " ").toUpperCase()}
              />
              <InfoField label="Status" value={payment.status} highlight />
              <InfoField label="Due Date" value={formatDate(payment.dueDate)} />
              {payment.paidAt && (
                <InfoField
                  label="Paid Date"
                  value={formatDate(payment.paidAt)}
                />
              )}
              {payment.paystackReference && (
                <InfoField
                  label="Paystack Reference"
                  value={payment.paystackReference}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {canManage && onStatusUpdate && (
            <div className="action-section">
              <div className="action-buttons-grid">
                <button
                  onClick={() => onStatusUpdate(payment.id, "paid")}
                  className="action-button confirm"
                >
                  <CheckCircle className="action-icon" />
                  Mark as Paid
                </button>
                <button
                  onClick={() => onStatusUpdate(payment.id, "processing")}
                  className="action-button process"
                >
                  <Clock className="action-icon" />
                  Mark Processing
                </button>
                <button
                  onClick={() => onStatusUpdate(payment.id, "failed")}
                  className="action-button reject"
                >
                  <XCircle className="action-icon" />
                  Mark Failed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
          border-radius: 1rem 1rem 0 0;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          font-family: "Bebas Neue", sans-serif;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .close-button:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .close-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .info-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 1rem 0;
          font-family: "Bebas Neue", sans-serif;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .action-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .action-buttons-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          border: none;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-button.confirm {
          background: #059669;
          color: white;
        }

        .action-button.confirm:hover {
          background: #047857;
        }

        .action-button.process {
          background: #f59e0b;
          color: white;
        }

        .action-button.process:hover {
          background: #d97706;
        }

        .action-button.reject {
          background: #dc2626;
          color: white;
        }

        .action-button.reject:hover {
          background: #b91c1c;
        }

        .action-icon {
          width: 1rem;
          height: 1rem;
        }
      `}</style>
    </div>
  );
};

const InfoField: React.FC<{
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ label, value, highlight = false }) => {
  return (
    <div className="info-field">
      <label className="info-label">{label}</label>
      <span className={`info-value ${highlight ? "highlight" : ""}`}>
        {value}
      </span>
      <style jsx>{`
        .info-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .info-field:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          font-family: "Inter", sans-serif;
        }

        .info-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          font-family: "Inter", sans-serif;
        }

        .info-value.highlight {
          color: #059669;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default StudentPayment;
