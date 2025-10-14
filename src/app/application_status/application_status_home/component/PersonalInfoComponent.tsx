import React from "react";
import { User, Calendar, Map, MapPin, Home } from "lucide-react";

interface PersonalInfo {
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
}

interface PersonalInfoProps {
  personalInfo: PersonalInfo;
  fullName: string;
  age: number;
}

const PersonalInformation: React.FC<PersonalInfoProps> = ({
  personalInfo,
  fullName,
  age,
}) => {
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
      backgroundColor: "#017840",
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
      transition: "all 0.2s ease",
    },
    infoFieldHighlight: {
      backgroundColor: "#01784008",
      borderColor: "#01784020",
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
  };

  const personalFields = [
    { label: "Full Name", value: fullName, icon: <User size={14} /> },
    {
      label: "Date of Birth",
      value: new Date(personalInfo.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      icon: <Calendar size={14} />,
    },
    { label: "Age", value: `${age} years`, icon: <User size={14} /> },
    { label: "Gender", value: personalInfo.gender, icon: <User size={14} /> },
    {
      label: "Nationality",
      value: personalInfo.isNigerian ? "Nigerian" : personalInfo.nationality,
      icon: <Map size={14} />,
      highlight: personalInfo.isNigerian,
    },
    {
      label: "State of Origin",
      value: personalInfo.stateOfOrigin,
      icon: <MapPin size={14} />,
    },
    {
      label: "Local Government",
      value: personalInfo.localGovernment,
      icon: <Map size={14} />,
    },
    {
      label: "Country of Residence",
      value: personalInfo.countryOfResidence || "Nigeria",
      icon: <Home size={14} />,
    },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        <span style={styles.dot}></span>
        Personal Information
      </h3>

      <div style={styles.grid}>
        {personalFields.map((field, index) => (
          <div
            key={index}
            style={{
              ...styles.infoField,
              ...(field.highlight ? styles.infoFieldHighlight : {}),
            }}
          >
            <p style={styles.label}>
              {field.icon} {field.label}
            </p>
            <p style={styles.value}>{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInformation;
