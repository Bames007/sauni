"use client";

import {
  Clock,
  BookOpen,
  Award,
  Building,
  Calendar,
  ArrowLeft,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
  Target,
  BarChart3,
  Lightbulb,
  Brain,
  HeartHandshake,
  GraduationCap,
  Play,
  Shield,
  Lock,
  Bug,
  Network,
  Code,
  Search,
  BarChart,
  Cpu,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef, JSX } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { programData } from "@/app/programs/programsData";
import { Gantari, Bebas_Neue, Poppins } from "next/font/google";
import type { Program } from "@/app/programs/program_type";
import AdmissionRequirementsSection from "../AdmissionRequirementSection";
import Image from "next/image";

const gantari = Gantari({
  variable: "--font-gantari",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ProgramDetail = () => {
  const params = useParams();
  const programId = params.programId as string;
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const programRef = useRef<HTMLDivElement>(null);

  const program = programData.find((p) => (p as Program).id === programId) as
    | Program
    | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programId]);

  if (!program) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full transform transition-all duration-500 scale-100 hover:scale-105">
          <div className="mb-6 animate-bounce">
            <GraduationCap size={48} className="text-[#017840] mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-bebas">
            Program Not Found
          </h1>
          <p className="text-gray-600 mb-6 font-poppins">
            The program you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#017840] text-white px-6 py-3 rounded-full hover:bg-[#015c30] transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const toggleYearExpansion = (year: number) => {
    if (expandedYear === year) {
      setExpandedYear(null);
    } else {
      setExpandedYear(year);
    }
  };

  type TopicType =
    | "Network Security & Defense"
    | "Ethical Hacking & Penetration Testing"
    | "Digital Forensics & Incident Response"
    | "Cryptography & Secure Communications"
    | "Security Risk Analysis & Governance"
    | "Operating System & Application Security";

  const topicIcons: Record<TopicType, JSX.Element> = {
    "Network Security & Defense": <Network size={20} className="mr-2" />,
    "Ethical Hacking & Penetration Testing": <Bug size={20} className="mr-2" />,
    "Digital Forensics & Incident Response": (
      <Search size={20} className="mr-2" />
    ),
    "Cryptography & Secure Communications": <Lock size={20} className="mr-2" />,
    "Security Risk Analysis & Governance": (
      <BarChart size={20} className="mr-2" />
    ),
    "Operating System & Application Security": (
      <Cpu size={20} className="mr-2" />
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50" ref={programRef}>
      {/* Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-[#017840] hover:text-[#015c30] font-poppins transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              {/* School Logo */}
              <Image
                src="/sauni-logo.png"
                alt="SAUNI Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className={`text-xl ${bebasNeue.className}`}>
                Southern Atlantic University
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#017840] to-[#019b4e] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-40 h-40 bg-white rounded-full opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="flex-1 transition-all duration-700 ease-out transform translate-y-0 opacity-100">
              <div className="inline-flex items-center mb-4 bg-yellow-400 text-[#017840] px-4 py-1 rounded-full text-sm font-semibold font-poppins animate-pulse">
                <Shield size={16} className="mr-2" />
                {program.programCode}
              </div>
              <h1
                className={`text-5xl md:text-6xl font-bold mb-4 leading-tight ${bebasNeue.className}`}
              >
                {program.title}
              </h1>
              <p
                className={`text-xl text-green-100 mb-6 ${gantari.className} max-w-2xl`}
              >
                {program.tagline}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/30">
                  <Clock size={18} className="mr-2" />
                  <span className="font-poppins">{program.duration}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/30">
                  <BookOpen size={18} className="mr-2" />
                  <span className="font-poppins">{program.programType}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/30">
                  <Zap size={18} className="mr-2" />
                  <span className="font-poppins">Hands-on Learning</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl w-full md:w-96 border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <h3
                className={`text-2xl font-semibold mb-4 ${bebasNeue.className} flex items-center`}
              >
                <Calendar size={24} className="mr-2 text-yellow-300" />
                Next Start Dates
              </h3>
              <div className="space-y-3">
                {program.overview.startDates.map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white/10 p-3 rounded-lg transition-all duration-300 hover:bg-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="font-poppins">{date}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/application"
                className="block w-full mt-6 bg-yellow-400 text-[#017840] font-semibold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                Apply Now
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image/Video Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-500 hover:shadow-md">
          <h2
            className={`text-2xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
          >
            Program Gallery
          </h2>
          <div className="grid grid-rows-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Southern Atlanctic University"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/digital-forensics.jpg"
                alt="Digital Forensics Lab"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <a
                href={program.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-20"
              >
                <div className="w-16 h-16 bg-[#017840] rounded-full flex items-center justify-center">
                  <Play size={32} className="text-white ml-1" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-3xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
              >
                Program Overview
              </h2>
              <p className="text-gray-500 mb-8 text-lg leading-relaxed font-poppins">
                {program.overview.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-5 rounded-xl border border-green-100 transition-all duration-300 hover:shadow-md">
                  <h3
                    className={`text-xl font-semibold text-gray-800 mb-4 ${bebasNeue.className} flex items-center`}
                  >
                    <Target size={24} className="text-[#017840] mr-2" />
                    Why This Program?
                  </h3>
                  <ul className="space-y-3">
                    {program.whyThisProgram.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="text-yellow-500 mr-3 mt-1 text-xl">
                          •
                        </span>
                        <span className="text-gray-700 font-poppins">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 transition-all duration-300 hover:shadow-md">
                  <h3
                    className={`text-xl font-semibold text-gray-800 mb-4 ${bebasNeue.className} flex items-center`}
                  >
                    <Lightbulb size={24} className="text-blue-600 mr-2" />
                    Real-World Importance
                  </h3>
                  <div className="text-gray-700 font-poppins space-y-4">
                    {program.realLifeImportance
                      .split(". ")
                      .filter((s) => s.length > 0)
                      .map((sentence, index) => (
                        <p key={index} className="flex">
                          <span className="text-green-500 mr-2 mt-1.5">•</span>
                          {sentence.trim()}.
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Curriculum Section */}
            <section className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-3xl font-bold text-[#017840] mb-8 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
              >
                Curriculum Overview
              </h2>

              <div className="mb-8">
                <h3
                  className={`text-xl font-semibold text-gray-800 mb-6 ${bebasNeue.className} flex items-center`}
                >
                  <BarChart3 size={24} className="text-[#017840] mr-2" />
                  Program Structure
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-5 rounded-xl border border-green-200 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl sm:text-3xl font-bold text-[#017840]">
                      {program.programBreakdown.coreCourses}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-poppins mt-1 sm:mt-2">
                      Core Courses
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 sm:p-5 rounded-xl border border-yellow-200 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl sm:text-3xl font-bold text-[#017840]">
                      {program.programBreakdown.electives}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-poppins mt-1 sm:mt-2">
                      Electives
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-5 rounded-xl border border-blue-200 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl sm:text-3xl font-bold text-[#017840]">
                      {program.programBreakdown.projectsInternships}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-poppins mt-1 sm:mt-2">
                      Practical Experience
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3
                  className={`text-xl font-semibold text-gray-800 mb-4 ${bebasNeue.className} flex items-center`}
                >
                  <Brain size={24} className="text-[#017840] mr-2" />
                  Key Topics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {program.keyTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-green-100 to-green-200 text-[#017840] px-4 py-3 rounded-xl text-sm font-poppins font-medium transition-all duration-300 hover:from-green-200 hover:to-green-300 hover:shadow-md flex items-center"
                    >
                      {topicIcons[topic as TopicType] || (
                        <Code size={18} className="mr-2" />
                      )}
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className={`text-xl font-semibold text-gray-800 mb-6 ${bebasNeue.className} flex items-center`}
                >
                  <BookOpen size={24} className="text-[#017840] mr-2" />
                  Course Outline
                </h3>
                <div className="space-y-4">
                  {program.semesterOutline.map((year, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <div
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleYearExpansion(year.year)}
                      >
                        <h4
                          className={`text-lg font-semibold text-[#017840] ${bebasNeue.className}`}
                        >
                          Year {year.year}: {year.theme}
                        </h4>
                        {expandedYear === year.year ? (
                          <ChevronUp size={20} className="text-[#017840]" />
                        ) : (
                          <ChevronDown size={20} className="text-[#017840]" />
                        )}
                      </div>

                      {expandedYear === year.year && (
                        <div className="p-4 bg-white animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-medium text-gray-700 mb-3 font-poppins border-b pb-2 flex items-center">
                                <span className="w-2 h-2 bg-[#017840] rounded-full mr-2"></span>
                                First Semester
                              </h5>
                              <ul className="space-y-2">
                                {year.semesters.first.map((course, i) => (
                                  <li
                                    key={i}
                                    className="text-gray-600 font-poppins flex items-start"
                                  >
                                    <span className="text-green-500 mr-2 mt-1.5">
                                      •
                                    </span>
                                    <span>{course}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-700 mb-3 font-poppins border-b pb-2 flex items-center">
                                <span className="w-2 h-2 bg-[#017840] rounded-full mr-2"></span>
                                Second Semester
                              </h5>
                              <ul className="space-y-2">
                                {year.semesters.second.map((course, i) => (
                                  <li
                                    key={i}
                                    className="text-gray-600 font-poppins flex items-start"
                                  >
                                    <span className="text-green-500 mr-2 mt-1.5">
                                      •
                                    </span>
                                    <span>{course}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Career Paths Section */}
            <section className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-3xl font-bold text-[#017840] mb-8 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
              >
                Career Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {program.careerPaths.map((career, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white transition-all duration-300 hover:shadow-lg hover:border-[#017840]/30"
                  >
                    <h3
                      className={`text-xl font-semibold text-gray-800 mb-3 ${bebasNeue.className} flex items-center`}
                    >
                      <MapPin size={20} className="text-[#017840] mr-2" />
                      {career.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 font-poppins font-medium">
                      Potential Sectors:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {career.sectors.map((sector, i) => (
                        <span
                          key={i}
                          className="bg-[#017840]/10 text-[#017840] px-3 py-1 rounded-full text-xs font-poppins font-medium transition-all duration-300 hover:bg-[#017840] hover:text-white"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Outcomes Section */}
            <section className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-3xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
              >
                Learning Outcomes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.learningOutcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100"
                  >
                    <span className="text-green-600 mr-3 mt-1 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-gray-700 font-poppins">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <AdmissionRequirementsSection
              requirements={program.admissionRequirements}
            />

            {/* Alumni Section */}
            {program.notableAlumni && program.notableAlumni.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500 hover:shadow-md">
                <h2
                  className={`text-3xl font-bold text-[#017840] mb-8 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
                >
                  Our Successful Alumni
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {program.notableAlumni.map((alumni, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        <Image
                          src={alumni.imageUrl}
                          alt={alumni.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#017840]"
                        />
                        <div>
                          <h3
                            className={`font-semibold text-gray-800 ${bebasNeue.className}`}
                          >
                            {alumni.name}
                          </h3>
                          <p className="text-sm text-gray-600 font-poppins">
                            {alumni.position}
                          </p>
                          <p className="text-xs text-[#017840] font-poppins">
                            Class of {alumni.graduationYear}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic font-poppins text-sm border-l-2 border-[#017840] pl-3">
                        &quot;{alumni.testimonial}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interesting Facts Section */}
            {program.interestingFacts &&
              program.interestingFacts.length > 0 && (
                <section className="bg-white rounded-2xl shadow-sm p-8 transition-all duration-500 hover:shadow-md">
                  <h2
                    className={`text-3xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-l-4 border-[#017840] pl-4`}
                  >
                    Did You Know?
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {program.interestingFacts.map((fact, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100"
                      >
                        <span className="text-purple-600 mr-3 mt-1 flex-shrink-0">
                          <Lightbulb size={20} />
                        </span>
                        <span className="text-gray-700 font-poppins">
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* HOD Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-2xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-b pb-3`}
              >
                Meet Your Department Head
              </h2>
              <div className="text-center">
                <div className="relative inline-block mb-5">
                  <Image
                    src={program.headOfDepartment.imageUrl}
                    alt={program.headOfDepartment.name}
                    height={160}
                    width={160}
                    className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-green-100 shadow-md transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 right-5 w-10 h-10 bg-[#017840] rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold text-gray-800 mb-1 ${bebasNeue.className}`}
                >
                  {program.headOfDepartment.name}
                </h3>
                <p className="text-gray-600 mb-5 font-poppins">
                  {program.headOfDepartment.title}
                </p>
                <div className="bg-green-50 p-4 rounded-xl mb-5 transition-all duration-300 hover:bg-green-100">
                  <p className="text-gray-700 italic font-poppins text-sm">
                    &ldquo;{program.headOfDepartment.message}&rdqo;
                  </p>
                </div>
                <p className="text-gray-600 text-sm font-poppins">
                  {program.headOfDepartment.bio}
                </p>
              </div>
            </div>

            {/* Accreditation Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-2xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-b pb-3 flex items-center`}
              >
                <Award size={24} className="text-yellow-500 mr-2" />
                Accreditation
              </h2>
              <div className="space-y-4">
                {program.accreditation.map((org, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-yellow-50 rounded-lg transition-all duration-300 hover:bg-yellow-100"
                  >
                    <Award
                      size={18}
                      className="text-yellow-500 mr-3 flex-shrink-0"
                    />
                    <span className="text-gray-700 font-poppins">{org}</span>
                  </div>
                ))}
              </div>
              {program.testPreparation && (
                <>
                  <h3
                    className={`text-lg font-semibold text-gray-800 mt-6 mb-3 ${bebasNeue.className} flex items-center`}
                  >
                    <Target size={20} className="text-[#017840] mr-2" />
                    Exam Preparation
                  </h3>
                  <p className="text-gray-700 text-sm font-poppins bg-blue-50 p-4 rounded-lg">
                    {program.testPreparation}
                  </p>
                </>
              )}
            </div>

            {/* Facilities Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-2xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-b pb-3 flex items-center`}
              >
                <Building size={24} className="text-[#017840] mr-2" />
                Facilities & Resources
              </h2>
              <ul className="space-y-3">
                {program.facilities.map((facility, index) => (
                  <li
                    key={index}
                    className="flex items-start p-2 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="text-[#017840] mr-3 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-gray-700 text-sm font-poppins">
                      {facility}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industry Connections Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-2xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-b pb-3 flex items-center`}
              >
                <HeartHandshake size={24} className="text-[#017840] mr-2" />
                Industry Connections
              </h2>

              <h3
                className={`font-semibold text-gray-800 mb-3 ${bebasNeue.className} flex items-center`}
              >
                <Users size={18} className="text-[#017840] mr-2" />
                Partners
              </h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {program.industryConnections.partners.map((partner, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-poppins transition-all duration-300 hover:bg-[#017840] hover:text-white"
                  >
                    {partner}
                  </span>
                ))}
              </div>

              <h3
                className={`font-semibold text-gray-800 mb-3 ${bebasNeue.className} flex items-center`}
              >
                <Lightbulb size={18} className="text-[#017840] mr-2" />
                Initiatives
              </h3>
              <ul className="space-y-2">
                {program.industryConnections.initiatives.map(
                  (initiative, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 font-poppins flex items-start"
                    >
                      <span className="text-green-500 mr-2 mt-1.5">•</span>
                      {initiative}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Scholarships Card */}
            {program.scholarships && program.scholarships.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-500 hover:shadow-md">
                <h2
                  className={`text-2xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-b pb-3 flex items-center`}
                >
                  <Award size={24} className="text-[#017840] mr-2" />
                  Scholarship Opportunities
                </h2>
                <div className="space-y-4">
                  {program.scholarships.map((scholarship, index) => (
                    <div
                      key={index}
                      className="p-3 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100"
                    >
                      <h3
                        className={`font-semibold text-gray-800 mb-1 ${bebasNeue.className}`}
                      >
                        {scholarship.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        {scholarship.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-500 hover:shadow-md">
              <h2
                className={`text-2xl font-bold text-[#017840] mb-6 ${bebasNeue.className} border-b pb-3 flex items-center`}
              >
                <Mail size={24} className="text-[#017840] mr-2" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
                  <Building
                    size={18}
                    className="text-gray-600 mr-3 flex-shrink-0"
                  />
                  <span className={`text-gray-700 ${poppins.className}`}>
                    {program.contactInfo.department}
                  </span>
                </div>
                <a
                  href={`mailto:${program.contactInfo.email}`}
                  className="flex items-center p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 group"
                >
                  <Mail
                    size={18}
                    className="text-gray-600 mr-3 flex-shrink-0"
                  />
                  <span
                    className={`"text-[#017840] group-hover:underline ${poppins.className}"`}
                  >
                    {program.contactInfo.email}
                  </span>
                </a>
                <a
                  href={`tel:${program.contactInfo.phone}`}
                  className="flex items-center p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 group"
                >
                  <Phone
                    size={18}
                    className="text-gray-600 mr-3 flex-shrink-0"
                  />
                  <span
                    className={`text-[#017840] group-hover:underline ${poppins.className}`}
                  >
                    {program.contactInfo.phone}
                  </span>
                </a>
              </div>

              {/* <Link
                href="/application"
                className="block w-full mt-6 bg-gradient-to-r from-[#017840] to-[#019b4e] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                Request Information
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Font styles and animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
    
          
          .transition-all {
            transition: all 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default ProgramDetail;
