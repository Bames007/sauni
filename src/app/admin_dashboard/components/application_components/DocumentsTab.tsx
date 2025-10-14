import React from "react";
import {
  FileText,
  Download,
  Eye,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Upload,
  Shield,
} from "lucide-react";
import { ApplicationData } from "../StudentApplication";
import {
  ApplicationDocuments,
  FileInfo,
} from "@/app/application/new_application";

const DocumentsTab: React.FC<{ application: ApplicationData }> = ({
  application,
}) => {
  const documentEntries = Object.entries(application.documents || {}) as [
    keyof ApplicationDocuments,
    FileInfo,
  ][];

  const getDocumentIcon = (docType: string) => {
    const type = docType.toLowerCase();
    if (type.includes("photo") || type.includes("passport"))
      return <FileCheck className="document-icon-image" />;
    if (type.includes("certificate") || type.includes("result"))
      return <FileCheck className="document-icon-certificate" />;
    if (type.includes("birth") || type.includes("age"))
      return <FileCheck className="document-icon-birth" />;
    if (type.includes("medical"))
      return <AlertCircle className="document-icon-medical" />;
    if (type.includes("recommendation") || type.includes("reference"))
      return <FileText className="document-icon-reference" />;
    if (type.includes("waec") || type.includes("neco"))
      return <FileText className="document-icon-waec" />;
    return <FileText className="document-icon-default" />;
  };

  const getDocumentStatus = (fileInfo: FileInfo) => {
    // Determine status based on file URL and properties
    if (fileInfo.url) {
      return {
        text: "Uploaded",
        color: "status-uploaded",
        icon: <CheckCircle className="status-icon" />,
        description: "Successfully uploaded to secure storage",
      };
    } else if (fileInfo.name && !fileInfo.url) {
      return {
        text: "Processing",
        color: "status-uploading",
        icon: <Upload className="status-icon" />,
        description: "Document is being processed",
      };
    } else {
      return {
        text: "Not Uploaded",
        color: "status-failed",
        icon: <AlertCircle className="status-icon" />,
        description: "Document not yet uploaded",
      };
    }
  };

  // Count document statuses for summary
  const statusCounts = documentEntries.reduce(
    (acc, [, fileInfo]) => {
      const status = fileInfo.url
        ? "uploaded"
        : fileInfo.name
          ? "processing"
          : "not_uploaded";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalDocuments = documentEntries.length;
  const uploadedCount = statusCounts["uploaded"] || 0;
  const processingCount = statusCounts["processing"] || 0;
  const notUploadedCount = statusCounts["not_uploaded"] || 0;

  return (
    <div className="documents-container">
      {/* Enhanced Header with Upload Summary */}
      <div className="documents-header-card">
        <div className="header-content">
          <div className="header-icon-wrapper">
            <FileText className="header-icon" />
          </div>
          <div className="header-text">
            <h1 className="header-title">Application Documents</h1>
            <p className="header-subtitle">
              Document upload status and management
            </p>
            <div className="upload-summary">
              <div className="summary-item">
                <span className="summary-count">{totalDocuments}</span>
                <span className="summary-label">Total Documents</span>
              </div>
              <div className="summary-item success">
                <span className="summary-count">{uploadedCount}</span>
                <span className="summary-label">Uploaded</span>
              </div>
              <div className="summary-item processing">
                <span className="summary-count">{processingCount}</span>
                <span className="summary-label">Processing</span>
              </div>
              <div className="summary-item failed">
                <span className="summary-count">{notUploadedCount}</span>
                <span className="summary-label">Not Uploaded</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
        </div>
      </div>

      {/* Upload Status Alert */}
      {notUploadedCount > 0 && (
        <div className="upload-alert failed">
          <AlertCircle className="alert-icon" />
          <div className="alert-content">
            <h4 className="alert-title">Upload Required</h4>
            <p className="alert-description">
              {notUploadedCount} document{notUploadedCount !== 1 ? "s" : ""}{" "}
              need to be uploaded. Please ensure all required documents are
              submitted for your application to be processed.
            </p>
          </div>
        </div>
      )}

      {processingCount > 0 && (
        <div className="upload-alert processing">
          <Upload className="alert-icon" />
          <div className="alert-content">
            <h4 className="alert-title">Documents Processing</h4>
            <p className="alert-description">
              {processingCount} document{processingCount !== 1 ? "s" : ""} are
              currently being processed. This may take a few moments.
            </p>
          </div>
        </div>
      )}

      {uploadedCount === totalDocuments && totalDocuments > 0 && (
        <div className="upload-alert success">
          <CheckCircle className="alert-icon" />
          <div className="alert-content">
            <h4 className="alert-title">All Documents Uploaded Successfully</h4>
            <p className="alert-description">
              All your documents have been securely uploaded to our storage
              system.
            </p>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="documents-grid">
        {documentEntries.map(([docType, fileInfo], index) => {
          const status = getDocumentStatus(fileInfo);
          return (
            <DocumentItem
              key={docType}
              docType={docType}
              fileInfo={fileInfo}
              documentIcon={getDocumentIcon(docType)}
              status={status}
              index={index}
            />
          );
        })}
      </div>

      {/* Status Legend */}
      <div className="status-legend">
        <h4 className="legend-title">Upload Status Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <CheckCircle className="legend-icon status-uploaded" />
            <span>Uploaded - Successfully stored in secure storage</span>
          </div>
          <div className="legend-item">
            <Upload className="legend-icon status-uploading" />
            <span>Processing - Document is being processed</span>
          </div>
          <div className="legend-item">
            <AlertCircle className="legend-icon status-failed" />
            <span>Not Uploaded - Document not yet uploaded</span>
          </div>
        </div>
      </div>

      {/* Storage Information */}
      <div className="storage-info">
        <div className="info-content">
          <div className="info-icon">
            <Shield className="icon" />
          </div>
          <div className="info-text">
            <h4 className="info-title">Secure Document Storage</h4>
            <p className="info-description">
              All documents are securely stored in our encrypted cloud storage
              system. Your files are protected and only accessible to authorized
              admissions personnel.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .documents-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        /* Enhanced Header */
        .documents-header-card {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.2);
          color: white;
        }

        .documents-header-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .header-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .header-icon {
          width: 32px;
          height: 32px;
          color: white;
        }

        .header-text {
          flex: 1;
        }

        .header-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          font-size: 16px;
          margin: 0 0 20px 0;
          opacity: 0.9;
          font-weight: 400;
        }

        .upload-summary {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .summary-item.success {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.4);
        }

        .summary-item.processing {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
        }

        .summary-item.failed {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
        }

        .summary-count {
          font-size: 24px;
          font-weight: 700;
          color: white;
        }

        .summary-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .header-decoration {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          overflow: hidden;
          z-index: 1;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .circle-1 {
          width: 120px;
          height: 120px;
          top: -40px;
          right: -40px;
        }

        .circle-2 {
          width: 80px;
          height: 80px;
          bottom: -20px;
          right: 80px;
        }

        /* Upload Alerts */
        .upload-alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 24px;
          border: 1px solid;
        }

        .upload-alert.failed {
          background: #fef2f2;
          border-color: #fecaca;
          color: #dc2626;
        }

        .upload-alert.processing {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: #3b82f6;
        }

        .upload-alert.success {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #059669;
        }

        .alert-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .alert-content {
          flex: 1;
        }

        .alert-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .alert-description {
          font-size: 14px;
          margin: 0;
          opacity: 0.9;
        }

        /* Enhanced Documents Grid */
        .documents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .document-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #f1f5f9;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .document-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f59e0b, #d97706);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .document-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: #e2e8f0;
        }

        .document-card:hover::before {
          transform: scaleX(1);
        }

        .document-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .document-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .document-icon-image {
          width: 24px;
          height: 24px;
          color: #d97706;
        }

        .document-icon-certificate {
          width: 24px;
          height: 24px;
          color: #059669;
        }

        .document-icon-birth {
          width: 24px;
          height: 24px;
          color: #3b82f6;
        }

        .document-icon-medical {
          width: 24px;
          height: 24px;
          color: #dc2626;
        }

        .document-icon-reference {
          width: 24px;
          height: 24px;
          color: #7c3aed;
        }

        .document-icon-waec {
          width: 24px;
          height: 24px;
          color: #8b5cf6;
        }

        .document-icon-default {
          width: 24px;
          height: 24px;
          color: #6b7280;
        }

        .document-actions {
          display: flex;
          gap: 8px;
        }

        .document-button {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .view-button {
          background: #3b82f6;
          color: white;
        }

        .view-button:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .download-button {
          background: #10b981;
          color: white;
        }

        .download-button:hover {
          background: #059669;
          transform: scale(1.05);
        }

        .button-icon {
          width: 16px;
          height: 16px;
        }

        .document-content {
          margin-bottom: 16px;
        }

        .document-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 8px 0;
          line-height: 1.4;
          text-transform: capitalize;
        }

        .document-filename {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .document-meta {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }

        .document-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .document-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-uploaded {
          background: #f0fdf4;
          color: #059669;
          border: 1px solid #bbf7d0;
        }

        .status-failed {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .status-uploading {
          background: #eff6ff;
          color: #3b82f6;
          border: 1px solid #bfdbfe;
        }

        .status-unknown {
          background: #f8fafc;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .status-icon {
          width: 12px;
          height: 12px;
        }

        .document-upload-date {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
        }

        /* Status Legend */
        .status-legend {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e1e5e9;
          margin-bottom: 24px;
        }

        .legend-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        .legend-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #64748b;
        }

        .legend-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        /* Storage Information */
        .storage-info {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .info-content {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .info-icon .icon {
          width: 20px;
          height: 20px;
          color: white;
        }

        .info-text {
          flex: 1;
        }

        .info-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: white;
        }

        .info-description {
          font-size: 14px;
          margin: 0;
          opacity: 0.9;
          line-height: 1.5;
        }

        .storage-status {
          font-weight: 600;
          opacity: 1;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .documents-grid {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
          }

          .upload-summary {
            gap: 16px;
          }

          .summary-item {
            padding: 10px 12px;
          }

          .summary-count {
            font-size: 20px;
          }
        }

        @media (max-width: 768px) {
          .documents-container {
            padding: 16px;
            background: #f8fafc;
          }

          .documents-header-card {
            padding: 24px;
            margin-bottom: 20px;
            border-radius: 16px;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .header-icon-wrapper {
            padding: 14px;
          }

          .header-title {
            font-size: 24px;
          }

          .header-subtitle {
            font-size: 14px;
          }

          .upload-summary {
            justify-content: center;
            gap: 12px;
          }

          .documents-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .document-card {
            padding: 20px;
            border-radius: 12px;
          }

          .legend-items {
            grid-template-columns: 1fr;
          }

          .storage-info {
            padding: 20px;
          }

          .info-content {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .documents-container {
            padding: 12px;
          }

          .documents-header-card {
            padding: 20px;
          }

          .header-title {
            font-size: 22px;
          }

          .upload-summary {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .summary-item {
            flex-direction: row;
            justify-content: space-between;
            padding: 12px 16px;
          }

          .document-card {
            padding: 18px;
          }

          .document-title {
            font-size: 16px;
          }
        }

        /* Animation for card entrance */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .document-card {
          animation: fadeInUp 0.5s ease-out;
        }

        /* Stagger animation for grid items */
        .documents-grid .document-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .documents-grid .document-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .documents-grid .document-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .documents-grid .document-card:nth-child(4) {
          animation-delay: 0.4s;
        }
        .documents-grid .document-card:nth-child(5) {
          animation-delay: 0.5s;
        }
        .documents-grid .document-card:nth-child(6) {
          animation-delay: 0.6s;
        }
        .documents-grid .document-card:nth-child(7) {
          animation-delay: 0.7s;
        }
        .documents-grid .document-card:nth-child(8) {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
};

const DocumentItem: React.FC<{
  docType: string;
  fileInfo: FileInfo;
  documentIcon: React.ReactNode;
  status: {
    text: string;
    color: string;
    icon: React.ReactNode;
    description?: string;
  };
  index: number;
}> = ({ docType, fileInfo, documentIcon, status, index }) => {
  // Format the document type for display
  const formattedDocType = docType.replace(/([A-Z])/g, " $1").trim();

  // Calculate file size in MB if size is a number
  const fileSize =
    typeof fileInfo.size === "number"
      ? `${(fileInfo.size / 1024 / 1024).toFixed(2)} MB`
      : fileInfo.size || "Size unknown";

  // Use uploadedAt if available, otherwise use uploadDate
  const uploadDate = fileInfo.uploadedAt || fileInfo.uploadedAt;

  // Only show actions for successfully uploaded files
  const canViewDownload = fileInfo.url;

  return (
    <div
      className="document-item-card"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      {/* Header with icon and actions */}
      <div className="document-item-header">
        <div className="document-item-icon-container">
          <div className="document-item-icon-background">{documentIcon}</div>
        </div>
        <div className="document-item-actions">
          {canViewDownload && (
            <>
              <a
                href={fileInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="document-action-btn view-btn"
                title="View document"
              >
                <Eye size={16} />
                <span>View</span>
              </a>
              <a
                href={fileInfo.url}
                download={fileInfo.name}
                className="document-action-btn download-btn"
                title="Download document"
              >
                <Download size={16} />
                <span>Download</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Document content */}
      <div className="document-item-content">
        <h3 className="document-item-title">{formattedDocType}</h3>

        <div className="document-item-filename">
          {fileInfo.name ? (
            <div className="filename-with-icon">
              <FileText size={14} />
              <span className="filename-text" title={fileInfo.name}>
                {fileInfo.name.length > 35
                  ? `${fileInfo.name.substring(0, 35)}...`
                  : fileInfo.name}
              </span>
            </div>
          ) : (
            <span className="no-file-text">No file uploaded</span>
          )}
        </div>

        {/* File metadata */}
        <div className="document-item-meta">
          <div className="meta-item">
            <span className="meta-label">Size:</span>
            <span className="meta-value">{fileSize}</span>
          </div>
          {uploadDate && (
            <div className="meta-item">
              <span className="meta-label">Uploaded:</span>
              <span className="meta-value">
                {new Date(uploadDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Status description */}
        {status.description && (
          <div className="document-item-description">{status.description}</div>
        )}
      </div>

      {/* Footer with status */}
      <div className="document-item-footer">
        <div className={`document-item-status ${status.color}`}>
          <div className="status-icon-container">{status.icon}</div>
          <span className="status-text">{status.text}</span>
        </div>

        {uploadDate && (
          <div className="document-item-time">
            {new Date(uploadDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .document-item-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.06),
            0 1px 4px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeInUp 0.5s ease-out both;
        }

        .document-item-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.12),
            0 4px 12px rgba(0, 0, 0, 0.06);
          border-color: #e2e8f0;
        }

        .document-item-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f59e0b, #d97706);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .document-item-card:hover::before {
          transform: scaleX(1);
        }

        /* Header Styles */
        .document-item-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .document-item-icon-container {
          flex-shrink: 0;
        }

        .document-item-icon-background {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
        }

        .document-item-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .document-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .view-btn {
          background: #3b82f6;
          color: white;
        }

        .view-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .download-btn {
          background: #10b981;
          color: white;
        }

        .download-btn:hover {
          background: #059669;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        /* Content Styles */
        .document-item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .document-item-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          line-height: 1.3;
          text-transform: capitalize;
        }

        .document-item-filename {
          display: flex;
          align-items: center;
        }

        .filename-with-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }

        .filename-text {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .no-file-text {
          color: #94a3b8;
          font-style: italic;
          font-size: 14px;
        }

        .document-item-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .meta-label {
          color: #64748b;
          font-weight: 500;
        }

        .meta-value {
          color: #475569;
          font-weight: 400;
        }

        .document-item-description {
          font-size: 12px;
          color: #64748b;
          line-height: 1.4;
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 6px;
          border-left: 3px solid #e2e8f0;
        }

        /* Footer Styles */
        .document-item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .document-item-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .status-uploaded {
          background: #f0fdf4;
          color: #059669;
          border: 1px solid #bbf7d0;
        }

        .status-failed {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .status-uploading {
          background: #eff6ff;
          color: #3b82f6;
          border: 1px solid #bfdbfe;
        }

        .status-unknown {
          background: #f8fafc;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .status-icon-container {
          display: flex;
          align-items: center;
        }

        .status-icon-container :global(svg) {
          width: 14px;
          height: 14px;
        }

        .status-text {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .document-item-time {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
        }

        /* Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .document-item-card {
            padding: 20px;
            gap: 14px;
          }

          .document-item-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .document-item-actions {
            justify-content: flex-start;
          }

          .document-item-icon-background {
            width: 48px;
            height: 48px;
          }

          .document-item-title {
            font-size: 16px;
          }

          .document-action-btn {
            padding: 6px 10px;
            font-size: 11px;
          }

          .filename-text {
            max-width: 150px;
          }
        }

        @media (max-width: 480px) {
          .document-item-card {
            padding: 16px;
          }

          .document-item-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .document-item-time {
            align-self: flex-end;
          }

          .document-item-actions {
            width: 100%;
            justify-content: space-between;
          }

          .document-action-btn {
            flex: 1;
            justify-content: center;
          }
        }

        /* Enhanced focus states for accessibility */
        .document-action-btn:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Loading state animation */
        .document-item-card.loading {
          opacity: 0.7;
          pointer-events: none;
        }

        .document-item-card.loading::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DocumentsTab;
