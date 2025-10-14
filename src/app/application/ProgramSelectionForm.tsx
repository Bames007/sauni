// // components/application/ProgramSelectionForm.tsx
// "use client";

// import React, { useState } from "react";
// import type { Program, ProgramSelection } from "./new_application";
// import { Info } from "lucide-react";

// interface ProgramSelectionFormProps {
//   data?: ProgramSelection;
//   updateData: (data: ProgramSelection) => void;
//   nextStep: () => void;
//   prevStep: () => void;
// }

// const ProgramSelectionForm: React.FC<ProgramSelectionFormProps> = ({
//   data,
//   updateData,
//   nextStep,
//   prevStep,
// }) => {
//   const [formData, setFormData] = useState<ProgramSelection>(
//     data || {
//       firstChoice: "" as Program,
//       secondChoice: undefined,
//       entryYear: new Date().getFullYear() + 1,
//       semester: "Fall",
//       modeOfStudy: "Full-time",
//     }
//   );

//   const programs: Program[] = [
//     "BSc Accounting",
//     "BSc Business Administration",
//     "BSc Hospitality & Tourism Management",
//     "BSc Public Administration",
//     "BSc Criminology & Security Studies",
//     "BSc Political Science",
//     "BSc Petroleum Chemistry",
//     "BSc International Relations & Diplomacy",
//     "BSc Economics",
//     "BSc Information & Communication Technology (ICT)",
//     "BSc Microbiology",
//     "BSc Physics with Electronics",
//     "BSc Computer Science",
//     "BSc Software Engineering",
//     "BSc Cyber Security",
//   ];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "entryYear" ? parseInt(value) : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     updateData(formData);
//     nextStep();
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-lg">
//       <div className="mb-6 md:mb-8 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-[#017840] mb-2">
//           Program Selection
//         </h1>
//         <p className="text-sm md:text-base text-gray-600">
//           Choose your preferred programs of study
//         </p>
//         <div className="w-20 md:w-24 h-1 bg-[#BD9946] mx-auto mt-3 md:mt-4 rounded-full"></div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
//         {/* Program Choices */}
//         <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
//           <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
//             Program Preferences
//           </h2>

//           <div className="grid grid-cols-1 gap-4 md:gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 First Choice Program <span className="text-[#BD9946]">*</span>
//               </label>
//               <select
//                 name="firstChoice"
//                 value={formData.firstChoice}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all"
//               >
//                 <option value="">Select your first choice</option>
//                 {programs.map((program) => (
//                   <option key={program} value={program}>
//                     {program}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Second Choice Program
//               </label>
//               <select
//                 name="secondChoice"
//                 value={formData.secondChoice || ""}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all"
//               >
//                 <option value="">Select your second choice (optional)</option>
//                 {programs.map((program) => (
//                   <option key={program} value={program}>
//                     {program}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Program Details */}
//         <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
//           <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
//             Program Details
//           </h2>

//           <div className="grid grid-cols-1 gap-4 md:gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Intended Entry Year <span className="text-[#BD9946]">*</span>
//               </label>
//               <select
//                 name="entryYear"
//                 value={formData.entryYear}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all"
//               >
//                 {Array.from({ length: 5 }, (_, i) => {
//                   const year = new Date().getFullYear() + i;
//                   return (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Mode of Study
//               </label>
//               <select
//                 name="modeOfStudy"
//                 value={formData.modeOfStudy}
//                 onChange={handleChange}
//                 disabled
//                 className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none transition-all"
//               >
//                 <option value="Full-time">Full-time</option>
//               </select>
//               <p className="text-xs text-gray-500 mt-2">
//                 All programs are currently Full-time only
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Information Alert */}
//         <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               <Info className="h-5 w-5 text-blue-600 mt-0.5" />
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-blue-800">
//                 Important Information
//               </h3>
//               <p className="text-xs md:text-sm text-blue-700 mt-1">
//                 Your program selection will determine the admission
//                 requirements. Please ensure you meet the prerequisites for your
//                 chosen programs.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 pt-4">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="flex items-center justify-center px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:ring-opacity-50 transition-all"
//           >
//             ← Back
//           </button>
//           <button
//             type="submit"
//             className="flex items-center justify-center px-4 sm:px-6 py-3 bg-[#017840] text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#BD9946] focus:ring-opacity-50 transition-all shadow-md hover:shadow-lg"
//           >
//             Save & Continue →
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProgramSelectionForm;
// components/application/ProgramSelectionForm.tsx
"use client";

import React, { useState } from "react";
import type { Program, ProgramSelection } from "./new_application";
import { Info } from "lucide-react";

interface ProgramSelectionFormProps {
  data?: ProgramSelection;
  updateData: (data: ProgramSelection) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const ProgramSelectionForm: React.FC<ProgramSelectionFormProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [formData, setFormData] = useState<ProgramSelection>(
    data || {
      firstChoice: "" as Program,
      secondChoice: undefined,
      entryYear: new Date().getFullYear() + 1,
      semester: "Fall",
      modeOfStudy: "Full-time",
    }
  );

  const programs: Program[] = [
    "BSc Accounting",
    "BSc Business Administration",
    "BSc Hospitality & Tourism Management",
    "BSc Public Administration",
    "BSc Criminology & Security Studies",
    "BSc Political Science",
    "BSc Petroleum Chemistry",
    "BSc International Relations & Diplomacy",
    "BSc Economics",
    "BSc Information & Communication Technology (ICT)",
    "BSc Microbiology",
    "BSc Physics with Electronics",
    "BSc Computer Science",
    "BSc Software Engineering",
    "BSc Cyber Security",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(formData);
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#017840] mb-2">
          Program Selection
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Choose your preferred programs of study
        </p>
        <div className="w-20 md:w-24 h-1 bg-[#BD9946] mx-auto mt-3 md:mt-4 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Program Choices */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
            Program Preferences
          </h2>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Choice Program <span className="text-[#BD9946]">*</span>
              </label>
              <select
                name="firstChoice"
                value={formData.firstChoice}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all"
              >
                <option value="">Select your first choice</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Choice Program
              </label>
              <select
                name="secondChoice"
                value={formData.secondChoice || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all"
              >
                <option value="">Select your second choice (optional)</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
            Program Details
          </h2>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {/* Only 2025/2026 Session */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intended Entry Year <span className="text-[#BD9946]">*</span>
              </label>
              <select
                name="entryYear"
                value={formData.entryYear}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all"
              >
                <option value="2025/2026 Session">2025/2026 Session</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode of Study
              </label>
              <select
                name="modeOfStudy"
                value={formData.modeOfStudy}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none transition-all"
              >
                <option value="Full-time">Full-time</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                All programs are currently Full-time only
              </p>
            </div>
          </div>
        </div>

        {/* Information Alert */}
        <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Important Information
              </h3>
              <p className="text-xs md:text-sm text-blue-700 mt-1">
                Your program selection will determine the admission
                requirements. Please ensure you meet the prerequisites for your
                chosen programs.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center justify-center px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:ring-opacity-50 transition-all"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="flex items-center justify-center px-4 sm:px-6 py-3 bg-[#017840] text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#BD9946] focus:ring-opacity-50 transition-all shadow-md hover:shadow-lg"
          >
            Save & Continue →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramSelectionForm;
