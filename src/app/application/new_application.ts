// types/application.ts
export interface Applicant {
  id?: string;
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  academicHistory: AcademicHistory;
  programSelection: ProgramSelection;
  documents: ApplicationDocuments;
  declaration: Declaration;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
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

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  guardianContact: GuardianContact;
}

export interface GuardianContact {
  fullName: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface AcademicHistory {
  primaryEducation?: PrimaryEducation;
  secondarySchool: SecondaryEducation[];
  tertiaryEducation?: TertiaryEducation[];
  qualifications?: Qualification[];
}

export interface PrimaryEducation {
  schoolName: string;
  startYear?: number;
  endYear?: number;
  certificateType?: string;
}

export interface SecondaryEducation {
  examType: string;
  examNumber: string;
  schoolName: string;
  schoolType: string;
  completionYear: number;
  sitting: "first" | "second";
  grades: SubjectGrade[];
}

export interface SubjectGrade {
  subject: string;
  grade: string;
}

export interface TertiaryEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
  isCompleted: boolean;
}

export interface Qualification {
  type: string;
  name: string;
  institution: string;
  yearObtained: number;
}

export interface ProgramSelection {
  firstChoice: Program;
  secondChoice?: Program;
  entryYear: number;
  semester: "Fall" | "Spring";
  modeOfStudy: "Full-time" | "Part-time";
}

export type Program =
  | "BSc Accounting"
  | "BSc Business Administration"
  | "BSc Hospitality & Tourism Management"
  | "BSc Public Administration"
  | "BSc Criminology & Security Studies"
  | "BSc Political Science"
  | "BSc Petroleum Chemistry"
  | "BSc International Relations & Diplomacy"
  | "BSc Economics"
  | "BSc Information & Communication Technology (ICT)"
  | "BSc Microbiology"
  | "BSc Physics with Electronics"
  | "BSc Computer Science"
  | "BSc Software Engineering"
  | "BSc Cyber Security";

export interface ApplicationDocuments {
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

export interface FileInfo {
  name: string;
  file?: File;
  url?: string;
  path?: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface Declaration {
  isInformationAccurate: boolean;
  agreeToTerms: boolean;
  signature: string;
  date: Date;
}

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "accepted"
  | "rejected"
  | "waiting_list";
