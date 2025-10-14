// import { useState } from "react";
// import Paystack from "@paystack/inline-js";

// interface PaymentConfig {
//   email: string;
//   amount: number;
//   metadata: any;
//   onSuccess: (response: any) => void;
//   onClose: () => void;
//   onError: (error: any) => void;
// }

// export const usePaystackInline = () => {
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [currentPaymentId, setCurrentPaymentId] = useState<string>("");

//   const calculateTotalAmount = (baseAmount: number) => {
//     // Paystack charges: 1.5% + ₦100
//     const paystackFee = Math.ceil(baseAmount * 0.015 + 100);
//     return baseAmount + paystackFee;
//   };

//   const initializePayment = (config: PaymentConfig) => {
//     setPaymentLoading(true);

//     const totalAmount = calculateTotalAmount(config.amount);
//     const reference = `SAUNI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

//     const paystack = new Paystack();

//     paystack.checkout({
//       key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
//       email: config.email,
//       amount: totalAmount * 100,
//       reference: reference,
//       metadata: {
//         custom_fields: [
//           {
//             display_name: "Prospective ID",
//             variable_name: "prospective_id",
//             value: config.metadata.prospectiveId,
//           },
//           {
//             display_name: "Payment Type",
//             variable_name: "payment_type",
//             value: config.metadata.paymentType,
//           },
//           {
//             display_name: "Student Name",
//             variable_name: "student_name",
//             value: config.metadata.studentName,
//           },
//         ],
//         cancel_action: `${process.env.NEXT_PUBLIC_APP_URL}/application/status?pid=${config.metadata.prospectiveId}`,
//       },
//       channels: ["card", "bank_transfer", "ussd", "qr", "mobile_money"],
//       currency: "NGN",
//       onSuccess: (transaction: any) => {
//         console.log("Payment successful:", transaction);
//         setPaymentLoading(false);
//         config.onSuccess(transaction);
//       },
//       onLoad: (response: any) => {
//         console.log("Payment modal loaded:", response);
//       },
//       onClose: () => {
//         console.log("Payment modal closed");
//         setPaymentLoading(false);
//         config.onClose();
//       },
//       onError: (error: any) => {
//         console.error("Payment error:", error);
//         setPaymentLoading(false);
//         config.onError(error);
//       },
//     });
//   };

//   return {
//     initializePayment,
//     paymentLoading,
//     currentPaymentId,
//     setCurrentPaymentId,
//     calculateTotalAmount,
//   };
// };
