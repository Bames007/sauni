import { GraduationCap } from "lucide-react";
import { InfoFieldPDF } from "../StudentApplication";
import React from "react";
import { ApplicationData } from "../type";

export const PDFTemplate = React.forwardRef<
  HTMLDivElement,
  {
    application: ApplicationData;
    formatDate: (dateString: string) => string;
  }
>(({ application, formatDate }, ref) => {
  const fullName = `${application.personalInfo.firstName} ${application.personalInfo.middleName} ${application.personalInfo.lastName}`;
  const programName =
    typeof application.programSelection.firstChoice === "string"
      ? application.programSelection.firstChoice
      : application.programSelection.firstChoice.name;

  return (
    <div
      ref={ref}
      className="pdf-template"
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "Gantari, sans-serif",
      }}
    >
      {/* Header */}
      <div className="pdf-header">
        <div className="pdf-logo">
          <GraduationCap className="pdf-logo-icon" />
        </div>
        <h1 className="pdf-title">SOUTHERN ATLANTIC UNIVERSITY</h1>
        <h2 className="pdf-subtitle">Application Summary Report</h2>
        <p className="pdf-date">
          Generated on {formatDate(new Date().toISOString())}
        </p>
      </div>

      {/* Student Information */}
      <div className="pdf-section">
        <h3 className="pdf-section-title">Student Information</h3>
        <div className="pdf-info-grid">
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

      {/* Footer */}
      <div className="pdf-footer">
        <p>Southern Atlantic University - Admissions Office</p>
        <p>This is an official application summary report</p>
      </div>

      <style jsx>{`
        .pdf-template {
          padding: 2rem;
          background: white;
          color: #1f2937;
        }

        .pdf-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #059669;
        }

        .pdf-logo {
          width: 5rem;
          height: 5rem;
          background: #059669;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .pdf-logo-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: white;
        }

        .pdf-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #059669;
          font-family: "Bebas Neue", sans-serif;
          margin: 0 0 0.5rem 0;
        }

        .pdf-subtitle {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.5rem 0;
        }

        .pdf-date {
          color: #6b7280;
          margin: 0;
        }

        .pdf-section {
          margin-bottom: 2rem;
        }

        .pdf-section-title {
          font-size: 1.125rem;
          font-weight: 700;
          background: #059669;
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem 0.5rem 0 0;
          margin: 0;
        }

        .pdf-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 0.5rem 0.5rem;
        }

        .pdf-footer {
          text-align: center;
          color: #6b7280;
          font-size: 0.75rem;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
});

PDFTemplate.displayName = "PDFTemplate";
