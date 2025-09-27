"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
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
    <footer className="bg-gray-900 text-white font-sans">
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
                  {/* <Image
                    src="/sauni-logo.png"
                    alt="Southern Atlantic University Logo"
                    width={64}
                    height={64}
                    // className="w-full h-full object-contain p-2"
                  /> */}
                  <Image
                    src="/sauni-logo.png"
                    alt="Southern Atlantic University Logo"
                    width={64}
                    height={64}
                    // className="w-full h-full object-contain p-2"
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
                <div className="flex space-x-4">
                  {[
                    {
                      icon: Facebook,
                      link: "https://www.facebook.com/share/167WLrbUhc/",
                      color: "hover:text-blue-400",
                    },
                    { icon: Twitter, link: "#", color: "hover:text-blue-300" },
                    {
                      icon: Instagram,
                      link: "https://www.instagram.com/sa_university?igsh=Z2ZnZ3ZicDR3NzV6",
                      color: "hover:text-pink-400",
                    },
                    { icon: Linkedin, link: "#", color: "hover:text-blue-500" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-colors duration-300"
                    >
                      <social.icon size={18} />
                    </motion.a>
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
    </footer>
  );
};

export default Footer;
