"use client";

import { useState } from "react";
import { Gantari, Bebas_Neue } from "next/font/google";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-[#017840] opacity-5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#BD9946] opacity-5 rounded-full translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-8 md:w-12 h-0.5 bg-[#BD9946] mr-3 md:mr-4"></div>
            <span
              className={`text-[#BD9946] font-semibold tracking-wider text-xs md:text-sm uppercase ${gantari.className}`}
            >
              Get In Touch
            </span>
            <div className="w-8 md:w-12 h-0.5 bg-[#BD9946] ml-3 md:ml-4"></div>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl ${bebasNeue.className} text-[#017840] mb-4 md:mb-6`}
          >
            CONTACT <span className="text-[#BD9946]">US</span>
          </h2>
          <p
            className={`text-gray-700 max-w-2xl mx-auto text-base md:text-lg ${gantari.className} leading-relaxed`}
          >
            We&apos;d love to hear from you. Reach out to us through any of the
            channels below.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
          {/* Map Section - Left Side */}
          <div className="lg:w-1/2 h-64 md:h-96 lg:h-auto relative overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=W2Q7+5J,+Ibiaku+Ishiet+520106,+Akwa+Ibom&zoom=15`}
              width="100%"
              height="100%"
              style={{
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Southern Atlantic University Location"
            ></iframe>
          </div>

          {/* Contact Form Section - Right Side */}
          <div className="lg:w-1/2 p-6 md:p-8 lg:p-12">
            <h3
              className={`${bebasNeue.className} text-xl md:text-2xl text-[#017840] mb-4 md:mb-6`}
            >
              Send us a message
            </h3>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                Sorry, there was an error sending your message. Please try
                again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all duration-300 text-base md:text-lg"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all duration-300 text-base md:text-lg"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all duration-300 text-base md:text-lg"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all duration-300 text-base md:text-lg"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#017840] to-[#016035] hover:from-[#016035] hover:to-[#01502a] text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Contact Information */}
            <div className="mt-8 md:mt-10 pt-6 md:pt-10 border-t border-gray-100">
              <h4
                className={`${bebasNeue.className} text-lg md:text-xl text-[#017840] mb-4 md:mb-6`}
              >
                Contact Information
              </h4>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#017840]/10 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-[#017840]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">
                    +234 707 356 6121
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#017840]/10 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-[#017840]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">
                    info@sauni.edu.ng
                  </span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 md:mt-8">
                <h5
                  className={`${bebasNeue.className} text-base md:text-lg text-[#017840] mb-3 md:mb-4`}
                >
                  Follow Us
                </h5>
                <div className="flex space-x-3 md:space-x-4">
                  {[
                    {
                      name: "Facebook",
                      href: "https://facebook.com/",
                      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    },
                    {
                      name: "X",
                      href: "https://x.com/",
                      icon: "M18.244 2H21.5l-7.37 8.43L22 22h-6.78l-5.33-7.09L4.68 22H1.42l7.88-9.01L2 2h6.92l4.77 6.34L18.24 2zM17 20h1.92L8.64 4H6.58L17 20z",
                    },
                    {
                      name: "Instagram",
                      href: "https://instagram.com/",
                      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                    },
                    {
                      name: "LinkedIn",
                      href: "https://linkedin.com/",
                      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 md:w-12 md:h-12 bg-[#017840]/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#017840] group"
                      aria-label={social.name}
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-[#017840] transition-colors duration-300 group-hover:text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
