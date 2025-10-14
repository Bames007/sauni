"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ref, onValue, off, query, orderByChild } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import {
  Search,
  Download,
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
} from "lucide-react";

// Types
interface Program {
  id: string;
  name: string;
  faculty: string;
  duration: string;
  requirements: string[];
}

interface ApplicationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    isNigerian: boolean;
    stateOfOrigin: string;
    localGovernment: string;
    countryOfResidence: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    guardianContact: {
      fullName: string;
      relationship: string;
      phone: string;
      email: string;
    };
  };
  programSelection: {
    firstChoice: Program;
    secondChoice: Program;
    entryYear: number;
    semester: string;
    modeOfStudy: string;
  };
  prospectiveId: string;
  status: "submitted" | "under_review" | "accepted" | "rejected" | "waitlisted";
  submittedAt: string;
  tempPassword?: string;
  createdAt: string;
  updatedAt: string;
  passwordChanged?: boolean;
}

interface Payment {
  id: string;
  amount: number;
  description: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "confirmed" | "rejected";
  type: "application_fee" | "tuition_deposit" | "full_tuition" | "other";
  prospectiveId: string;
  paidAt?: string;
  transactionId?: string;
  confirmedBy?: string;
  confirmedAt?: string;
  paymentMethod?: string;
  reference?: string;
  studentName?: string;
  program?: string;
}

interface UserRole {
  id: string;
  name: string;
  permissions: {
    canViewPayments: boolean;
    canManagePayments: boolean;
    canViewStudents: boolean;
    canViewFinancialSummary: boolean;
    canExportReports: boolean;
  };
}

// Role Definitions
const ROLES: { [key: string]: UserRole } = {
  founder: {
    id: "founder",
    name: "Founder",
    permissions: {
      canViewPayments: true,
      canManagePayments: false,
      canViewStudents: false,
      canViewFinancialSummary: true,
      canExportReports: true,
    },
  },
  accounts: {
    id: "accounts",
    name: "Accounts",
    permissions: {
      canViewPayments: true,
      canManagePayments: true,
      canViewStudents: true,
      canViewFinancialSummary: true,
      canExportReports: true,
    },
  },
  admin: {
    id: "admin",
    name: "Administrator",
    permissions: {
      canViewPayments: true,
      canManagePayments: false,
      canViewStudents: true,
      canViewFinancialSummary: true,
      canExportReports: false,
    },
  },
  vc: {
    id: "vc",
    name: "Vice Chancellor",
    permissions: {
      canViewPayments: false,
      canManagePayments: false,
      canViewStudents: false,
      canViewFinancialSummary: false,
      canExportReports: false,
    },
  },
};

const StudentPayment = ({ userRole = "accounts" }: { userRole?: string }) => {
  const [, setApplications] = useState<ApplicationData[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
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

  const currentRole = ROLES[userRole] || ROLES.accounts;
  const allPrograms = [
    "BSc Accounting",
    "BSc Business Administration",
    "BSc Hospitality & Tourism Management",
    "BSc Public Administration",
    "BSc Criminology & Security Studies",
    "BSc Political Science",
    "BSc Petroleum Chemistry",
    "BSc International Relations & Diplomacy",
    "BSc Economics",
    "BSc Information & Communication Technology (ICT)",
    "BSc Microbiology",
    "BSc Physics with Electronics",
    "BSc Computer Science",
    "BSc Software Engineering",
    "BSc Cyber Security",
  ];

  // Formatting functions
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

  // Calculate statistics
  const calculateStats = useCallback((pays: Payment[]) => {
    const confirmedPayments = pays.filter((p) => p.status === "confirmed");
    const pendingPayments = pays.filter(
      (p) => p.status === "pending" || p.status === "paid"
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

    const uniqueStudents = new Set(pays.map((p) => p.prospectiveId)).size;
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

  // Fetch data
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

          // Generate enhanced mock payments with student info
          const mockPayments: Payment[] = applicationsData.flatMap((app) => {
            const studentName = `${app.personalInfo.firstName} ${app.personalInfo.lastName}`;
            const programName =
              typeof app.programSelection.firstChoice === "string"
                ? app.programSelection.firstChoice
                : app.programSelection.firstChoice.name;

            return [
              {
                id: `PAY-${app.prospectiveId}-001`,
                amount: 25000,
                description: "Application Fee",
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0],
                status: Math.random() > 0.7 ? "confirmed" : "pending",
                type: "application_fee",
                prospectiveId: app.prospectiveId,
                paidAt:
                  Math.random() > 0.7 ? new Date().toISOString() : undefined,
                transactionId:
                  Math.random() > 0.7
                    ? `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
                    : undefined,
                paymentMethod:
                  Math.random() > 0.5 ? "Bank Transfer" : "Online Payment",
                studentName,
                program: programName,
              },
              {
                id: `PAY-${app.prospectiveId}-002`,
                amount: 100000,
                description: "Tuition Deposit",
                dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0],
                status: Math.random() > 0.5 ? "confirmed" : "pending",
                type: "tuition_deposit",
                prospectiveId: app.prospectiveId,
                paidAt:
                  Math.random() > 0.5 ? new Date().toISOString() : undefined,
                studentName,
                program: programName,
              },
            ];
          });
          setPayments(mockPayments);
          calculateStats(mockPayments);
        } else {
          setApplications([]);
          setPayments([]);
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

  const updatePaymentStatus = async (
    paymentId: string,
    newStatus: Payment["status"],
    confirmedBy: string = "Accounts Team"
  ) => {
    try {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === paymentId
            ? {
                ...payment,
                status: newStatus,
                confirmedBy:
                  newStatus === "confirmed" ? confirmedBy : undefined,
                confirmedAt:
                  newStatus === "confirmed"
                    ? new Date().toISOString()
                    : undefined,
                paidAt:
                  newStatus === "confirmed"
                    ? new Date().toISOString()
                    : payment.paidAt,
              }
            : payment
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  // Filter payments based on search and filters
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.prospectiveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPaymentStatus =
      paymentStatusFilter === "all" || payment.status === paymentStatusFilter;
    const matchesProgram =
      programFilter === "all" || payment.program === programFilter;

    return matchesSearch && matchesPaymentStatus && matchesProgram;
  });

  // Role-based components
  if (!currentRole.permissions.canViewPayments) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Shield className="w-24 h-24 text-slate-300 mx-auto mb-6" />
          <h2 className="font-bebas text-3xl text-slate-700 mb-4">
            Access Restricted
          </h2>
          <p className="font-gantari text-slate-600 max-w-md">
            You don't have permission to view payment information. Please
            contact the administration if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-gantari text-slate-600">
            Loading payment records...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bebas text-3xl text-slate-900 tracking-wide">
                Payment Management
              </h1>
              <p className="font-gantari text-slate-600 mt-1">
                {currentRole.name} •{" "}
                {currentRole.permissions.canManagePayments
                  ? "Full Access"
                  : "View Only"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-100 px-3 py-2 rounded-lg">
                <span className="font-gantari text-slate-700 text-sm font-medium">
                  {currentRole.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Overview - For Founder and Accounts */}
        {(currentRole.permissions.canViewFinancialSummary ||
          currentRole.id === "founder") && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              description="All payment records"
              icon={<DollarSign className="w-6 h-6" />}
              trend={12.5}
              color="emerald"
            />
            <StatCard
              title="Confirmed Revenue"
              value={formatCurrency(stats.confirmedRevenue)}
              description="Verified payments"
              icon={<CheckCircle className="w-6 h-6" />}
              trend={8.2}
              color="green"
            />
            <StatCard
              title="Pending Revenue"
              value={formatCurrency(stats.pendingRevenue)}
              description="Awaiting confirmation"
              icon={<Clock className="w-6 h-6" />}
              trend={-3.1}
              color="amber"
            />
            <StatCard
              title="Students Paid"
              value={stats.studentsWithPayments.toString()}
              description="Unique students"
              icon={<Users className="w-6 h-6" />}
              trend={15.7}
              color="blue"
            />
          </div>
        )}

        {/* Founder View - Only Financial Summary */}
        {currentRole.id === "founder" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-bebas text-2xl text-slate-900">
                  Financial Overview
                </h2>
                <p className="font-gantari text-slate-600 mt-1">
                  Payment summary and revenue analytics
                </p>
              </div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-gantari font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Breakdown */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-bebas text-xl text-slate-800 mb-4">
                  Revenue Breakdown
                </h3>
                <div className="space-y-4">
                  <RevenueItem
                    label="Application Fees"
                    amount={payments
                      .filter(
                        (p) =>
                          p.type === "application_fee" &&
                          p.status === "confirmed"
                      )
                      .reduce((sum, p) => sum + p.amount, 0)}
                    total={stats.confirmedRevenue}
                    color="emerald"
                  />
                  <RevenueItem
                    label="Tuition Deposits"
                    amount={payments
                      .filter(
                        (p) =>
                          p.type === "tuition_deposit" &&
                          p.status === "confirmed"
                      )
                      .reduce((sum, p) => sum + p.amount, 0)}
                    total={stats.confirmedRevenue}
                    color="blue"
                  />
                  <RevenueItem
                    label="Full Tuition"
                    amount={payments
                      .filter(
                        (p) =>
                          p.type === "full_tuition" && p.status === "confirmed"
                      )
                      .reduce((sum, p) => sum + p.amount, 0)}
                    total={stats.confirmedRevenue}
                    color="purple"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-bebas text-xl text-slate-800 mb-4">
                  Payment Statistics
                </h3>
                <div className="space-y-3">
                  <StatItem
                    label="Average Payment"
                    value={formatCurrency(stats.averagePayment)}
                  />
                  <StatItem
                    label="Total Transactions"
                    value={stats.totalTransactions.toString()}
                  />
                  <StatItem label="Success Rate" value="94.2%" />
                  <StatItem
                    label="Pending Approval"
                    value={payments
                      .filter((p) => p.status === "paid")
                      .length.toString()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accounts and Admin View - Detailed Payment Management */}
        {(currentRole.id === "accounts" || currentRole.id === "admin") && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by student name, ID, or transaction..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-gantari text-slate-700 placeholder-slate-400 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-gantari text-slate-700 bg-white min-w-[180px]"
                  >
                    <option value="all">All Programs</option>
                    {allPrograms.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                  <select
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-gantari text-slate-700 bg-white min-w-[180px]"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bebas text-2xl text-slate-900">
                      Payment Records
                    </h2>
                    <p className="font-gantari text-slate-600 mt-1">
                      {filteredPayments.length} of {payments.length} payments
                      {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                  </div>
                  {currentRole.permissions.canExportReports && (
                    <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-gantari font-medium hover:bg-slate-200 transition-colors flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-gantari font-semibold text-slate-700 text-sm uppercase tracking-wider">
                        Student & Program
                      </th>
                      <th className="px-6 py-4 text-left font-gantari font-semibold text-slate-700 text-sm uppercase tracking-wider">
                        Payment Details
                      </th>
                      <th className="px-6 py-4 text-left font-gantari font-semibold text-slate-700 text-sm uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left font-gantari font-semibold text-slate-700 text-sm uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-gantari font-semibold text-slate-700 text-sm uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left font-gantari font-semibold text-slate-700 text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredPayments.map((payment) => (
                      <PaymentRow
                        key={payment.id}
                        payment={payment}
                        onView={() => {
                          setSelectedPayment(payment);
                          setShowPaymentModal(true);
                        }}
                        onStatusUpdate={
                          currentRole.permissions.canManagePayments
                            ? updatePaymentStatus
                            : undefined
                        }
                        formatDate={formatDate}
                        formatCurrency={formatCurrency}
                      />
                    ))}
                  </tbody>
                </table>

                {filteredPayments.length === 0 && (
                  <div className="text-center py-12">
                    <Receipt className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="font-gantari text-slate-500 text-lg font-medium">
                      No payment records found
                    </p>
                    <p className="font-gantari text-slate-400 text-sm mt-1">
                      {searchTerm
                        ? "Try adjusting your search terms"
                        : "No payments match your current filters"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Payment Detail Modal */}
      {showPaymentModal && selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setShowPaymentModal(false)}
          onStatusUpdate={
            currentRole.permissions.canManagePayments
              ? updatePaymentStatus
              : undefined
          }
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          canManage={currentRole.permissions.canManagePayments}
        />
      )}
    </div>
  );
};

// Supporting Components
const StatCard: React.FC<{
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
  color: "emerald" | "green" | "amber" | "blue" | "purple";
}> = ({ title, value, description, icon, trend, color }) => {
  const colorClasses = {
    emerald: "bg-emerald-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  const bgColorClasses = {
    emerald: "bg-emerald-50",
    green: "bg-green-50",
    amber: "bg-amber-50",
    blue: "bg-blue-50",
    purple: "bg-purple-50",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgColorClasses[color]}`}>
          <div className={`text-white p-2 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
        <div
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-gantari font-medium ${
            trend >= 0
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <TrendingUp
            className={`w-3 h-3 ${trend < 0 ? "transform rotate-180" : ""}`}
          />
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <h3 className="font-bebas text-2xl text-slate-900 mb-1">{value}</h3>
      <p className="font-gantari font-semibold text-slate-700 text-sm mb-1">
        {title}
      </p>
      <p className="font-gantari text-slate-500 text-xs">{description}</p>
    </div>
  );
};

const RevenueItem: React.FC<{
  label: string;
  amount: number;
  total: number;
  color: "emerald" | "blue" | "purple";
}> = ({ label, amount, total, color }) => {
  const percentage = total > 0 ? (amount / total) * 100 : 0;
  const colorClasses = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-gantari text-slate-700 text-sm">{label}</span>
        <span className="font-gantari font-semibold text-slate-900">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-gantari text-slate-500 text-xs">Amount</span>
        <span className="font-gantari font-semibold text-slate-900 text-sm">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(amount)}
        </span>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
    <span className="font-gantari text-slate-600 text-sm">{label}</span>
    <span className="font-gantari font-semibold text-slate-900">{value}</span>
  </div>
);

const PaymentRow: React.FC<{
  payment: Payment;
  onView: () => void;
  onStatusUpdate?: (
    id: string,
    status: Payment["status"],
    confirmedBy?: string
  ) => void;
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
}> = ({ payment, onView, onStatusUpdate, formatDate, formatCurrency }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "paid":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "overdue":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "paid":
        return <DollarSign className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors duration-150">
      <td className="px-6 py-4">
        <div>
          <div className="font-gantari font-semibold text-slate-900">
            {payment.studentName || "Unknown Student"}
          </div>
          <div className="font-gantari text-slate-600 text-sm mt-1">
            {payment.program || "No Program"}
          </div>
          <div className="font-gantari text-slate-400 text-xs mt-1">
            ID: {payment.prospectiveId}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <div className="font-gantari font-semibold text-slate-900">
            {payment.description}
          </div>
          {payment.transactionId && (
            <div className="font-gantari text-slate-500 text-sm mt-1">
              TXN: {payment.transactionId}
            </div>
          )}
          {payment.paymentMethod && (
            <div className="font-gantari text-slate-400 text-xs mt-1">
              Via {payment.paymentMethod}
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="font-gantari font-bold text-slate-900 text-lg">
          {formatCurrency(payment.amount)}
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-gantari font-medium ${getStatusColor(payment.status)}`}
        >
          {getStatusIcon(payment.status)}
          <span className="ml-1.5 capitalize">{payment.status}</span>
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="font-gantari text-slate-700">
          {payment.paidAt
            ? formatDate(payment.paidAt)
            : formatDate(payment.dueDate)}
        </div>
        <div className="font-gantari text-slate-400 text-xs">
          {payment.paidAt ? "Paid" : "Due"}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onView}
            className="bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200 transition-colors font-gantari text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
          </button>
          {onStatusUpdate && (
            <select
              value={payment.status}
              onChange={(e) =>
                onStatusUpdate(payment.id, e.target.value as Payment["status"])
              }
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 font-gantari text-sm text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="confirmed">Confirmed</option>
              <option value="overdue">Overdue</option>
            </select>
          )}
        </div>
      </td>
    </tr>
  );
};

const PaymentDetailModal: React.FC<{
  payment: Payment;
  onClose: () => void;
  onStatusUpdate?: (
    id: string,
    status: Payment["status"],
    confirmedBy?: string
  ) => void;
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full animate-in fade-in-90 zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bebas text-2xl text-slate-900">
            Payment Details
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="font-bebas text-lg text-slate-800 mb-3">
              Student Information
            </h4>
            <div className="space-y-2">
              <DetailRow
                label="Name"
                value={payment.studentName || "Unknown"}
              />
              <DetailRow label="Student ID" value={payment.prospectiveId} />
              <DetailRow
                label="Program"
                value={payment.program || "Not specified"}
              />
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="font-bebas text-lg text-slate-800 mb-3">
              Payment Information
            </h4>
            <div className="space-y-2">
              <DetailRow label="Description" value={payment.description} />
              <DetailRow
                label="Amount"
                value={formatCurrency(payment.amount)}
              />
              <DetailRow
                label="Type"
                value={payment.type.replace("_", " ").toUpperCase()}
              />
              <DetailRow label="Status" value={payment.status} highlight />
              <DetailRow label="Due Date" value={formatDate(payment.dueDate)} />
              {payment.paidAt && (
                <DetailRow
                  label="Paid Date"
                  value={formatDate(payment.paidAt)}
                />
              )}
              {payment.paymentMethod && (
                <DetailRow
                  label="Payment Method"
                  value={payment.paymentMethod}
                />
              )}
              {payment.transactionId && (
                <DetailRow
                  label="Transaction ID"
                  value={payment.transactionId}
                />
              )}
              {payment.reference && (
                <DetailRow label="Reference" value={payment.reference} />
              )}
            </div>
          </div>

          {/* Confirmation Info */}
          {payment.confirmedBy && (
            <div className="bg-emerald-50 rounded-xl p-4">
              <h4 className="font-bebas text-lg text-emerald-800 mb-3">
                Confirmation
              </h4>
              <div className="space-y-2">
                <DetailRow label="Confirmed By" value={payment.confirmedBy} />
                {payment.confirmedAt && (
                  <DetailRow
                    label="Confirmed At"
                    value={formatDate(payment.confirmedAt)}
                  />
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {canManage && onStatusUpdate && (
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() =>
                  onStatusUpdate(payment.id, "confirmed", "Accounts Team")
                }
                className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl font-gantari font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm Payment</span>
              </button>
              <button
                onClick={() => onStatusUpdate(payment.id, "overdue")}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl font-gantari font-semibold hover:bg-red-700 transition-colors"
              >
                Mark Overdue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ label, value, highlight = false }) => (
  <div className="flex justify-between items-center">
    <span className="font-gantari text-slate-600 text-sm">{label}</span>
    <span
      className={`font-gantari font-medium ${highlight ? "text-emerald-600" : "text-slate-900"}`}
    >
      {value}
    </span>
  </div>
);

export default StudentPayment;
