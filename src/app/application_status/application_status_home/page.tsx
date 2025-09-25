"use client";

import React, { useState, useEffect, useRef } from "react";
import { ref, onValue, off, update } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Download,
  HelpingHand,
  Mail,
  MapPin,
  Notebook,
  Phone,
  Eye,
  Lock,
  Key,
  Menu,
  X,
} from "lucide-react";

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
    firstChoice: string;
    secondChoice: string;
    entryYear: number;
    semester: string;
    modeOfStudy: string;
  };
  academicHistory: {
    primaryEducation: {
      certificateType: string;
      schoolName: string;
      startYear: number;
      endYear: number;
    };
    secondarySchool: Array<{
      schoolName: string;
      schoolType: string;
      examType: string;
      examNumber: string;
      sitting: string;
      completionYear: number;
      grades: Array<{
        subject: string;
        grade: string;
      }>;
    }>;
  };
  documents: {
    birthCertificate: any;
    passportPhoto: any;
    primaryCertificate: any;
    secondaryCertificate: any;
    waecNeco: any;
  };
  declaration: {
    isInformationAccurate: boolean;
    agreeToTerms: boolean;
    signature: string;
    date: string;
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
  status: "pending" | "paid" | "overdue";
  type: "application_fee" | "tuition_deposit" | "full_tuition";
}

const ApplicationStatusHome: React.FC = () => {
  const [applicationData, setApplicationData] =
    useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [viewDocument, setViewDocument] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const searchParams = useSearchParams();
  const prospectiveId = searchParams.get("pid");
  const pdfRef = useRef<HTMLDivElement>(null);

  // Mock payment data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY-001",
      amount: 100,
      description: "Application Fee",
      dueDate: "2025-10-30",
      status: "pending",
      type: "application_fee",
    },
    {
      id: "PAY-002",
      amount: 500,
      description: "Tuition Deposit",
      dueDate: "2025-11-15",
      status: "pending",
      type: "tuition_deposit",
    },
  ]);

  useEffect(() => {
    if (!prospectiveId) {
      setError("No application ID found in URL");
      setLoading(false);
      return;
    }

    const applicationRef = ref(db, `applications/students/${prospectiveId}`);

    const fetchData = onValue(
      applicationRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setApplicationData(snapshot.val());
          setError(null);
        } else {
          setError("Application not found. Please check your Prospective ID.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching application:", error);
        setError("Failed to load application data. Please try again.");
        setLoading(false);
      }
    );

    return () => off(applicationRef, "value", fetchData);
  }, [prospectiveId]);

  const getStatusConfig = (status: string) => {
    const config = {
      submitted: {
        color: "bg-[#BD9946] bg-opacity-20 text-[#fff]",
        label: "Submitted",
        icon: "📋",
      },
      under_review: {
        color: "bg-[#BD9946] bg-opacity-20 text-[#fff]",
        label: "Under Review",
        icon: "🔍",
      },
      accepted: {
        color: "bg-[#017840] bg-opacity-20 text-[#fff]",
        label: "Accepted",
        icon: "🎉",
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        label: "Not Accepted",
        icon: "❌",
      },
      waitlisted: {
        color: "bg-[#BD9946] bg-opacity-20 text-[#fff]",
        label: "Waitlisted",
        icon: "⏳",
      },
    };
    return config[status as keyof typeof config] || config.submitted;
  };

  const generatePDF = async () => {
    if (!pdfRef.current || !applicationData) return;

    setIsGeneratingPDF(true);

    try {
      // Dynamically import the libraries
      const { jsPDF } = await import("jspdf");
      const html2canvas = await import("html2canvas");

      // Use the hidden PDF template
      const element = pdfRef.current;

      // Generate canvas from the element
      const canvas = await html2canvas.default(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save(`SAUNI-Application-${applicationData.prospectiveId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePayment = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status: "paid" as const }
          : payment
      )
    );
    alert("Payment simulation successful!");
  };

  const handlePasswordChange = async () => {
    if (!applicationData) return;

    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const applicationRef = ref(db, `applications/students/${prospectiveId}`);
      await update(applicationRef, {
        tempPassword: newPassword,
        passwordChanged: true,
        updatedAt: new Date().toISOString(),
      });

      setApplicationData((prev) =>
        prev
          ? {
              ...prev,
              tempPassword: newPassword,
              passwordChanged: true,
            }
          : null
      );

      setPasswordSuccess(true);
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(false);
        setNewPassword("");
        setConfirmPassword("");
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError("Failed to update password. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const DocumentCard: React.FC<{
    document: any;
    title: string;
    type: string;
  }> = ({ document, title, type }) => {
    if (!document?.url) return null;

    return (
      <div className="border border-gray-200 rounded-lg p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#017840] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-[#017840] text-base md:text-lg">📄</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 truncate text-sm md:text-base">
              {title}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {document.name || `${type} document`}
            </p>
          </div>
        </div>
        <button
          onClick={() => setViewDocument({ url: document.url, name: title })}
          className="flex items-center justify-center space-x-1 px-3 py-2 bg-[#017840] text-white rounded-lg text-sm hover:bg-[#015a30] transition-colors whitespace-nowrap w-full sm:w-auto"
        >
          <Eye className="w-4 h-4" />
          <span>View Document</span>
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] to-[#fefaf0] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#017840] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">
            Loading your application status...
          </p>
        </div>
      </div>
    );
  }

  if (error || !applicationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] to-[#fefaf0] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#017840] text-white rounded-lg hover:bg-[#015a30] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(applicationData.status);
  const fullName = `${applicationData.personalInfo.firstName} ${applicationData.personalInfo.middleName} ${applicationData.personalInfo.lastName}`;
  const age = calculateAge(applicationData.personalInfo.dateOfBirth);
  const primaryEducation = applicationData.academicHistory.primaryEducation;
  const secondaryEducation = applicationData.academicHistory.secondarySchool[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] to-[#fefaf0]">
      {/* Document Viewer Modal */}
      {viewDocument && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                {viewDocument.name}
              </h3>
              <button
                onClick={() => setViewDocument(null)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 md:p-4 overflow-auto max-h-[80vh]">
              <img
                src={viewDocument.url}
                alt={viewDocument.name}
                className="w-full h-auto rounded-lg max-w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 md:p-6 mx-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#017840] bg-opacity-10 rounded-full flex items-center justify-center">
                <Key className="w-4 h-4 md:w-5 md:h-5 text-[#017840]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  Change Password
                </h3>
                <p className="text-xs text-gray-600">
                  This can only be done once
                </p>
              </div>
            </div>

            {passwordSuccess ? (
              <div className="text-center py-4 md:py-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl">✓</span>
                </div>
                <p className="text-green-600 font-semibold text-sm md:text-base">
                  Password changed successfully!
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent text-sm md:text-base"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent text-sm md:text-base"
                      placeholder="Confirm new password"
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {passwordError}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2 md:space-x-3 mt-4 md:mt-6">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-3 py-2 md:px-4 md:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="flex-1 px-3 py-2 md:px-4 md:py-2 bg-[#017840] text-white rounded-lg hover:bg-[#015a30] transition-colors text-sm md:text-base"
                  >
                    Change Password
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hidden div for PDF generation - Make sure it's properly positioned */}
      <div className="fixed top-0 left-[-9999px]">
        <PDFTemplate applicationData={applicationData} ref={pdfRef} />
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-[#017840] to-[#BD9946] rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src="/sauni-logo.png"
                  alt="SAUNI Logo"
                  width={32}
                  height={32}
                  className="h-6 w-6 md:h-8 md:w-8"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                  Student Portal
                </h1>
                <p className="text-xs md:text-sm text-gray-600 truncate">
                  Application Status Center
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-600">Prospective ID</p>
                <p className="font-mono font-bold text-[#017840] text-sm">
                  {applicationData.prospectiveId}
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg border border-gray-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-600">Prospective ID</p>
                <p className="font-mono font-bold text-[#017840] text-sm">
                  {applicationData.prospectiveId}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 md:py-8">
        {/* Main Status Card */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-[#017840] to-[#BD9946] p-4 md:p-6 text-white">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                    {applicationData.documents.passportPhoto?.url ? (
                      <img
                        src={applicationData.documents.passportPhoto.url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl md:text-2xl">👤</span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-[#BD9946] rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg md:text-2xl font-bold truncate">
                    {fullName}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base truncate">
                    {applicationData.programSelection.firstChoice}
                  </p>
                  <p className="text-white/80 text-xs md:text-sm">
                    Applied on {formatDate(applicationData.submittedAt)}
                  </p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 md:px-4 md:py-2 self-start md:self-auto">
                <div className="flex items-center space-x-2">
                  <span className="text-base md:text-lg">
                    {statusConfig.icon}
                  </span>
                  <span
                    className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold ${statusConfig.color}`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="p-4 md:p-6 border-b">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                Application Progress
              </h3>
              <span className="text-xs md:text-sm text-gray-600">
                Step 4 of 4
              </span>
            </div>
            <div className="flex items-center">
              {["Submitted", "Review", "Decision", "Complete"].map(
                (step, index) => {
                  const currentStep =
                    applicationData.status === "submitted"
                      ? 1
                      : applicationData.status === "under_review"
                        ? 2
                        : ["accepted", "rejected", "waitlisted"].includes(
                              applicationData.status
                            )
                          ? 3
                          : 4;
                  const isCompleted = index < currentStep;
                  const isCurrent = index === currentStep - 1;

                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold
                        ${
                          isCompleted
                            ? "bg-[#017840] text-white"
                            : isCurrent
                              ? "bg-[#BD9946] text-white"
                              : "bg-gray-200 text-gray-500"
                        }`}
                        >
                          {isCompleted ? "✓" : index + 1}
                        </div>
                        <span
                          className={`text-xs mt-1 text-center ${isCurrent ? "font-semibold text-[#BD9946]" : "text-gray-600"} truncate w-full`}
                        >
                          {step}
                        </span>
                      </div>
                      {index < 3 && (
                        <div
                          className={`flex-1 h-1 mx-1 md:mx-2 ${isCompleted ? "bg-[#017840]" : "bg-gray-200"}`}
                        />
                      )}
                    </React.Fragment>
                  );
                }
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Application Details */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
            {/* Documents Section */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#BD9946] rounded-full mr-2"></span>
                Uploaded Documents
              </h3>
              <div className="space-y-3 md:space-y-4">
                <DocumentCard
                  document={applicationData.documents.passportPhoto}
                  title="Passport Photograph"
                  type="Passport"
                />
                <DocumentCard
                  document={applicationData.documents.birthCertificate}
                  title="Birth Certificate"
                  type="Birth"
                />
                <DocumentCard
                  document={applicationData.documents.primaryCertificate}
                  title="Primary School Certificate"
                  type="Primary"
                />
                <DocumentCard
                  document={applicationData.documents.secondaryCertificate}
                  title="Secondary School Certificate"
                  type="Secondary"
                />
                <DocumentCard
                  document={applicationData.documents.waecNeco}
                  title="WAEC/NECO Result"
                  type="Result"
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#017840] rounded-full mr-2"></span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <MobileInfoField label="Full Name" value={fullName} />
                <MobileInfoField
                  label="Date of Birth"
                  value={formatDate(applicationData.personalInfo.dateOfBirth)}
                />
                <MobileInfoField label="Age" value={`${age} years`} />
                <MobileInfoField
                  label="Gender"
                  value={applicationData.personalInfo.gender}
                />
                <MobileInfoField
                  label="Nationality"
                  value={
                    applicationData.personalInfo.isNigerian
                      ? "Nigerian"
                      : applicationData.personalInfo.nationality
                  }
                />
                <MobileInfoField
                  label="State of Origin"
                  value={applicationData.personalInfo.stateOfOrigin}
                />
                <MobileInfoField
                  label="Local Government"
                  value={applicationData.personalInfo.localGovernment}
                />
                <MobileInfoField
                  label="Country of Residence"
                  value={
                    applicationData.personalInfo.countryOfResidence || "Nigeria"
                  }
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#BD9946] rounded-full mr-2"></span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <MobileInfoField
                  label="Email"
                  value={applicationData.contactInfo.email}
                />
                <MobileInfoField
                  label="Phone"
                  value={applicationData.contactInfo.phone}
                />
                <MobileInfoField
                  label="Address"
                  value={applicationData.contactInfo.address}
                />
                <MobileInfoField
                  label="City"
                  value={applicationData.contactInfo.city}
                />
                <MobileInfoField
                  label="State"
                  value={applicationData.contactInfo.state}
                />
                <MobileInfoField
                  label="Country"
                  value={applicationData.contactInfo.country}
                />
                <MobileInfoField
                  label="Zip Code"
                  value={applicationData.contactInfo.zipCode}
                />
              </div>

              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">
                  Guardian Information
                </h4>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  <MobileInfoField
                    label="Full Name"
                    value={applicationData.contactInfo.guardianContact.fullName}
                  />
                  <MobileInfoField
                    label="Relationship"
                    value={
                      applicationData.contactInfo.guardianContact.relationship
                    }
                  />
                  <MobileInfoField
                    label="Phone"
                    value={applicationData.contactInfo.guardianContact.phone}
                  />
                  <MobileInfoField
                    label="Email"
                    value={applicationData.contactInfo.guardianContact.email}
                  />
                </div>
              </div>
            </div>

            {/* Program Information */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#017840] rounded-full mr-2"></span>
                Program Details
              </h3>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <MobileInfoField
                  label="First Choice"
                  value={applicationData.programSelection.firstChoice}
                />
                <MobileInfoField
                  label="Second Choice"
                  value={applicationData.programSelection.secondChoice}
                />
                <MobileInfoField
                  label="Entry Year"
                  value={applicationData.programSelection.entryYear.toString()}
                />
                <MobileInfoField
                  label="Semester"
                  value={applicationData.programSelection.semester}
                />
                <MobileInfoField
                  label="Mode of Study"
                  value={applicationData.programSelection.modeOfStudy}
                />
                <MobileInfoField
                  label="Application Date"
                  value={formatDate(applicationData.submittedAt)}
                />
              </div>
            </div>

            {/* Academic Background */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#BD9946] rounded-full mr-2"></span>
                Academic Background
              </h3>

              {/* Primary Education */}
              <div className="mb-4 md:mb-6">
                <h4 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">
                  Primary Education
                </h4>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  <MobileInfoField
                    label="School Name"
                    value={primaryEducation.schoolName}
                  />
                  <MobileInfoField
                    label="Certificate Type"
                    value={primaryEducation.certificateType}
                  />
                  <MobileInfoField
                    label="Start Year"
                    value={primaryEducation.startYear.toString()}
                  />
                  <MobileInfoField
                    label="End Year"
                    value={primaryEducation.endYear.toString()}
                  />
                </div>
              </div>

              {/* Secondary Education */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">
                  Secondary Education
                </h4>
                <div className="grid grid-cols-1 gap-3 md:gap-4 mb-3 md:mb-4">
                  <MobileInfoField
                    label="School Name"
                    value={secondaryEducation.schoolName}
                  />
                  <MobileInfoField
                    label="School Type"
                    value={secondaryEducation.schoolType}
                  />
                  <MobileInfoField
                    label="Exam Type"
                    value={secondaryEducation.examType}
                  />
                  <MobileInfoField
                    label="Exam Number"
                    value={secondaryEducation.examNumber}
                  />
                  <MobileInfoField
                    label="Sitting"
                    value={secondaryEducation.sitting}
                  />
                  <MobileInfoField
                    label="Completion Year"
                    value={secondaryEducation.completionYear.toString()}
                  />
                </div>

                {/* Grades */}
                <div className="mt-3 md:mt-4">
                  <h5 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">
                    Subject Grades
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {secondaryEducation.grades.map((grade, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-2 md:p-3"
                      >
                        <div className="text-xs md:text-sm font-medium text-gray-600 truncate">
                          {grade.subject}
                        </div>
                        <div
                          className={`text-base md:text-lg font-bold ${
                            grade.grade === "A1" ||
                            grade.grade === "A2" ||
                            grade.grade === "A3"
                              ? "text-[#017840]"
                              : grade.grade.startsWith("B")
                                ? "text-[#BD9946]"
                                : grade.grade.startsWith("C")
                                  ? "text-yellow-600"
                                  : "text-red-600"
                          }`}
                        >
                          {grade.grade}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payments & Contact */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {/* Payment Section */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-[#017840] rounded-full mr-2"></span>
                  Payment Center
                </span>
                <span className="text-xs md:text-sm font-normal text-gray-500">
                  {payments.filter((p) => p.status === "paid").length}/
                  {payments.length} Paid
                </span>
              </h3>

              <div className="space-y-3 md:space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border rounded-lg p-3 md:p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                          {payment.description}
                        </h4>
                        <p className="text-xs text-gray-600">
                          Due: {formatDate(payment.dueDate)}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 flex-shrink-0 ${
                          payment.status === "paid"
                            ? "bg-[#017840] bg-opacity-10 text-[#fff]"
                            : payment.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-[#BD9946] bg-opacity-20 text-[#fff]"
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 md:mt-3">
                      <span className="text-base md:text-lg font-bold text-gray-900">
                        ₦{payment.amount}
                      </span>
                      <button
                        onClick={() => handlePayment(payment.id)}
                        disabled={payment.status === "paid"}
                        className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors ${
                          payment.status === "paid"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#017840] text-white hover:bg-[#015a30]"
                        }`}
                      >
                        {payment.status === "paid" ? "Paid" : "Pay Now"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 p-3 bg-[#017840] bg-opacity-5 rounded-lg border border-[#017840] border-opacity-20">
                <h4 className="font-semibold text-[#fff] mb-1 text-sm md:text-base">
                  Payment Instructions
                </h4>
                <p className="text-xs md:text-sm text-[#fff]">
                  All payments are processed securely. You will receive a
                  confirmation email upon successful payment.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#BD9946] rounded-full mr-2"></span>
                Contact Admissions
              </h3>

              <div className="space-y-2 md:space-y-3">
                <MobileContactItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value="admissions@sauni.edu"
                  link="mailto:admissions@sauni.edu"
                />
                <MobileContactItem
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value="+2348127728084"
                  link="tel:+2348127728084"
                />
                <MobileContactItem
                  icon={<MapPin className="w-4 h-4" />}
                  label="Address"
                  value="Southern Atlantic University, Uyo, Akwa Ibom, Nigeria"
                  link="https://www.google.com/maps/place/Southern+Atlantic+Polytechnic/@4.9378809,8.0114821,17z/data=!3m1!4b1!4m6!3m5!1s0x1067f7a10e4b8939:0xd700e5b3402992c9!8m2!3d4.9378809!4d8.014057!16s%2Fg%2F11rqz9rn59?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D"
                />
                <MobileContactItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Office Hours"
                  value="Mon-Fri, 9:00 AM - 5:00 PM"
                />
              </div>

              <button className="w-full mt-3 md:mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm md:text-base">
                Schedule a Campus Tour
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="w-full text-left p-2 md:p-3 rounded-lg border border-gray-200 hover:bg-[#f0f9f4] transition-colors flex items-center text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {isGeneratingPDF
                      ? "Generating PDF..."
                      : "Download Application Summary"}
                  </span>
                </button>
                <button className="w-full text-left p-2 md:p-3 rounded-lg border border-gray-200 hover:bg-[#f0f9f4] transition-colors flex items-center text-sm md:text-base">
                  <Notebook className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View Program Requirements</span>
                </button>
                <button className="w-full text-left p-2 md:p-3 rounded-lg border border-gray-200 hover:bg-[#f0f9f4] transition-colors flex items-center text-sm md:text-base">
                  <HelpingHand className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Request Information</span>
                </button>
              </div>
            </div>

            {/* Temporary Password */}
            {applicationData.tempPassword &&
              !applicationData.passwordChanged && (
                <div
                  className="bg-[#fefaf0] border border-[#BD9946] rounded-xl md:rounded-2xl p-4 md:p-6 cursor-pointer hover:bg-[#fdf6e7] transition-colors"
                  onClick={() => setShowPasswordModal(true)}
                >
                  <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#BD9946] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#BD9946]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#BD9946] text-sm md:text-base">
                        Temporary Password
                      </h3>
                      <p className="text-xs text-[#BD9946] opacity-80">
                        Click to change your password
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border border-[#BD9946] border-opacity-30 rounded-lg p-2 md:p-3">
                    <code className="font-mono font-bold text-[#BD9946] text-base md:text-lg break-all">
                      {applicationData.tempPassword}
                    </code>
                  </div>
                  <p className="text-[#BD9946] text-xs mt-1 md:mt-2 opacity-70">
                    Please change this password after your first login. This can
                    only be done once.
                  </p>
                </div>
              )}

            {applicationData.passwordChanged && (
              <div className="bg-[#f0f9f4] border border-[#017840] rounded-xl md:rounded-2xl p-4 md:p-6">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#017840] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#017840]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#017840] text-sm md:text-base">
                      Password Updated
                    </h3>
                    <p className="text-xs text-[#017840] opacity-80">
                      Your password has been changed successfully
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status-specific Messages */}
        {applicationData.status === "under_review" && (
          <div className="mt-6 md:mt-8 bg-[#fefaf0] border border-[#BD9946] rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-start">
              <span className="text-xl md:text-2xl mr-3 md:mr-4 flex-shrink-0">
                🔍
              </span>
              <div>
                <h4 className="font-semibold text-[#BD9946] text-sm md:text-base">
                  Application Under Review
                </h4>
                <p className="text-[#BD9946] opacity-90 text-xs md:text-sm">
                  Your application is currently being reviewed by our admissions
                  committee. This process typically takes 2-3 weeks. You will be
                  notified immediately once a decision is made.
                </p>
              </div>
            </div>
          </div>
        )}

        {applicationData.status === "accepted" && (
          <div className="mt-6 md:mt-8 bg-[#f0f9f4] border border-[#017840] rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-start">
              <span className="text-xl md:text-2xl mr-3 md:mr-4 flex-shrink-0">
                🎉
              </span>
              <div>
                <h4 className="font-semibold text-[#017840] text-sm md:text-base">
                  Congratulations! You've Been Accepted!
                </h4>
                <p className="text-[#017840] opacity-90 text-xs md:text-sm">
                  Welcome to SAUNI University! Your application has been
                  accepted. Please complete your payment and review the next
                  steps in your admission package.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#017840] text-white mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left Section - Logo and Info */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-3 md:mb-4">
                <Image
                  src="/sauni-logo.png"
                  alt="SAUNI Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">
                SOUTHERN ATLANTIC UNIVERSITY
              </h3>
              <p className="text-white/80 text-xs md:text-sm lg:text-base">
                Empowering students through quality education since 1985.
              </p>
            </div>

            {/* Right Section - Need Help */}
            <div className="text-center lg:text-right">
              <h4 className="font-semibold text-base md:text-lg lg:text-xl mb-2 md:mb-4 relative inline-block">
                Need Help?
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#BD9946]"></span>
              </h4>
              <p className="text-white/80 mb-3 md:mb-4 text-xs md:text-sm lg:text-base max-w-md mx-auto lg:mx-0 lg:ml-auto">
                Contact our admissions team for assistance with your
                application.
              </p>

              {/* Contact Links - Single consistent layout */}
              <div className="flex flex-col gap-2 items-center lg:items-end">
                <Link
                  href="mailto:admissions@sauni.edu"
                  className="text-white/90 hover:text-white text-sm md:text-base font-semibold break-all lg:break-normal"
                >
                  admissions@sauni.edu
                </Link>

                <Link
                  href="tel:+2348127728084"
                  className="text-white/90 hover:text-white text-sm md:text-base font-semibold"
                >
                  +234 812 772 8084
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-white/20 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-xs md:text-sm text-white/60">
            <p>© 2025 SAUNI University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// PDF Template Component with forwardRef
const PDFTemplate = React.forwardRef<
  HTMLDivElement,
  { applicationData: ApplicationData | null }
>(({ applicationData }, ref) => {
  if (!applicationData) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fullName = `${applicationData.personalInfo.firstName} ${applicationData.personalInfo.middleName} ${applicationData.personalInfo.lastName}`;

  return (
    <div
      ref={ref}
      className="p-8 bg-white text-gray-900"
      style={{ width: "210mm", minHeight: "297mm" }}
    >
      {/* University Header */}
      <div className="text-center mb-6 border-b-2 border-[#017840] pb-4">
        <h1 className="text-2xl font-bold text-[#017840] mb-2">
          SOUTHERN ATLANTIC UNIVERSITY
        </h1>
        <p className="text-gray-600">Application Summary</p>
        <p className="text-sm text-gray-500">
          Generated on {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Student Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-[#017840] bg-opacity-10 text-[#017840] p-2 rounded-t">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-2 p-3 border border-t-0">
          <div>
            <strong>Name:</strong> {fullName}
          </div>
          <div>
            <strong>Prospective ID:</strong> {applicationData.prospectiveId}
          </div>
          <div>
            <strong>Date of Birth:</strong>{" "}
            {formatDate(applicationData.personalInfo.dateOfBirth)}
          </div>
          <div>
            <strong>Gender:</strong> {applicationData.personalInfo.gender}
          </div>
          <div>
            <strong>Nationality:</strong>{" "}
            {applicationData.personalInfo.nationality}
          </div>
          <div>
            <strong>Status:</strong> {applicationData.status.replace("_", " ")}
          </div>
        </div>
      </div>

      {/* Program Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-[#017840] bg-opacity-10 text-[#017840] p-2 rounded-t">
          Program Details
        </h2>
        <div className="p-3 border border-t-0">
          <p>
            <strong>First Choice:</strong>{" "}
            {applicationData.programSelection.firstChoice}
          </p>
          <p>
            <strong>Second Choice:</strong>{" "}
            {applicationData.programSelection.secondChoice}
          </p>
          <p>
            <strong>Entry Year:</strong>{" "}
            {applicationData.programSelection.entryYear}
          </p>
          <p>
            <strong>Semester:</strong>{" "}
            {applicationData.programSelection.semester}
          </p>
        </div>
      </div>

      {/* Application Timeline */}
      <div className="mb-6">
        <h2 className="text-lg font-bold bg-[#017840] bg-opacity-10 text-[#017840] p-2 rounded-t">
          Application Timeline
        </h2>
        <div className="p-3 border border-t-0">
          <p>
            <strong>Submitted:</strong>{" "}
            {formatDate(applicationData.submittedAt)}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {formatDate(applicationData.updatedAt)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-[#017840]">
        <p className="text-sm text-gray-600">
          Official Document - Southern Atlantic University
        </p>
        <p className="text-xs text-gray-500">
          Confidential Application Information
        </p>
      </div>
    </div>
  );
});

PDFTemplate.displayName = "PDFTemplate";

// Mobile-optimized contact item
const MobileContactItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}> = ({ icon, label, value, link }) => (
  <div className="flex items-start">
    <span className="mr-2 mt-0.5 text-[#017840] flex-shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      {link ? (
        <a
          href={link}
          className="text-sm text-[#017840] hover:underline font-semibold break-words block"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-900 font-semibold break-words">
          {value}
        </p>
      )}
    </div>
  </div>
);

// Mobile-optimized info field
const MobileInfoField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col space-y-1">
    <label className="text-xs font-medium text-[#017840]">{label}</label>
    <p className="text-sm text-gray-900 font-semibold break-words">{value}</p>
  </div>
);

export default ApplicationStatusHome;
