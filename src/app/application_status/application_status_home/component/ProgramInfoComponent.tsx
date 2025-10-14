import React from "react";

interface ProgramInfoProps {
  programSelection: {
    firstChoice: string;
    secondChoice: string;
    entryYear: number;
    semester: string;
    modeOfStudy: string;
  };
  submittedAt: string;
}

const ProgramInformation: React.FC<ProgramInfoProps> = ({
  programSelection,
  submittedAt,
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(3, 7, 10, 0.08)",
        padding: "24px",
        border: "1px solid rgba(3, 7, 10, 0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          background: "linear-gradient(180deg, #017840 0%, #BD9946 100%)",
          borderRadius: "2px 0 0 2px",
        }}
      ></div>

      <h3
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#03070A",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          fontFamily: "Bebas Neue, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#017840",
            borderRadius: "50%",
            marginRight: "12px",
            boxShadow: "0 2px 8px rgba(1, 120, 64, 0.3)",
          }}
        ></span>
        Program Details
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(1, 120, 64, 0.03)",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid rgba(1, 120, 64, 0.1)",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#BD9946",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
                display: "block",
              }}
            >
              First Choice
            </label>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#03070A",
                lineHeight: "1.4",
              }}
            >
              {programSelection.firstChoice}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(189, 153, 70, 0.03)",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid rgba(189, 153, 70, 0.1)",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#BD9946",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Second Choice
            </label>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#03070A",
                lineHeight: "1.4",
              }}
            >
              {programSelection.secondChoice}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(3, 7, 10, 0.02)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <label
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#BD9946",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Entry Year
            </label>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#017840",
                fontFamily: "Bebas Neue, sans-serif",
              }}
            >
              {programSelection.entryYear}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(3, 7, 10, 0.02)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <label
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#BD9946",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Semester
            </label>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#03070A",
                textTransform: "capitalize",
              }}
            >
              {programSelection.semester}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(3, 7, 10, 0.02)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <label
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#BD9946",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Study Mode
            </label>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#03070A",
                textTransform: "capitalize",
              }}
            >
              {programSelection.modeOfStudy}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(1, 120, 64, 0.05)",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid rgba(1, 120, 64, 0.1)",
            textAlign: "center",
          }}
        >
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#017840",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "6px",
              display: "block",
            }}
          >
            Application Date
          </label>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#03070A",
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            {new Date(submittedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramInformation;
