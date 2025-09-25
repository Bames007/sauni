"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gantari, Bebas_Neue } from "next/font/google";
import Link from "next/link";
import { allArticles } from "../articles/articles";
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

const ArticlesHome = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(allArticles.map((article) => article.category))
    );
    return ["All", ...cats];
  }, []);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = allArticles;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.content?.toLowerCase().includes(query)
      );
    }

    // Sort by date
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [selectedCategory, sortOrder, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold text-[#017840] mb-4 ${bebasNeue.className}`}
          >
            All Articles & Research
          </h1>
          <p
            className={`text-gray-600 max-w-2xl mx-auto text-lg ${gantari.className}`}
          >
            Explore all our insights, research, and news from SAU and the
            academic world.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12 bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label
                htmlFor="category"
                className={`block text-sm font-medium text-gray-700 mb-1 ${gantari.className}`}
              >
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#017840] focus:border-[#017840]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex-1">
              <label
                htmlFor="sort"
                className={`block text-sm font-medium text-gray-700 mb-1 ${gantari.className}`}
              >
                Sort by Date
              </label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#017840] focus:border-[#017840]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label
                htmlFor="search"
                className={`block text-sm font-medium text-gray-700 mb-1 ${gantari.className}`}
              >
                Search Articles
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#017840] focus:border-[#017840]"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className={`mb-6 ${gantari.className}`}>
          <p className="text-gray-600">
            Showing {filteredArticles.length} of {allArticles.length} articles
            {selectedCategory !== "All" && ` in category "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key="articles-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out hover:shadow-2xl flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#017840] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs text-white font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                        {article.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <Link
                        href={`articles/${article.id}`}
                        className="flex items-center text-[#017840] hover:text-[#01502a] font-semibold text-sm transition-colors duration-300 group/readmore"
                      >
                        Read more
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover/readmore:translate-x-1 transition-transform duration-300"
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
                        <div className="w-2 h-2 rounded-full bg-[#BD9946] opacity-60"></div>
                        <div className="w-2 h-2 rounded-full bg-[#BD9946] opacity-40"></div>
                        <div className="w-2 h-2 rounded-full bg-[#BD9946] opacity-20"></div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search query to find what you're
                looking for.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArticlesHome;
