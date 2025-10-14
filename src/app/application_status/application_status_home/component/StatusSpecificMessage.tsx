import React from "react";

interface StatusSpecificMessagesProps {
  status: string;
}

const StatusSpecificMessages: React.FC<StatusSpecificMessagesProps> = ({
  status,
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "under_review":
        return {
          icon: "🔍",
          title: "Application Under Review",
          description:
            "Your application is currently being reviewed by our admissions committee. This process typically takes 2-3 weeks. You will be notified immediately once a decision is made.",
          gradient: "linear-gradient(135deg, #fefaf0, #fdf6e7)",
          borderColor: "#BD9946",
          iconBg: "#BD9946",
          titleColor: "#8B6B2E",
          textColor: "#8B6B2E",
        };
      case "accepted":
        return {
          icon: "🎉",
          title: "Congratulations! You've Been Accepted!",
          description:
            "Welcome to SAUNI University! Your application has been accepted. Please complete your payment and review the next steps in your admission package.",
          gradient: "linear-gradient(135deg, #f0f9f4, #e8f5ee)",
          borderColor: "#017840",
          iconBg: "#017840",
          titleColor: "#015c30",
          textColor: "#015c30",
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig(status);
  if (!config) return null;

  const styles = {
    container: {
      marginTop: "24px",
      borderRadius: "16px",
      padding: "24px",
      background: config.gradient,
      border: `1px solid ${config.borderColor}20`,
      boxShadow: "0 4px 12px rgba(3, 7, 10, 0.08)",
      position: "relative" as const,
      overflow: "hidden",
    },
    accentBar: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "6px",
      height: "100%",
      backgroundColor: config.borderColor,
    },
    content: {
      display: "flex",
      alignItems: "flex-start",
      gap: "20px",
      position: "relative" as const,
      zIndex: 1,
    },
    iconContainer: {
      width: "56px",
      height: "56px",
      borderRadius: "12px",
      backgroundColor: `${config.iconBg}15`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      border: `1px solid ${config.borderColor}20`,
    },
    icon: {
      fontSize: "28px",
      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontWeight: 700,
      fontSize: "18px",
      margin: "0 0 12px 0",
      color: config.titleColor,
      lineHeight: "1.3",
    },
    description: {
      fontSize: "15px",
      lineHeight: "1.6",
      margin: 0,
      color: config.textColor,
      opacity: 0.9,
    },
    progressIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "16px",
    },
    progressDots: {
      display: "flex",
      gap: "6px",
    },
    progressDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: `${config.borderColor}40`,
      transition: "all 0.3s ease",
    },
    activeDot: {
      backgroundColor: config.borderColor,
      transform: "scale(1.2)",
    },
    progressText: {
      fontSize: "12px",
      color: config.textColor,
      opacity: 0.7,
      margin: 0,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.accentBar}></div>
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>{config.icon}</span>
        </div>
        <div style={styles.textContainer}>
          <h4 style={styles.title}>{config.title}</h4>
          <p style={styles.description}>{config.description}</p>

          {status === "under_review" && (
            <div style={styles.progressIndicator}>
              <div style={styles.progressDots}>
                <div
                  style={{ ...styles.progressDot, ...styles.activeDot }}
                ></div>
                <div style={styles.progressDot}></div>
                <div style={styles.progressDot}></div>
              </div>
              <p style={styles.progressText}>Review in progress</p>
            </div>
          )}

          {status === "accepted" && (
            <div style={styles.progressIndicator}>
              <div style={styles.progressDots}>
                <div
                  style={{ ...styles.progressDot, ...styles.activeDot }}
                ></div>
                <div
                  style={{ ...styles.progressDot, ...styles.activeDot }}
                ></div>
                <div style={styles.progressDot}></div>
              </div>
              <p style={styles.progressText}>Next: Complete enrollment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusSpecificMessages;
