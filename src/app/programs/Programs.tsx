"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Gantari, Bebas_Neue } from "next/font/google";
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

const facultyData = [
  {
    id: 1,
    name: "Faculty of Management and Social Sciences",
    slug: "management-social-sciences",
    description:
      "Developing future leaders in business, governance, and social innovation through transformative education and practical experience.",
    courses: [
      { id: "bsc-accounting", name: "BSc (Hons) Accounting" }, // Changed to use programCode
      {
        id: "bsc-business-administration",
        name: "BSc Business Administration",
      },
      {
        id: "bsc-hospitality-tourism",
        name: "BSc Hospitality & Tourism Management",
      },
      { id: "bsc-public-administration", name: "BSc Public Administration" },
      {
        id: "bsc-criminology-security",
        name: "BSc Criminology & Security Studies",
      },
      { id: "bsc-political-science", name: "BSc Political Science" },
      {
        id: "bsc-international-relations",
        name: "BSc International Relations & Diplomacy",
      },
      { id: "bsc-economics", name: "BSc Economics" },
    ],
    dean: {
      name: "Dr. Sarah Chen",
      title: "Dean, Faculty of Management and Social Sciences",
      message:
        "Our faculty is committed to nurturing ethical leaders who will drive positive change in organizations and communities worldwide. Through our innovative programs, students gain both theoretical knowledge and practical skills needed to excel in today's dynamic global landscape.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    color: "#017840",
  },
  {
    id: 2,
    name: "Faculty of Science and Computing",
    slug: "science-computing",
    description:
      "Pioneering innovation in technology and scientific research to solve complex challenges of the modern world.",
    courses: [
      { id: "bsc-petroleum-chemistry", name: "BSc Petroleum Chemistry" },
      {
        id: "bsc-information-communication-technology",
        name: "BSc Information & Communication Technology (ICT)",
      },
      { id: "bsc-microbiology", name: "BSc Microbiology" },
      { id: "bsc-physics-electronics", name: "BSc Physics with Electronics" },
      { id: "bsc-computer-science", name: "BSc Computer Science" },
      { id: "bsc-software-engineering", name: "BSc Software Engineering" },
      { id: "bsc-cyber-security", name: "BSc Cyber Security" },
    ],
    dean: {
      name: "Dr. Michael Rodriguez",
      title: "Dean, Faculty of Science and Computing",
      message:
        "In our rapidly evolving technological landscape, we equip students with cutting-edge skills and research capabilities. Our hands-on approach ensures graduates are ready to tackle real-world challenges in science, technology, and innovation.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    color: "#13660B",
  },
];

const Programs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const facultyVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const courseItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7f0] to-white py-12 px-4 md:px-8">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#017840] ${bebasNeue.className}`}
        >
          ACADEMIC FACULTIES & PROGRAMS
        </h1>
        <p
          className={`text-lg md:text-xl text-gray-700 max-w-4xl mx-auto ${gantari.className}`}
        >
          Discover our comprehensive range of undergraduate programs designed to
          equip you with the knowledge, skills, and practical experience needed
          for success in today&apos;s competitive global landscape.
        </p>
      </motion.div>

      {/* Faculty Sections */}
      <motion.div
        className="max-w-7xl mx-auto space-y-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {facultyData.map((faculty) => (
          <motion.section
            key={faculty.id}
            variants={facultyVariants}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Faculty Header */}
            <div
              className="h-20 md:h-24 flex items-center px-6 md:px-8 text-white"
              style={{ backgroundColor: faculty.color }}
            >
              <h2
                className={`text-2xl md:text-3xl font-bold ${bebasNeue.className}`}
              >
                {faculty.name}
              </h2>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Courses List */}
                <div className="lg:col-span-2">
                  <h3
                    className={`text-xl font-semibold mb-6 text-[#017840] ${gantari.className}`}
                  >
                    Undergraduate Programs
                  </h3>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                  >
                    {faculty.courses.map((course) => (
                      <Link key={course.id} href={`/programs/${course.id}`}>
                        <motion.div
                          variants={courseItemVariants}
                          whileHover={{
                            x: 5,
                            backgroundColor: "#f8faf8",
                            transition: { duration: 0.2 },
                          }}
                          className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer group"
                        >
                          <GraduationCap
                            size={20}
                            className="text-[#017840] mr-3 group-hover:scale-110 transition-transform"
                          />
                          <span
                            className={`text-gray-800 ${gantari.className} group-hover:text-[#017840] transition-colors`}
                          >
                            {course.name}
                          </span>
                          <ArrowRight
                            size={16}
                            className="ml-auto text-gray-400 group-hover:text-[#017840] group-hover:translate-x-1 transition-all"
                          />
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>

                  <motion.p
                    className={`mt-6 text-gray-600 ${gantari.className}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {faculty.description}
                  </motion.p>
                </div>

                {/* Dean Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Image
                          src={faculty.dean.image}
                          alt={faculty.dean.name}
                          width={120}
                          height={120}
                          className="rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1"
                      >
                        <ShieldCheck size={20} className="text-white" />
                      </motion.div>
                    </div>
                    <h4
                      className={`font-bold text-lg mt-4 text-gray-800 ${gantari.className}`}
                    >
                      {faculty.dean.name}
                    </h4>
                    <p
                      className={`text-sm text-gray-600 mb-4 ${gantari.className}`}
                    >
                      {faculty.dean.title}
                    </p>
                  </div>

                  <motion.blockquote
                    className={`text-gray-700 italic border-l-4 border-[#017840] pl-4 py-1 ${gantari.className}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    &ldquo;{faculty.dean.message}&rdquo;
                  </motion.blockquote>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6"
                  >
                    <Link href={`/faculty/${faculty.slug}`}>
                      <button className="w-full bg-gradient-to-r from-[#017840] to-[#13660B] text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                        Learn More About Faculty
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h2
          className={`text-3xl md:text-4xl font-bold mb-6 text-[#017840] ${bebasNeue.className}`}
        >
          READY TO START YOUR ACADEMIC JOURNEY?
        </h2>
        <p
          className={`text-lg text-gray-700 mb-10 max-w-3xl mx-auto ${gantari.className}`}
        >
          Join our community of innovators, leaders, and change-makers. Apply
          today and take the first step toward your future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#13660B] hover:bg-[#0f4f08] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Handshake size={20} />
            Schedule a Campus Tour
          </motion.button>

          <Link href="/application">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <GraduationCap size={20} />
              Begin Your Application
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Programs;
