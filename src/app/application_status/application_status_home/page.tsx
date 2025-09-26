"use client";

import React, { Suspense } from "react";
import ApplicationStatusHomeContent from "./ApplicationStatusHomeContent";

export default function ApplicationStatusHome() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] to-[#fefaf0] flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#017840] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading application...</p>
          </div>
        </div>
      }
    >
      <ApplicationStatusHomeContent />
    </Suspense>
  );
}
