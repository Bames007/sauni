// types/index.ts
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

export interface Testimonial {
  id: number;
  name: string;
  program: string;
  image: string;
  text: string;
  role: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}
