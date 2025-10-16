"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Clock, Handshake } from "lucide-react";
import Link from "next/link";
import { Gantari, Bebas_Neue } from "next/font/google";
import { programData } from "../programs/programsData";

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

const OurPrograms = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7f0] to-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="text-center mb-8 sm:mb-12 lg:mb-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 text-[#017840] ${bebasNeue.className}`}
        >
          EXPLORE OUR ACADEMIC PROGRAMS
        </h1>
        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed ${gantari.className}`}
        >
          Discover your path to success with our diverse range of programs
          designed for the future.
        </p>
      </motion.div>

      {/* Program Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {programData.map((program) => (
          <motion.div
            key={program.id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg group"
          >
            {/* Card Header with Image */}
            <div className="h-32 sm:h-40 md:h-48 lg:h-52 overflow-hidden relative">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-[#017840] opacity-70"></div>
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 md:left-4 lg:left-5">
                <h2
                  className={`text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-white leading-tight ${bebasNeue.className}`}
                >
                  {program.title}
                </h2>
                <p className="text-yellow-300 mt-0.5 text-xs sm:text-sm lg:text-base">
                  {program.tagline}
                </p>
              </div>
              <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-yellow-400 text-black px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-semibold">
                {program.programCode}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="flex items-center text-xs lg:text-sm text-gray-600">
                  <Clock size={12} className="mr-1 lg:mr-2" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center text-xs lg:text-sm text-gray-600">
                  <GraduationCap size={12} className="mr-1 lg:mr-2" />
                  <span>{program.programType}</span>
                </div>
              </div>

              <p
                className={`text-gray-700 mb-3 sm:mb-4 lg:mb-5 line-clamp-3 text-xs sm:text-sm lg:text-base leading-relaxed ${gantari.className}`}
              >
                {program.overview.description.substring(0, 100)}...
              </p>

              {/* Program Highlights */}
              <div className="mb-3 sm:mb-4 lg:mb-5">
                <h3
                  className={`text-xs lg:text-sm font-semibold text-[#017840] mb-1 lg:mb-2 ${gantari.className}`}
                >
                  KEY HIGHLIGHTS
                </h3>
                <ul className="space-y-0.5 lg:space-y-1">
                  {program.whyThisProgram.slice(0, 2).map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start text-xs lg:text-sm text-gray-600"
                    >
                      <span className="text-yellow-500 mr-1.5 lg:mr-2 mt-0.5">
                        •
                      </span>
                      <span className="leading-tight">
                        {highlight.substring(0, 50)}...
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Bar */}
              <div className="flex justify-between mb-3 sm:mb-4 lg:mb-5 bg-gray-100 p-1.5 sm:p-2 lg:p-3 rounded-md">
                <div className="text-center flex-1">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-[#017840]">
                    {program.programBreakdown.coreCourses}%
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">
                    Core
                  </div>
                </div>
                <div className="text-center flex-1 border-x border-gray-300">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-[#017840]">
                    {program.programBreakdown.electives}%
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">
                    Electives
                  </div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-[#017840]">
                    {program.programBreakdown.projectsInternships}%
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">
                    Practical
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link href={`programs/${program.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#017840] hover:bg-[#015c30] text-white font-semibold py-2 px-3 lg:py-3 lg:px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 lg:gap-2 shadow-sm text-xs sm:text-sm lg:text-base"
                >
                  Explore Program
                  <ArrowRight size={14} className="lg:w-4 lg:h-4" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        className="mt-12 sm:mt-16 lg:mt-20 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 text-[#017840] ${bebasNeue.className}`}
        >
          READY TO BEGIN YOUR JOURNEY?
        </h2>
        <p
          className={`text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 lg:mb-10 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed ${gantari.className}`}
        >
          Join thousands of students who have transformed their lives through
          our innovative programs
        </p>

        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 justify-center max-w-xs mx-auto sm:max-w-none sm:flex-row lg:max-w-2xl xl:max-w-3xl">
          <Link href="/ai-counsellor" className="flex-1 lg:flex-none">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#13660B] hover:bg-[#0f4f08] text-white font-semibold py-2.5 lg:py-4 px-4 lg:px-8 rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 lg:gap-3 shadow-sm text-xs sm:text-sm lg:text-lg h-12 lg:h-16"
            >
              <Handshake size={16} className="lg:w-6 lg:h-6" />
              Talk With A Counsellor
            </motion.button>
          </Link>
          <Link href="/application" className="flex-1 lg:flex-none">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 lg:py-4 px-4 lg:px-8 rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 lg:gap-3 shadow-sm text-xs sm:text-sm lg:text-lg h-12 lg:h-16"
            >
              <GraduationCap size={16} className="lg:w-6 lg:h-6" />
              Apply Now
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OurPrograms;
