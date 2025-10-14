import React from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  Signature,
  Calendar,
  Shield,
  AlertCircle,
  UserCheck,
  FileCheck,
} from "lucide-react";
import { ApplicationData } from "../type";

const DeclarationTab: React.FC<{
  application: ApplicationData;
  formatDate: (dateString: string) => string;
}> = ({ application, formatDate }) => {
  const getFormattedDate = (
    dateValue: string | Date | null | undefined
  ): string => {
    if (!dateValue) return "Not provided";

    try {
      const date = new Date(dateValue);
      return !isNaN(date.getTime())
        ? formatDate(date.toISOString())
        : "Invalid date";
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date format error";
    }
  };

  const declaration = application.declaration;
  const isFullyDeclared =
    declaration.isInformationAccurate &&
    declaration.agreeToTerms &&
    declaration.signature;

  return (
    <div className="declaration-container">
      {/* Hero Header */}
      <div className="declaration-hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <div className="avatar-background">
              <FileText className="avatar-icon" />
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Declaration & Agreement</h1>
            <p className="hero-subtitle">
              Legal declarations and terms of agreement for your application
            </p>
            <div className="hero-badges">
              <div
                className={`status-badge ${isFullyDeclared ? "completed" : "pending"}`}
              >
                {isFullyDeclared ? (
                  <CheckCircle size={14} />
                ) : (
                  <Clock size={14} />
                )}
                <span>
                  {isFullyDeclared ? "Fully Declared" : "Declaration Pending"}
                </span>
              </div>
              <div className="verification-badge">
                <Shield size={14} />
                <span>Legal Document</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
        </div>
      </div>

      {/* Declaration Status Overview */}
      <div className="status-overview">
        <div className="overview-cards">
          <div
            className={`status-card ${declaration.isInformationAccurate ? "confirmed" : "pending"}`}
          >
            <div className="status-icon">
              <UserCheck className="icon" />
            </div>
            <div className="status-content">
              <h4 className="status-title">Information Accuracy</h4>
              <p className="status-value">
                {declaration.isInformationAccurate
                  ? "Confirmed"
                  : "Pending Confirmation"}
              </p>
              <p className="status-description">
                Verification of provided information
              </p>
            </div>
          </div>

          <div
            className={`status-card ${declaration.agreeToTerms ? "confirmed" : "pending"}`}
          >
            <div className="status-icon">
              <FileCheck className="icon" />
            </div>
            <div className="status-content">
              <h4 className="status-title">Terms Agreement</h4>
              <p className="status-value">
                {declaration.agreeToTerms ? "Agreed" : "Pending Agreement"}
              </p>
              <p className="status-description">
                Acceptance of terms and conditions
              </p>
            </div>
          </div>

          <div
            className={`status-card ${declaration.signature ? "confirmed" : "pending"}`}
          >
            <div className="status-icon">
              <Signature className="icon" />
            </div>
            <div className="status-content">
              <h4 className="status-title">Digital Signature</h4>
              <p className="status-value">
                {declaration.signature ? "Provided" : "Required"}
              </p>
              <p className="status-description">Legal electronic signature</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Declaration Information */}
      <div className="declaration-content">
        {/* Declaration Details Section */}
        <div className="declaration-section">
          <div className="section-header">
            <div className="section-icon primary">
              <FileText className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Declaration Details</h3>
              <p className="section-description">
                Complete declaration information and legal acknowledgments
              </p>
            </div>
          </div>

          <div className="declaration-cards">
            <div className="declaration-card highlight">
              <div className="card-header">
                <div className="card-icon">
                  <UserCheck className="icon" />
                </div>
                <div className="card-badge primary">Information Accuracy</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">
                  {declaration.isInformationAccurate
                    ? "Confirmed Accurate"
                    : "Not Confirmed"}
                </h4>
                <p className="card-description">
                  {declaration.isInformationAccurate
                    ? "You have confirmed that all provided information is accurate and complete to the best of your knowledge."
                    : "Please verify the accuracy of all provided information."}
                </p>
              </div>
              <div className="card-status">
                <div
                  className={`status-indicator ${declaration.isInformationAccurate ? "confirmed" : "pending"}`}
                >
                  {declaration.isInformationAccurate ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  <span>
                    {declaration.isInformationAccurate ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            <div className="declaration-card">
              <div className="card-header">
                <div className="card-icon">
                  <FileCheck className="icon" />
                </div>
                <div className="card-badge">Terms Agreement</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">
                  {declaration.agreeToTerms
                    ? "Terms Accepted"
                    : "Terms Pending"}
                </h4>
                <p className="card-description">
                  {declaration.agreeToTerms
                    ? "You have agreed to the terms and conditions of the application process."
                    : "Please review and accept the application terms and conditions."}
                </p>
              </div>
              <div className="card-status">
                <div
                  className={`status-indicator ${declaration.agreeToTerms ? "confirmed" : "pending"}`}
                >
                  {declaration.agreeToTerms ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  <span>
                    {declaration.agreeToTerms ? "Accepted" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            <div className="declaration-card signature-card">
              <div className="card-header">
                <div className="card-icon">
                  <Signature className="icon" />
                </div>
                <div className="card-badge success">Digital Signature</div>
              </div>
              <div className="card-content">
                <div className="signature-display">
                  {declaration.signature ? (
                    <>
                      <div className="signature-value">
                        {declaration.signature}
                      </div>
                      <p className="signature-label">Electronic Signature</p>
                    </>
                  ) : (
                    <div className="signature-missing">
                      <AlertCircle className="missing-icon" />
                      <span>Signature Required</span>
                    </div>
                  )}
                </div>
                <p className="card-description">
                  {declaration.signature
                    ? "Your digital signature confirms the authenticity of this application."
                    : "A digital signature is required to complete your application."}
                </p>
              </div>
              <div className="card-status">
                <div
                  className={`status-indicator ${declaration.signature ? "confirmed" : "pending"}`}
                >
                  {declaration.signature ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  <span>{declaration.signature ? "Signed" : "Required"}</span>
                </div>
              </div>
            </div>

            <div className="declaration-card">
              <div className="card-header">
                <div className="card-icon">
                  <Calendar className="icon" />
                </div>
                <div className="card-badge">Declaration Date</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">
                  {getFormattedDate(declaration?.date)}
                </h4>
                <p className="card-description">
                  Date and time when the declaration was submitted
                </p>
              </div>
              <div className="card-status">
                <div className="status-indicator neutral">
                  <Calendar size={14} />
                  <span>Recorded</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="legal-notice">
          <div className="notice-content">
            <div className="notice-icon">
              <Shield className="icon" />
            </div>
            <div className="notice-text">
              <h4 className="notice-title">Legal Declaration Notice</h4>
              <p className="notice-description">
                This declaration constitutes a legal commitment. Any false or
                misleading information may result in the rejection of your
                application or subsequent disciplinary action. All declarations
                are recorded and stored in accordance with data protection
                regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Declaration Summary */}
        <div className="declaration-summary">
          <div className="summary-header">
            <h4 className="summary-title">Declaration Summary</h4>
            <div
              className={`summary-status ${isFullyDeclared ? "complete" : "incomplete"}`}
            >
              {isFullyDeclared ? "Complete" : "Incomplete"}
            </div>
          </div>
          <div className="summary-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${isFullyDeclared ? "100" : "50"}%` }}
              ></div>
            </div>
            <div className="progress-stats">
              <span className="progress-text">
                {isFullyDeclared
                  ? "All declarations completed"
                  : "Declaration in progress"}
              </span>
              <span className="progress-percentage">
                {isFullyDeclared ? "100%" : "50%"}
              </span>
            </div>
          </div>
          <div className="summary-actions">
            {!isFullyDeclared && (
              <>
                <button className="action-btn primary">
                  Complete Declaration
                </button>
                <button className="action-btn secondary">Review Terms</button>
              </>
            )}
            {isFullyDeclared && (
              <button className="action-btn success">
                <CheckCircle size={16} />
                <span>Declaration Complete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .declaration-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        /* Hero Header */
        .declaration-hero {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(5, 150, 105, 0.3);
          color: white;
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .hero-avatar {
          flex-shrink: 0;
        }

        .avatar-background {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-icon {
          width: 48px;
          height: 48px;
          color: white;
        }

        .hero-text {
          flex: 1;
        }

        .hero-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 16px;
          margin: 0 0 20px 0;
          opacity: 0.9;
          font-weight: 400;
        }

        .hero-badges {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .status-badge,
        .verification-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .status-badge.completed {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .status-badge.pending {
          background: rgba(245, 158, 11, 0.2);
          color: white;
        }

        .verification-badge {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
        }

        .hero-decoration {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          overflow: hidden;
          z-index: 1;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .circle-1 {
          width: 120px;
          height: 120px;
          top: -40px;
          right: -40px;
        }

        .circle-2 {
          width: 80px;
          height: 80px;
          bottom: -20px;
          right: 80px;
        }

        /* Status Overview */
        .status-overview {
          margin-bottom: 32px;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .status-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .status-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .status-card.confirmed {
          border-left: 4px solid #10b981;
        }

        .status-card.pending {
          border-left: 4px solid #f59e0b;
        }

        .status-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .status-card.confirmed .status-icon {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .status-card.pending .status-icon {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #d97706;
        }

        .status-icon .icon {
          width: 24px;
          height: 24px;
        }

        .status-content {
          flex: 1;
        }

        .status-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .status-value {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .status-description {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .declaration-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Declaration Section */
        .declaration-section {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
        }

        .section-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 32px;
        }

        .section-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-icon.primary {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
        }

        .section-icon .icon {
          width: 24px;
          height: 24px;
        }

        .section-text {
          flex: 1;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .section-description {
          font-size: 16px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Declaration Cards */
        .declaration-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .declaration-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
          position: relative;
        }

        .declaration-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .declaration-card.highlight {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 1px solid #0ea5e9;
        }

        .declaration-card.signature-card {
          grid-column: 1 / -1;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-icon .icon {
          width: 20px;
          height: 20px;
          color: #64748b;
        }

        .declaration-card.highlight .card-icon {
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
        }

        .declaration-card.highlight .card-icon .icon {
          color: white;
        }

        .card-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #f1f5f9;
          color: #64748b;
        }

        .card-badge.primary {
          background: #0ea5e9;
          color: white;
        }

        .card-badge.success {
          background: #10b981;
          color: white;
        }

        .card-content {
          margin-bottom: 20px;
        }

        .card-value {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .declaration-card.highlight .card-value {
          color: #0c4a6e;
        }

        .card-description {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Signature Display */
        .signature-display {
          text-align: center;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border: 2px dashed #e2e8f0;
          margin-bottom: 16px;
        }

        .signature-value {
          font-family: "Dancing Script", "Brush Script MT", cursive;
          font-size: 2rem;
          font-weight: 600;
          color: #1e40af;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .signature-value::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 20%;
          width: 60%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
        }

        .signature-label {
          font-size: 12px;
          color: #64748b;
          margin: 8px 0 0 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .signature-missing {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #dc2626;
          font-weight: 600;
        }

        .missing-icon {
          width: 20px;
          height: 20px;
        }

        .card-status {
          display: flex;
          justify-content: flex-end;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-indicator.confirmed {
          background: #d1fae5;
          color: #065f46;
        }

        .status-indicator.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-indicator.neutral {
          background: #e0e7ff;
          color: #3730a3;
        }

        /* Legal Notice */
        .legal-notice {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #fcd34d;
        }

        .notice-content {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .notice-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #d97706;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notice-icon .icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        .notice-text {
          flex: 1;
        }

        .notice-title {
          font-size: 18px;
          font-weight: 600;
          color: #92400e;
          margin: 0 0 8px 0;
        }

        .notice-description {
          font-size: 14px;
          color: #92400e;
          margin: 0;
          line-height: 1.5;
        }

        /* Declaration Summary */
        .declaration-summary {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
        }

        .summary-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .summary-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .summary-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .summary-status.complete {
          background: #d1fae5;
          color: #065f46;
        }

        .summary-status.incomplete {
          background: #fef3c7;
          color: #92400e;
        }

        .summary-progress {
          margin-bottom: 20px;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #059669);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .progress-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-text {
          font-size: 14px;
          color: #64748b;
        }

        .progress-percentage {
          font-size: 14px;
          font-weight: 600;
          color: #059669;
        }

        .summary-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn.primary {
          background: #3b82f6;
          color: white;
        }

        .action-btn.primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .action-btn.secondary {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .action-btn.secondary:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .action-btn.success {
          background: #10b981;
          color: white;
        }

        .action-btn.success:hover {
          background: #059669;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .declaration-cards {
            grid-template-columns: 1fr;
          }

          .overview-cards {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .declaration-container {
            padding: 16px;
          }

          .declaration-hero {
            padding: 32px 24px;
            border-radius: 16px;
          }

          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .avatar-background {
            width: 80px;
            height: 80px;
          }

          .hero-title {
            font-size: 24px;
          }

          .declaration-section {
            padding: 24px;
            border-radius: 16px;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .notice-content {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .summary-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .declaration-hero {
            padding: 24px 20px;
          }

          .hero-title {
            font-size: 22px;
          }

          .declaration-section {
            padding: 20px;
          }

          .declaration-card {
            padding: 20px;
          }

          .signature-value {
            font-size: 1.5rem;
          }

          .overview-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DeclarationTab;
