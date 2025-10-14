import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactAdmissions: React.FC = () => {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [buttonHovered, setButtonHovered] = React.useState(false);

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
    contactList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      marginBottom: "20px",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px",
      borderRadius: "8px",
      transition: "all 0.2s ease",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    },
    contactItemHover: {
      backgroundColor: "#f8f9fa",
    },
    iconContainer: {
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      backgroundColor: "#01784010",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    icon: {
      width: "16px",
      height: "16px",
      color: "#017840",
    },
    contactText: {
      flex: 1,
    },
    contactLabel: {
      fontSize: "12px",
      fontWeight: 500,
      color: "#666666",
      margin: "0 0 2px 0",
    },
    contactValue: {
      fontSize: "14px",
      fontWeight: 500,
      color: "#03070A",
      margin: 0,
    },
    button: {
      width: "100%",
      backgroundColor: "#017840",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginTop: "16px",
    },
    buttonHover: {
      backgroundColor: "#016035",
      transform: "translateY(-1px)",
    },
  };

  const contactItems = [
    {
      id: "email",
      icon: <Mail style={styles.icon} />,
      label: "Email",
      value: "admissions@sauni.edu",
      link: "mailto:admissions@sauni.edu",
    },
    {
      id: "phone",
      icon: <Phone style={styles.icon} />,
      label: "Phone",
      value: "+2348127728084",
      link: "tel:+2348127728084",
    },
    {
      id: "address",
      icon: <MapPin style={styles.icon} />,
      label: "Address",
      value: "Southern Atlantic University, Uyo, Akwa Ibom, Nigeria",
      link: "https://maps.google.com",
    },
    {
      id: "hours",
      icon: <Clock style={styles.icon} />,
      label: "Office Hours",
      value: "Mon-Fri, 9:00 AM - 5:00 PM",
      link: null,
    },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        <span style={styles.dot}></span>
        Contact Admissions
      </h3>

      <div style={styles.contactList}>
        {contactItems.map((item) => (
          <a
            key={item.id}
            href={item.link || undefined}
            style={{
              ...styles.contactItem,
              ...(hoveredItem === item.id ? styles.contactItemHover : {}),
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={!item.link ? (e) => e.preventDefault() : undefined}
          >
            <div style={styles.iconContainer}>{item.icon}</div>
            <div style={styles.contactText}>
              <p style={styles.contactLabel}>{item.label}</p>
              <p style={styles.contactValue}>{item.value}</p>
            </div>
          </a>
        ))}
      </div>

      <button
        style={{
          ...styles.button,
          ...(buttonHovered ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      >
        Schedule a Campus Tour
      </button>
    </div>
  );
};

export default ContactAdmissions;
