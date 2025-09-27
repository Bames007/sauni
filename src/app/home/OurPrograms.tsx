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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7f0] to-white py-12 px-4 md:px-8">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#017840] ${bebasNeue.className}`}
        >
          EXPLORE OUR ACADEMIC PROGRAMS
        </h1>
        <p
          className={`text-base md:text-lg text-gray-700 max-w-3xl mx-auto ${gantari.className}`}
        >
          Discover your path to success with our diverse range of programs
          designed to equip you with the knowledge and skills for the future.
        </p>
      </motion.div>

      {/* Program Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {programData.map((program) => (
          <motion.div
            key={program.id}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl group"
          >
            {/* Card Header with Image */}
            <div className="h-40 md:h-48 overflow-hidden relative">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-[#017840] opacity-70"></div>
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                <h2
                  className={`text-xl md:text-2xl font-bold text-white ${bebasNeue.className}`}
                >
                  {program.title}
                </h2>
                <p className="text-yellow-300 mt-1 text-sm md:text-base">
                  {program.tagline}
                </p>
              </div>
              <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs md:text-sm font-semibold">
                {program.programCode}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center text-xs md:text-sm text-gray-600">
                  <Clock size={14} className="mr-1" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-600">
                  <GraduationCap size={14} className="mr-1" />
                  <span>{program.programType}</span>
                </div>
              </div>

              <p
                className={`text-gray-700 mb-4 md:mb-6 line-clamp-3 text-sm md:text-base ${gantari.className}`}
              >
                {program.overview.description.substring(0, 120)}...
              </p>

              {/* Program Highlights */}
              <div className="mb-4 md:mb-6">
                <h3
                  className={`text-xs md:text-sm font-semibold text-[#017840] mb-1 md:mb-2 ${gantari.className}`}
                >
                  KEY HIGHLIGHTS
                </h3>
                <ul className="space-y-1">
                  {program.whyThisProgram.slice(0, 2).map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start text-xs md:text-sm text-gray-600"
                    >
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>{highlight.substring(0, 60)}...</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Bar */}
              <div className="flex justify-between mb-4 md:mb-6 bg-gray-100 p-2 md:p-3 rounded-lg">
                <div className="text-center">
                  <div className="text-base md:text-lg font-bold text-[#017840]">
                    {program.programBreakdown.coreCourses}%
                  </div>
                  <div className="text-xs text-gray-600">Core</div>
                </div>
                <div className="text-center">
                  <div className="text-base md:text-lg font-bold text-[#017840]">
                    {program.programBreakdown.electives}%
                  </div>
                  <div className="text-xs text-gray-600">Electives</div>
                </div>
                <div className="text-center">
                  <div className="text-base md:text-lg font-bold text-[#017840]">
                    {program.programBreakdown.projectsInternships}%
                  </div>
                  <div className="text-xs text-gray-600">Practical</div>
                </div>
              </div>

              {/* CTA Button */}
              <Link href={`programs/${program.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#017840] hover:bg-[#015c30] text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-md text-sm md:text-base"
                >
                  Explore Program
                  <ArrowRight size={16} />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        className="mt-16 md:mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2
          className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#017840] ${bebasNeue.className}`}
        >
          READY TO BEGIN YOUR JOURNEY?
        </h2>
        <p
          className={`text-base md:text-lg text-gray-700 mb-8 md:mb-10 max-w-3xl mx-auto ${gantari.className}`}
        >
          Join thousands of students who have transformed their lives through
          our innovative programs
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link href="/ai-counsellor">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#13660B] hover:bg-[#0f4f08] text-white font-semibold py-2 md:py-3 px-4 md:px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
            >
              <Handshake size={18} />
              Talk With A Counsellor
            </motion.button>
          </Link>
          <Link href="/application">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 md:py-3 px-4 md:px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
            >
              <GraduationCap size={18} />
              Apply Now
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OurPrograms;
