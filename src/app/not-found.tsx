"use client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Custom404() {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);

  // Mini-game logic
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      setIsGameOver(true);
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(10);
    setIsGameOver(false);
  };

  const handleClick = () => {
    if (gameActive) {
      setScore(score + 1);
    }
  };

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
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  // Removed unused floatingAnimation variable

  return (
    <>
      <Head>
        <title>Page Not Found | Southern Atlantic University</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist at Southern Atlantic University."
        />
      </Head>

      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-12 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 rounded-full bg-[#017840] opacity-10"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-12 w-24 h-24 rounded-full bg-[#017840] opacity-5"
          animate={{
            x: [0, -15, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-[#017840] opacity-10"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <div className="p-8 text-center">
            {/* University Logo/Image with animation */}
            <motion.div
              className="mb-6 flex justify-center"
              variants={itemVariants}
              animate="animate"
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                <Image
                  src="/sauni-logo.png"
                  alt="Southern Atlantic University"
                  height={192}
                  width={192}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
            {/* University Name */}
            <motion.h1
              className={`text-4xl font-bold text-[#017840] mb-2 ${bebasNeue.className}`}
              variants={itemVariants}
            >
              SOUTHERN ATLANTIC UNIVERSITY
            </motion.h1>

            {/* Error Code with animation */}
            <motion.div
              className="my-8"
              variants={itemVariants}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            >
              <h2 className="text-9xl font-bold text-[#017840] opacity-90">
                404
              </h2>
              <motion.p
                className="text-xl text-gray-600 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Page Not Found
              </motion.p>
            </motion.div>

            {/* Error Message */}
            <motion.p
              className="text-gray-700 mb-8 px-4 text-lg"
              variants={itemVariants}
            >
              Oops! It seems you&apos;ve ventured into uncharted territory.
              Don&apos;t worry, even the best explorers get lost sometimes!
            </motion.p>

            {/* Mini-Game Section */}
            <motion.div
              className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-[#017840] mb-4">
                {isGameOver
                  ? `Game Over! Final Score: ${score}`
                  : gameActive
                    ? `Time: ${timeLeft}s | Score: ${score}`
                    : "Bored? Try our quick game!"}
              </h3>

              <motion.div
                className="h-20 bg-white rounded-md border-2 border-dashed border-green-300 flex items-center justify-center mb-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
              >
                {gameActive ? (
                  <p className="text-green-700 font-medium">
                    Click me as fast as you can!
                  </p>
                ) : isGameOver ? (
                  <p className="text-green-700 font-medium">
                    Your reaction time: {score} clicks in 10 seconds!
                  </p>
                ) : (
                  <p className="text-green-700 font-medium">
                    Click start and then click here repeatedly for 10 seconds!
                  </p>
                )}
              </motion.div>

              <motion.button
                className={`px-6 py-2 rounded-lg font-medium ${
                  gameActive ? "bg-gray-400" : "bg-[#017840] hover:bg-[#016035]"
                } text-white transition-colors`}
                whileHover={{ scale: gameActive ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                disabled={gameActive}
              >
                {gameActive
                  ? "Game in progress..."
                  : isGameOver
                    ? "Play Again"
                    : "Start Game"}
              </motion.button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="block px-6 py-3 bg-[#017840] text-white rounded-lg hover:bg-[#016035] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Go to Homepage
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="mailto:it-support@sauni.edu.ng"
                  className="block px-6 py-3 border-2 border-[#017840] text-[#017840] rounded-lg hover:bg-green-50 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Contact IT Department
                </a>
              </motion.div>
            </motion.div>

            {/* IT Department Contact Info */}
            <motion.div
              className="mt-8 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <p className="text-gray-600 mb-2 font-semibold">
                IT Department - ICT Lab
              </p>
              <p className="text-gray-600 mb-1">
                Email:{" "}
                <a
                  href="mailto:it-support@sauni.edu.ng"
                  className="text-[#017840] hover:underline font-medium"
                >
                  it-support@sauni.edu.ng
                </a>
              </p>
              <p className="text-gray-600">
                Phone:{" "}
                <a
                  href="tel:+2348127728084"
                  className="text-[#017840] hover:underline font-medium"
                >
                  +234-81-2772-8084
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional decorative elements */}
        <motion.div
          className="mt-12 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>
            © {new Date().getFullYear()} Southern Atlantic University. All
            rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}
