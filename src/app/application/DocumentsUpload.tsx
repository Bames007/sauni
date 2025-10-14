"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { ApplicationDocuments, FileInfo } from "./new_application";
import { Upload, FileText, X, Info, AlertCircle } from "lucide-react";

interface DocumentsUploadProps {
  data?: ApplicationDocuments;
  updateData: (data: ApplicationDocuments) => void;
  nextStep: () => void;
  prevStep: () => void;
  personalInfo?: {
    firstName: string;
    lastName: string;
  };
}

const DocumentsUpload: React.FC<DocumentsUploadProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
  personalInfo,
}) => {
  const [uploading, setUploading] = useState<string | null>(null);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const generateFileName = (documentType: string, originalName: string) => {
    if (!personalInfo) return originalName;

    const { firstName, lastName } = personalInfo;
    const baseName = `${firstName}${lastName}`.replace(/\s+/g, "");
    const extension = originalName.split(".").pop();

    const documentTypeMap: Record<string, string> = {
      passportPhoto: "PassportPhoto",
      birthCertificate: "BirthCertificate",
      academicTranscripts: "AcademicTranscript",
      primaryCertificate: "PrimarySchoolCertificate",
      secondaryCertificate: "SecondarySchoolCertificate",
      waecNeco: "WAECNECOCertificate",
    };

    return `${baseName}${
      documentTypeMap[documentType] || documentType
    }.${extension}`;
  };

  const handleFileSelect = async (
    file: File,
    documentType: keyof ApplicationDocuments
  ) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(
        `File size must be less than 2MB. Your file is ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB.`
      );
      return;
    }

    setUploading(documentType);

    try {
      const fileName =
        fileNames[documentType] ||
        generateFileName(documentType as string, file.name);

      const fileInfo: FileInfo = {
        name: fileName,
        file: file,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      };

      updateData({
        ...data,
        [documentType]: fileInfo,
      } as ApplicationDocuments);
    } catch (error) {
      console.error("Error handling file:", error);
      alert("Error processing file. Please try again.");
    } finally {
      setTimeout(() => {
        setUploading(null);
      }, 500);
    }
  };

  const handleRemoveFile = (documentType: keyof ApplicationDocuments) => {
    updateData({
      ...data,
      [documentType]: undefined,
    } as ApplicationDocuments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    nextStep();
  };

  const isFormValid = () => {
    const requiredDocs: (keyof ApplicationDocuments)[] = [
      "passportPhoto",
      "birthCertificate",
      "primaryCertificate",
      "secondaryCertificate",
      "waecNeco",
    ];

    return requiredDocs.every((docType) => {
      const doc = data?.[docType] as FileInfo;
      return doc && doc.file;
    });
  };

  const DocumentSection = ({
    title,
    description,
    documentType,
    acceptedTypes = "image/*",
  }: {
    title: string;
    description: string;
    documentType: keyof ApplicationDocuments;
    acceptedTypes?: string;
  }) => {
    const fileData = data?.[documentType] as FileInfo;
    const isUploading = uploading === documentType;

    return (
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          {description}
        </p>

        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            File Name (optional)
          </label>
          <input
            type="text"
            placeholder="Auto-generated if left empty"
            className="w-full p-2 text-sm border border-gray-300 rounded-md"
            value={fileNames[documentType] || ""}
            onChange={(e) =>
              setFileNames({
                ...fileNames,
                [documentType]: e.target.value,
              })
            }
            disabled={isUploading || !!fileData}
          />
        </div>

        {fileData ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 p-3 sm:p-4 bg-white rounded-md border border-gray-200 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              {fileData.type.startsWith("image/") ? (
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      fileData.file
                        ? URL.createObjectURL(fileData.file)
                        : "/placeholder-image.jpg"
                    }
                    alt={fileData.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="p-2 sm:p-3 bg-gray-100 rounded-md flex-shrink-0">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {fileData.name}
                </p>
                <p className="text-xs text-gray-500">
                  {Math.round(fileData.size / 1024)} KB
                </p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  ✓ Ready for upload
                </p>
              </div>
            </div>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 p-1 sm:p-2 self-end sm:self-center"
              onClick={() => handleRemoveFile(documentType)}
              disabled={uploading !== null}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        ) : isUploading ? (
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#017840] mb-2"></div>
            <span className="text-xs sm:text-sm text-gray-500">
              Processing file...
            </span>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-[#017840] transition-colors">
            <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-2" />
            <span className="text-xs sm:text-sm text-gray-500 text-center">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-gray-400 mt-1">
              Max file size: 2MB
            </span>
            <input
              type="file"
              accept={acceptedTypes}
              className="hidden"
              onChange={(e) =>
                e.target.files &&
                handleFileSelect(e.target.files[0], documentType)
              }
              disabled={uploading !== null}
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-xl sm:text-3xl font-bold text-[#017840] mb-2">
          Documents Upload
        </h1>
        <p className="text-xs sm:text-base text-gray-600">
          Upload all required documents for your application
        </p>
        <div className="w-16 sm:w-24 h-1 bg-[#BD9946] mx-auto mt-3 sm:mt-4 rounded-full"></div>
      </div>

      {/* Document Requirements Notice */}
      <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200 mb-4 sm:mb-6">
        <div className="flex items-start">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-yellow-800">
              Required Documents
            </h3>
            <ul className="text-xs sm:text-sm text-yellow-700 mt-1 sm:mt-2 list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
              <li>Recent Passport Photograph (max 2MB)</li>
              <li>Birth Certificate (max 2MB)</li>
              <li>Primary School Certificate (max 2MB)</li>
              <li>Secondary School Certificate (max 2MB)</li>
              <li>WAEC/NECO/GCE Certificate (max 2MB)</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <DocumentSection
          title="Passport Photograph"
          description="Recent passport-sized photograph (max 2MB)"
          documentType="passportPhoto"
          acceptedTypes="image/*"
        />

        <DocumentSection
          title="Birth Certificate"
          description="Scanned copy of your birth certificate (max 2MB)"
          documentType="birthCertificate"
          acceptedTypes=".pdf,.doc,.docx,image/*"
        />

        <DocumentSection
          title="Primary School Certificate"
          description="Scanned copy of your primary school certificate (max 2MB)"
          documentType="primaryCertificate"
          acceptedTypes=".pdf,.doc,.docx,image/*"
        />

        <DocumentSection
          title="Secondary School Certificate"
          description="Scanned copy of your secondary school certificate (max 2MB)"
          documentType="secondaryCertificate"
          acceptedTypes=".pdf,.doc,.docx,image/*"
        />

        <DocumentSection
          title="WAEC/NECO/GCE Certificate"
          description="Scanned copy of your WAEC, NECO, or GCE certificate (max 2MB)"
          documentType="waecNeco"
          acceptedTypes=".pdf,.doc,.docx,image/*"
        />

        {/* Information Alert */}
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
            </div>
            <div className="ml-2 sm:ml-3">
              <h3 className="text-xs sm:text-sm font-medium text-blue-800">
                Document Requirements
              </h3>
              <ul className="text-xs sm:text-sm text-blue-700 mt-1 sm:mt-2 list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                <li>All documents must be clear and legible</li>
                <li>Maximum file size: 2MB per document</li>
                <li>Accepted formats: PDF, JPG, PNG, DOC, DOCX</li>
                <li>
                  Passport photo must be recent and against a plain background
                </li>
                <li>Files will be automatically named using your name</li>
                <li className="font-semibold text-green-700">
                  Files will be uploaded when you submit the final application
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between pt-4 gap-3 sm:gap-0">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:ring-opacity-50 transition-all order-2 sm:order-1"
            disabled={uploading !== null}
          >
            ← Back
          </button>
          <button
            type="submit"
            className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-[#017840] text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#BD9946] focus:ring-opacity-50 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
            disabled={uploading !== null || !isFormValid()}
          >
            {uploading ? "Processing..." : "Save & Continue →"}
          </button>
        </div>
      </form>

      {/* Upload Status */}
      {uploading && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg flex items-center text-sm max-w-[200px]">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2 flex-shrink-0"></div>
          <span className="truncate">Processing {uploading}...</span>
        </div>
      )}
    </div>
  );
};

export default DocumentsUpload;
