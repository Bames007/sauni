import React from "react";
import { Mail, Phone, MapPin, Map, Home, User, Heart } from "lucide-react";

interface ContactInfo {
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
}

interface ContactInfoProps {
  contactInfo: ContactInfo;
}

const ContactInformation: React.FC<ContactInfoProps> = ({ contactInfo }) => {
  const styles = {
    container: {
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(3, 7, 10, 0.08)",
      padding: "24px",
      border: "1px solid #f0f0f0",
    },
    title: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#03070A",
      margin: "0 0 20px 0",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    dot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#BD9946",
      borderRadius: "50%",
      flexShrink: 0,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
    },
    infoField: {
      padding: "16px",
      borderRadius: "8px",
      backgroundColor: "#f8f9fa",
      border: "1px solid #e9ecef",
    },
    label: {
      fontSize: "12px",
      fontWeight: 500,
      color: "#666666",
      margin: "0 0 4px 0",
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    value: {
      fontSize: "14px",
      fontWeight: 500,
      color: "#03070A",
      margin: 0,
      lineHeight: "1.4",
    },
    sectionDivider: {
      margin: "24px 0",
      paddingTop: "20px",
      borderTop: "2px solid #f0f0f0",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#03070A",
      margin: "0 0 16px 0",
    },
  };

  const contactFields = [
    { label: "Email", value: contactInfo.email, icon: <Mail size={14} /> },
    { label: "Phone", value: contactInfo.phone, icon: <Phone size={14} /> },
    {
      label: "Address",
      value: contactInfo.address,
      icon: <MapPin size={14} />,
    },
    { label: "City", value: contactInfo.city, icon: <Map size={14} /> },
    { label: "State", value: contactInfo.state, icon: <Map size={14} /> },
    { label: "Country", value: contactInfo.country, icon: <Home size={14} /> },
    {
      label: "Zip Code",
      value: contactInfo.zipCode,
      icon: <MapPin size={14} />,
    },
  ];

  const guardianFields = [
    {
      label: "Full Name",
      value: contactInfo.guardianContact.fullName,
      icon: <User size={14} />,
    },
    {
      label: "Relationship",
      value: contactInfo.guardianContact.relationship,
      icon: <Heart size={14} />,
    },
    {
      label: "Phone",
      value: contactInfo.guardianContact.phone,
      icon: <Phone size={14} />,
    },
    {
      label: "Email",
      value: contactInfo.guardianContact.email,
      icon: <Mail size={14} />,
    },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        <span style={styles.dot}></span>
        Contact Information
      </h3>

      <div style={styles.grid}>
        {contactFields.map((field, index) => (
          <div key={index} style={styles.infoField}>
            <p style={styles.label}>
              {field.icon} {field.label}
            </p>
            <p style={styles.value}>{field.value}</p>
          </div>
        ))}
      </div>

      <div style={styles.sectionDivider}>
        <h4 style={styles.sectionTitle}>Guardian Information</h4>
        <div style={styles.grid}>
          {guardianFields.map((field, index) => (
            <div key={index} style={styles.infoField}>
              <p style={styles.label}>
                {field.icon} {field.label}
              </p>
              <p style={styles.value}>{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
