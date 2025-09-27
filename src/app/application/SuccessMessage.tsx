import {
  AlarmClock,
  CheckCheckIcon,
  Mail,
  MailIcon,
  Monitor,
  Phone,
  RefreshCcw,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface SuccessMessageProps {
  prospectiveId?: string | null; // Change to accept null
  onReset?: () => void;
  countdownSeconds?: number;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  prospectiveId,
  onReset,
  countdownSeconds = 5,
}) => {
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (timeLeft === 0) {
      // Redirect to application status page
      if (prospectiveId) {
        window.location.href = `/application_status/application_status_home?pid=${prospectiveId}`;
      } else {
        window.location.href = "/";
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, prospectiveId]);

  const handleManualRedirect = () => {
    if (prospectiveId) {
      window.location.href = `/application_status/application_status_home?pid=${prospectiveId}`;
    }
  };

  const handleResetApplication = () => {
    if (onReset) {
      onReset();
    } else {
      // Fallback: redirect to application start
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Success Icon */}
        <div className="text-center">
          <div className="mx-auto w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mt-4">
            Application Submitted Successfully!
          </h2>

          {/* Countdown Timer */}
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <p className="text-blue-700 text-sm font-medium flex items-center justify-center">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Redirecting in {timeLeft} seconds...
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Email Instructions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Next Steps
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-start">
                <span className="text-green-600 mr-2">
                  <MailIcon className="w-4 h-4 mt-0.5" />
                </span>
                <span>
                  <strong>Check your email:</strong> Your prospective student ID
                  and temporary password have been sent to your email address.
                </span>
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">
                  <Monitor className="w-4 h-4 mt-0.5" />
                </span>
                <span>
                  <strong>Monitor your application:</strong> Use the button
                  below to track your admission progress and status updates.
                </span>
              </p>
              <p className="flex items-start">
                <span className="text-purple-600 mr-2">
                  <AlarmClock className="w-4 h-4 mt-0.5" />
                </span>
                <span>
                  <strong>Regular checks:</strong> We recommend checking your
                  application status regularly for updates and required actions.
                </span>
              </p>
            </div>
          </div>

          {/* Secure Storage Confirmation */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm flex items-center">
              <CheckCheckIcon className="w-4 h-4 mr-2" />
              Your documents have been securely saved to our encrypted system.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleManualRedirect}
              className="flex-1 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium text-center flex items-center justify-center"
            >
              Check Application Status
            </button>

            <button
              onClick={handleResetApplication}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center flex items-center justify-center"
            >
              Submit Another Application
            </button>
          </div>

          {/* Quick Links */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              Need help? Contact admissions:
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs">
              <a
                href="mailto:admissions@sauniversity.edu"
                className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
              >
                <Mail className="w-3 h-3 mr-1" />
                admissions@sauniversity.edu
              </a>
              <a
                href="tel:+2348127728084"
                className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
              >
                <Phone className="w-3 h-3 mr-1" />
                +234 (812) 772 8084
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
