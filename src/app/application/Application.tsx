// components/Application.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import PersonalInfoForm from "./PersonalInfoForm";
import ContactInfoForm from "./ContactInfoForm";
import AcademicHistoryForm from "./AcademicHistoryForm";
import ProgramSelectionForm from "./ProgramSelectionForm";
import ProgressIndicator from "./ProgressIndicator";
import type { Applicant } from "./new_application";
import DocumentsUpload from "./DocumentsUpload";
import DeclarationForm from "./DeclarationForm";
import Link from "next/link";

const Application: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [application, setApplication] = useState<Partial<Applicant>>({
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const steps = [
    "Personal Information",
    "Contact Details",
    "Academic History",
    "Program Selection",
    "Documents Upload",
    "Declaration",
  ];

  const updateApplication = (data: Partial<Applicant>) => {
    setApplication((prev) => ({
      ...prev,
      ...data,
      updatedAt: new Date(),
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = async () => {
    // Firebase integration will go here
    console.log("Submitting application:", application);
    // await saveApplication(application as Applicant);
    alert("Application submitted successfully!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={application.personalInfo}
            updateData={(data) => updateApplication({ personalInfo: data })}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <ContactInfoForm
            data={application.contactInfo}
            updateData={(data) => updateApplication({ contactInfo: data })}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <AcademicHistoryForm
            data={application.academicHistory}
            updateData={(data) => updateApplication({ academicHistory: data })}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <ProgramSelectionForm
            data={application.programSelection}
            updateData={(data) => updateApplication({ programSelection: data })}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <DocumentsUpload
            data={application.documents}
            updateData={(data) => updateApplication({ documents: data })}
            nextStep={nextStep}
            prevStep={prevStep}
            personalInfo={application.personalInfo}
          />
        );
      case 6:
        return (
          <DeclarationForm
            data={application.declaration}
            updateData={(data) => updateApplication({ declaration: data })}
            submitApplication={submitApplication}
            prevStep={prevStep}
            applicationData={application}
          />
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#017840] p-6 text-white">
            <Link href="/">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <Image
                  src="/sauni-logo.png"
                  alt="SAUNI Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
                <h1 className="text-2xl font-bold">
                  Southern Atlantic University Application Form
                </h1>
                <p className="text-gray-100">
                  Complete your application in 6 simple steps
                </p>
              </div>
            </Link>
          </div>

          <ProgressIndicator steps={steps} currentStep={currentStep} />

          <div className="p-6">{renderStep()}</div>
        </div>
      </div>
    </div>
  );
};

export default Application;
