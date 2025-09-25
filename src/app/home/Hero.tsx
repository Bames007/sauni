"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight, BookOpen, Calendar } from "lucide-react";
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

const Hero = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Background with green overlay */}
      <div className="absolute inset-0 z-0 min-h-screen">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        <div className="absolute inset-0 bg-[#017840] opacity-50"></div>
      </div>

      {/* Top Container - 60vh */}
      <div className="relative z-10 flex-grow flex items-center min-h-[60vh] py-12 px-4 pt-[10vh]">
        <div className="container mx-auto mt-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-16">
            {/* Left Column - Text Content */}
            <motion.div
              className="flex-1 flex flex-col justify-center text-white"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className={`block ${bebasNeue.className}`}>
                  SHAPING THE FUTURE
                </span>
                <span className={`block ${bebasNeue.className}`}>
                  THROUGH EDUCATION AND
                </span>
                <span className={`block ${bebasNeue.className}`}>
                  INNOVATION
                </span>
              </motion.h1>

              <motion.p
                className={`text-lg md:text-xl mb-10 max-w-2xl leading-relaxed ${gantari.className}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                At Southern Atlantic University (SAU), we believe education is
                more than just a degree—it&apos;s a life-changing journey that
                empowers individuals to make a difference in the world.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#13660B] hover:bg-[#0f4f08] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  Get Started
                  <ArrowRight size={20} />
                </motion.button>

                <Link href="/application">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    Apply Now
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative w-full h-64 md:h-80 lg:h-96 max-w-lg mx-auto rounded-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                  alt="Students at Southern Atlantic University"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Middle Container - Action Buttons */}
      <div className="relative z-10 min-h-[10vh] flex items-center py-8 px-4">
        <div className="container mx-auto">
          {/* Desktop Layout (horizontal) */}
          <motion.div
            className="hidden md:flex flex-row items-center gap-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="flex-1 h-32 bg-yellow-400/90 backdrop-blur-md rounded-2xl flex items-center justify-between p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
              {/* Enrol Now Button */}
              <Link href={"/application"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-full flex-1 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 text-black text-lg font-semibold hover:bg-yellow-500/50 hover:shadow-lg"
                >
                  <BookOpen size={28} />
                  <span className={gantari.className}>Enrol Now</span>
                </motion.button>
              </Link>
              {/* Vertical Divider */}
              <div className="h-16 w-px bg-black/30"></div>

              {/* See Programs Button */}
              <Link href="/programs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-full flex-1 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 text-black text-lg font-semibold hover:bg-yellow-500/50 hover:shadow-lg"
                >
                  <Calendar size={28} />
                  <span className={gantari.className}>See Programs</span>
                </motion.button>
              </Link>

              {/* Vertical Divider */}
              <div className="h-16 w-px bg-black/30"></div>

              {/* Join Tour Button */}
              <Link href={"/home/calendar"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-full flex-1 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 text-black text-lg font-semibold hover:bg-yellow-500/50 hover:shadow-lg"
                >
                  <Play size={28} />
                  <span className={gantari.className}>Join Tour</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Mobile Layout (vertical) */}
          <motion.div
            className="flex flex-col md:hidden gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {/* Enrol Now Button */}
            <Link href={"/application"}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-yellow-400/90 backdrop-blur-md rounded-xl flex items-center justify-center gap-3 p-4 shadow-lg transition-all duration-300 hover:shadow-md hover:bg-yellow-500/80"
              >
                <BookOpen size={24} />
                <span
                  className={`text-black text-lg font-semibold ${gantari.className}`}
                >
                  Enrol Now
                </span>
              </motion.button>
            </Link>

            {/* See Programs Button */}
            <Link href="/programs">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-yellow-400/90 backdrop-blur-md rounded-xl flex items-center justify-center gap-3 p-4 shadow-lg transition-all duration-300 hover:shadow-md hover:bg-yellow-500/80"
              >
                <Calendar size={24} />
                <span
                  className={`text-black text-lg font-semibold ${gantari.className}`}
                >
                  See Programs
                </span>
              </motion.button>
            </Link>

            {/* Join Tour Button */}
            <Link href={"/home/calendar"}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-yellow-400/90 backdrop-blur-md rounded-xl flex items-center justify-center gap-3 p-4 shadow-lg transition-all duration-300 hover:shadow-md hover:bg-yellow-500/80"
              >
                <Play size={24} />
                <span
                  className={`text-black text-lg font-semibold ${gantari.className}`}
                >
                  Join Tour
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
