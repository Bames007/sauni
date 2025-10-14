import { NextRequest, NextResponse } from "next/server";
import { ref, update } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { reference, prospectiveId, email, amount } = await request.json();

    if (!reference || !prospectiveId || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Verify transaction with Paystack
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
      // Convert amount from kobo to Naira for display
      const amountInNaira = amount / 100;

      // Update Firebase Database
      const applicationRef = ref(db, `applications/students/${prospectiveId}`);

      await update(applicationRef, {
        paymentStatus: "paid",
        amountPaid: amountInNaira,
        paystackReference: reference,
        paidAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update payments array in Firebase
      const paymentsRef = ref(
        db,
        `applications/students/${prospectiveId}/payments`
      );
      await update(paymentsRef, {
        application_fee: {
          status: "paid",
          paidAt: new Date().toISOString(),
          paystackReference: reference,
        },
      });

      // Send confirmation email using Resend
      try {
        await resend.emails.send({
          from: "SAUNI Admissions <onboarding@resend.dev>",
          to: email,
          subject: "SAUNI - Application Fee Payment Confirmed",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #017840;">Payment Confirmed!</h2>
              <p>Dear Applicant,</p>
              <p>Your application fee payment has been successfully processed.</p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #017840; margin-top: 0;">Payment Details:</h3>
                <p><strong>Amount:</strong> ₦${amountInNaira.toLocaleString()}</p>
                <p><strong>Transaction Reference:</strong> ${reference}</p>
                <p><strong>Prospective ID:</strong> ${prospectiveId}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>

              <p>Your application will now proceed to the next stage of review.</p>
              <p>You can check your application status anytime in your portal.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #666; font-size: 14px;">
                  Best regards,<br>
                  <strong>SAUNI Admissions Team</strong><br>
                  Southern Atlantic University<br>
                  admissions@sauni.edu<br>
                  +234 812 772 8084
                </p>
              </div>
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
