"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
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

const Footer = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#017840] to-[#13660B] text-white relative overflow-hidden px-4 md:px-8 lg:px-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-12 h-12 md:w-20 md:h-20 rounded-full bg-yellow-400"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow-400"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white"></div>
      </div>
      {/* Main Footer Content */}
      <div className="py-16 px-4 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo and Contact Info */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* University Logo and Name */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#017840] rounded-full flex items-center justify-center mr-3 overflow-hidden">
                  <Image
                    src="/sauni-logo.png"
                    alt="Southern Atlantic University Logo"
                    width={64}
                    height={64}
                  />
                </div>
                <h3
                  className={`text-2xl md:text-3xl font-bold ${bebasNeue.className}`}
                >
                  <span className="text-white">Southern Atlantic </span>
                  <span className="text-[#BD9946]">University</span>
                </h3>
              </div>
              <p className={`text-gray-300 max-w-md mt-2 ${gantari.className}`}>
                Excellence in Education. Empowering students through knowledge,
                innovation, and global leadership.
              </p>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
              <h4
                className={`text-lg font-semibold mb-4 ${bebasNeue.className}`}
              >
                Contact Info
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-center lg:justify-end">
                  <MapPin size={16} className="mr-2 text-[#BD9946]" />
                  <span className={`text-gray-300 ${gantari.className}`}>
                    W2Q7+5J, Ibiaku Ishiet 520106, Uyo, Akwa Ibom, Nigeria
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-end">
                  <Phone size={16} className="mr-2 text-[#BD9946]" />
                  <span className={`text-gray-300 ${gantari.className}`}>
                    +234 707 356 6121
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-end">
                  <Mail size={16} className="mr-2 text-[#BD9946]" />
                  <span className={`text-gray-300 ${gantari.className}`}>
                    info@sau.edu.ng
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4
                className={`font-semibold text-lg mb-6 text-white border-b border-[#BD9946] pb-2 ${bebasNeue.className}`}
              >
                About
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "History", link: "/history" },
                  { name: "Leadership", link: "/leadership" },
                  { name: "Mission & Values", link: "/mission" },
                  { name: "News & Events", link: "/news" },
                  { name: "Contact Us", link: "/contact" },
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    // transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={item.link}
                      className="hover:text-[#BD9946] transition-colors flex items-center text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-[#BD9946] rounded-full mr-3"></span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4
                className={`font-semibold text-lg mb-6 text-white border-b border-[#BD9946] pb-2 ${bebasNeue.className}`}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Programs", link: "/programs" },
                  { name: "Admissions", link: "/application" },
                  { name: "Scholarships", link: "/scholarships" },
                  { name: "Campus Life", link: "/campus-life" },
                  { name: "International Students", link: "/international" },
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    // transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={item.link}
                      className="hover:text-[#BD9946] transition-colors flex items-center text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-[#BD9946] rounded-full mr-3"></span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4
                className={`font-semibold text-lg mb-6 text-white border-b border-[#BD9946] pb-2 ${bebasNeue.className}`}
              >
                Resources
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Library", link: "/library" },
                  { name: "Career Services", link: "/careers" },
                  { name: "Alumni", link: "/alumni" },
                  { name: "Faculty Portal", link: "/faculty" },
                  { name: "Student Portal", link: "/student" },
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    // transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={item.link}
                      className="hover:text-[#BD9946] transition-colors flex items-center text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-[#BD9946] rounded-full mr-3"></span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media & Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4
                className={`font-semibold text-lg mb-6 text-white border-b border-[#BD9946] pb-2 ${bebasNeue.className}`}
              >
                Connect With Us
              </h4>
              <div className="mb-6">
                <p className={`text-gray-300 mb-4 ${gantari.className}`}>
                  Follow us on social media for the latest updates and news.
                </p>
                <div className="flex space-x-3 md:space-x-4">
                  {[
                    {
                      name: "Facebook",
                      href: "https://www.facebook.com/share/167WLrbUhc/",
                      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    },
                    {
                      name: "X",
                      href: "https://x.com/",
                      icon: "M18.244 2H21.5l-7.37 8.43L22 22h-6.78l-5.33-7.09L4.68 22H1.42l7.88-9.01L2 2h6.92l4.77 6.34L18.24 2zM17 20h1.92L8.64 4H6.58L17 20z",
                    },
                    {
                      name: "Instagram",
                      href: "https://www.instagram.com/sa_university?igsh=Z2ZnZ3ZicDR3NzV6",
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Copyright Bar */}
      <motion.div
        className="border-t border-gray-800 py-6 bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center mb-3 md:mb-0">
            <span className={gantari.className}>
              © {new Date().getFullYear()} Southern Atlantic University. All
              rights reserved.
            </span>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/privacy"
              className="hover:text-[#BD9946] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#BD9946] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-[#BD9946] transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Footer;
