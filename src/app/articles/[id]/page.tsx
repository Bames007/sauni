"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gantari, Bebas_Neue } from "next/font/google";
import { allArticles } from "../articles";
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

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  // Find article by matching ID as string
  const article = allArticles.find(
    (article) => article.id.toString() === articleId
  );

  // Get current index using the same string comparison
  const currentIndex = allArticles.findIndex(
    (a) => a.id.toString() === articleId
  );

  const nextArticle =
    currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Article Not Found
          </h1>

          <p className="text-gray-600 mb-6">
            The article you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>

          <Link
            href="/articles"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#017840] hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="mb-4">
            <span className="bg-[#017840] text-white text-sm font-semibold px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${bebasNeue.className}`}
          >
            {article.title}
          </h1>
          <p className="text-gray-500">{article.date}</p>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 rounded-lg overflow-hidden"
        >
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`max-w-none mb-16 ${gantari.className}`}
        >
          <div
            className="article-content text-gray-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />
        </motion.article>
        {/* Article Navigation */}
        <div className="border-t border-b border-gray-200 py-8 mb-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-4">
            {prevArticle ? (
              <Link
                href={`/articles/${prevArticle.id}`}
                className="group flex items-center text-[#017840] hover:text-[#016035] w-full md:w-1/2"
              >
                <div className="flex items-center w-full">
                  <svg
                    className="w-5 h-5 mr-3 flex-shrink-0 transform group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>

                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="flex-shrink-0 w-16 h-12 md:w-20 md:h-14 relative overflow-hidden rounded-lg">
                      <Image
                        src={prevArticle.image}
                        alt={prevArticle.title}
                        height={80}
                        width={120}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-xs text-gray-500 block mb-1">
                        Previous Article
                      </span>
                      <p className="font-semibold text-sm line-clamp-2">
                        {prevArticle.title}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-full md:w-1/2"></div>
            )}

            {nextArticle ? (
              <Link
                href={`/articles/${nextArticle.id}`}
                className="group flex items-center text-right text-[#017840] hover:text-[#016035] w-full md:w-1/2 justify-end mt-6 md:mt-0"
              >
                <div className="flex items-center w-full justify-end">
                  <div className="flex items-center space-x-3 min-w-0 flex-1 justify-end">
                    <div className="min-w-0 flex-1 text-right">
                      <span className="text-xs text-gray-500 block mb-1">
                        Next Article
                      </span>
                      <p className="font-semibold text-sm line-clamp-2">
                        {nextArticle.title}
                      </p>
                    </div>

                    <div className="flex-shrink-0 w-16 h-12 md:w-20 md:h-14 relative overflow-hidden rounded-lg">
                      <Image
                        src={nextArticle.image}
                        alt={nextArticle.title}
                        height={80}
                        width={120}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <svg
                    className="w-5 h-5 ml-3 flex-shrink-0 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </Link>
            ) : (
              <div className="w-full md:w-1/2"></div>
            )}
          </div>
        </div>

        {/* Back to Articles */}
        <div className="text-center">
          <Link
            href="/articles"
            className="inline-flex items-center text-[#017840] hover:text-[#016035] font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to All Articles
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Southern Atlantic University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
