import { db } from "@/app/utils/firebaseConfig";
import { ref, update, get, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define interfaces for our data structures
interface PaymentData {
  prospectiveId?: string;
  email?: string;
  amount?: number;
  paymentType?: string;
  status?: string;
  createdAt?: string;
  verifiedAt?: string;
  [key: string]: unknown; // Allow for additional properties
}

interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data?: {
    status: string;
    amount: number;
    reference: string;
    paid_at: string;
    channel: string;
    gateway_response: string;
    currency: string;
    fees: number;
    customer?: {
      email: string;
      customer_code: string;
    };
    authorization?: Record<string, unknown>;
    log?: Record<string, unknown>;
  };
}

interface UpdateData {
  status: string;
  verifiedAt?: string;
  lastVerificationAttempt?: string;
  createdAt?: string;
  [key: string]: unknown; // Allow for additional properties
}

export async function POST(request: NextRequest) {
  try {
    const { reference, prospectiveId, email, amount } = await request.json();

    const paymentRef = ref(db, `payments/${reference}`);
    const paymentSnapshot = await get(paymentRef);

    let paymentData: PaymentData = {};

    if (paymentSnapshot.exists()) {
      paymentData = paymentSnapshot.val() as PaymentData;
      const updateData: UpdateData = {
        status: "verifying",
        verifiedAt: new Date().toISOString(),
        lastVerificationAttempt: new Date().toISOString(),
      };
      await update(paymentRef, updateData);
    } else {
      paymentData = {
        prospectiveId,
        email,
        amount,
        paymentType: "application_fee",
        status: "verifying",
        createdAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString(),
      };
      await set(paymentRef, paymentData);
    }

    const userPaymentRef = ref(
      db,
      `applications/students/${prospectiveId}/payments/${reference}`
    );
    await set(userPaymentRef, {
      ...paymentData,
      status: "verifying",
      verifiedAt: new Date().toISOString(),
    });

    // Verify with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const verificationData: PaystackVerificationResponse =
      await verifyResponse.json();

    if (!verificationData.status || !verificationData.data) {
      // Update payment record as failed verification
      const failedUpdate = {
        status: "verification_failed",
        verificationError: "Invalid verification response from Paystack",
        failedAt: new Date().toISOString(),
        gatewayResponse: verificationData.message || "Unknown error",
      };

      await update(paymentRef, failedUpdate);
      await update(userPaymentRef, failedUpdate);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification response from Paystack",
        },
        { status: 400 }
      );
    }

    const transaction = verificationData.data;

    if (transaction.status === "success") {
      // Verify amount matches expected amount
      if (transaction.amount !== amount) {
        const amountMismatchUpdate = {
          status: "amount_mismatch",
          paidAmount: transaction.amount,
          expectedAmount: amount,
          updatedAt: new Date().toISOString(),
        };

        await update(paymentRef, amountMismatchUpdate);
        await update(userPaymentRef, amountMismatchUpdate);

        return NextResponse.json(
          {
            success: false,
            message: `Payment amount mismatch. Expected: ${amount / 100} Naira, Received: ${transaction.amount / 100} Naira`,
          },
          { status: 400 }
        );
      }

      // Update payment record as successful
      const successUpdate = {
        status: "success",
        paidAmount: transaction.amount,
        channel: transaction.channel,
        paidAt: transaction.paid_at,
        gatewayResponse: transaction.gateway_response,
        currency: transaction.currency,
        fees: transaction.fees,
        customer: {
          email: transaction.customer?.email,
          code: transaction.customer?.customer_code,
        },
        authorization: transaction.authorization,
        log: transaction.log,
        updatedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };

      await update(paymentRef, successUpdate);
      await update(userPaymentRef, successUpdate);

      // Update application status
      const applicationRef = ref(db, `applications/students/${prospectiveId}`);
      await update(applicationRef, {
        paymentStatus: "paid",
        amountPaid: amount / 100,
        paystackReference: reference,
        paidAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update application_fee payment summary
      const applicationFeeRef = ref(
        db,
        `applications/students/${prospectiveId}/payments/application_fee`
      );
      await update(applicationFeeRef, {
        status: "paid",
        paidAt: new Date().toISOString(),
        paystackReference: reference,
        amount: amount / 100,
        reference: reference,
        verifiedAt: new Date().toISOString(),
      });

      // Send confirmation email
      try {
        await resend.emails.send({
          from: "SAUNI Admissions <onboarding@resend.dev>",
          to: email,
          subject: "SAUNI - Application Fee Payment Confirmed",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #017840;">Payment Confirmed!</h2>
              <p>Dear Applicant,</p>
              <p>Your application fee payment has been successfully verified and confirmed.</p>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Reference Number:</strong> ${reference}</p>
                <p><strong>Amount Paid:</strong> ₦${(amount / 100).toLocaleString()}</p>
                <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Prospective ID:</strong> ${prospectiveId}</p>
              </div>
              <p>Your application is now being processed. You will be notified of further updates.</p>
              <p>Best regards,<br>SAUNI Admissions Team</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the whole request if email fails
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified and recorded successfully",
        transaction: {
          reference: transaction.reference,
          amount: transaction.amount,
          paidAt: transaction.paid_at,
        },
      });
    } else {
      // Update as failed payment
      const failedUpdate = {
        status: "failed",
        gatewayResponse: transaction.gateway_response,
        failedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await update(paymentRef, failedUpdate);
      await update(userPaymentRef, failedUpdate);

      return NextResponse.json(
        {
          success: false,
          message: `Payment not successful: ${transaction.gateway_response || "Transaction failed"}`,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        success: false,
        message: `Internal server error during payment verification: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
