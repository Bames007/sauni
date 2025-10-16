import { db } from "@/app/utils/firebaseConfig";
import { ref, update, get } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    const signature = request.headers.get("x-paystack-signature");

    if (hash !== signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const transaction = event.data;

      // Find the payment record by reference
      const paymentRef = ref(db, `payments/${transaction.reference}`);
      const paymentSnapshot = await get(paymentRef);

      if (paymentSnapshot.exists()) {
        const paymentData = paymentSnapshot.val();

        // Update payment record as successful
        const successUpdate = {
          status: "success",
          paidAmount: transaction.amount,
          channel: transaction.channel,
          paidAt: transaction.paid_at,
          gatewayResponse: transaction.gateway_response,
          currency: transaction.currency,
          fees: transaction.fees,
          updatedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          webhookReceived: true,
        };

        await update(paymentRef, successUpdate);

        // Also update user's payment record
        const userPaymentRef = ref(
          db,
          `applications/students/${paymentData.prospectiveId}/payments/${transaction.reference}`
        );
        await update(userPaymentRef, successUpdate);

        // Update application status
        const applicationRef = ref(
          db,
          `applications/students/${paymentData.prospectiveId}`
        );
        await update(applicationRef, {
          paymentStatus: "paid",
          amountPaid: transaction.amount / 100,
          paystackReference: transaction.reference,
          paidAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        // Update application_fee payment summary
        const applicationFeeRef = ref(
          db,
          `applications/students/${paymentData.prospectiveId}/payments/application_fee`
        );
        await update(applicationFeeRef, {
          status: "paid",
          paidAt: new Date().toISOString(),
          paystackReference: transaction.reference,
          amount: transaction.amount / 100,
          reference: transaction.reference,
          verifiedAt: new Date().toISOString(),
        });
      }

      return NextResponse.json({ success: true, message: "Webhook processed" });
    }

    return NextResponse.json({ success: true, message: "Event not handled" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
