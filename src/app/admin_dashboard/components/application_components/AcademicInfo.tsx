import React from "react";
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  Layers,
  Target,
  Award,
  ChevronRight,
} from "lucide-react";
import { ApplicationData } from "../type";

const AcademicInfoTab: React.FC<{ application: ApplicationData }> = ({
  application,
}) => {
  const firstChoiceProgram =
    typeof application.programSelection.firstChoice === "string"
      ? application.programSelection.firstChoice
      : application.programSelection.firstChoice.name;

  const secondChoiceProgram =
    typeof application.programSelection.secondChoice === "string"
      ? application.programSelection.secondChoice
      : application.programSelection.secondChoice.name;

  return (
    <div className="academic-info-container">
      {/* Hero Header */}
      <div className="academic-hero">
        <div className="hero-content">
          <div className="hero-icon">
            <GraduationCap className="icon" />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Academic Information</h1>
            <p className="hero-subtitle">
              Program selections and academic background for your application
            </p>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
        </div>
      </div>

      <div className="academic-content">
        {/* Program Selection Section */}
        <div className="academic-section">
          <div className="section-header">
            <div className="section-icon primary">
              <Target className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Program Selection</h3>
              <p className="section-description">
                Your preferred programs and study preferences
              </p>
            </div>
          </div>

          <div className="program-cards">
            <div className="program-card primary">
              <div className="program-card-header">
                <div className="program-badge primary">
                  <Award size={14} />
                  <span>First Choice</span>
                </div>
                <div className="program-priority">Priority 1</div>
              </div>
              <div className="program-content">
                <BookOpen className="program-icon" />
                <h4 className="program-name">{firstChoiceProgram}</h4>
                <p className="program-description">
                  Primary program selection for your academic journey
                </p>
              </div>
              <div className="program-footer">
                <div className="program-status">
                  <div className="status-dot active"></div>
                  <span>Under Review</span>
                </div>
                <ChevronRight className="chevron" />
              </div>
            </div>

            <div className="program-card secondary">
              <div className="program-card-header">
                <div className="program-badge secondary">
                  <Target size={14} />
                  <span>Second Choice</span>
                </div>
                <div className="program-priority">Priority 2</div>
              </div>
              <div className="program-content">
                <BookOpen className="program-icon" />
                <h4 className="program-name">{secondChoiceProgram}</h4>
                <p className="program-description">
                  Alternative program selection if first choice is unavailable
                </p>
              </div>
              <div className="program-footer">
                <div className="program-status">
                  <div className="status-dot"></div>
                  <span>Backup Option</span>
                </div>
                <ChevronRight className="chevron" />
              </div>
            </div>
          </div>

          {/* Program Details Grid */}
          <div className="program-details">
            <h4 className="details-title">Program Details</h4>
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <Calendar className="icon" />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Entry Year</span>
                  <span className="detail-value">
                    {application.programSelection.entryYear.toString()}
                  </span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">
                  <Layers className="icon" />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Semester</span>
                  <span className="detail-value">
                    {application.programSelection.semester}
                  </span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">
                  <Clock className="icon" />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Study Mode</span>
                  <span className="detail-value">
                    {application.programSelection.modeOfStudy}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic History Section */}
        <div className="academic-section">
          <div className="section-header">
            <div className="section-icon secondary">
              <GraduationCap className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Academic History</h3>
              <p className="section-description">
                Educational background and qualifications review
              </p>
            </div>
          </div>

          <div className="academic-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">
                <div className="icon-background">
                  <GraduationCap className="icon" />
                </div>
              </div>
              <div className="placeholder-text">
                <h4 className="placeholder-title">
                  Academic Records Processing
                </h4>
                <p className="placeholder-description">
                  Your academic records and qualifications are currently being
                  reviewed by our admissions team. This process ensures your
                  eligibility for the selected programs.
                </p>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-info">
                <span className="progress-label">Review Progress</span>
                <span className="progress-percentage">60%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "60%" }}></div>
              </div>
              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-number">2/3</span>
                  <span className="stat-label">Documents Verified</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1</span>
                  <span className="stat-label">Qualifications Checked</span>
                </div>
              </div>
            </div>

            <div className="placeholder-actions">
              <button className="action-btn primary">
                View Uploaded Documents
              </button>
              <button className="action-btn secondary">
                Contact Admissions
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .academic-info-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        /* Hero Header */
        .academic-hero {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(79, 70, 229, 0.2);
          color: white;
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-icon .icon {
          width: 40px;
          height: 40px;
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
          margin: 0;
          opacity: 0.9;
          font-weight: 400;
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

        .academic-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Academic Section */
        .academic-section {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }

        .academic-section:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
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
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
        }

        .section-icon.secondary {
          background: linear-gradient(135deg, #f59e0b, #d97706);
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

        /* Program Cards */
        .program-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .program-card {
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid;
          cursor: pointer;
        }

        .program-card.primary {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-color: #0ea5e9;
        }

        .program-card.secondary {
          background: linear-gradient(135deg, #fef7cd 0%, #fef3c7 100%);
          border-color: #f59e0b;
        }

        .program-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .program-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .program-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .program-badge.primary {
          background: #0ea5e9;
          color: white;
        }

        .program-badge.secondary {
          background: #f59e0b;
          color: white;
        }

        .program-priority {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 6px;
        }

        .program-content {
          margin-bottom: 20px;
        }

        .program-icon {
          width: 48px;
          height: 48px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .program-name {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .program-description {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        .program-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .program-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #94a3b8;
        }

        .status-dot.active {
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .chevron {
          width: 16px;
          height: 16px;
          color: #94a3b8;
        }

        /* Program Details */
        .program-details {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
        }

        .details-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 20px 0;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .detail-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .detail-icon .icon {
          width: 18px;
          height: 18px;
          color: #64748b;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        /* Academic Placeholder */
        .academic-placeholder {
          background: #f8fafc;
          border-radius: 16px;
          padding: 40px;
          border: 2px dashed #d1d5db;
          text-align: center;
        }

        .placeholder-content {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
          text-align: left;
        }

        .placeholder-icon {
          flex-shrink: 0;
        }

        .icon-background {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-background .icon {
          width: 32px;
          height: 32px;
          color: white;
        }

        .placeholder-text {
          flex: 1;
        }

        .placeholder-title {
          font-size: 20px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 8px 0;
        }

        .placeholder-description {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          line-height: 1.6;
        }

        .progress-section {
          max-width: 400px;
          margin: 0 auto 32px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .progress-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .progress-percentage {
          font-size: 14px;
          font-weight: 600;
          color: #059669;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
          transition: width 0.5s ease;
          position: relative;
        }

        .progress-fill::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progress-stats {
          display: flex;
          gap: 24px;
          justify-content: center;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        .placeholder-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-btn {
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

        /* Responsive Design */
        @media (max-width: 1024px) {
          .program-cards {
            grid-template-columns: 1fr;
          }

          .details-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .academic-info-container {
            padding: 16px;
          }

          .academic-hero {
            padding: 32px 24px;
            border-radius: 16px;
          }

          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .hero-icon {
            width: 64px;
            height: 64px;
          }

          .hero-title {
            font-size: 24px;
          }

          .academic-section {
            padding: 24px;
            border-radius: 16px;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .placeholder-content {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .progress-stats {
            flex-direction: column;
            gap: 16px;
          }

          .placeholder-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .academic-hero {
            padding: 24px 20px;
          }

          .hero-title {
            font-size: 22px;
          }

          .academic-section {
            padding: 20px;
          }

          .program-card {
            padding: 20px;
          }

          .program-name {
            font-size: 18px;
          }

          .academic-placeholder {
            padding: 24px;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AcademicInfoTab;
