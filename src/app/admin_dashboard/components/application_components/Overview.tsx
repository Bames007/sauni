import React from "react";
import {
  CheckCircle,
  BookOpen,
  Calendar,
  User,
  Mail,
  Phone,
  Award,
  Clock,
  Target,
} from "lucide-react";
import { ApplicationData } from "../type";

const OverviewTab: React.FC<{
  application: ApplicationData;
  formatDate: (dateString: string) => string;
}> = ({ application, formatDate }) => {
  const programName =
    typeof application.programSelection.firstChoice === "string"
      ? application.programSelection.firstChoice
      : application.programSelection.firstChoice.name;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
      case "under_review":
        return "status-review";
      case "approved":
      case "accepted":
        return "status-approved";
      case "rejected":
      case "cancelled":
        return "status-rejected";
      default:
        return "status-default";
    }
  };

  return (
    <div className="overview-container">
      {/* Hero Header */}
      <div className="overview-hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <div className="avatar-background">
              <Award className="avatar-icon" />
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Application Overview</h1>
            <p className="hero-subtitle">
              Complete summary of your application status and details
            </p>
            <div className="hero-badges">
              <div
                className={`status-badge ${getStatusColor(application.status)}`}
              >
                <CheckCircle size={14} />
                <span>{application.status.replace("_", " ")}</span>
              </div>
              <div className="date-badge">
                <Calendar size={14} />
                <span>Applied {formatDate(application.submittedAt)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <BookOpen className="icon" />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{programName}</h3>
            <p className="stat-label">Program Choice</p>
          </div>
          <div className="stat-badge">First Choice</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">
            <User className="icon" />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">
              {application.personalInfo.firstName}{" "}
              {application.personalInfo.lastName}
            </h3>
            <p className="stat-label">Applicant Name</p>
          </div>
        </div>

        <div className="stat-card tertiary">
          <div className="stat-icon">
            <Calendar className="icon" />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">
              {application.programSelection.entryYear}
            </h3>
            <p className="stat-label">Entry Year</p>
            <p className="stat-detail">
              {application.programSelection.semester}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Information Sections */}
      <div className="overview-content">
        {/* Application Status Section */}
        <div className="info-section">
          <div className="section-header">
            <div className="section-icon primary">
              <Target className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Application Status</h3>
              <p className="section-description">
                Current status and timeline of your application
              </p>
            </div>
          </div>

          <div className="status-timeline">
            <div className="timeline-item completed">
              <div className="timeline-marker">
                <CheckCircle className="marker-icon" />
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">Application Submitted</h4>
                <p className="timeline-date">
                  {formatDate(application.submittedAt)}
                </p>
                <p className="timeline-description">
                  Your application has been successfully submitted and is now in
                  review.
                </p>
              </div>
            </div>

            <div className="timeline-item current">
              <div className="timeline-marker">
                <Clock className="marker-icon" />
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">Under Review</h4>
                <p className="timeline-date">In Progress</p>
                <p className="timeline-description">
                  Admissions team is currently reviewing your application and
                  documents.
                </p>
              </div>
            </div>

            <div className="timeline-item upcoming">
              <div className="timeline-marker">
                <Award className="marker-icon" />
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">Decision</h4>
                <p className="timeline-date">Pending</p>
                <p className="timeline-description">
                  Final decision will be communicated upon completion of review.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Information Section */}
        <div className="info-section">
          <div className="section-header">
            <div className="section-icon secondary">
              <User className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Quick Information</h3>
              <p className="section-description">
                Essential application details at a glance
              </p>
            </div>
          </div>

          <div className="quick-info-grid">
            <div className="quick-info-card">
              <div className="quick-info-header">
                <User className="quick-info-icon" />
                <span className="quick-info-label">Full Name</span>
              </div>
              <p className="quick-info-value">
                {application.personalInfo.firstName}{" "}
                {application.personalInfo.middleName}{" "}
                {application.personalInfo.lastName}
              </p>
            </div>

            <div className="quick-info-card">
              <div className="quick-info-header">
                <BookOpen className="quick-info-icon" />
                <span className="quick-info-label">Program</span>
              </div>
              <p className="quick-info-value">{programName}</p>
            </div>

            <div className="quick-info-card">
              <div className="quick-info-header">
                <Mail className="quick-info-icon" />
                <span className="quick-info-label">Email</span>
              </div>
              <p className="quick-info-value">
                {application.contactInfo.email}
              </p>
            </div>

            <div className="quick-info-card">
              <div className="quick-info-header">
                <Phone className="quick-info-icon" />
                <span className="quick-info-label">Phone</span>
              </div>
              <p className="quick-info-value">
                {application.contactInfo.phone}
              </p>
            </div>

            <div className="quick-info-card">
              <div className="quick-info-header">
                <Calendar className="quick-info-icon" />
                <span className="quick-info-label">Application Date</span>
              </div>
              <p className="quick-info-value">
                {formatDate(application.submittedAt)}
              </p>
            </div>

            <div className="quick-info-card">
              <div className="quick-info-header">
                <Target className="quick-info-icon" />
                <span className="quick-info-label">Study Mode</span>
              </div>
              <p className="quick-info-value">
                {application.programSelection.modeOfStudy}
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="info-section highlight">
          <div className="section-header">
            <div className="section-icon tertiary">
              <Award className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Next Steps</h3>
              <p className="section-description">
                What to expect in the application process
              </p>
            </div>
          </div>

          <div className="next-steps">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Document Verification</h4>
                <p className="step-description">
                  Your submitted documents are being verified for authenticity.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Academic Review</h4>
                <p className="step-description">
                  Academic qualifications are being assessed for program
                  eligibility.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Final Decision</h4>
                <p className="step-description">
                  Admission decision will be communicated via email and portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overview-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        /* Hero Header */
        .overview-hero {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
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

        .status-badge {
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

        .status-badge.status-review {
          background: rgba(245, 158, 11, 0.2);
          color: white;
        }

        .status-badge.status-approved {
          background: rgba(16, 185, 129, 0.2);
          color: white;
        }

        .status-badge.status-rejected {
          background: rgba(239, 68, 68, 0.2);
          color: white;
        }

        .status-badge.status-default {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .date-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
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

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .stat-card.primary {
          border-top: 4px solid #3b82f6;
        }

        .stat-card.secondary {
          border-top: 4px solid #8b5cf6;
        }

        .stat-card.tertiary {
          border-top: 4px solid #10b981;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .stat-card.primary .stat-icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }

        .stat-card.secondary .stat-icon {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .stat-card.tertiary .stat-icon {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .stat-icon .icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .stat-label {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 4px 0;
        }

        .stat-detail {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }

        .stat-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 8px;
          background: #3b82f6;
          color: white;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .overview-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Info Section */
        .info-section {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }

        .info-section:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .info-section.highlight {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 1px solid #0ea5e9;
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
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .section-icon.secondary {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
        }

        .section-icon.tertiary {
          background: linear-gradient(135deg, #10b981, #059669);
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

        /* Status Timeline */
        .status-timeline {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .timeline-item {
          display: flex;
          gap: 16px;
          position: relative;
        }

        .timeline-item:not(:last-child)::after {
          content: "";
          position: absolute;
          left: 20px;
          top: 48px;
          bottom: -28px;
          width: 2px;
          background: #e2e8f0;
        }

        .timeline-marker {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 2;
        }

        .timeline-item.completed .timeline-marker {
          background: #10b981;
          color: white;
        }

        .timeline-item.current .timeline-marker {
          background: #3b82f6;
          color: white;
          animation: pulse 2s infinite;
        }

        .timeline-item.upcoming .timeline-marker {
          background: #f1f5f9;
          color: #64748b;
          border: 2px solid #e2e8f0;
        }

        .marker-icon {
          width: 18px;
          height: 18px;
        }

        .timeline-content {
          flex: 1;
          padding-top: 4px;
        }

        .timeline-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .timeline-date {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 8px 0;
          font-weight: 500;
        }

        .timeline-description {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Quick Info Grid */
        .quick-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .quick-info-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }

        .quick-info-card:hover {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .quick-info-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .quick-info-icon {
          width: 16px;
          height: 16px;
          color: #64748b;
        }

        .quick-info-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .quick-info-value {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          margin: 0;
          line-height: 1.4;
        }

        /* Next Steps */
        .next-steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .step-description {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .quick-info-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .overview-container {
            padding: 16px;
          }

          .overview-hero {
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

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .info-section {
            padding: 24px;
            border-radius: 16px;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .quick-info-grid {
            grid-template-columns: 1fr;
          }

          .timeline-item:not(:last-child)::after {
            left: 19px;
          }
        }

        @media (max-width: 480px) {
          .overview-hero {
            padding: 24px 20px;
          }

          .hero-title {
            font-size: 22px;
          }

          .info-section {
            padding: 20px;
          }

          .stat-card {
            padding: 20px;
          }

          .quick-info-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default OverviewTab;
