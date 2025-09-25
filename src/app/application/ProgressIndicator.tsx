"use client";

import React, { useMemo } from "react";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  const progressWidth = useMemo(
    () => `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
    [currentStep, steps.length]
  );

  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
      <div className="flex justify-between relative mb-2 sm:mb-0">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 transform translate-y-1/2 -translate-x-1/4" />

        {/* Progress line */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-green-600 transform translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{ width: progressWidth }}
        />

        {steps.map((step, index) => {
          const isCompleted = index + 1 <= currentStep;
          const stepNumber = index + 1;
          const isCurrent = index + 1 === currentStep;

          return (
            <div
              key={step}
              className="flex flex-col items-center z-10 relative"
            >
              {/* Step Circle */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-gray-200 text-gray-600"
                } ${isCurrent ? "ring-4 ring-green-100 scale-110" : ""}`}
              >
                {stepNumber}
              </div>

              {/* Step Label (hidden on mobile, shown on sm+) */}
              <div
                className={`hidden sm:block text-xs mt-2 text-center transition-colors duration-300 max-w-[80px] ${
                  isCompleted ? "text-green-700 font-medium" : "text-gray-500"
                } ${isCurrent ? "font-bold" : ""}`}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile step info (only shows current step) */}
      <div className="sm:hidden mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
        <p className="text-xs text-green-800 font-medium">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
        </p>
      </div>
    </div>
  );
};

export default React.memo(ProgressIndicator);
