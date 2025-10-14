import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Building,
  Globe,
  Map,
  Heart,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Shield,
  MessageCircle,
  Home,
} from "lucide-react";
import { ApplicationData } from "../type";

const ContactInfoTab: React.FC<{ application: ApplicationData }> = ({
  application,
}) => {
  const contactInfo = application.contactInfo;

  return (
    <div className="contact-info-container">
      {/* Hero Header */}
      <div className="contact-hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <div className="avatar-background">
              <MessageCircle className="avatar-icon" />
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">Contact Information</h1>
            <p className="hero-subtitle">
              Complete contact details and communication channels
            </p>
            <div className="hero-badges">
              <div className="badge primary">
                <Shield size={14} />
                <span>Verified Contact</span>
              </div>
              <div className="badge secondary">
                <Mail size={14} />
                <span>Primary: {contactInfo.email}</span>
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

      <div className="contact-content">
        {/* Personal Contact Section */}
        <div className="contact-section">
          <div className="section-header">
            <div className="section-icon primary">
              <MailIcon className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Personal Contact Details</h3>
              <p className="section-description">
                Primary communication channels and location information
              </p>
            </div>
          </div>

          <div className="contact-cards-grid">
            <div className="contact-card highlight">
              <div className="card-header">
                <div className="card-icon">
                  <Mail className="icon" />
                </div>
                <div className="card-badge primary">Primary Email</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">{contactInfo.email}</h4>
                <p className="card-description">Main communication channel</p>
              </div>
              <div className="card-actions">
                <button className="action-btn">
                  <Mail size={14} />
                  <span>Send Email</span>
                </button>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-header">
                <div className="card-icon">
                  <Phone className="icon" />
                </div>
                <div className="card-badge">Phone Number</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">{contactInfo.phone}</h4>
                <p className="card-description">Direct contact number</p>
              </div>
              <div className="card-actions">
                <button className="action-btn">
                  <Phone size={14} />
                  <span>Call</span>
                </button>
              </div>
            </div>

            <div className="contact-card address-card">
              <div className="card-header">
                <div className="card-icon">
                  <Home className="icon" />
                </div>
                <div className="card-badge">Full Address</div>
              </div>
              <div className="card-content">
                <h4 className="card-value">{contactInfo.address}</h4>
                <div className="address-details">
                  <span className="address-city">{contactInfo.city}</span>
                  <span className="address-separator">•</span>
                  <span className="address-state">{contactInfo.state}</span>
                  <span className="address-separator">•</span>
                  <span className="address-zip">{contactInfo.zipCode}</span>
                </div>
                <p className="card-description">{contactInfo.country}</p>
              </div>
              <div className="card-actions">
                <button className="action-btn">
                  <MapPin size={14} />
                  <span>View Map</span>
                </button>
              </div>
            </div>
          </div>

          {/* Location Details Grid */}
          <div className="location-grid">
            <div className="location-item">
              <div className="location-icon">
                <Building className="icon" />
              </div>
              <div className="location-content">
                <span className="location-label">City</span>
                <span className="location-value">{contactInfo.city}</span>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon">
                <Map className="icon" />
              </div>
              <div className="location-content">
                <span className="location-label">State/Province</span>
                <span className="location-value">{contactInfo.state}</span>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon">
                <MapPin className="icon" />
              </div>
              <div className="location-content">
                <span className="location-label">ZIP/Postal Code</span>
                <span className="location-value">{contactInfo.zipCode}</span>
              </div>
            </div>

            <div className="location-item">
              <div className="location-icon">
                <Globe className="icon" />
              </div>
              <div className="location-content">
                <span className="location-label">Country</span>
                <span className="location-value">{contactInfo.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guardian Information Section */}
        <div className="contact-section">
          <div className="section-header">
            <div className="section-icon secondary">
              <User className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Guardian & Emergency Contact</h3>
              <p className="section-description">
                Emergency contact person and guardian details
              </p>
            </div>
          </div>

          <div className="guardian-profile">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-background">
                  <User className="avatar-icon" />
                </div>
              </div>
              <div className="profile-info">
                <h4 className="profile-name">
                  {contactInfo.guardianContact.fullName}
                </h4>
                <p className="profile-relationship">
                  {contactInfo.guardianContact.relationship}
                </p>
                <div className="profile-badges">
                  <div className="relationship-badge">
                    <Heart size={12} />
                    <span>{contactInfo.guardianContact.relationship}</span>
                  </div>
                  <div className="contact-badge">
                    <Shield size={12} />
                    <span>Emergency Contact</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="guardian-contact-grid">
              <div className="contact-method">
                <div className="method-icon">
                  <PhoneIcon className="icon" />
                </div>
                <div className="method-content">
                  <span className="method-label">Phone Number</span>
                  <span className="method-value">
                    {contactInfo.guardianContact.phone}
                  </span>
                </div>
                <button className="method-action">
                  <Phone size={14} />
                </button>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Mail className="icon" />
                </div>
                <div className="method-content">
                  <span className="method-label">Email Address</span>
                  <span className="method-value">
                    {contactInfo.guardianContact.email}
                  </span>
                </div>
                <button className="method-action">
                  <Mail size={14} />
                </button>
              </div>
            </div>

            <div className="emergency-notice">
              <div className="notice-icon">
                <Shield className="icon" />
              </div>
              <div className="notice-content">
                <h5 className="notice-title">Emergency Contact</h5>
                <p className="notice-description">
                  This person will be contacted in case of emergencies or
                  important updates regarding your application.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="contact-section highlight">
          <div className="section-header">
            <div className="section-icon tertiary">
              <MessageCircle className="icon" />
            </div>
            <div className="section-text">
              <h3 className="section-title">Communication Preferences</h3>
              <p className="section-description">
                How we'll communicate important updates about your application
              </p>
            </div>
          </div>

          <div className="preferences-list">
            <div className="preference-item">
              <div className="preference-icon">
                <Mail className="icon" />
              </div>
              <div className="preference-content">
                <h5 className="preference-title">Email Notifications</h5>
                <p className="preference-description">
                  Important updates and application status changes will be sent
                  to your primary email address.
                </p>
              </div>
              <div className="preference-status active">
                <span>Active</span>
              </div>
            </div>

            <div className="preference-item">
              <div className="preference-icon">
                <Phone className="icon" />
              </div>
              <div className="preference-content">
                <h5 className="preference-title">SMS Alerts</h5>
                <p className="preference-description">
                  Urgent notifications and reminders via SMS to your registered
                  phone number.
                </p>
              </div>
              <div className="preference-status active">
                <span>Active</span>
              </div>
            </div>

            <div className="preference-item">
              <div className="preference-icon">
                <MessageCircle className="icon" />
              </div>
              <div className="preference-content">
                <h5 className="preference-title">Portal Updates</h5>
                <p className="preference-description">
                  Real-time application status and document updates available in
                  your student portal.
                </p>
              </div>
              <div className="preference-status active">
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-info-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        /* Hero Header */
        .contact-hero {
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

        .contact-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Contact Section */
        .contact-section {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }

        .contact-section:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .contact-section.highlight {
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

        /* Contact Cards Grid */
        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .contact-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-color: #e2e8f0;
        }

        .contact-card:hover::before {
          transform: scaleX(1);
        }

        .contact-card.highlight {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 1px solid #0ea5e9;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.15);
        }

        .contact-card.highlight::before {
          background: linear-gradient(90deg, #0ea5e9, #0369a1);
          transform: scaleX(1);
        }

        .address-card {
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

        .contact-card.highlight .card-icon {
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
        }

        .contact-card.highlight .card-icon .icon {
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
          background: #3b82f6;
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
          line-height: 1.3;
        }

        .contact-card.highlight .card-value {
          color: #0c4a6e;
        }

        .address-details {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .address-city,
        .address-state,
        .address-zip {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        .address-separator {
          color: #cbd5e1;
        }

        .card-description {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }

        .card-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          background: #3b82f6;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        /* Location Grid */
        .location-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .location-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .location-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .location-icon .icon {
          width: 18px;
          height: 18px;
          color: #64748b;
        }

        .location-content {
          display: flex;
          flex-direction: column;
        }

        .location-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .location-value {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        /* Guardian Profile */
        .guardian-profile {
          background: #f8fafc;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid #e2e8f0;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .profile-avatar {
          flex-shrink: 0;
        }

        .profile-avatar .avatar-background {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-avatar .avatar-icon {
          width: 32px;
          height: 32px;
          color: white;
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .profile-relationship {
          font-size: 16px;
          color: #64748b;
          margin: 0 0 12px 0;
        }

        .profile-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .relationship-badge,
        .contact-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
        }

        .relationship-badge {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .contact-badge {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .guardian-contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .method-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .method-icon .icon {
          width: 18px;
          height: 18px;
          color: #64748b;
        }

        .method-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .method-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .method-value {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .method-action {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #3b82f6;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .method-action:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .emergency-notice {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #fef3c7;
          border-radius: 12px;
          border: 1px solid #fcd34d;
        }

        .notice-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f59e0b;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notice-icon .icon {
          width: 20px;
          height: 20px;
          color: white;
        }

        .notice-content {
          flex: 1;
        }

        .notice-title {
          font-size: 16px;
          font-weight: 600;
          color: #92400e;
          margin: 0 0 4px 0;
        }

        .notice-description {
          font-size: 14px;
          color: #92400e;
          margin: 0;
          line-height: 1.5;
        }

        /* Preferences List */
        .preferences-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .preference-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .preference-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #10b981, #059669);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .preference-icon .icon {
          width: 20px;
          height: 20px;
          color: white;
        }

        .preference-content {
          flex: 1;
        }

        .preference-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .preference-description {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        .preference-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .preference-status.active {
          background: #d1fae5;
          color: #065f46;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .contact-cards-grid {
            grid-template-columns: 1fr;
          }

          .location-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .contact-info-container {
            padding: 16px;
          }

          .contact-hero {
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

          .contact-section {
            padding: 24px;
            border-radius: 16px;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .guardian-contact-grid {
            grid-template-columns: 1fr;
          }

          .preference-item {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .contact-hero {
            padding: 24px 20px;
          }

          .hero-title {
            font-size: 22px;
          }

          .contact-section {
            padding: 20px;
          }

          .contact-card {
            padding: 20px;
          }

          .guardian-profile {
            padding: 24px;
          }

          .location-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactInfoTab;
