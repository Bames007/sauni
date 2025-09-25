"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Gantari, Bebas_Neue } from "next/font/google";
import { allArticles } from "../articles/articles";
import Link from "next/link";
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

const Articles = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get only the first 4 articles
  const displayedArticles = allArticles.slice(0, 4);

  // Create refs for displayed articles at the top level
  const articleRefs = displayedArticles.map(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
    return { ref, inView };
  });

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

  return (
    <section
      id="articles"
      className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden px-4 md:px-8 lg:px-20"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-[#017840] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#BD9946] opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-8 md:w-12 h-0.5 bg-[#BD9946] mr-3 md:mr-4"></div>
            <span
              className={`text-[#BD9946] font-semibold tracking-wider text-xs md:text-sm uppercase ${gantari.className}`}
            >
              Insights & Knowledge
            </span>
            <div className="w-8 md:w-12 h-0.5 bg-[#BD9946] ml-3 md:ml-4"></div>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#017840] mb-4 md:mb-6 ${bebasNeue.className}`}
          >
            Latest <span className="text-[#BD9946]">Articles</span> & Research
          </h2>
          <p
            className={`text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed ${gantari.className}`}
          >
            Stay updated with the latest insights, research, and news from SAU
            and the academic world.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {displayedArticles.map((article, index) => {
            const { ref: articleRef, inView: articleInView } =
              articleRefs[index];

            return (
              <motion.article
                key={article.id}
                ref={articleRef}
                className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out hover:shadow-2xl h-[400px] md:h-[450px] lg:h-[500px] flex flex-col relative"
                variants={itemVariants}
              >
                {/* Mobile tap area - covers entire card on mobile */}
                <Link
                  href={`/articles/${article.id}`}
                  className="block md:hidden absolute inset-0 z-30"
                  aria-label={`Read article: ${article.title}`}
                />

                {/* Main image container - takes full space but with proper aspect ratio */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={180}
                    height={220}
                    className="w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Green overlay that appears on hover - reduced to 50% opacity */}
                  <div className="absolute inset-0 bg-[#017840] opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                  {/* Category badge - always visible */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                    <span className="bg-[#017840] text-white text-xs font-semibold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-md">
                      {article.category}
                    </span>
                  </div>

                  {/* Title - disappears on hover */}
                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                    <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2">
                      {article.title}
                    </h3>
                  </div>

                  {/* Date - always visible */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                    <span className="text-xs text-white font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                      {article.date}
                    </span>
                  </div>
                </div>

                {/* Hidden content that appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <div className="transform translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-200 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-white/20">
                      <Link
                        href={`/articles/${article.id}`}
                        className="hidden md:flex items-center text-white hover:text-[#BD9946] font-semibold text-xs md:text-sm transition-colors duration-300 group/readmore"
                      >
                        Read more
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transform group-hover/readmore:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </Link>
                      {/* Show mobile read more text */}
                      <Link
                        href={`/articles/${article.id}`}
                        className="md:hidden flex items-center text-white hover:text-[#BD9946] font-semibold text-xs md:text-sm transition-colors duration-300 group/readmore"
                      >
                        Tap to read full article
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transform group-hover/readmore:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </Link>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#BD9946] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#BD9946] opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#BD9946] opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <Link
            href="/articles"
            className="inline-flex items-center bg-gradient-to-r from-[#017840] to-[#016035] hover:from-[#016035] hover:to-[#01502a] text-white font-semibold py-3 px-6 md:py-3.5 md:px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg group/button"
          >
            View All Articles
            <svg
              className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2 transform group-hover/button:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Articles;
