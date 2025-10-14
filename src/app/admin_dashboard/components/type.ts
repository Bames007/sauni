import {
  ApplicationDocuments,
  Declaration,
  AcademicHistory,
} from "@/app/application/new_application";

export const allPrograms = [
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

interface Program {
  id: string;
  name: string;
  faculty: string;
  duration: string;
  requirements: string[];
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
    firstChoice: Program;
    secondChoice: Program;
    entryYear: number;
    semester: string;
    modeOfStudy: string;
  };
  academicHistory: AcademicHistory;
  documents: ApplicationDocuments;
  declaration: Declaration;
  prospectiveId: string;
  status: "submitted" | "under_review" | "accepted" | "rejected" | "waitlisted";
  submittedAt: string;
  tempPassword?: string;
  createdAt: string;
  updatedAt: string;
  passwordChanged?: boolean;
}
