import React from "react";
import { Lock } from "lucide-react";

interface TemporaryPasswordProps {
  tempPassword?: string;
  passwordChanged?: boolean;
  onShowPasswordModal: () => void;
}

const TemporaryPassword: React.FC<TemporaryPasswordProps> = ({
  tempPassword,
  passwordChanged,
  onShowPasswordModal,
}) => {
  const styles = {
    // Common styles
    container: {
      borderRadius: "12px",
      padding: "16px",
      border: "1px solid",
      transition: "all 0.2s ease",
      cursor: "pointer" as const,
    },
    successContainer: {
      background: "#f0f9f4",
      borderColor: "#017840",
    },
    warningContainer: {
      background: "#fefaf0",
      borderColor: "#BD9946",
    },
    hoverContainer: {
      background: "#fdf6e7",
    },
    content: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    iconContainer: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    successIcon: {
      backgroundColor: "#01784020",
    },
    warningIcon: {
      backgroundColor: "#BD994620",
    },
    icon: {
      width: "16px",
      height: "16px",
    },
    successIconColor: {
      color: "#017840",
    },
    warningIconColor: {
      color: "#BD9946",
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontWeight: 600,
      fontSize: "14px",
      margin: "0 0 4px 0",
    },
    successTitle: {
      color: "#017840",
    },
    warningTitle: {
      color: "#BD9946",
    },
    description: {
      fontSize: "12px",
      margin: 0,
      opacity: 0.8,
    },
    successDescription: {
      color: "#017840",
    },
    warningDescription: {
      color: "#BD9946",
    },
    passwordBox: {
      background: "white",
      border: "1px solid",
      borderColor: "#BD994630",
      borderRadius: "8px",
      padding: "8px 12px",
      marginTop: "8px",
    },
    passwordText: {
      fontFamily: "Monaco, Consolas, monospace",
      fontWeight: 700,
      fontSize: "14px",
      color: "#BD9946",
      wordBreak: "break-all" as const,
      margin: 0,
    },
    footnote: {
      fontSize: "11px",
      margin: "4px 0 0 0",
      opacity: 0.7,
    },
    warningFootnote: {
      color: "#BD9946",
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  if (passwordChanged) {
    return (
      <div
        style={{
          ...styles.container,
          ...styles.successContainer,
        }}
      >
        <div style={styles.content}>
          <div
            style={{
              ...styles.iconContainer,
              ...styles.successIcon,
            }}
          >
            <Lock
              style={{
                ...styles.icon,
                ...styles.successIconColor,
              }}
            />
          </div>
          <div style={styles.textContainer}>
            <h3
              style={{
                ...styles.title,
                ...styles.successTitle,
              }}
            >
              Password Updated
            </h3>
            <p
              style={{
                ...styles.description,
                ...styles.successDescription,
              }}
            >
              Your password has been changed successfully
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!tempPassword) return null;

  return (
    <div
      style={{
        ...styles.container,
        ...styles.warningContainer,
        ...(isHovered ? styles.hoverContainer : {}),
      }}
      onClick={onShowPasswordModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.content}>
        <div
          style={{
            ...styles.iconContainer,
            ...styles.warningIcon,
          }}
        >
          <Lock
            style={{
              ...styles.icon,
              ...styles.warningIconColor,
            }}
          />
        </div>
        <div style={styles.textContainer}>
          <h3
            style={{
              ...styles.title,
              ...styles.warningTitle,
            }}
          >
            Temporary Password
          </h3>
          <p
            style={{
              ...styles.description,
              ...styles.warningDescription,
            }}
          >
            Click to change your password
          </p>
        </div>
      </div>

      <div style={styles.passwordBox}>
        <code style={styles.passwordText}>{tempPassword}</code>
      </div>

      <p
        style={{
          ...styles.footnote,
          ...styles.warningFootnote,
        }}
      >
        Please change this password after your first login. This can only be
        done once.
      </p>
    </div>
  );
};

export default TemporaryPassword;
