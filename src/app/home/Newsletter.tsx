"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, Gift } from "lucide-react";
import { Gantari, Bebas_Neue } from "next/font/google";

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

const Newsletter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with email:", email);
    setEmail("");
    alert(
      "Thank you for subscribing to our newsletter! You'll receive a welcome offer shortly."
    );
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#017840] to-[#13660B] text-white relative overflow-hidden px-4 md:px-8 lg:px-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-12 h-12 md:w-20 md:h-20 rounded-full bg-yellow-400"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow-400"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center p-2 md:p-3 bg-yellow-400 rounded-full mb-4 md:mb-6">
            <Gift size={24} className="md:w-7 md:h-7 text-gray-800" />
          </div>

          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${bebasNeue.className}`}
          >
            GET EXCLUSIVE OFFERS & UPDATES FROM SAU
          </h2>

          <p
            className={`mb-6 md:mb-8 text-green-100 text-base md:text-lg ${gantari.className}`}
          >
            Subscribe to our newsletter and be the first to know about program
            updates, special events, scholarship opportunities, and exclusive
            offers.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="relative flex-grow">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 md:py-4 rounded-lg bg-gray-100 text-[#017840] placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-[#017840] shadow-lg text-sm md:text-base"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
            >
              <Send size={18} className="md:w-5 md:h-5" />
              Subscribe
            </motion.button>
          </motion.form>

          <p
            className={`mt-4 md:mt-6 text-green-200 text-xs md:text-sm ${gantari.className}`}
          >
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
