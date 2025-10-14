import React from "react";
import Link from "next/link";

const RecruitmentAD = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Main container with gradient background and shadow */}
      <div
        className="rounded-2xl shadow-lg p-8 md:p-12 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #017840 0%, #BD9946 100%)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text content section */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Build Your Career at Southern Atlantic University
            </h2>
            <p className="text-lg md:text-xl text-white opacity-90 mb-2">
              Join Our Team of Dedicated Professionals
            </p>
            <p className="text-white opacity-80 mb-6 max-w-2xl">
              We&apos;re looking for talented individuals who are passionate
              about education and innovation. Grow your career in a supportive
              environment that values excellence and professional development.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-xl">
              <div className="flex items-center text-white">
                <svg
                  className="w-5 h-5 mr-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Competitive Compensation</span>
              </div>
              <div className="flex items-center text-white">
                <svg
                  className="w-5 h-5 mr-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Professional Development</span>
              </div>
              <div className="flex items-center text-white">
                <svg
                  className="w-5 h-5 mr-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Comprehensive Benefits</span>
              </div>
              <div className="flex items-center text-white">
                <svg
                  className="w-5 h-5 mr-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Collaborative Environment</span>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <div className="text-center lg:text-right">
              <p className="text-white text-sm opacity-80 mb-1">
                Ready to join our team?
              </p>
              <p className="text-white font-semibold text-lg">
                Explore Career Opportunities
              </p>
            </div>

            {/* Apply Now Button */}
            <Link
              href="home/recruitment"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-green-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ minWidth: "160px" }}
            >
              View Openings
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            <p className="text-white text-xs opacity-70 text-center lg:text-right max-w-xs">
              Multiple positions available across all departments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentAD;
