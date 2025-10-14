import React from "react";

interface AcademicBackgroundProps {
  academicHistory: {
    primaryEducation: {
      certificateType: string;
      schoolName: string;
      startYear: number;
      endYear: number;
    };
    secondarySchool: Array<{
      schoolName: string;
      schoolType: string;
      examType: string;
      examNumber: string;
      sitting: string;
      completionYear: number;
      grades: Array<{
        subject: string;
        grade: string;
      }>;
    }>;
  };
}

const AcademicBackground: React.FC<AcademicBackgroundProps> = ({
  academicHistory,
}) => {
  const primaryEducation = academicHistory.primaryEducation;
  const secondaryEducation = academicHistory.secondarySchool[0];

  const getGradeColor = (grade: string) => {
    if (grade === "A1" || grade === "A2" || grade === "A3") {
      return "#017840";
    } else if (grade.startsWith("B")) {
      return "#BD9946";
    } else if (grade.startsWith("C")) {
      return "#d97706";
    } else {
      return "#dc2626";
    }
  };

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
          background: "linear-gradient(180deg, #BD9946 0%, #017840 100%)",
          borderRadius: "2px 0 0 2px",
        }}
      ></div>

      <h3
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#03070A",
          marginBottom: "24px",
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
            backgroundColor: "#BD9946",
            borderRadius: "50%",
            marginRight: "12px",
            boxShadow: "0 2px 8px rgba(189, 153, 70, 0.3)",
          }}
        ></span>
        Academic Background
      </h3>

      {/* Primary Education */}
      <div
        style={{
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "20px",
              backgroundColor: "#017840",
              borderRadius: "2px",
              marginRight: "12px",
            }}
          ></div>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#03070A",
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            Primary Education
          </h4>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {[
            { label: "School Name", value: primaryEducation.schoolName },
            {
              label: "Certificate Type",
              value: primaryEducation.certificateType,
            },
            {
              label: "Start Year",
              value: primaryEducation.startYear.toString(),
            },
            { label: "End Year", value: primaryEducation.endYear.toString() },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(3, 7, 10, 0.02)",
                borderRadius: "12px",
                padding: "16px",
                border: "1px solid rgba(3, 7, 10, 0.05)",
              }}
            >
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#BD9946",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                {item.label}
              </label>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#03070A",
                  lineHeight: "1.4",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Education */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "20px",
              backgroundColor: "#BD9946",
              borderRadius: "2px",
              marginRight: "12px",
            }}
          ></div>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#03070A",
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            Secondary Education
          </h4>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {[
            { label: "School Name", value: secondaryEducation.schoolName },
            { label: "School Type", value: secondaryEducation.schoolType },
            { label: "Exam Type", value: secondaryEducation.examType },
            { label: "Exam Number", value: secondaryEducation.examNumber },
            { label: "Sitting", value: secondaryEducation.sitting },
            {
              label: "Completion Year",
              value: secondaryEducation.completionYear.toString(),
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(3, 7, 10, 0.02)",
                borderRadius: "12px",
                padding: "16px",
                border: "1px solid rgba(3, 7, 10, 0.05)",
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
                {item.label}
              </label>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#03070A",
                  lineHeight: "1.4",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Grades Section */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
              justifyContent: "space-between",
            }}
          >
            <h5
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#03070A",
                fontFamily: "Bebas Neue, sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              Subject Grades
            </h5>
            <div
              style={{
                fontSize: "12px",
                color: "#BD9946",
                fontWeight: 600,
              }}
            >
              {secondaryEducation.grades.length} Subjects
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "12px",
            }}
          >
            {secondaryEducation.grades.map((grade, index) => (
              <div
                key={index}
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                  border: "1px solid rgba(3, 7, 10, 0.08)",
                  boxShadow: "0 2px 8px rgba(3, 7, 10, 0.03)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: "8px",
                    lineHeight: "1.2",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {grade.subject}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: getGradeColor(grade.grade),
                    fontFamily: "Bebas Neue, sans-serif",
                    letterSpacing: "0.5px",
                  }}
                >
                  {grade.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicBackground;
