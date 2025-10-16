import React, { useState, useEffect } from "react";

interface Payment {
  id: string;
  amount: number;
  description: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "processing" | "failed";
  type: "application_fee" | "tuition_deposit" | "full_tuition";
}

interface PaymentData {
  status?: string;
  paymentType?: string;
  reference?: string;
  amount?: number;
  paidAt?: string;
}

interface ApplicationPayments {
  application_fee?: {
    status: string;
    reference?: string;
    paidAt?: string;
  };
  [key: string]: PaymentData | undefined;
}

interface ApplicationData {
  paymentStatus?: string;
  paystackReference?: string;
  payments?: ApplicationPayments;
}

interface PaymentSectionProps {
  payments: Payment[];
  onPayment: (paymentId: string) => void;
  prospectiveId: string;
  userEmail: string;
  applicationData?: ApplicationData;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  payments,
  onPayment,
  prospectiveId,
  userEmail,
  applicationData,
}) => {
  const [processingPayment, setProcessingPayment] = useState<string | null>(
    null
  );
  const APPLICATION_FEE = 2500000; // 25,000 Naira in kobo

  // Get consolidated payment status from application data
  const getConsolidatedPaymentStatus = () => {
    if (!applicationData) return "pending";

    // Check if application fee is already paid
    if (applicationData.paymentStatus === "paid") {
      return "paid";
    }

    // Check payments object for application_fee status
    if (applicationData.payments?.application_fee?.status === "paid") {
      return "paid";
    }

    // Check individual payment references for success
    if (applicationData.payments) {
      for (const key in applicationData.payments) {
        const payment = applicationData.payments[key];
        if (
          payment?.status === "success" &&
          payment.paymentType === "application_fee"
        ) {
          return "paid";
        }
      }
    }

    return "pending";
  };

  const isApplicationFeePaid = getConsolidatedPaymentStatus() === "paid";

  useEffect(() => {
    const checkPendingPayments = async () => {
      // Check if we have a payment reference in URL (callback from Paystack)
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get("reference");
      const txRef = urlParams.get("trxref");

      const paymentReference = reference || txRef;

      if (paymentReference && !isApplicationFeePaid) {
        setProcessingPayment("VERIFYING");
        try {
          const response = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: paymentReference,
              prospectiveId: prospectiveId,
              email: userEmail,
              amount: APPLICATION_FEE,
            }),
          });

          const result = await response.json();
          if (result.success) {
            onPayment("APPLICATION_FEE");
            alert("Payment verified successfully! Confirmation email sent.");

            // Clean up URL parameters - remove only the payment references
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("reference");
            newUrl.searchParams.delete("trxref");
            window.history.replaceState({}, document.title, newUrl.toString());
          } else {
            console.error("Auto-verification failed:", result.message);
            alert(`Verification failed: ${result.message}`);
          }
        } catch (error) {
          console.error("Error during auto-verification:", error);
          alert(
            "Error during payment verification. Please try manual verification."
          );
        } finally {
          setProcessingPayment(null);
        }
      }
    };

    checkPendingPayments();
  }, [
    prospectiveId,
    userEmail,
    onPayment,
    isApplicationFeePaid,
    APPLICATION_FEE,
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const initializePayment = async () => {
    if (isApplicationFeePaid) {
      alert("Application fee has already been paid.");
      return;
    }

    setProcessingPayment("APPLICATION_FEE");

    try {
      // Generate a unique reference for this payment
      const paymentReference = `SAUNI${prospectiveId}_${Date.now()}`;

      // Store data for verification
      localStorage.setItem("prospectiveId", prospectiveId);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("paymentAmount", APPLICATION_FEE.toString());
      localStorage.setItem("paymentReference", paymentReference);

      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          amount: APPLICATION_FEE,
          prospectiveId: prospectiveId,
          paymentType: "application_fee",
          reference: paymentReference,
          callback_url: `${window.location.origin}/api/verify-payment`,
        }),
      });

      const result = await response.json();

      if (result.success && result.authorizationUrl) {
        // Create pending payment record in database
        await fetch("/api/payments/create-pending", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: paymentReference,
            prospectiveId: prospectiveId,
            email: userEmail,
            amount: APPLICATION_FEE,
            paymentType: "application_fee",
            status: "pending",
          }),
        });

        // Redirect to Paystack checkout
        window.location.href = result.authorizationUrl;
      } else {
        alert(`Payment initialization failed: ${result.message}`);
        setProcessingPayment(null);
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Error initializing payment. Please try again.");
      setProcessingPayment(null);
    }
  };
  // Manual verification function - now updates the same payment record
  const handleManualVerification = async () => {
    if (isApplicationFeePaid) {
      alert("Application fee has already been paid.");
      return;
    }

    const reference = prompt("Please enter your payment reference:");
    if (reference) {
      setProcessingPayment("VERIFYING");
      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: reference,
            prospectiveId: prospectiveId,
            email: userEmail,
            amount: APPLICATION_FEE,
          }),
        });

        const result = await response.json();
        if (result.success) {
          onPayment("APPLICATION_FEE");
          alert("Payment verified successfully! Confirmation email sent.");
        } else {
          alert(`Verification failed: ${result.message}`);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("Error verifying payment. Please contact support.");
      } finally {
        setProcessingPayment(null);
      }
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "paid":
        return {
          background: "rgba(1, 120, 64, 0.1)",
          color: "#017840",
          border: "1px solid rgba(1, 120, 64, 0.2)",
        };
      case "overdue":
        return {
          background: "rgba(220, 38, 38, 0.1)",
          color: "#dc2626",
          border: "1px solid rgba(220, 38, 38, 0.2)",
        };
      case "processing":
        return {
          background: "rgba(59, 130, 246, 0.1)",
          color: "#3b82f6",
          border: "1px solid rgba(59, 130, 246, 0.2)",
        };
      case "failed":
        return {
          background: "rgba(239, 68, 68, 0.1)",
          color: "#ef4444",
          border: "1px solid rgba(239, 68, 68, 0.2)",
        };
      default:
        return {
          background: "rgba(189, 153, 70, 0.1)",
          color: "#BD9946",
          border: "1px solid rgba(189, 153, 70, 0.2)",
        };
    }
  };

  const applicationFeePayment = payments.find(
    (p) => p.type === "application_fee"
  );

  // Use consolidated payment status
  const paymentStatus = isApplicationFeePaid
    ? "paid"
    : applicationFeePayment?.status || "pending";

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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
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
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#03070A",
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            Payment Center
          </h3>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {applicationFeePayment && (
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid rgba(3, 7, 10, 0.08)",
              boxShadow: "0 2px 12px rgba(3, 7, 10, 0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#03070A",
                    marginBottom: "8px",
                    lineHeight: "1.3",
                  }}
                >
                  Application Fee - ₦25,000
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  Due: {formatDate(applicationFeePayment.dueDate)}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#BD9946",
                    fontWeight: 500,
                    marginTop: "4px",
                  }}
                >
                  + Paystack processing charges
                </p>

                {/* Show payment reference if paid */}
                {isApplicationFeePaid && applicationData?.paystackReference && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#017840",
                      fontWeight: 500,
                      marginTop: "4px",
                    }}
                  >
                    Reference: {applicationData.paystackReference}
                  </p>
                )}
              </div>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  marginLeft: "12px",
                  flexShrink: 0,
                  ...getStatusStyle(paymentStatus),
                }}
              >
                {paymentStatus}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#03070A",
                  fontFamily: "Bebas Neue, sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                ₦25,000
              </span>

              {isApplicationFeePaid ? (
                <button
                  disabled
                  style={{
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontFamily: "Bebas Neue, sans-serif",
                    letterSpacing: "0.5px",
                    background: "rgba(3, 7, 10, 0.05)",
                    color: "rgba(3, 7, 10, 0.4)",
                    border: "1px solid rgba(3, 7, 10, 0.1)",
                    cursor: "not-allowed",
                  }}
                >
                  Payment Complete ✓
                </button>
              ) : (
                <button
                  onClick={initializePayment}
                  disabled={processingPayment !== null}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontFamily: "Bebas Neue, sans-serif",
                    letterSpacing: "0.5px",
                    background: processingPayment
                      ? "rgba(3, 7, 10, 0.1)"
                      : "linear-gradient(135deg, #017840 0%, #015a30 100%)",
                    color: processingPayment
                      ? "rgba(3, 7, 10, 0.4)"
                      : "#ffffff",
                    border: "none",
                    boxShadow: processingPayment
                      ? "none"
                      : "0 4px 12px rgba(1, 120, 64, 0.3)",
                    cursor: processingPayment ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {processingPayment ? "Processing..." : "Pay Application Fee"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Manual verification option - Only show if not paid */}
      {!isApplicationFeePaid && (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(189, 153, 70, 0.05) 0%, rgba(1, 120, 64, 0.05) 100%)",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid rgba(189, 153, 70, 0.1)",
            marginBottom: "16px",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#BD9946",
              marginBottom: "8px",
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            Having payment issues?
          </h4>
          <button
            onClick={handleManualVerification}
            disabled={processingPayment === "VERIFYING"}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 600,
              background: "transparent",
              color: "#BD9946",
              border: "1px solid #BD9946",
              cursor:
                processingPayment === "VERIFYING" ? "not-allowed" : "pointer",
              opacity: processingPayment === "VERIFYING" ? 0.6 : 1,
            }}
          >
            {processingPayment === "VERIFYING"
              ? "Verifying..."
              : "Verify Payment Manually"}
          </button>
        </div>
      )}

      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(1, 120, 64, 0.05) 0%, rgba(189, 153, 70, 0.05) 100%)",
          borderRadius: "12px",
          padding: "20px",
          border: "1px solid rgba(1, 120, 64, 0.1)",
        }}
      >
        <h4
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#017840",
            marginBottom: "8px",
            fontFamily: "Bebas Neue, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          Secure Payment Processing
        </h4>
        <p
          style={{
            fontSize: "14px",
            color: "#03070A",
            lineHeight: "1.5",
            opacity: 0.8,
            fontWeight: 500,
          }}
        >
          {isApplicationFeePaid
            ? "Your application fee payment has been successfully processed. Thank you for completing your payment."
            : "After payment, you will be redirected back to this page to automatically verify your payment status. If you encounter any issues, use the manual verification option above."}
        </p>
      </div>
    </div>
  );
};

export default PaymentSection;
