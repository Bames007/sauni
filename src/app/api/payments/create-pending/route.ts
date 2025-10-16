import { db } from "@/app/utils/firebaseConfig";
import { ref, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { reference, prospectiveId, email, amount, paymentType, status } =
      await request.json();

    const paymentData = {
      prospectiveId,
      email,
      amount,
      paymentType,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in global payments collection
    const globalPaymentRef = ref(db, `payments/${reference}`);
    await set(globalPaymentRef, paymentData);

    // Also store under user's payments
    const userPaymentRef = ref(
      db,
      `applications/students/${prospectiveId}/payments/${reference}`
    );
    await set(userPaymentRef, paymentData);

    return NextResponse.json({
      success: true,
      message: "Pending payment record created",
      reference: reference,
    });
  } catch (error) {
    console.error("Error creating pending payment:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating pending payment record",
      },
      { status: 500 }
    );
  }
}
