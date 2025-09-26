"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  Download,
  Eye,
  Mail,
  Phone,
  User,
  BookOpen,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  X,
  Menu,
  Smartphone,
  Monitor,
  GraduationCap,
  Send,
} from "lucide-react";
import {
  AcademicHistory,
  ApplicationDocuments,
  Declaration,
  FileInfo,
} from "../application/new_application";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";

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
  academicHistory: AcademicHistory;
  documents: ApplicationDocuments;
  declaration: Declaration;
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
  status: "pending" | "paid" | "overdue";
  type: "application_fee" | "tuition_deposit" | "full_tuition";
  prospectiveId: string;
  paidAt?: string;
  transactionId?: string;
}

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationData | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
    waitlisted: 0,
    totalRevenue: 0,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

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

  // Enhanced date formatting function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  // Also fix the calculateStats dependency array
  const calculateStats = useCallback(
    (apps: ApplicationData[]) => {
      // Your existing calculateStats logic here
      const totalRevenue = apps.reduce((sum, app) => {
        const appPayments = payments.filter(
          (p) => p.prospectiveId === app.prospectiveId && p.status === "paid"
        );
        return (
          sum +
          appPayments.reduce(
            (paymentSum, payment) => paymentSum + payment.amount,
            0
          )
        );
      }, 0);

      setStats({
        total: apps.length,
        submitted: apps.filter((app) => app.status === "submitted").length,
        underReview: apps.filter((app) => app.status === "under_review").length,
        accepted: apps.filter((app) => app.status === "accepted").length,
        rejected: apps.filter((app) => app.status === "rejected").length,
        waitlisted: apps.filter((app) => app.status === "waitlisted").length,
        totalRevenue,
      });
    },
    [payments]
  );

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

          // Create payments here - MOVE the payments logic from the deleted useEffect here
          const mockPayments: Payment[] = applicationsData.flatMap((app) => [
            {
              id: `PAY-${app.prospectiveId}-001`,
              amount: 25000,
              description: "Application Fee",
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              status: Math.random() > 0.7 ? "paid" : "pending",
              type: "application_fee",
              prospectiveId: app.prospectiveId,
              paidAt:
                Math.random() > 0.7 ? new Date().toISOString() : undefined,
            },
            {
              id: `PAY-${app.prospectiveId}-002`,
              amount: 100000,
              description: "Tuition Deposit",
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              status: "pending",
              type: "tuition_deposit",
              prospectiveId: app.prospectiveId,
            },
          ]);
          setPayments(mockPayments);
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

  // Enhanced payments data with realistic amounts
  useEffect(() => {
    const mockPayments: Payment[] = applications.flatMap((app) => [
      {
        id: `PAY-${app.prospectiveId}-001`,
        amount: 25000, // Application fee
        description: "Application Fee",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: Math.random() > 0.7 ? "paid" : "pending",
        type: "application_fee",
        prospectiveId: app.prospectiveId,
        paidAt: Math.random() > 0.7 ? new Date().toISOString() : undefined,
      },
      {
        id: `PAY-${app.prospectiveId}-002`,
        amount: 100000, // Tuition deposit
        description: "Tuition Deposit",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: "pending",
        type: "tuition_deposit",
        prospectiveId: app.prospectiveId,
      },
    ]);
    setPayments(mockPayments);
  }, [applications]);

  // Enhanced email sending function
  const sendStatusEmail = async (
    application: ApplicationData,
    status: "accepted" | "rejected" | "waitlisted"
  ) => {
    try {
      const response = await fetch("/api/send-status-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: application.contactInfo.email,
          prospectiveId: application.prospectiveId,
          fullName: `${application.personalInfo.firstName} ${application.personalInfo.lastName}`,
          program:
            application.programSelection.firstChoice.name ||
            application.programSelection.firstChoice,
          status: status,
          applicationLink: `${window.location.origin}/application-status?pid=${application.prospectiveId}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      console.log(
        `${status} email sent successfully to ${application.contactInfo.email}`
      );
      return true;
    } catch (error) {
      console.error("Error sending status email:", error);
      return false;
    }
  };

  const updateApplicationStatus = async (
    prospectiveId: string,
    newStatus: ApplicationData["status"]
  ) => {
    try {
      const applicationRef = ref(db, `applications/students/${prospectiveId}`);
      await update(applicationRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });

      // Send email for important status changes
      const application = applications.find(
        (app) => app.prospectiveId === prospectiveId
      );
      if (
        application &&
        (newStatus === "accepted" ||
          newStatus === "rejected" ||
          newStatus === "waitlisted")
      ) {
        const emailSent = await sendStatusEmail(application, newStatus);
        if (emailSent) {
          console.log(
            `Status update email sent for ${application.prospectiveId}`
          );
        }
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("Failed to update application status");
    }
  };

  const updatePaymentStatus = async (
    paymentId: string,
    newStatus: Payment["status"]
  ) => {
    try {
      // In a real app, you would update this in your database
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === paymentId
            ? {
                ...payment,
                status: newStatus,
                paidAt:
                  newStatus === "paid" ? new Date().toISOString() : undefined,
              }
            : payment
        )
      );

      // Optional: Send payment confirmation email
      const payment = payments.find((p) => p.id === paymentId);
      if (payment && newStatus === "paid") {
        console.log(`Payment confirmation would be sent for ${paymentId}`);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
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
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "under_review":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      case "waitlisted":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="w-4 h-4" />;
      case "under_review":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "waitlisted":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    trend?: number;
  }> = ({ title, value, icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm font-medium text-gray-600">
            {title}
          </p>
          <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
            {value.toLocaleString()}
          </p>
          {trend !== undefined && (
            <p
              className={`text-xs mt-1 flex items-center ${trend >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              <TrendingUp
                className={`w-3 h-3 mr-1 ${trend < 0 ? "transform rotate-180" : ""}`}
              />
              {Math.abs(trend)}% {trend >= 0 ? "increase" : "decrease"}
            </p>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-full ${color} shadow-inner`}>
          {icon}
        </div>
      </div>
    </div>
  );

  // Enhanced Application Card Component
  const ApplicationCard: React.FC<{ application: ApplicationData }> = ({
    application,
  }) => {
    const applicationPayments = payments.filter(
      (p) => p.prospectiveId === application.prospectiveId
    );
    const paidPayments = applicationPayments.filter(
      (p) => p.status === "paid"
    ).length;
    const totalPayments = applicationPayments.length;
    const programName =
      typeof application.programSelection.firstChoice === "string"
        ? application.programSelection.firstChoice
        : application.programSelection.firstChoice.name;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {application.personalInfo.firstName}{" "}
              {application.personalInfo.lastName}
            </h3>
            <p className="text-sm text-gray-600">{application.prospectiveId}</p>
            <p className="text-xs text-gray-500 truncate">
              {application.contactInfo.email}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
          >
            {getStatusIcon(application.status)}
            <span className="ml-1 hidden sm:inline capitalize">
              {application.status.replace("_", " ")}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <span className="text-gray-600">Program:</span>
            <p className="font-medium truncate" title={programName}>
              {programName.length > 30
                ? programName.substring(0, 30) + "..."
                : programName}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Applied:</span>
            <p className="font-medium">{formatDate(application.submittedAt)}</p>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">
              Payments: {paidPayments}/{totalPayments}
            </span>
            <span>{Math.round((paidPayments / totalPayments) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(paidPayments / totalPayments) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedApplication(application);
              setShowApplicationModal(true);
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Eye className="w-3 h-3 mr-1" />
            View
          </button>
          <button
            onClick={() => {
              setSelectedApplication(application);
              setShowPaymentModal(true);
            }}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <DollarSign className="w-3 h-3 mr-1" />
            Payments
          </button>
          <select
            value={application.status}
            onChange={(e) =>
              updateApplicationStatus(
                application.prospectiveId,
                e.target.value as ApplicationData["status"]
              )
            }
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-2 rounded-lg text-xs border-none focus:ring-2 focus:ring-green-500"
          >
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="waitlisted">Waitlisted</option>
          </select>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Image
                  src="/sauni-logo.png"
                  alt="SAUNI Logo"
                  width={60}
                  height={60}
                />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600 text-sm hidden sm:block">
                    Manage student applications and payments
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "table" ? "bg-white shadow-sm text-green-600" : "text-gray-500 hover:text-gray-700"}`}
                  title="Table View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "cards" ? "bg-white shadow-sm text-green-600" : "text-gray-500 hover:text-gray-700"}`}
                  title="Card View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-sm text-gray-600">Admissions Office</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Programs</option>
                {allPrograms.map((program) => (
                  <option key={program} value={program}>
                    {program.length > 20
                      ? program.substring(0, 20) + "..."
                      : program}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 md:py-6">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
          <StatCard
            title="Total Applications"
            value={stats.total}
            icon={<User className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />}
            color="bg-blue-100"
            trend={12}
          />
          <StatCard
            title="Under Review"
            value={stats.underReview}
            icon={<Clock className="w-4 h-4 md:w-6 md:h-6 text-yellow-600" />}
            color="bg-yellow-100"
            trend={8}
          />
          <StatCard
            title="Accepted"
            value={stats.accepted}
            icon={
              <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
            }
            color="bg-green-100"
            trend={15}
          />
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon={
              <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
            }
            color="bg-purple-100"
            trend={22}
          />
        </div>

        {/* Enhanced Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search by name, ID, email, or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-2 md:gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="all">All Programs</option>
                {allPrograms.map((program) => (
                  <option key={program} value={program}>
                    {program.length > 25
                      ? program.substring(0, 25) + "..."
                      : program}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Applications Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Student Applications
              </h2>
              <p className="text-gray-600 text-sm">
                {filteredApplications.length} of {applications.length}{" "}
                applications
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:block">
                View:
              </span>
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "table" ? "bg-white shadow-sm text-green-600" : "text-gray-500 hover:text-gray-700"}`}
                  title="Table View"
                >
                  <Monitor className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "cards" ? "bg-white shadow-sm text-green-600" : "text-gray-500 hover:text-gray-700"}`}
                  title="Card View"
                >
                  <Smartphone className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Card View */}
          {viewMode === "cards" && (
            <div className="p-4">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.prospectiveId}
                  application={application}
                />
              ))}
              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">
                    No applications found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "No applications match your current filters"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Table View */}
          {viewMode === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Program
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Applied
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Payments
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => {
                    const applicationPayments = payments.filter(
                      (p) => p.prospectiveId === application.prospectiveId
                    );
                    const paidPayments = applicationPayments.filter(
                      (p) => p.status === "paid"
                    ).length;
                    const totalPayments = applicationPayments.length;
                    const programName =
                      typeof application.programSelection.firstChoice ===
                      "string"
                        ? application.programSelection.firstChoice
                        : application.programSelection.firstChoice.name;

                    return (
                      <tr
                        key={application.prospectiveId}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.personalInfo.firstName}{" "}
                              {application.personalInfo.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.prospectiveId}
                            </div>
                            <div className="text-sm text-gray-500 md:hidden truncate max-w-[150px]">
                              {programName}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                          <div
                            className="max-w-[200px] truncate"
                            title={programName}
                          >
                            {programName}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
                          >
                            {getStatusIcon(application.status)}
                            <span className="ml-1 hidden sm:inline capitalize">
                              {application.status.replace("_", " ")}
                            </span>
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {formatDate(application.submittedAt)}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-900 min-w-[60px]">
                              {paidPayments}/{totalPayments} paid
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(paidPayments / totalPayments) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-1 md:space-x-2">
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowApplicationModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 md:p-2 transition-colors rounded-lg hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowPaymentModal(true);
                              }}
                              className="text-green-600 hover:text-green-900 p-1 md:p-2 transition-colors rounded-lg hover:bg-green-50"
                              title="Payment Management"
                            >
                              <DollarSign className="w-4 h-4" />
                            </button>
                            <select
                              value={application.status}
                              onChange={(e) =>
                                updateApplicationStatus(
                                  application.prospectiveId,
                                  e.target.value as ApplicationData["status"]
                                )
                              }
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 bg-white"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="under_review">Under Review</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                              <option value="waitlisted">Waitlisted</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">
                    No applications found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "No applications match your current filters"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Application Detail Modal */}
      {showApplicationModal && selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          payments={payments.filter(
            (p) => p.prospectiveId === selectedApplication.prospectiveId
          )}
          onClose={() => setShowApplicationModal(false)}
          onStatusUpdate={updateApplicationStatus}
          onPaymentUpdate={updatePaymentStatus}
          formatDate={formatDate}
        />
      )}

      {/* Enhanced Payment Management Modal */}
      {showPaymentModal && selectedApplication && (
        <PaymentManagementModal
          application={selectedApplication}
          payments={payments.filter(
            (p) => p.prospectiveId === selectedApplication.prospectiveId
          )}
          onClose={() => setShowPaymentModal(false)}
          onPaymentUpdate={updatePaymentStatus}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

// Enhanced Application Detail Modal Component
const ApplicationDetailModal: React.FC<{
  application: ApplicationData;
  payments: Payment[];
  onClose: () => void;
  onStatusUpdate: (id: string, status: ApplicationData["status"]) => void;
  onPaymentUpdate: (id: string, status: Payment["status"]) => void;
  formatDate: (dateString: string) => string;
}> = ({
  application,
  payments,
  onClose,
  onStatusUpdate,
  onPaymentUpdate,
  formatDate,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const pdfRef = useRef<HTMLDivElement>(null);

  const fullName = `${application.personalInfo.firstName} ${application.personalInfo.middleName} ${application.personalInfo.lastName}`;
  // const programName =
  //   typeof application.programSelection.firstChoice === "string"
  //     ? application.programSelection.firstChoice
  //     : application.programSelection.firstChoice.name;

  const generatePDF = async () => {
    if (!pdfRef.current) return;

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SAUNI-Application-${application.prospectiveId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "waitlisted":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="w-4 h-4" />;
      case "under_review":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "waitlisted":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl md:rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-in fade-in-90 zoom-in-95">
        {/* Enhanced Header */}
        <div className="px-4 md:px-6 py-4 border-b flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
              {application.documents?.passportPhoto?.url ? (
                <Image
                  src={application.documents.passportPhoto.url}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {fullName}
              </h2>
              <p className="text-gray-600 text-sm">
                {application.prospectiveId}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={generatePDF}
              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Enhanced Sidebar */}
          <div className="lg:w-64 bg-gray-50 border-b lg:border-b-0 lg:border-r">
            <div className="p-4 border-b">
              <div className="space-y-3">
                <div className="text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}
                  >
                    {getStatusIcon(application.status)}
                    <span className="ml-1 capitalize">
                      {application.status.replace("_", " ")}
                    </span>
                  </span>
                </div>
                <select
                  value={application.status}
                  onChange={(e) =>
                    onStatusUpdate(
                      application.prospectiveId,
                      e.target.value as ApplicationData["status"]
                    )
                  }
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlisted">Waitlisted</option>
                </select>
              </div>
            </div>

            <nav className="p-2">
              {[
                {
                  id: "overview",
                  label: "Overview",
                  icon: <User className="w-4 h-4" />,
                },
                {
                  id: "personal",
                  label: "Personal Info",
                  icon: <User className="w-4 h-4" />,
                },
                {
                  id: "contact",
                  label: "Contact Info",
                  icon: <Mail className="w-4 h-4" />,
                },
                {
                  id: "academic",
                  label: "Academic Info",
                  icon: <BookOpen className="w-4 h-4" />,
                },
                {
                  id: "documents",
                  label: "Documents",
                  icon: <FileText className="w-4 h-4" />,
                },
                {
                  id: "payments",
                  label: "Payments",
                  icon: <DollarSign className="w-4 h-4" />,
                },
                {
                  id: "declaration",
                  label: "Declaration",
                  icon: <FileText className="w-4 h-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg mb-1 flex items-center space-x-3 transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Enhanced Content */}
          <div className="flex-1 overflow-auto bg-white">
            <div className="p-4 md:p-6">
              {activeTab === "overview" && (
                <OverviewTab
                  application={application}
                  payments={payments}
                  formatDate={formatDate}
                />
              )}
              {activeTab === "personal" && (
                <PersonalInfoTab
                  application={application}
                  formatDate={formatDate}
                />
              )}
              {activeTab === "contact" && (
                <ContactInfoTab application={application} />
              )}
              {activeTab === "academic" && (
                <AcademicInfoTab application={application} />
              )}
              {activeTab === "documents" && (
                <DocumentsTab application={application} />
              )}
              {activeTab === "payments" && (
                <PaymentsTab
                  payments={payments}
                  onPaymentUpdate={onPaymentUpdate}
                  formatDate={formatDate}
                />
              )}
              {activeTab === "declaration" && (
                <DeclarationTab
                  application={application}
                  formatDate={formatDate}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced PDF Template */}
      <div className="fixed top-0 left-[-9999px]">
        <PDFTemplate
          application={application}
          payments={payments}
          ref={pdfRef}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

// Enhanced PDF Template Component
const PDFTemplate = React.forwardRef<
  HTMLDivElement,
  {
    application: ApplicationData;
    payments: Payment[];
    formatDate: (dateString: string) => string;
  }
>(({ application, payments, formatDate }, ref) => {
  const fullName = `${application.personalInfo.firstName} ${application.personalInfo.middleName} ${application.personalInfo.lastName}`;
  const programName =
    typeof application.programSelection.firstChoice === "string"
      ? application.programSelection.firstChoice
      : application.programSelection.firstChoice.name;

  const paidAmount = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div
      ref={ref}
      className="p-8 bg-white text-gray-900 font-sans"
      style={{ width: "210mm", minHeight: "297mm" }}
    >
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-green-600 pb-6">
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          SOUTHERN ATLANTIC UNIVERSITY
        </h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Application Summary Report
        </h2>
        <p className="text-gray-600 mt-2">
          Generated on {formatDate(new Date().toISOString())}
        </p>
      </div>

      {/* Student Information */}
      <div className="mb-8">
        <h3 className="text-lg font-bold bg-green-600 text-white p-3 rounded-t-lg">
          Student Information
        </h3>
        <div className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-b-lg">
          <InfoFieldPDF label="Full Name" value={fullName} />
          <InfoFieldPDF
            label="Prospective ID"
            value={application.prospectiveId}
          />
          <InfoFieldPDF label="Program" value={programName} />
          <InfoFieldPDF
            label="Status"
            value={application.status.replace("_", " ")}
          />
          <InfoFieldPDF label="Email" value={application.contactInfo.email} />
          <InfoFieldPDF label="Phone" value={application.contactInfo.phone} />
          <InfoFieldPDF
            label="Application Date"
            value={formatDate(application.submittedAt)}
          />
          <InfoFieldPDF
            label="Date of Birth"
            value={formatDate(application.personalInfo.dateOfBirth)}
          />
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-bold bg-green-600 text-white p-3 rounded-t-lg">
          Payment Summary
        </h3>
        <div className="border border-gray-200 rounded-b-lg">
          <div className="grid grid-cols-4 gap-4 p-4 font-semibold bg-gray-50 border-b">
            <div>Description</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Due Date</div>
          </div>
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0"
            >
              <div>{payment.description}</div>
              <div>₦{payment.amount.toLocaleString()}</div>
              <div
                className={`font-semibold ${
                  payment.status === "paid"
                    ? "text-green-600"
                    : payment.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {payment.status.toUpperCase()}
              </div>
              <div>{formatDate(payment.dueDate)}</div>
            </div>
          ))}
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total Paid:</span>
              <span>₦{paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Due:</span>
              <span>₦{(totalAmount - paidAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
              <span>Grand Total:</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8 pt-4 border-t">
        <p>Southern Atlantic University - Admissions Office</p>
        <p>This is an official application summary report</p>
      </div>
    </div>
  );
});

PDFTemplate.displayName = "PDFTemplate";

const InfoFieldPDF: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <strong className="text-gray-600">{label}:</strong> {value}
  </div>
);

// Enhanced Tab Components
const OverviewTab: React.FC<{
  application: ApplicationData;
  payments: Payment[];
  formatDate: (dateString: string) => string;
}> = ({ application, payments, formatDate }) => {
  const paidAmount = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const programName =
    typeof application.programSelection.firstChoice === "string"
      ? application.programSelection.firstChoice
      : application.programSelection.firstChoice.name;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Application Status
          </h4>
          <p className="text-2xl font-bold text-green-600 capitalize">
            {application.status.replace("_", " ")}
          </p>
          <p className="text-sm text-green-700 mt-2">
            Applied on {formatDate(application.submittedAt)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Payment Status
          </h4>
          <p className="text-2xl font-bold text-blue-600">
            ₦{paidAmount.toLocaleString()} / ₦{totalAmount.toLocaleString()}
          </p>
          <p className="text-sm text-blue-700 mt-2">
            {payments.filter((p) => p.status === "paid").length} of{" "}
            {payments.length} payments completed
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoField
          label="Full Name"
          value={`${application.personalInfo.firstName} ${application.personalInfo.middleName} ${application.personalInfo.lastName}`}
        />
        <InfoField label="Program" value={programName} />
        <InfoField
          label="Entry Year"
          value={application.programSelection.entryYear.toString()}
        />
        <InfoField label="Email" value={application.contactInfo.email} />
        <InfoField label="Phone" value={application.contactInfo.phone} />
        <InfoField
          label="Application Date"
          value={formatDate(application.submittedAt)}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
            <Send className="w-4 h-4 mr-2" />
            Send Email
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Contact Student
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Generate Letter
          </button>
        </div>
      </div>
    </div>
  );
};

// Rest of the tab components (PersonalInfoTab, ContactInfoTab, AcademicInfoTab, DocumentsTab, DeclarationTab)
// would be enhanced similarly with better styling and functionality...

const PersonalInfoTab: React.FC<{
  application: ApplicationData;
  formatDate: (dateString: string) => string;
}> = ({ application, formatDate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InfoField
      label="Full Name"
      value={`${application.personalInfo.firstName} ${application.personalInfo.middleName} ${application.personalInfo.lastName}`}
    />
    <InfoField
      label="Date of Birth"
      value={formatDate(application.personalInfo.dateOfBirth)}
    />
    <InfoField label="Gender" value={application.personalInfo.gender} />
    <InfoField
      label="Nationality"
      value={application.personalInfo.nationality}
    />
    <InfoField
      label="State of Origin"
      value={application.personalInfo.stateOfOrigin}
    />
    <InfoField
      label="Local Government"
      value={application.personalInfo.localGovernment}
    />
    <InfoField
      label="Country of Residence"
      value={application.personalInfo.countryOfResidence}
    />
    <InfoField
      label="Nigerian Citizen"
      value={application.personalInfo.isNigerian ? "Yes" : "No"}
    />
  </div>
);

const ContactInfoTab: React.FC<{ application: ApplicationData }> = ({
  application,
}) => (
  <div className="space-y-6">
    <div>
      <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b">
        Contact Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField label="Email" value={application.contactInfo.email} />
        <InfoField label="Phone" value={application.contactInfo.phone} />
        <InfoField label="Address" value={application.contactInfo.address} />
        <InfoField label="City" value={application.contactInfo.city} />
        <InfoField label="State" value={application.contactInfo.state} />
        <InfoField label="Country" value={application.contactInfo.country} />
        <InfoField label="Zip Code" value={application.contactInfo.zipCode} />
      </div>
    </div>

    <div>
      <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b">
        Guardian Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField
          label="Full Name"
          value={application.contactInfo.guardianContact.fullName}
        />
        <InfoField
          label="Relationship"
          value={application.contactInfo.guardianContact.relationship}
        />
        <InfoField
          label="Phone"
          value={application.contactInfo.guardianContact.phone}
        />
        <InfoField
          label="Email"
          value={application.contactInfo.guardianContact.email}
        />
      </div>
    </div>
  </div>
);

const AcademicInfoTab: React.FC<{ application: ApplicationData }> = ({
  application,
}) => {
  // Remove the unused programName variable and use the values directly
  const firstChoiceProgram =
    typeof application.programSelection.firstChoice === "string"
      ? application.programSelection.firstChoice
      : application.programSelection.firstChoice.name;

  const secondChoiceProgram =
    typeof application.programSelection.secondChoice === "string"
      ? application.programSelection.secondChoice
      : application.programSelection.secondChoice.name;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b">
          Program Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="First Choice" value={firstChoiceProgram} />
          <InfoField label="Second Choice" value={secondChoiceProgram} />
          <InfoField
            label="Entry Year"
            value={application.programSelection.entryYear.toString()}
          />
          <InfoField
            label="Semester"
            value={application.programSelection.semester}
          />
          <InfoField
            label="Mode of Study"
            value={application.programSelection.modeOfStudy}
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b">
          Academic History
        </h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">
            Academic history details would be displayed here...
          </p>
        </div>
      </div>
    </div>
  );
};

const DocumentsTab: React.FC<{ application: ApplicationData }> = ({
  application,
}) => {
  const documentEntries = Object.entries(application.documents || {}) as [
    keyof ApplicationDocuments,
    FileInfo,
  ][];

  return (
    <div className="space-y-4">
      {documentEntries.map(([docType, fileInfo]) => (
        <DocumentItem key={docType} docType={docType} fileInfo={fileInfo} />
      ))}
    </div>
  );

  // return (
  //   <div className="space-y-4">
  //     {Object.entries(application.documents || {}).map(([docType, doc]) => {
  //       if (isFileInfoArray(doc)) {
  //         return (
  //           <div key={docType}>
  //             <h5 className="font-semibold capitalize mb-3 text-gray-900">
  //               {docType.replace(/([A-Z])/g, " $1")} ({doc.length} files)
  //             </h5>
  //             <div className="space-y-3">
  //               {doc.map(
  //                 (fileInfo, index) =>
  //                   fileInfo?.url && (
  //                     <DocumentItem
  //                       key={index}
  //                       docType={`${docType} ${index + 1}`}
  //                       fileInfo={fileInfo}
  //                     />
  //                   )
  //               )}
  //             </div>
  //           </div>
  //         );
  //       }

  //       if (isFileInfo(doc) && doc.url) {
  //         return (
  //           <DocumentItem key={docType} docType={docType} fileInfo={doc} />
  //         );
  //       }

  //       return null;
  //     })}
  //   </div>
  // );
};

const DeclarationTab: React.FC<{
  application: ApplicationData;
  formatDate: (dateString: string) => string;
}> = ({ application, formatDate }) => (
  <div className="space-y-6">
    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
      <h4 className="font-semibold text-green-800 mb-3">Declaration Status</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField
          label="Information Accuracy"
          value={
            application.declaration.isInformationAccurate
              ? "Confirmed"
              : "Not Confirmed"
          }
        />
        <InfoField
          label="Terms Agreement"
          value={application.declaration.agreeToTerms ? "Agreed" : "Not Agreed"}
        />
        <InfoField
          label="Signature"
          value={application.declaration.signature}
        />
        <InfoField
          label="Declaration Date"
          value={formatDate(application.declaration.date.toISOString())}
        />
      </div>
    </div>
  </div>
);

const DocumentItem: React.FC<{ docType: string; fileInfo: FileInfo }> = ({
  docType,
  fileInfo,
}) => (
  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex-1">
        <h5 className="font-semibold capitalize text-gray-900">
          {docType.replace(/([A-Z])/g, " $1")}
        </h5>
        <p className="text-sm text-gray-600">{fileInfo.name}</p>
        <p className="text-xs text-gray-500 mt-1">
          {fileInfo.size > 0 &&
            `Size: ${(fileInfo.size / 1024 / 1024).toFixed(2)} MB`}
          {fileInfo.uploadedAt &&
            ` • Uploaded: ${new Date(fileInfo.uploadedAt).toLocaleDateString()}`}
        </p>
      </div>
      <div className="flex space-x-2">
        <a
          href={fileInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </a>
        <a
          href={fileInfo.url}
          download={fileInfo.name}
          className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </a>
      </div>
    </div>
  </div>
);

const InfoField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <p className="text-sm text-gray-900 font-medium">
      {value || "Not provided"}
    </p>
  </div>
);

const PaymentsTab: React.FC<{
  payments: Payment[];
  onPaymentUpdate: (id: string, status: Payment["status"]) => void;
  formatDate: (dateString: string) => string;
}> = ({ payments, onPaymentUpdate, formatDate }) => {
  const paidAmount = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">
                {payment.description}
              </h4>
              <p className="text-gray-600 text-sm">
                Due: {formatDate(payment.dueDate)}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                payment.status === "paid"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : payment.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {payment.status.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              ₦{payment.amount.toLocaleString()}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onPaymentUpdate(payment.id, "paid")}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
              >
                Mark Paid
              </button>
              <button
                onClick={() => onPaymentUpdate(payment.id, "pending")}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
              >
                Mark Pending
              </button>
              <button
                onClick={() => onPaymentUpdate(payment.id, "overdue")}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Mark Overdue
              </button>
            </div>
          </div>

          {payment.paidAt && (
            <p className="text-sm text-gray-600 mt-2">
              Paid on: {formatDate(payment.paidAt)}
              {payment.transactionId &&
                ` • Transaction: ${payment.transactionId}`}
            </p>
          )}
        </div>
      ))}

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Due:</span>
            <span className="font-semibold">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Paid Amount:</span>
            <span className="font-semibold text-green-600">
              ₦{paidAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t pt-2">
            <span>Balance:</span>
            <span
              className={
                totalAmount - paidAmount > 0 ? "text-red-600" : "text-green-600"
              }
            >
              ₦{(totalAmount - paidAmount).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Payment Management Modal Component
const PaymentManagementModal: React.FC<{
  application: ApplicationData;
  payments: Payment[];
  onClose: () => void;
  onPaymentUpdate: (id: string, status: Payment["status"]) => void;
  formatDate: (dateString: string) => string;
}> = ({ application, payments, onClose, onPaymentUpdate, formatDate }) => {
  const fullName = `${application.personalInfo.firstName} ${application.personalInfo.lastName}`;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl md:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-90 zoom-in-95">
        <div className="px-4 md:px-6 py-4 border-b flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Payment Management
            </h2>
            <p className="text-gray-600 text-sm">
              {fullName} - {application.prospectiveId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-auto max-h-[80vh]">
          <PaymentsTab
            payments={payments}
            onPaymentUpdate={onPaymentUpdate}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
