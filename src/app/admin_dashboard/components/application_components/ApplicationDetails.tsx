import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Mail,
  User,
  X,
  XCircle,
} from "lucide-react";
import AcademicInfoTab from "./AcademicInfo";
import ContactInfoTab from "./ContactInfo";
import DeclarationTab from "./Declaration";
import DocumentsTab from "./DocumentsTab";
import OverviewTab from "./Overview";
import PersonalInfoTab from "./PersonalInfo";
import { ApplicationData } from "../type";
import Image from "next/image";

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDFTemplate } from "./PDFTemplate";

// Enhanced Application Detail Modal Component
const ApplicationDetailModal: React.FC<{
  application: ApplicationData;
  onClose: () => void;
  onStatusUpdate: (id: string, status: ApplicationData["status"]) => void;
  formatDate: (dateString: string) => string;
  canModifyStatus: boolean;
}> = ({
  application,
  onClose,
  onStatusUpdate,
  formatDate,
  canModifyStatus,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const pdfRef = useRef<HTMLDivElement>(null);

  const fullName = `${application.personalInfo.firstName} ${application.personalInfo.middleName} ${application.personalInfo.lastName}`;

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
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Enhanced Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-avatar">
              {application.documents?.passportPhoto?.url ? (
                <Image
                  src={application.documents.passportPhoto.url}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="avatar-image"
                />
              ) : (
                <User className="avatar-icon" />
              )}
            </div>
            <div className="modal-title-section">
              <h2 className="modal-title">{fullName}</h2>
              <p className="modal-subtitle">{application.prospectiveId}</p>
            </div>
          </div>
          <div className="modal-header-right">
            <button onClick={generatePDF} className="pdf-button">
              <Download className="pdf-button-icon" />
              <span className="pdf-button-text">Export PDF</span>
            </button>
            <button onClick={onClose} className="close-button">
              <X className="close-icon" />
            </button>
          </div>
        </div>

        <div className="modal-content-wrapper">
          {/* Enhanced Sidebar */}
          <div className="modal-sidebar">
            <div className="sidebar-section">
              <div className="status-section">
                <span
                  className={`status-badge-modal ${getStatusColor(application.status)}`}
                >
                  {getStatusIcon(application.status)}
                  <span className="status-text-modal">
                    {application.status.replace("_", " ")}
                  </span>
                </span>
                {canModifyStatus && (
                  <select
                    value={application.status}
                    onChange={(e) =>
                      onStatusUpdate(
                        application.prospectiveId,
                        e.target.value as ApplicationData["status"]
                      )
                    }
                    className="status-select-modal"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlisted">Waitlisted</option>
                  </select>
                )}
              </div>
            </div>

            <nav className="sidebar-nav">
              {[
                {
                  id: "overview",
                  label: "Overview",
                  icon: <User className="nav-icon" />,
                },
                {
                  id: "personal",
                  label: "Personal Info",
                  icon: <User className="nav-icon" />,
                },
                {
                  id: "contact",
                  label: "Contact Info",
                  icon: <Mail className="nav-icon" />,
                },
                {
                  id: "academic",
                  label: "Academic Info",
                  icon: <BookOpen className="nav-icon" />,
                },
                {
                  id: "documents",
                  label: "Documents",
                  icon: <FileText className="nav-icon" />,
                },
                {
                  id: "declaration",
                  label: "Declaration",
                  icon: <FileText className="nav-icon" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-button ${activeTab === tab.id ? "active" : ""}`}
                >
                  {tab.icon}
                  <span className="nav-label">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Enhanced Content */}
          <div className="modal-content">
            <div className="content-area">
              {activeTab === "overview" && (
                <OverviewTab
                  application={application}
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
      <div className="pdf-template-hidden">
        <PDFTemplate
          application={application}
          ref={pdfRef}
          formatDate={formatDate}
        />
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          z-index: 50;
          backdrop-filter: blur(4px);
        }

        .modal-container {
          background: white;
          border-radius: 1rem;
          max-width: 80rem;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.3s ease-out;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .modal-avatar {
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-icon {
          width: 2rem;
          height: 2rem;
          color: white;
        }

        .modal-title-section {
          display: flex;
          flex-direction: column;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          font-family: "Bebas Neue", sans-serif;
          margin: 0;
        }

        .modal-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
        }

        .modal-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pdf-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #059669;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 500;
          font-family: "Gantari", sans-serif;
          border: none;
          transition: all 0.2s;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .pdf-button:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .pdf-button-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .pdf-button-text {
          display: block;
        }

        .close-button {
          color: #9ca3af;
          padding: 0.75rem;
          border-radius: 50%;
          border: none;
          background: none;
          transition: all 0.2s;
          cursor: pointer;
        }

        .close-button:hover {
          color: #6b7280;
          background: #f3f4f6;
        }

        .close-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .modal-content-wrapper {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .modal-sidebar {
          width: 20rem;
          background: #f9fafb;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
        }

        .sidebar-section {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .status-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .status-badge-modal {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: "Gantari", sans-serif;
          justify-content: center;
        }

        .status-text-modal {
          text-transform: capitalize;
        }

        .status-select-modal {
          width: 100%;
          font-size: 0.875rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-family: "Gantari", sans-serif;
          background: white;
          transition: all 0.2s;
        }

        .status-select-modal:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        .sidebar-nav {
          padding: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-button {
          width: 100%;
          text-align: left;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.2s;
          border: none;
          background: none;
          font-family: "Gantari", sans-serif;
          color: #6b7280;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .nav-button:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .nav-button.active {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
          font-weight: 600;
        }

        .nav-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .nav-label {
          font-weight: 500;
        }

        .modal-content {
          flex: 1;
          overflow: auto;
          background: white;
        }

        .content-area {
          padding: 2rem;
        }

        .pdf-template-hidden {
          position: fixed;
          top: 0;
          left: -9999px;
        }
      `}</style>
    </div>
  );
};

export default ApplicationDetailModal;
