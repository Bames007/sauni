"use client";

import type { FC } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap, Globe, Award } from "lucide-react";
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

const About: FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" as const },
    },
  };

  const statVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeInOut" as const },
    },
  };

  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#017840] lg:flex-1 lg:text-left ${bebasNeue.className}`}
            >
              SAU&apos;S COMMITMENT TO ACADEMIC EXCELLENCE
            </h2>
            <p
              className={`text-base md:text-lg max-w-3xl leading-relaxed lg:flex-1 lg:text-right ${gantari.className}`}
              style={{ color: "rgba(0,0,0,0.6)" }}
            >
              Situated in the vibrant city of Uyo, Akwa Ibom State, SAU is
              committed to shaping leaders, innovators, and problem-solvers who
              will impact Nigeria and the world.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text and Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.p
              className={`text-gray-700 leading-relaxed text-base md:text-lg ${gantari.className} text-left`}
              variants={itemVariants}
            >
              For over five decades, Southern Atlantic University has been at
              the forefront of academic innovation, providing world-class
              education that combines theoretical knowledge with practical
              application. Our commitment extends beyond the classroom to create
              well-rounded graduates ready to tackle global challenges.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              variants={itemVariants}
            >
              <div className="bg-green-50 p-4 md:p-6 rounded-xl border border-green-100">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 md:h-6 md:w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-green-800">
                    50K+
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-600">Students</p>
              </div>

              <div className="bg-green-50 p-4 md:p-6 rounded-xl border border-green-100">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Award className="h-5 w-5 md:h-6 md:w-6 text-green-700" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-green-800">
                    5.1★
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  Academic Rating
                </p>
              </div>
            </motion.div>

            {/* Button */}
            <motion.button
              variants={itemVariants}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-colors duration-300 flex items-center group mx-auto lg:mx-0"
            >
              READ MORE
              <svg
                className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Right side - Images + Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Left Image - FIXED */}
            <motion.div className="relative" variants={imageVariants}>
              <div className="relative w-full h-64 md:h-80 rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/amenities/two.jpg"
                  alt="Campus Building"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {/* Overlay box */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-4 -bottom-4 bg-white shadow-xl rounded-xl p-3 md:p-5 text-center border border-green-100 w-40 md:w-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={statVariants}
              >
                <p className="text-green-700 font-bold text-lg md:text-xl">
                  50K+
                </p>
                <p className="text-xs md:text-sm text-gray-600 mb-2">
                  Students
                </p>
                <div className="flex justify-center gap-1">
                  <div className="relative w-5 h-5 md:w-6 md:h-6">
                    <Image
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="student"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white shadow-sm object-cover"
                    />
                  </div>
                  <div className="relative w-5 h-5 md:w-6 md:h-6">
                    <Image
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="student"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white shadow-sm object-cover"
                    />
                  </div>
                  <div className="relative w-5 h-5 md:w-6 md:h-6">
                    <Image
                      src="https://randomuser.me/api/portraits/men/45.jpg"
                      alt="student"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white shadow-sm object-cover"
                    />
                  </div>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-bold text-green-700">
                      +47
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image - FIXED */}
            <motion.div
              className="relative mt-12 hidden md:block"
              variants={imageVariants}
              transition={{ delay: 0.1 }}
            >
              <div className="relative w-full h-64 md:h-80 rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80"
                  alt="Campus Library"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -right-4 md:-right-10 top-4 md:top-10 flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {[
                {
                  value: "15+",
                  label: "Courses",
                  icon: (
                    <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-green-700" />
                  ),
                },
                {
                  value: "56+",
                  label: "Startups",
                  icon: (
                    <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-green-700" />
                  ),
                },
                {
                  value: "10+",
                  label: "Languages",
                  icon: (
                    <Globe className="h-4 w-4 md:h-5 md:w-5 text-green-700" />
                  ),
                },
                {
                  value: "20+",
                  label: "Professors",
                  icon: (
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-green-700" />
                  ),
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-xl shadow-md px-4 py-3 md:px-6 md:py-4 text-center border border-green-100 flex items-center min-w-max"
                  variants={statVariants}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-green-100 p-1 md:p-2 rounded-lg mr-2 md:mr-3">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-green-700 font-bold text-base md:text-lg">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
