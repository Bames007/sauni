import { NextRequest, NextResponse } from "next/server";
import { ref, update } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";

export async function POST(request: NextRequest) {
  try {
    const { email, amount, prospectiveId, paymentType } = await request.json();

    if (!email || !amount || !prospectiveId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize transaction with Paystack from SERVER (secure)
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount,
          reference: `${prospectiveId}_${Date.now()}`,
          callback_url: `${process.env.NEXTAUTH_URL}/api/verify-payment`,
          metadata: {
            custom_fields: [
              {
                display_name: "Prospective ID",
                variable_name: "prospective_id",
                value: prospectiveId,
              },
              {
                display_name: "Payment Type",
                variable_name: "payment_type",
                value: paymentType,
              },
            ],
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.json(
        { success: false, message: paystackData.message },
        { status: 400 }
      );
    }

    // Create payment record in Firebase
    const paymentRef = ref(
      db,
      `applications/students/${prospectiveId}/payments/${paystackData.data.reference}`
    );

    await update(paymentRef, {
      reference: paystackData.data.reference,
      amount: amount,
      status: "initialized",
      paymentType: paymentType,
      initializedAt: new Date().toISOString(),
      email: email,
      accessCode: paystackData.data.access_code,
    });

    return NextResponse.json({
      success: true,
      authorizationUrl: paystackData.data.authorization_url,
      accessCode: paystackData.data.access_code,
      reference: paystackData.data.reference,
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
