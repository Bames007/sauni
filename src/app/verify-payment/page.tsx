// app/verify-payment/page.tsx
import { Suspense } from "react";
import VerifyPayment from "./VerifyPayment";

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPayment />
    </Suspense>
  );
}
