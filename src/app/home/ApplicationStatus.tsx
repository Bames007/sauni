"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Gantari, Bebas_Neue } from "next/font/google";
import clsx from "clsx";

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

// Create a motion-enhanced Image component
const MotionImage = motion.create(Image);

export default function ApplicationStatus() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants for staggered effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden shadow-2xl mx-auto my-12">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <MotionImage
          src="https://images.unsplash.com/photo-1653189909513-fc0516e4d27a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="University campus with students"
          fill
          priority
          className="object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk6gUuWxUauNWtrdJYHWept1q6lU6yDzTv//2Q=="
        />
        <div className="absolute inset-0 bg-[#017840]/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#017840]/90 via-[#017840]/70 to-transparent"></div>
      </div>

      {/* Content */}
      <motion.div
        className={clsx(
          "relative z-10 h-full flex items-center px-6 lg:px-12",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl text-white">
          <motion.h2
            variants={itemVariants}
            className={clsx(
              "text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight",
              bebasNeue.className
            )}
          >
            APPLICATION SUBMITTED?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={clsx(
              "text-xl md:text-2xl mb-8 opacity-90 max-w-2xl",
              gantari.className
            )}
          >
            Track your admission status and stay updated on your journey to
            becoming part of Southern Atlantic University
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/application_status"
                className={clsx(
                  "inline-block px-8 py-4 rounded-lg text-lg uppercase font-bold transition-all duration-300 shadow-lg",
                  "bg-[#BD9946] hover:bg-[#a88438] text-white border-2 border-[#BD9946] hover:border-white",
                  "transform hover:shadow-2xl",
                  gantari.className
                )}
              >
                Check Your Status
              </Link>
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 border-4 border-[#BD9946] rounded-full opacity-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
