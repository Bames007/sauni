export interface DocumentFile {
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface ApplicationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    isNigerian: boolean;
    stateOfOrigin: string;
    localGovernment: string;
    countryOfResidence: string;
  };
  contactInfo: {
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
      email: string;
    };
  };
  programSelection: {
    firstChoice: string;
    secondChoice: string;
    entryYear: number;
    semester: string;
    modeOfStudy: string;
  };
  academicHistory: {
    primaryEducation: {
      certificateType: string;
      schoolName: string;
      startYear: number;
      endYear: number;
    };
    secondarySchool: Array<{
      schoolName: string;
      schoolType: string;
      examType: string;
      examNumber: string;
      sitting: string;
      completionYear: number;
      grades: Array<{
        subject: string;
        grade: string;
      }>;
    }>;
  };
  documents: {
    birthCertificate: DocumentFile | null;
    passportPhoto: DocumentFile | null;
    primaryCertificate: DocumentFile | null;
    secondaryCertificate: DocumentFile | null;
    waecNeco: DocumentFile | null;
  };
  declaration: {
    isInformationAccurate: boolean;
    agreeToTerms: boolean;
    signature: string;
    date: string;
  };
  prospectiveId: string;
  status: "submitted" | "under_review" | "accepted" | "rejected" | "waitlisted";
  submittedAt: string;
  tempPassword?: string;
  createdAt: string;
  updatedAt: string;
  passwordChanged?: boolean;
}

export interface Payment {
  id: string;
  amount: number;
  description: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "processing" | "failed";
  type: "application_fee" | "tuition_deposit" | "full_tuition";
  paystackReference?: string;
  paidAt?: string;
  metadata?: {
    prospectiveId: string;
    studentName: string;
    program: string;
    paymentId: string;
  };
}
