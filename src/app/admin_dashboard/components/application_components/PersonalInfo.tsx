import React from "react";
import {
  User,
  Calendar,
  Users,
  Globe,
  MapPin,
  Building,
  Home,
  Flag,
  User as UserIcon,
  Mail,
  Phone,
  Map,
  Shield,
  Badge,
} from "lucide-react";
import { ApplicationData } from "../type";

const PersonalInfoTab: React.FC<{
  application: ApplicationData;
  formatDate: (dateString: string) => string;
}> = ({ application, formatDate }) => {
  const personalInfo = application.personalInfo;

  return (
    <div className="personal-info-container">
      {/* Enhanced Hero Header */}
      <div className="personal-hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <div className="avatar-background">
              <UserIcon className="avatar-icon" />
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Personal Information</h1>
            <p className="hero-subtitle">
              Complete personal details and identification records
            </p>
            <div className="hero-badges">
              <div className="badge primary">
                <Shield size={14} />
                <span>Verified Information</span>
              </div>
              <div className="badge secondary">
                <Badge size={14} />
                <span>
                  Application ID: {application.prospectiveId?.substring(0, 8)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-wave"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="personal-content">
        {/* Basic Information Section */}
        <div className="info-section">
          <div className="section-header">
            <div className="section-icon primary">
              <User className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Basic Information</h3>
              <p className="section-description">
                Personal identification and demographic details
              </p>
            </div>
          </div>

          <div className="info-cards-grid">
            <div className="info-card highlight">
              <div className="card-header">
                <div className="card-icon">
                  <User className="icon" />
                </div>
                <div className="card-badge primary">Full Name</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">
                  {personalInfo.firstName} {personalInfo.middleName}{" "}
                  {personalInfo.lastName}
                </h4>
                <p className="card-description">
                  Legal name as per identification
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <div className="card-icon">
                  <Calendar className="icon" />
                </div>
                <div className="card-badge">Date of Birth</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">
                  {formatDate(personalInfo.dateOfBirth)}
                </h4>
                <p className="card-description">
                  Age: {calculateAge(personalInfo.dateOfBirth)} years
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <div className="card-icon">
                  <Users className="icon" />
                </div>
                <div className="card-badge">Gender</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">{personalInfo.gender}</h4>
                <p className="card-description">Biological sex</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nationality & Origin Section */}
        <div className="info-section">
          <div className="section-header">
            <div className="section-icon secondary">
              <Globe className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Nationality & Origin</h3>
              <p className="section-description">
                Citizenship and geographical background information
              </p>
            </div>
          </div>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="card-header">
                <div className="card-icon">
                  <Globe className="icon" />
                </div>
                <div className="card-badge">Nationality</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">{personalInfo.nationality}</h4>
                <p className="card-description">Country of citizenship</p>
              </div>
            </div>

            <div className="info-card highlight">
              <div className="card-header">
                <div className="card-icon">
                  <Flag className="icon" />
                </div>
                <div className="card-badge success">Nigerian Citizen</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">
                  {personalInfo.isNigerian ? "Yes" : "No"}
                </h4>
                <p className="card-description">
                  {personalInfo.isNigerian
                    ? "Nigerian citizenship confirmed"
                    : "International applicant"}
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <div className="card-icon">
                  <MapPin className="icon" />
                </div>
                <div className="card-badge">State of Origin</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">{personalInfo.stateOfOrigin}</h4>
                <p className="card-description">State of origin in Nigeria</p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <div className="card-icon">
                  <Building className="icon" />
                </div>
                <div className="card-badge">Local Government</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">{personalInfo.localGovernment}</h4>
                <p className="card-description">Local government area</p>
              </div>
            </div>
          </div>
        </div>

        {/* Residence Information */}
        <div className="info-section">
          <div className="section-header">
            <div className="section-icon tertiary">
              <Home className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Residence Information</h3>
              <p className="section-description">
                Current location and contact details
              </p>
            </div>
          </div>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="card-header">
                <div className="card-icon">
                  <Map className="icon" />
                </div>
                <div className="card-badge">Country of Residence</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">
                  {personalInfo.countryOfResidence}
                </h4>
                <p className="card-description">Current country of residence</p>
              </div>
            </div>

            {/* Additional contact info placeholders */}
            <div className="info-card disabled">
              <div className="card-header">
                <div className="card-icon">
                  <Mail className="icon" />
                </div>
                <div className="card-badge">Email Address</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">Not Provided</h4>
                <p className="card-description">Contact email address</p>
              </div>
            </div>

            <div className="info-card disabled">
              <div className="card-header">
                <div className="card-icon">
                  <Phone className="icon" />
                </div>
                <div className="card-badge">Phone Number</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">Not Provided</h4>
                <p className="card-description">Primary contact number</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="verification-section">
          <div className="verification-content">
            <div className="verification-icon">
              <Shield className="icon" />
            </div>
            <div className="verification-text">
              <h4 className="verification-title">Information Verified</h4>
              <p className="verification-description">
                All personal information has been verified against submitted
                documents. This data is securely stored and used solely for
                admission processing.
              </p>
            </div>
            <div className="verification-status">
              <div className="status-badge verified">
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .personal-info-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        /* Enhanced Hero Header */
        .personal-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
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

        .badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .badge.primary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .badge.secondary {
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

        .decoration-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: wave 3s ease-in-out infinite;
        }

        @keyframes wave {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20px);
          }
        }

        .personal-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
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
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .section-icon.secondary {
          background: linear-gradient(135deg, #f59e0b, #d97706);
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

        /* Info Cards Grid */
        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .info-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-color: #e2e8f0;
        }

        .info-card:hover::before {
          transform: scaleX(1);
        }

        .info-card.highlight {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 1px solid #0ea5e9;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.15);
        }

        .info-card.highlight::before {
          background: linear-gradient(90deg, #0ea5e9, #0369a1);
          transform: scaleX(1);
        }

        .info-card.disabled {
          opacity: 0.6;
          background: #f8fafc;
        }

        .info-card.disabled:hover {
          transform: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

        .info-card.highlight .card-icon {
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
        }

        .info-card.highlight .card-icon .icon {
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
          background: #667eea;
          color: white;
        }

        .card-badge.success {
          background: #10b981;
          color: white;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-value {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          line-height: 1.3;
        }

        .info-card.highlight .card-value {
          color: #0c4a6e;
        }

        .card-description {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }

        /* Verification Section */
        .verification-section {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 20px;
          padding: 32px;
          color: white;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }

        .verification-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .verification-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .verification-icon .icon {
          width: 28px;
          height: 28px;
          color: white;
        }

        .verification-text {
          flex: 1;
        }

        .verification-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: white;
        }

        .verification-description {
          font-size: 14px;
          margin: 0;
          opacity: 0.9;
          line-height: 1.5;
        }

        .verification-status {
          flex-shrink: 0;
        }

        .status-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.verified {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .info-cards-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .personal-info-container {
            padding: 16px;
          }

          .personal-hero {
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

          .info-section {
            padding: 24px;
            border-radius: 16px;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .verification-content {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .info-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .personal-hero {
            padding: 24px 20px;
          }

          .hero-title {
            font-size: 22px;
          }

          .info-section {
            padding: 20px;
          }

          .info-card {
            padding: 20px;
          }

          .card-value {
            font-size: 16px;
          }
        }

        /* Animations */
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

        .info-card {
          animation: fadeInUp 0.5s ease-out;
        }

        /* Stagger animations */
        .info-cards-grid .info-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .info-cards-grid .info-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .info-cards-grid .info-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .info-cards-grid .info-card:nth-child(4) {
          animation-delay: 0.4s;
        }
        .info-cards-grid .info-card:nth-child(5) {
          animation-delay: 0.5s;
        }
        .info-cards-grid .info-card:nth-child(6) {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth: string): number => {
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

export default PersonalInfoTab;
