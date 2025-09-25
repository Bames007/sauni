"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Gantari, Bebas_Neue } from "next/font/google";
import type { Testimonial } from "./home_type";
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

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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

  // Placeholder testimonials focusing on university vision and values
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Dr. Elizabeth Morgan",
      role: "Founding President",
      program: "University Leadership",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      text: "We're building an institution that combines academic excellence with real-world impact. Our innovative curriculum is designed to prepare students for the challenges of tomorrow.",
    },
    {
      id: 2,
      name: "Professor James Wilson",
      role: "Dean of Academic Affairs",
      program: "Academic Excellence",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      text: "Our faculty comprises leading scholars and industry experts committed to creating a transformative educational experience that goes beyond traditional classroom learning.",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      program: "BSc Computer Science",
      role: "Prospective Student",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      text: "I'm excited about the innovative approach to education here. The focus on hands-on learning and industry connections is exactly what I'm looking for in a university.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 bg-white relative overflow-hidden px-4 md:px-8 lg:px-20"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#017840]/5 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-[#BD9946]/5 rounded-full translate-y-32 md:translate-y-40 -translate-x-24 md:-translate-x-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 md:w-16 h-0.5 bg-[#BD9946] mr-3 md:mr-4"></div>
            <span className="text-[#BD9946] font-semibold tracking-wider uppercase text-xs md:text-sm">
              Vision & Values
            </span>
            <div className="w-12 md:w-16 h-0.5 bg-[#BD9946] ml-3 md:ml-4"></div>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 ${bebasNeue.className}`}
          >
            Shaping The Future Of Education
          </h2>
          <p
            className={`max-w-2xl mx-auto text-gray-600 text-base md:text-lg ${gantari.className}`}
          >
            Discover our innovative approach to higher education and the
            principles that guide our new institution.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-b from-[#017840] to-[#016133] p-6 md:p-8 lg:p-10 text-white flex flex-col justify-center relative">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#017840]/20 to-transparent"></div>
                <div className="relative z-10">
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 text-[#BD9946]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${bebasNeue.className}`}
                  >
                    Our Founding Principles
                  </h3>
                  <p
                    className={`text-gray-100 mb-4 md:mb-6 text-sm md:text-base ${gantari.className}`}
                  >
                    As a new institution, we&apos;re committed to reimagining
                    higher education through innovation, excellence, and student
                    success.
                  </p>

                  <div className="flex space-x-2 mt-6 md:mt-8">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-8 md:w-10 h-1 rounded-full transition-all ${
                          index === currentTestimonial
                            ? "bg-[#BD9946]"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 p-6 md:p-8 lg:p-10 lg:p-12">
                <div className="flex items-start mb-6 md:mb-8">
                  <div className="relative mr-4 md:mr-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-4 border-[#017840]/10 shadow-md">
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-full h-full object-cover"
                        height={64}
                        width={64}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#BD9946] flex items-center justify-center shadow-md">
                      <svg
                        className="w-2 h-2 md:w-3 md:h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg md:text-xl text-gray-900 ${gantari.className}`}
                    >
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-[#BD9946] font-medium text-sm md:text-base">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-gray-700 text-base md:text-lg leading-relaxed mb-8 md:mb-10 border-l-4 border-[#017840]/20 pl-4 md:pl-6 py-2 ${gantari.className}`}
                >
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </p>

                <div className="flex justify-end">
                  <div className="flex space-x-3 md:space-x-4">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 md:p-3 rounded-full bg-white text-[#017840] hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200"
                      aria-label="Previous testimonial"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 md:p-3 rounded-full bg-[#017840] text-white hover:bg-[#016133] transition-all shadow-md hover:shadow-lg"
                      aria-label="Next testimonial"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
