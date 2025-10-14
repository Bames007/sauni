"use client";

import React, { useState, useCallback } from "react";
import { ref, set } from "firebase/database";
import { db } from "@/app/utils/firebaseConfig";
import { createClient } from "@/app/utils/supabase/clients";
import SuccessMessage from "@/app/application/SuccessMessage";

// Types for Staff Recruitment Application
interface StaffPersonalInfo {
  staffId?: string;
  firstName: string;
  lastName: string;
  currentPosition?: string;
  department: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  nationality?: string;
  countryOfResidence?: string;
}

interface StaffContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  emergencyContact: {
    fullName: string;
    relationship: string;
    phone: string;
    email?: string;
  };
}

interface RoleApplication {
  appliedRole: string;
  preferredStartDate: Date;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Temporary";
  yearsOfExperience: number;
  currentSalary?: string;
  expectedSalary?: string;
  skills: string[];
  availability: string;
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

interface StaffApplicationDocuments {
  resume: FileInfo;
  coverLetter?: FileInfo;
  academicCertificates: FileInfo[];
  professionalCertifications?: FileInfo[];
  identificationDocument: FileInfo;
  referenceLetters?: FileInfo[];
  portfolio?: FileInfo;
  otherDocuments?: FileInfo[];
}

interface StaffApplicationData {
  personalInfo?: StaffPersonalInfo;
  contactInfo?: StaffContactInfo;
  roleApplication?: RoleApplication;
  documents?: StaffApplicationDocuments;
  [key: string]: unknown;
}

interface Declaration {
  isInformationAccurate: boolean;
  agreeToTerms: boolean;
  agreeToBackgroundCheck: boolean;
  signature: string;
  date: Date;
}

interface RecruitmentApplicationPageProps {
  initialData?: StaffApplicationData;
  onSubmitSuccess?: (applicationId: string) => void;
}

// Predefined positions for dropdown
const AVAILABLE_POSITIONS = [
  "Administrative Assistant",
  "Academic Advisor",
  "Admissions Counselor",
  "HR Specialist",
  "IT Support Technician",
  "Finance Officer",
  "Research Assistant",
  "Laboratory Technician",
  "Library Assistant",
  "Facilities Coordinator",
  "Student Services Coordinator",
  "Marketing Specialist",
  "Development Officer",
  "Registrar Officer",
  "Campus Safety Officer",
  "Other",
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "South Korea",
  "Brazil",
  "India",
  "Other",
];

const STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const RecruitmentApplicationPage: React.FC<RecruitmentApplicationPageProps> = ({
  initialData,
  onSubmitSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationData, setApplicationData] = useState<StaffApplicationData>(
    initialData || {}
  );
  const [declarationData, setDeclarationData] = useState<Declaration>({
    isInformationAccurate: false,
    agreeToTerms: false,
    agreeToBackgroundCheck: false,
    signature: "",
    date: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prospectiveId, setProspectiveId] = useState<string | null>(null);

  const supabase = createClient();

  // Update application data helper
  // Type-safe update function
  const updateApplicationData = <T extends keyof StaffApplicationData>(
    section: T,
    field: keyof Required<StaffApplicationData>[T],
    value: any
  ) => {
    setApplicationData((prev) => {
      const currentSection = prev[section] || {};
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: value,
        },
      };
    });
  };

  // Special handler for nested objects like emergencyContact
  const updateNestedApplicationData = (
    section: keyof StaffApplicationData,
    nestedObject: string,
    field: string,
    value: any
  ) => {
    setApplicationData((prev) => {
      const currentSection = prev[section] || {};
      const currentNested = (currentSection as any)?.[nestedObject] || {};

      return {
        ...prev,
        [section]: {
          ...currentSection,
          [nestedObject]: {
            ...currentNested,
            [field]: value,
          },
        },
      };
    });
  };

  // File size validation (2MB limit)
  const validateFileSize = (file: File, maxSizeMB: number = 2): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  };

  const uploadToSupabaseStorage = useCallback(
    async (file: File, staffId: string, docType: string) => {
      if (!validateFileSize(file, 2)) {
        throw new Error(
          `File "${file.name}" exceeds 2MB size limit. Please upload a smaller file.`
        );
      }

      try {
        const fileExtension = file.name.split(".").pop();
        const fileName = `${docType}_${Date.now()}.${fileExtension}`;
        const filePath = `staff-applications/${staffId}/${docType}/${fileName}`;

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

  const generateStaffId = useCallback(() => {
    const year = new Date().getFullYear().toString().slice(-2);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `STAFF${year}${randomNum}`;
  }, []);

  const handleSubmitApplication = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        const generatedStaffId = generateStaffId();
        setProspectiveId(generatedStaffId);

        // Upload documents to Supabase
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
                  generatedStaffId,
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
          declaration: declarationData,
          staffId: generatedStaffId,
          status: "submitted",
          submittedAt: new Date().toISOString(),
          applicationType: "staff",
          storageStatus: "supabase_storage_enabled",
        };

        // Validate required fields
        const requiredFields = {
          email: completeApplication.contactInfo?.email,
          firstName: completeApplication.personalInfo?.firstName,
          lastName: completeApplication.personalInfo?.lastName,
          appliedRole: completeApplication.roleApplication?.appliedRole,
          phone: completeApplication.contactInfo?.phone,
        };

        const missingFields = Object.entries(requiredFields)
          .filter(([_, value]) => !value)
          .map(([field]) => field);

        if (missingFields.length > 0) {
          throw new Error(
            `Missing required fields: ${missingFields.join(", ")}. Please complete all sections.`
          );
        }

        const sanitizedApplication = JSON.parse(
          JSON.stringify(completeApplication)
        );

        // Save to Firebase Realtime Database
        await set(
          ref(db, `applications/staff/${generatedStaffId}`),
          sanitizedApplication
        );

        setShowSuccess(true);
        onSubmitSuccess?.(generatedStaffId);
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
      applicationData,
      declarationData,
      generateStaffId,
      uploadToSupabaseStorage,
      onSubmitSuccess,
    ]
  );

  // Enhanced form steps with better UI
  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-600 mt-1">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={applicationData.personalInfo?.firstName || ""}
            onChange={(e) =>
              updateApplicationData("personalInfo", "firstName", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={applicationData.personalInfo?.lastName || ""}
            onChange={(e) =>
              updateApplicationData("personalInfo", "lastName", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            required
            value={
              applicationData.personalInfo?.dateOfBirth
                ? new Date(applicationData.personalInfo.dateOfBirth)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={(e) =>
              updateApplicationData(
                "personalInfo",
                "dateOfBirth",
                new Date(e.target.value)
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender *
          </label>
          <select
            id="gender"
            required
            value={applicationData.personalInfo?.gender || ""}
            onChange={(e) =>
              updateApplicationData("personalInfo", "gender", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="currentPosition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Position
          </label>
          <input
            type="text"
            id="currentPosition"
            value={applicationData.personalInfo?.currentPosition || ""}
            onChange={(e) =>
              updateApplicationData(
                "personalInfo",
                "currentPosition",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="Your current job title"
          />
        </div>
      </div>
    </div>
  );

  const renderContactInfoStep = () => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Contact Information
        </h2>
        <p className="text-gray-600 mt-1">How can we reach you?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            value={applicationData.contactInfo?.email || ""}
            onChange={(e) =>
              updateApplicationData("contactInfo", "email", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={applicationData.contactInfo?.phone || ""}
            onChange={(e) =>
              updateApplicationData("contactInfo", "phone", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            required
            value={applicationData.contactInfo?.address || ""}
            onChange={(e) =>
              updateApplicationData("contactInfo", "address", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="123 Main Street"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City *
          </label>
          <input
            type="text"
            id="city"
            required
            value={applicationData.contactInfo?.city || ""}
            onChange={(e) =>
              updateApplicationData("contactInfo", "city", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="New York"
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State *
          </label>
          <select
            id="state"
            required
            value={applicationData.contactInfo?.state || ""}
            onChange={(e) =>
              updateApplicationData("contactInfo", "state", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          >
            <option value="">Select state</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ZIP Code *
          </label>
          <input
            type="text"
            id="zipCode"
            required
            value={applicationData.contactInfo?.zipCode || ""}
            onChange={(e) =>
              updateApplicationData("contactInfo", "zipCode", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="10001"
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country *
          </label>
          <select
            id="country"
            required
            value={applicationData.contactInfo?.country || ""}
            onChange={(e) =>
              updateApplicationData("contactInfo", "country", e.target.value)
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          >
            <option value="">Select country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="emergencyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="emergencyName"
              required
              value={
                applicationData.contactInfo?.emergencyContact?.fullName || ""
              }
              onChange={(e) =>
                updateApplicationData("contactInfo", "emergencyContact", {
                  ...applicationData.contactInfo?.emergencyContact,
                  fullName: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="emergencyRelationship"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Relationship *
            </label>
            <input
              type="text"
              id="emergencyRelationship"
              required
              value={
                applicationData.contactInfo?.emergencyContact?.relationship ||
                ""
              }
              onChange={(e) =>
                updateApplicationData("contactInfo", "emergencyContact", {
                  ...applicationData.contactInfo?.emergencyContact,
                  relationship: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
              placeholder="Spouse, Parent, etc."
            />
          </div>

          <div>
            <label
              htmlFor="emergencyPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              required
              value={applicationData.contactInfo?.emergencyContact?.phone || ""}
              onChange={(e) =>
                updateApplicationData("contactInfo", "emergencyContact", {
                  ...applicationData.contactInfo?.emergencyContact,
                  phone: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label
              htmlFor="emergencyEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email (Optional)
            </label>
            <input
              type="email"
              id="emergencyEmail"
              value={applicationData.contactInfo?.emergencyContact?.email || ""}
              onChange={(e) =>
                updateApplicationData("contactInfo", "emergencyContact", {
                  ...applicationData.contactInfo?.emergencyContact,
                  email: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
              placeholder="emergency@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoleApplicationStep = () => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Role Application
        </h2>
        <p className="text-gray-600 mt-1">Position you're applying for</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label
            htmlFor="appliedRole"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Position Applied For *
          </label>
          <select
            id="appliedRole"
            required
            value={applicationData.roleApplication?.appliedRole || ""}
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "appliedRole",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          >
            <option value="">Select a position</option>
            {AVAILABLE_POSITIONS.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="employmentType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Employment Type *
          </label>
          <select
            id="employmentType"
            required
            value={applicationData.roleApplication?.employmentType || ""}
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "employmentType",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          >
            <option value="">Select type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="preferredStartDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preferred Start Date *
          </label>
          <input
            type="date"
            id="preferredStartDate"
            required
            value={
              applicationData.roleApplication?.preferredStartDate
                ? new Date(applicationData.roleApplication.preferredStartDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "preferredStartDate",
                new Date(e.target.value)
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="yearsOfExperience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Years of Experience *
          </label>
          <input
            type="number"
            id="yearsOfExperience"
            required
            min="0"
            max="50"
            value={applicationData.roleApplication?.yearsOfExperience || ""}
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "yearsOfExperience",
                parseInt(e.target.value)
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="5"
          />
        </div>

        <div>
          <label
            htmlFor="currentSalary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Salary (Optional)
          </label>
          <input
            type="text"
            id="currentSalary"
            value={applicationData.roleApplication?.currentSalary || ""}
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "currentSalary",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="$50,000"
          />
        </div>

        <div>
          <label
            htmlFor="expectedSalary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expected Salary (Optional)
          </label>
          <input
            type="text"
            id="expectedSalary"
            value={applicationData.roleApplication?.expectedSalary || ""}
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "expectedSalary",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="$60,000"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Key Skills (Comma separated)
          </label>
          <input
            type="text"
            id="skills"
            value={applicationData.roleApplication?.skills?.join(", ") || ""}
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "skills",
                e.target.value.split(",").map((skill) => skill.trim())
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="Project Management, Communication, Leadership"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="availability"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Availability *
          </label>
          <select
            id="availability"
            required
            value={applicationData.roleApplication?.availability || ""}
            onChange={(e) =>
              updateApplicationData(
                "roleApplication",
                "availability",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
          >
            <option value="">Select availability</option>
            <option value="Immediately">Immediately</option>
            <option value="2 weeks">2 weeks notice</option>
            <option value="1 month">1 month notice</option>
            <option value="2 months">2 months notice</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Documents & Credentials
        </h2>
        <p className="text-gray-600 mt-1">
          Upload your supporting documents (Max 2MB per file)
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-700">
          <strong>File Size Limit:</strong> Each file must be less than 2MB.
          Please compress large files before uploading.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Resume/CV *
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="resume"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX (Max 2MB)
                </p>
              </div>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (!validateFileSize(file, 2)) {
                      alert(
                        "Resume must be less than 2MB. Please select a smaller file."
                      );
                      e.target.value = "";
                      return;
                    }
                    updateApplicationData("documents", "resume", {
                      name: file.name,
                      file: file,
                      size: file.size,
                      type: file.type,
                      uploadedAt: new Date(),
                    });
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
          {applicationData.documents?.resume && (
            <p className="mt-2 text-sm text-green-600">
              ✓ {applicationData.documents.resume.name} uploaded
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="identification"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Identification Document *
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="identification"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 2MB)</p>
              </div>
              <input
                id="identification"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (!validateFileSize(file, 2)) {
                      alert(
                        "File must be less than 2MB. Please select a smaller file."
                      );
                      e.target.value = "";
                      return;
                    }
                    updateApplicationData(
                      "documents",
                      "identificationDocument",
                      {
                        name: file.name,
                        file: file,
                        size: file.size,
                        type: file.type,
                        uploadedAt: new Date(),
                      }
                    );
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
          {applicationData.documents?.identificationDocument && (
            <p className="mt-2 text-sm text-green-600">
              ✓ {applicationData.documents.identificationDocument.name} uploaded
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="academicCertificates"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Academic Certificates (Multiple files allowed)
          </label>
          <input
            type="file"
            id="academicCertificates"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const validFiles = files.filter((file) =>
                validateFileSize(file, 2)
              );

              if (validFiles.length !== files.length) {
                alert("Some files exceeded the 2MB limit and were not added.");
              }

              const certificates = validFiles.map((file) => ({
                name: file.name,
                file: file,
                size: file.size,
                type: file.type,
                uploadedAt: new Date(),
              }));

              updateApplicationData("documents", "academicCertificates", [
                ...(applicationData.documents?.academicCertificates || []),
                ...certificates,
              ]);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {applicationData.documents?.academicCertificates &&
            applicationData.documents.academicCertificates.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-green-600 mb-2">
                  ✓ {applicationData.documents.academicCertificates.length}{" "}
                  certificate(s) uploaded
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {applicationData.documents.academicCertificates.map(
                    (cert, index) => (
                      <li key={index}>• {cert.name}</li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );

  const renderDeclarationStep = () => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Declaration</h2>
        <p className="text-gray-600 mt-1">
          Review and confirm your application
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-4">
          Staff Application Agreement
        </h3>
        <div className="text-sm text-gray-600 space-y-3">
          <p>
            I declare that the information given in this staff application is
            true, complete and accurate to the best of my knowledge.
          </p>
          <p>
            I authorize the university to verify the information provided and to
            conduct any necessary background checks.
          </p>
          <p>
            I understand that any false or misleading information may result in
            rejection of my application or termination of employment.
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
              checked={declarationData.isInformationAccurate}
              onChange={(e) =>
                setDeclarationData((prev) => ({
                  ...prev,
                  isInformationAccurate: e.target.checked,
                }))
              }
              required
              className="focus:ring-green-600 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="isInformationAccurate"
              className="font-medium text-gray-700"
            >
              I declare that all information provided is true and accurate *
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToBackgroundCheck"
              name="agreeToBackgroundCheck"
              type="checkbox"
              checked={declarationData.agreeToBackgroundCheck}
              onChange={(e) =>
                setDeclarationData((prev) => ({
                  ...prev,
                  agreeToBackgroundCheck: e.target.checked,
                }))
              }
              required
              className="focus:ring-green-600 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="agreeToBackgroundCheck"
              className="font-medium text-gray-700"
            >
              I agree to background checks as required for this position *
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={declarationData.agreeToTerms}
              onChange={(e) =>
                setDeclarationData((prev) => ({
                  ...prev,
                  agreeToTerms: e.target.checked,
                }))
              }
              required
              className="focus:ring-green-600 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
              I agree to the terms and conditions of the application process *
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="signature"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Electronic Signature *
          </label>
          <input
            type="text"
            id="signature"
            required
            value={declarationData.signature}
            onChange={(e) =>
              setDeclarationData((prev) => ({
                ...prev,
                signature: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-colors"
            placeholder="Type your full name as signature"
          />
          <p className="mt-1 text-xs text-gray-500">
            By typing your name, you are providing your electronic signature
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          ← Back
        </button>
        <button
          type="submit"
          onClick={handleSubmitApplication}
          disabled={
            isSubmitting ||
            !declarationData.isInformationAccurate ||
            !declarationData.agreeToBackgroundCheck ||
            !declarationData.agreeToTerms ||
            !declarationData.signature
          }
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
    </div>
  );

  if (showSuccess) {
    return (
      <SuccessMessage
        prospectiveId={prospectiveId}
        onReset={() => {
          setCurrentStep(0);
          setApplicationData({});
          setDeclarationData({
            isInformationAccurate: false,
            agreeToTerms: false,
            agreeToBackgroundCheck: false,
            signature: "",
            date: new Date(),
          });
          setShowSuccess(false);
        }}
        countdownSeconds={5}
      />
    );
  }

  const steps = [
    { title: "Personal Info", component: renderPersonalInfoStep() },
    { title: "Contact Info", component: renderContactInfoStep() },
    { title: "Role Details", component: renderRoleApplicationStep() },
    { title: "Documents", component: renderDocumentsStep() },
    { title: "Declaration", component: renderDeclarationStep() },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-2xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Staff Role Application</h1>
                <p className="text-green-100 mt-1">
                  Join Southern Atlantic University - Apply for staff positions
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar - Mobile Optimized */}
          <div className="px-6 pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-green-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Step Indicators */}
            <div className="hidden sm:flex justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex flex-col items-center flex-1 ${index < steps.length - 1 ? "relative" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      index === currentStep
                        ? "bg-green-600 text-white ring-4 ring-green-100"
                        : index < currentStep
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      index === currentStep
                        ? "text-green-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${
                        index < currentStep ? "bg-green-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              {steps[currentStep].component}
            </form>

            {/* Navigation Buttons */}
            {currentStep < steps.length - 1 && (
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-8 mt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentStep === 0}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium order-2 sm:order-1"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep((prev) =>
                      Math.min(steps.length - 1, prev + 1)
                    )
                  }
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium order-1 sm:order-2"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecruitmentApplicationPage);
