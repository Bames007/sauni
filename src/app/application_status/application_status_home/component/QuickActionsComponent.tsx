import React from "react";
import { Download, Notebook, HelpingHand } from "lucide-react";

interface QuickActionsProps {
  onGeneratePDF: () => void;
  isGeneratingPDF: boolean;
  onViewRequirements?: () => void;
  onRequestInfo?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onGeneratePDF,
  isGeneratingPDF,
  onViewRequirements,
  onRequestInfo,
}) => {
  // Styles defined as JavaScript objects
  const styles = {
    container: {
      backgroundColor: "white",
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
    titleDot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#017840",
      borderRadius: "50%",
      flexShrink: 0,
    },
    actionsList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
    },
    button: {
      width: "100%",
      textAlign: "left" as const,
      padding: "16px",
      borderRadius: "8px",
      // Replace shorthand border with longhand properties
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#e5e7eb", // Use longhand instead of shorthand
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      backgroundColor: "white",
    },
    buttonHover: {
      backgroundColor: "#f0f9f4",
      borderColor: "#017840", // Now this only updates the color, not conflicting with shorthand
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(1, 120, 64, 0.1)",
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    iconContainer: {
      width: "20px",
      height: "20px",
      borderRadius: "6px",
      backgroundColor: "#01784010",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginRight: "12px",
    },
    icon: {
      width: "14px",
      height: "14px",
      color: "#017840",
    },
    buttonText: {
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap" as const,
      color: "#03070A",
    },
    loadingAnimation: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      border: "2px solid transparent",
      borderTop: "2px solid #017840",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "8px",
    },
  };

  // Dynamic state for hover effects
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  const actionButtons = [
    {
      id: "download",
      icon: <Download style={styles.icon} />,
      label: isGeneratingPDF
        ? "Generating PDF..."
        : "Download Application Summary",
      onClick: onGeneratePDF,
      disabled: isGeneratingPDF,
      showLoader: isGeneratingPDF,
    },
    {
      id: "requirements",
      icon: <Notebook style={styles.icon} />,
      label: "View Program Requirements",
      onClick: onViewRequirements,
      disabled: false,
      showLoader: false,
    },
    {
      id: "info",
      icon: <HelpingHand style={styles.icon} />,
      label: "Request Information",
      onClick: onRequestInfo,
      disabled: false,
      showLoader: false,
    },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        <span style={styles.titleDot}></span>
        Quick Actions
      </h3>

      <div style={styles.actionsList}>
        {actionButtons.map((button) => (
          <button
            key={button.id}
            onClick={button.onClick}
            disabled={button.disabled}
            style={{
              ...styles.button,
              ...(hoveredButton === button.id ? styles.buttonHover : {}),
              ...(button.disabled ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={() => !button.disabled && setHoveredButton(button.id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div style={styles.iconContainer}>
              {button.showLoader ? (
                <div style={styles.loadingAnimation}></div>
              ) : (
                button.icon
              )}
            </div>
            <span style={styles.buttonText}>{button.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default QuickActions;
