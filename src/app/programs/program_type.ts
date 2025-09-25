//Program Type Definitions
export interface HoD {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
  email: string;
  message: string;
}

export interface Alumni {
  name: string;
  position: string;
  graduationYear?: number;
  imageUrl: string;
  testimonial: string;
}

export interface CareerPath {
  title: string;
  sectors: string[];
}

export interface Scholarship {
  name: string;
  description: string;
}

export interface SemesterCourses {
  first: string[];
  second: string[];
}

export interface YearOutline {
  year: number;
  theme: string;
  semesters: SemesterCourses;
}

export interface Program {
  id: string;
  programCode?: string;
  title: string;
  slug: string;
  tagline: string;
  overview: {
    description: string;
    startDates: string[];
  };
  realLifeImportance: string;
  duration: string;
  headOfDepartment: HoD;
  whyThisProgram: string[];
  keyTopics: string[];
  programBreakdown: {
    coreCourses: number;
    electives: number;
    projectsInternships: number;
  };
  semesterOutline: YearOutline[];
  notableAlumni: Alumni[];
  videoUrl: string;
  careerPaths: CareerPath[];
  learningOutcomes: string[];
  interestingFacts: string[];
  accreditation: string[];
  testPreparation?: string;
  facilities: string[];
  industryConnections: {
    partners: string[];
    initiatives: string[];
  };
  programType: string;
  scholarships: Scholarship[];
  contactInfo: {
    department: string;
    email: string;
    phone: string;
  };
  admissionRequirements: AdmissionRequirements;
}

export interface OLevelRequirements {
  required: string[];
  notes: string;
}

export interface JambScore {
  minimum: number;
  competitive: number;
  note: string;
}

export interface UTMERequirements {
  oLevel: OLevelRequirements;
  jambSubjects: string[];
  jambScore: JambScore;
}

export interface DirectEntryOption {
  type: string;
  requirements: string;
}

export interface DirectEntryRequirements {
  options: DirectEntryOption[];
  note: string;
}

export interface AdmissionRequirements {
  utme: UTMERequirements;
  directEntry: DirectEntryRequirements;
  otherRequirements: string[];
  gradingSystem: GradingSystem;
}

export interface GradingSystem {
  scale: string;
  details: string;
}
