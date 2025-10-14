import React, { useState, useCallback } from "react";
import { ref, set } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import { createClient } from "@/app/utils/supabase/clients";
import SuccessMessage from "./SuccessMessage";

// Import or define the types (assuming they're in a types file)
interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  nationality?: string;
  countryOfResidence?: string;
  isNigerian?: boolean;
  stateOfOrigin?: string;
  localGovernment?: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  guardianContact: {
    fullName: string;
    relationship: string;
    phone: string;
    email?: string;
  };
}

interface ProgramSelection {
  firstChoice: string;
  secondChoice?: string;
  entryYear: number;
  semester: "Fall" | "Spring";
  modeOfStudy: "Full-time" | "Part-time";
}

interface FileInfo {
  name: string;
  file?: File;
  url?: string;
  path?: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

interface ApplicationDocuments {
  passportPhoto: FileInfo;
  birthCertificate: FileInfo;
  academicTranscripts: FileInfo[];
  primaryCertificate?: FileInfo;
  secondaryCertificate?: FileInfo;
  waecNeco?: FileInfo;
  identificationDocument?: FileInfo;
  recommendationLetters?: FileInfo[];
  personalStatement?: FileInfo;
  otherDocuments?: FileInfo[];
}

interface ApplicationData {
  personalInfo?: PersonalInfo;
  contactInfo?: ContactInfo;
  programSelection?: ProgramSelection;
  documents?: ApplicationDocuments;
  [key: string]: unknown;
}

interface Declaration {
  isInformationAccurate: boolean;
  agreeToTerms: boolean;
  signature: string;
  date: Date;
}

interface DeclarationFormProps {
  data?: Declaration;
  updateData: (data: Declaration) => void;
  submitApplication: () => void;
  prevStep: () => void;
  applicationData: ApplicationData;
  resetApplication?: () => void;
}

const DeclarationForm: React.FC<DeclarationFormProps> = ({
  data,
  updateData,
  submitApplication,
  prevStep,
  applicationData,
  resetApplication,
}) => {
  const [formData, setFormData] = useState<Declaration>(
    data || {
      isInformationAccurate: false,
      agreeToTerms: false,
      signature: "",
      date: new Date(),
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prospectiveId, setProspectiveId] = useState<string | null>(null);

  const supabase = createClient();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const generateProspectiveId = useCallback(() => {
    const year = new Date().getFullYear().toString().slice(-2);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `SAUNI${year}${randomNum}`;
  }, []);

  const generatePassword = useCallback(() => {
    return Math.random().toString(36).slice(-8);
  }, []);

  const uploadToSupabaseStorage = useCallback(
    async (file: File, prospectiveId: string, docType: string) => {
      try {
        const fileExtension = file.name.split(".").pop();
        const fileName = `${docType}_${Date.now()}.${fileExtension}`;
        const filePath = `applications/${prospectiveId}/${docType}/${fileName}`;

        const { error } = await supabase.storage
          .from("Southern Atlantic University")
          .upload(filePath, file);

        if (error) {
          throw new Error(`Supabase upload error: ${error.message}`);
        }

        const { data: urlData } = supabase.storage
          .from("Southern Atlantic University")
          .getPublicUrl(filePath);

        return {
          name: file.name,
          supabaseFileName: fileName,
          filePath: filePath,
          url: urlData.publicUrl,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
          status: "uploaded_to_supabase",
        };
      } catch (error) {
        console.error(`Supabase upload failed for ${docType}:`, error);
        throw error;
      }
    },
    [supabase]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        updateData(formData);

        const generatedProspectiveId = generateProspectiveId();
        const tempPassword = generatePassword();

        // Store the prospectiveId in state for SuccessMessage
        setProspectiveId(generatedProspectiveId);

        const documents: Record<string, unknown> = {};

        if (applicationData.documents) {
          for (const [docType, fileInfo] of Object.entries(
            applicationData.documents
          )) {
            if (fileInfo && (fileInfo as FileInfo).file) {
              const file = (fileInfo as FileInfo).file as File;

              try {
                const supabaseResult = await uploadToSupabaseStorage(
                  file,
                  generatedProspectiveId,
                  docType
                );
                documents[docType] = supabaseResult;
              } catch (uploadError) {
                console.warn(
                  `Supabase upload failed for ${docType}:`,
                  uploadError
                );
                documents[docType] = {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  uploadedAt: new Date(),
                  status: "supabase_upload_failed",
                  error:
                    uploadError instanceof Error
                      ? uploadError.message
                      : "Upload failed",
                };
              }
            }
          }
        }

        const completeApplication = {
          ...applicationData,
          documents,
          declaration: formData,
          prospectiveId: generatedProspectiveId,
          tempPassword,
          status: "submitted",
          submittedAt: new Date().toISOString(),
          storageStatus: "supabase_storage_enabled",
        };

        const requiredFields = {
          email: completeApplication.contactInfo?.email,
          firstName: completeApplication.personalInfo?.firstName,
          lastName: completeApplication.personalInfo?.lastName,
          program: completeApplication.programSelection?.firstChoice,
        };

        const missingFields = Object.entries(requiredFields)
          .filter(([value]) => !value)
          .map(([field]) => field);

        if (missingFields.length > 0) {
          throw new Error(
            `Missing required application fields: ${missingFields.join(", ")}. Please complete all sections of the application.`
          );
        }

        const email = completeApplication.contactInfo?.email;
        const firstName = completeApplication.personalInfo?.firstName;
        const lastName = completeApplication.personalInfo?.lastName;
        const program = completeApplication.programSelection?.firstChoice;

        if (!email || !firstName || !lastName || !program) {
          throw new Error(
            "Application data is incomplete. Please check your contact information, personal details, and program selection."
          );
        }

        const sanitizedApplication = JSON.parse(
          JSON.stringify(completeApplication)
        );

        await set(
          ref(db, `applications/students/${generatedProspectiveId}`),
          sanitizedApplication
        );

        const dynamicLink = `https://sauni.edu.ng/application_status/`;

        const emailData = {
          email: email,
          prospectiveId: generatedProspectiveId,
          password: tempPassword,
          fullName: `${firstName} ${lastName}`.trim(),
          program: program,
          applicationLink: dynamicLink,
          storageNotice: "",
        };

        const emailResponse = await fetch("/api/send_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error("Email API Response:", errorText);
          throw new Error(`Email sending failed: ${errorText}`);
        }

        setShowSuccess(true);
      } catch (err) {
        console.error("Submission error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to submit application. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      applicationData,
      updateData,
      generateProspectiveId,
      generatePassword,
      uploadToSupabaseStorage,
    ]
  );

  if (showSuccess) {
    return (
      <SuccessMessage
        prospectiveId={prospectiveId}
        onReset={resetApplication}
        countdownSeconds={5}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Declaration</h2>
        <p className="text-gray-600 mt-1">
          Review and confirm your application
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-4">Important Notice</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <p>
              I declare that the information given in this application is true,
              complete and accurate to the best of my knowledge. I understand
              that any false or misleading information may result in the
              rejection of my application or termination of my registration.
            </p>
            <p>
              I authorize the university to verify the information provided in
              this application and to obtain any relevant information from
              appropriate sources, including educational institutions,
              employers, and professional bodies.
            </p>
            <p>
              I understand that I am responsible for paying all applicable fees
              and that my admission is subject to the availability of places and
              meeting all admission requirements.
            </p>
            <p>
              I have read and agree to abide by the rules and regulations of the
              university as may be amended from time to time.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="isInformationAccurate"
                name="isInformationAccurate"
                type="checkbox"
                checked={formData.isInformationAccurate}
                onChange={handleChange}
                required
                className="focus:ring-green-800 h-4 w-4 text-green-800 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="isInformationAccurate"
                className="font-medium text-gray-700"
              >
                I declare that all information provided is true and accurate
              </label>
              <p className="text-gray-500">
                You must confirm that your application information is correct
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="focus:ring-green-800 h-4 w-4 text-green-800 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="agreeToTerms"
                className="font-medium text-gray-700"
              >
                I agree to the terms and conditions
              </label>
              <p className="text-gray-500">
                You must accept the terms and conditions to proceed
              </p>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="signature"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Signature <span className="text-yellow-600">*</span>
          </label>
          <input
            type="text"
            id="signature"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            required
            placeholder="Type your full name as signature"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800 transition-colors"
          />
          <p className="mt-1 text-sm text-gray-500">
            By typing your name, you are providing an electronic signature
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <h3 className="font-medium text-green-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure Document Storage
          </h3>
          <p className="text-sm text-green-600 mt-1">
            Your documents will be securely uploaded to our encrypted storage
            system.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
          <h3 className="font-medium text-amber-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-1a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Final Submission
          </h3>
          <p className="text-sm text-amber-600 mt-1">
            After submitting, you will not be able to make changes to your
            application. Please review all information carefully before
            proceeding.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800 transition-colors"
            disabled={isSubmitting}
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !formData.isInformationAccurate ||
              !formData.agreeToTerms ||
              !formData.signature ||
              isSubmitting
            }
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(DeclarationForm);
