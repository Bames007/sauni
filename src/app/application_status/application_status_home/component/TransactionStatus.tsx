import React, { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import { Copy, Check, Calendar, Receipt } from "lucide-react";

interface Payment {
  reference: string;
  status: "success" | "pending" | "failed" | "initialized";
  amount?: number;
  paidAmount?: number;
  paidAt?: string;
  initializedAt?: string;
  createdAt?: string;
  paymentType?: string;
  channel?: string;
  currency?: string;
}

interface Transaction {
  reference: string;
  amount: number;
  status: "success" | "pending" | "failed" | "initialized";
  paidAt?: string;
  createdAt: string;
  paymentType: string;
  channel?: string;
  currency?: string;
}

interface TransactionStatusProps {
  prospectiveId: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  prospectiveId,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedReference, setCopiedReference] = useState<string | null>(null);

  useEffect(() => {
    if (!prospectiveId) return;

    const paymentsRef = ref(
      db,
      `applications/students/${prospectiveId}/payments`
    );

    const fetchTransactions = onValue(
      paymentsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const paymentsData = snapshot.val();
          const transactionsList: Transaction[] = Object.values(paymentsData)
            .filter(
              (payment): payment is Payment =>
                typeof payment === "object" &&
                payment !== null &&
                "reference" in payment &&
                "status" in payment &&
                typeof (payment as Payment).reference === "string" &&
                typeof (payment as Payment).status === "string"
            )
            .map((payment) => ({
              reference: payment.reference,
              amount: payment.amount || payment.paidAmount || 0,
              status: payment.status,
              paidAt: payment.paidAt,
              createdAt:
                payment.initializedAt ||
                payment.createdAt ||
                new Date().toISOString(),
              paymentType: payment.paymentType || "application_fee",
              channel: payment.channel,
              currency: payment.currency || "NGN",
            }))
            .sort(
              (a: Transaction, b: Transaction) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

          setTransactions(transactionsList);
        } else {
          setTransactions([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    );

    return () => off(paymentsRef, "value", fetchTransactions);
  }, [prospectiveId]);

  const copyToClipboard = async (text: string) => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        // Fallback for older browsers
        fallbackCopyToClipboard(text);
        return;
      }

      await navigator.clipboard.writeText(text);
      setCopiedReference(text);
      setTimeout(() => setCopiedReference(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Try fallback method if modern API fails
      fallbackCopyToClipboard(text);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);

      // Focus and select the text
      textArea.focus();
      textArea.select();

      // Execute copy command
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopiedReference(text);
        setTimeout(() => setCopiedReference(null), 2000);
      } else {
        throw new Error("Fallback copy method failed");
      }
    } catch (err) {
      console.error("Fallback copy method failed: ", err);
      // Last resort: show the text to user and ask them to copy manually
      alert(`Please copy this reference number: ${text}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) => {
    // Convert from kobo to Naira
    const amountInNaira = amount / 100;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amountInNaira);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "success":
        return {
          background: "rgba(1, 120, 64, 0.1)",
          color: "#017840",
          border: "1px solid rgba(1, 120, 64, 0.2)",
          label: "Successful",
        };
      case "pending":
      case "initialized":
        return {
          background: "rgba(189, 153, 70, 0.1)",
          color: "#BD9946",
          border: "1px solid rgba(189, 153, 70, 0.2)",
          label: "Processing",
        };
      case "failed":
        return {
          background: "rgba(220, 38, 38, 0.1)",
          color: "#dc2626",
          border: "1px solid rgba(220, 38, 38, 0.2)",
          label: "Failed",
        };
      default:
        return {
          background: "rgba(100, 116, 139, 0.1)",
          color: "#64748b",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          label: status,
        };
    }
  };

  const getPaymentTypeLabel = (paymentType: string) => {
    switch (paymentType) {
      case "application_fee":
        return "Application Fee";
      case "tuition_deposit":
        return "Tuition Deposit";
      case "full_tuition":
        return "Full Tuition";
      default:
        return paymentType;
    }
  };

  if (loading) {
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

        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-[#017840] bg-opacity-10 rounded-full flex items-center justify-center">
          <Receipt className="w-5 h-5 text-[#017840]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
          <p className="text-sm text-gray-600">
            Track and manage your payment transactions
          </p>
        </div>
      </div>

      {transactions.length === 0 ? (
        // Empty State
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            No Transactions Yet
          </h4>
          <p className="text-gray-600 mb-4">
            Your payment transactions will appear here once completed.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#BD9946] to-[#017840] mx-auto"></div>
        </div>
      ) : (
        // Transactions List
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const statusStyle = getStatusStyle(transaction.status);
            return (
              <div
                key={transaction.reference}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {getPaymentTypeLabel(transaction.paymentType)}
                    </h4>
                    <p className="text-2xl font-bold text-[#017840] mt-1">
                      {formatAmount(transaction.amount)}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{
                      background: statusStyle.background,
                      color: statusStyle.color,
                      border: statusStyle.border,
                    }}
                  >
                    {statusStyle.label}
                  </span>
                </div>

                {/* Reference Number */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Number
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-gray-50 px-3 py-2 rounded-lg text-sm font-mono text-gray-800 border">
                      {transaction.reference}
                    </code>
                    <button
                      onClick={() => copyToClipboard(transaction.reference)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy reference number"
                    >
                      {copiedReference === transaction.reference ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {transaction.paidAt ? "Paid on" : "Created on"}{" "}
                      {formatDate(transaction.paidAt || transaction.createdAt)}
                    </span>
                  </div>

                  {transaction.channel && (
                    <div className="text-gray-600">
                      Channel:{" "}
                      <span className="font-medium capitalize">
                        {transaction.channel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Success Indicator */}
                {transaction.status === "success" && (
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
                      Payment confirmed
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total Transactions: {transactions.length}</span>
          <span>
            {transactions.filter((t) => t.status === "success").length}{" "}
            completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;
