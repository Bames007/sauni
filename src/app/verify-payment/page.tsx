"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyPayment() {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("");

  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setVerificationStatus("error");
        setMessage("No payment reference found");
        return;
      }

      try {
        // You'll need to get prospectiveId from somewhere -
        // could be from sessionStorage, localStorage, or additional URL params
        const prospectiveId = localStorage.getItem("prospectiveId");
        const userEmail = localStorage.getItem("userEmail");
        const amount = localStorage.getItem("paymentAmount");

        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reference,
            prospectiveId,
            email: userEmail,
            amount: amount ? parseInt(amount) : 2500000, // Default to 25,000 Naira if not found
          }),
        });

        const result = await response.json();

        if (result.success) {
          setVerificationStatus("success");
          setMessage(
            "Payment verified successfully! Your application is now complete."
          );

          // Clear stored payment data
          localStorage.removeItem("prospectiveId");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("paymentAmount");
        } else {
          setVerificationStatus("error");
          setMessage(result.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        setMessage(
          "An error occurred during verification. Please contact support."
        );
      }
    };

    verifyPayment();
  }, [reference, trxref]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] to-[#fefaf0] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {verificationStatus === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-[#017840] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your payment...
            </p>
          </>
        )}

        {verificationStatus === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-600">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="space-y-3">
              <Link
                href="/application-status"
                className="block w-full px-4 py-3 bg-[#017840] text-white rounded-lg hover:bg-[#015a30] transition-colors"
              >
                View Application Status
              </Link>
              <button
                onClick={() => window.print()}
                className="block w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Print Receipt
              </button>
            </div>
          </>
        )}

        {verificationStatus === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="space-y-3">
              <Link
                href="/application-status"
                className="block w-full px-4 py-3 bg-[#017840] text-white rounded-lg hover:bg-[#015a30] transition-colors"
              >
                Return to Application
              </Link>
              <Link
                href="/contact"
                className="block w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
