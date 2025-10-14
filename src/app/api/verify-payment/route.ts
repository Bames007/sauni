import { db } from "@/app/utils/firebaseConfig";
import { ref, update } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { reference, prospectiveId, email, amount } = await request.json();

    // Update payment status to "verifying"
    const paymentRef = ref(
      db,
      `applications/students/${prospectiveId}/payments/${reference}`
    );
    await update(paymentRef, {
      status: "verifying",
      verifiedAt: new Date().toISOString(),
    });

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

    const verificationData = await verifyResponse.json();

    if (!verificationData.status || !verificationData.data) {
      // Update as failed verification
      await update(paymentRef, {
        status: "verification_failed",
        verificationError: "Invalid verification response",
      });

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
        await update(paymentRef, {
          status: "amount_mismatch",
          paidAmount: transaction.amount,
          expectedAmount: amount,
        });

        return NextResponse.json(
          { success: false, message: "Payment amount mismatch" },
          { status: 400 }
        );
      }

      // Update payment as successful
      await update(paymentRef, {
        status: "success",
        paidAmount: transaction.amount,
        channel: transaction.channel,
        paidAt: transaction.paid_at,
        gatewayResponse: transaction.gateway_response,
      });

      // Update application status (your existing code)
      const applicationRef = ref(db, `applications/students/${prospectiveId}`);
      await update(applicationRef, {
        paymentStatus: "paid",
        amountPaid: amount / 100,
        paystackReference: reference,
        paidAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update payments array
      const paymentsRef = ref(
        db,
        `applications/students/${prospectiveId}/payments`
      );
      await update(paymentsRef, {
        application_fee: {
          status: "paid",
          paidAt: new Date().toISOString(),
          paystackReference: reference,
          amount: amount / 100,
        },
      });

      // Send email (your existing code)
      try {
        await resend.emails.send({
          from: "SAUNI Admissions <onboarding@resend.dev>",
          to: email,
          subject: "SAUNI - Application Fee Payment Confirmed",
          html: `...your email template...`,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
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
      await update(paymentRef, {
        status: "failed",
        gatewayResponse: transaction.gateway_response,
      });

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
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during payment verification",
      },
      { status: 500 }
    );
  }
}
