"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  UserCheck,
  GraduationCap,
  Award,
} from "lucide-react";
import { AdmissionRequirements } from "@/app/programs/program_type";
import { Bebas_Neue, Poppins } from "next/font/google";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface AdmissionRequirementsProps {
  requirements: AdmissionRequirements;
}

const AdmissionRequirementsSection = ({
  requirements,
}: AdmissionRequirementsProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("utme");

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500 hover:shadow-md mt-8">
      <h2
        className={`text-3xl font-bold text-[#017840] mb-8 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
      >
        Admission Requirements
      </h2>

      {/* UTME Requirements */}
      <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
        <div
          className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("utme")}
        >
          <h3
            className={`text-xl font-semibold text-[#017840] ${bebasNeue.className} flex items-center`}
          >
            <BookOpen size={24} className="mr-2" />
            UTME Requirements
          </h3>
          {expandedSection === "utme" ? (
            <ChevronUp size={20} className="text-[#017840]" />
          ) : (
            <ChevronDown size={20} className="text-[#017840]" />
          )}
        </div>

        {expandedSection === "utme" && (
          <div className="p-4 bg-white animate-fadeIn">
            <div className="mb-6">
              <h4
                className={`text-lg font-semibold text-gray-800 mb-3 ${bebasNeue.className}`}
              >
                O'Level Requirements
              </h4>
              <ul className="space-y-2">
                {requirements.utme.oLevel.required.map((subject, index) => (
                  <li
                    key={index}
                    className="text-gray-600 font-poppins flex items-start"
                  >
                    <span className="text-green-500 mr-2 mt-1.5">•</span>
                    <span>{subject}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-3 font-poppins italic">
                {requirements.utme.oLevel.notes}
              </p>
            </div>

            <div className="mb-6">
              <h4
                className={`text-lg font-semibold text-gray-800 mb-3 ${bebasNeue.className}`}
              >
                JAMB Subjects
              </h4>
              <ul className="space-y-2">
                {requirements.utme.jambSubjects.map((subject, index) => (
                  <li
                    key={index}
                    className="text-gray-600 font-poppins flex items-start"
                  >
                    <span className="text-green-500 mr-2 mt-1.5">•</span>
                    <span>{subject}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className={`text-lg font-semibold text-gray-800 mb-3 ${bebasNeue.className}`}
              >
                JAMB Score Requirements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-sm text-gray-600 font-poppins">
                    Minimum Score
                  </p>
                  <p className="text-2xl font-bold text-[#017840]">
                    {requirements.utme.jambScore.minimum}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                  <p className="text-sm text-gray-600 font-poppins">
                    Competitive Score
                  </p>
                  <p className="text-2xl font-bold text-[#017840]">
                    {requirements.utme.jambScore.competitive}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3 font-poppins italic">
                {requirements.utme.jambScore.note}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Direct Entry Requirements */}
      <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
        <div
          className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("directEntry")}
        >
          <h3
            className={`text-xl font-semibold text-[#017840] ${bebasNeue.className} flex items-center`}
          >
            <UserCheck size={24} className="mr-2" />
            Direct Entry Requirements
          </h3>
          {expandedSection === "directEntry" ? (
            <ChevronUp size={20} className="text-[#017840]" />
          ) : (
            <ChevronDown size={20} className="text-[#017840]" />
          )}
        </div>

        {expandedSection === "directEntry" && (
          <div className="p-4 bg-white animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.directEntry.options.map((option, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white"
                >
                  <h4
                    className={`font-semibold text-gray-800 mb-2 ${bebasNeue.className}`}
                  >
                    {option.type}
                  </h4>
                  <p className="text-sm text-gray-600 font-poppins">
                    {option.requirements}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4 font-poppins italic">
              {requirements.directEntry.note}
            </p>
          </div>
        )}
      </div>

      {/* Other Requirements */}
      <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
        <div
          className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("other")}
        >
          <h3
            className={`text-xl font-semibold text-[#017840] ${bebasNeue.className} flex items-center`}
          >
            <GraduationCap size={24} className="mr-2" />
            Other Requirements
          </h3>
          {expandedSection === "other" ? (
            <ChevronUp size={20} className="text-[#017840]" />
          ) : (
            <ChevronDown size={20} className="text-[#017840]" />
          )}
        </div>

        {expandedSection === "other" && (
          <div className="p-4 bg-white animate-fadeIn">
            <ul className="space-y-3">
              {requirements.otherRequirements.map((requirement, index) => (
                <li
                  key={index}
                  className="text-gray-600 font-poppins flex items-start"
                >
                  <span className="text-green-500 mr-2 mt-1.5">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Grading System */}
      <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
        <div
          className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("grading")}
        >
          <h3
            className={`text-xl font-semibold text-[#017840] ${bebasNeue.className} flex items-center`}
          >
            <Award size={24} className="mr-2" />
            Grading System
          </h3>
          {expandedSection === "grading" ? (
            <ChevronUp size={20} className="text-[#017840]" />
          ) : (
            <ChevronDown size={20} className="text-[#017840]" />
          )}
        </div>

        {expandedSection === "grading" && (
          <div className="p-4 bg-white animate-fadeIn">
            <p className="text-sm text-gray-600 font-poppins mb-4">
              <span className="font-semibold">Scale:</span>{" "}
              {requirements.gradingSystem.scale}
            </p>
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4
                className={`font-semibold text-gray-800 mb-3 ${bebasNeue.className}`}
              >
                Grade Classification
              </h4>
              <ul className="space-y-2">
                {requirements.gradingSystem.details
                  .split(", ")
                  .map((grade, index) => (
                    <li
                      key={index}
                      className="text-gray-600 font-poppins text-sm"
                    >
                      {grade}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdmissionRequirementsSection;
