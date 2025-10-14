// components/DocumentsComponent.tsx
import React from "react";
import { Eye } from "lucide-react";
import Image from "next/image";
import { DocumentFile } from "../type";

interface DocumentsComponentProps {
  documents: {
    passportPhoto: DocumentFile | null;
    birthCertificate: DocumentFile | null;
    primaryCertificate: DocumentFile | null;
    secondaryCertificate: DocumentFile | null;
    waecNeco: DocumentFile | null;
  };
  onViewDocument: (document: { url: string; name: string }) => void;
}

const DocumentCard: React.FC<{
  document: DocumentFile | null;
  title: string;
  type: string;
  onViewDocument: (document: { url: string; name: string }) => void;
}> = ({ document, title, type, onViewDocument }) => {
  if (!document?.url) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#017840] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-[#017840] text-base md:text-lg">📄</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 truncate text-sm md:text-base">
            {title}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {document.name || `${type} document`}
          </p>
        </div>
      </div>
      <button
        onClick={() => onViewDocument({ url: document.url, name: title })}
        className="flex items-center justify-center space-x-1 px-3 py-2 bg-[#017840] text-white rounded-lg text-sm hover:bg-[#015a30] transition-colors whitespace-nowrap w-full sm:w-auto"
      >
        <Eye className="w-4 h-4" />
        <span>View Document</span>
      </button>
    </div>
  );
};

const DocumentsComponent: React.FC<DocumentsComponentProps> = ({
  documents,
  onViewDocument,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
        <span className="w-2 h-2 bg-[#BD9946] rounded-full mr-2"></span>
        Uploaded Documents
      </h3>
      <div className="space-y-3 md:space-y-4">
        <DocumentCard
          document={documents.passportPhoto}
          title="Passport Photograph"
          type="Passport"
          onViewDocument={onViewDocument}
        />
        <DocumentCard
          document={documents.birthCertificate}
          title="Birth Certificate"
          type="Birth"
          onViewDocument={onViewDocument}
        />
        <DocumentCard
          document={documents.primaryCertificate}
          title="Primary School Certificate"
          type="Primary"
          onViewDocument={onViewDocument}
        />
        <DocumentCard
          document={documents.secondaryCertificate}
          title="Secondary School Certificate"
          type="Secondary"
          onViewDocument={onViewDocument}
        />
        <DocumentCard
          document={documents.waecNeco}
          title="WAEC/NECO Result"
          type="Result"
          onViewDocument={onViewDocument}
        />
      </div>
    </div>
  );
};

export default DocumentsComponent;
