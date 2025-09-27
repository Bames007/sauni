"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Programs", href: "/programs" },
  { name: "Take Test", href: "/ai-counsellor" },
  { name: "Apply", href: "/application" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-500",
        // Mobile: always solid green background
        isMobile || isMenuOpen
          ? "bg-[#017840] shadow-lg"
          : isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-3">
          {/* Left Nav (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 2).map((link) => (
              <NavItem
                key={link.name}
                href={link.href}
                label={link.name}
                isScrolled={isScrolled}
                isMobile={false}
              />
            ))}
          </nav>

          {/* Center Logo / Title */}
          <Link href="/" className="flex-1 lg:flex-none text-center">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center">
              <div className="relative w-12 h-12">
                <Image
                  src="/sauni-logo.png"
                  alt="Southern Atlantic University Logo"
                  width={64}
                  height={64}
                />
              </div>
            </div>

            {/* Desktop Title */}
            <span
              className={clsx(
                "hidden lg:block text-3xl lg:text-4xl font-bold tracking-widest",
                // For mobile, text is always white due to green background
                isScrolled ? "text-[#017840]" : "text-white",
                bebasNeue.className
              )}
            >
              SOUTHERN ATLANTIC UNIVERSITY
            </span>
          </Link>

          {/* Right Nav (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(2).map((link) => (
              <NavItem
                key={link.name}
                href={link.href}
                label={link.name}
                isScrolled={isScrolled}
                isMobile={false}
              />
            ))}
            <Link
              href="/application_status"
              className={clsx(
                "ml-4 px-5 py-2 rounded-lg text-sm uppercase font-bold transition",
                isScrolled
                  ? "bg-[#BD9946] text-white hover:bg-[#017840]"
                  : "bg-white text-[#017840] hover:bg-[#BD9946] hover:text-white",
                gantari.className
              )}
            >
              Application Status
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Hamburger isOpen={isMenuOpen} isMobile={true} />
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-[#017840] text-white flex flex-col z-40">
            {/* Top bar with logo + close button */}
            <div className="flex justify-between items-center px-6 py-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/sauni-logo.png"
                  alt="SAUNI Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <button
                aria-label="Close menu"
                className="text-white hover:text-[#BD9946] text-3xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Navigation links centered */}
            <nav className="flex flex-col items-center justify-center flex-1 space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold hover:text-[#BD9946] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/application_status"
                className="mt-6 px-6 py-3 bg-[#BD9946] text-white rounded-lg font-bold uppercase hover:bg-white hover:text-[#017840] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Application Status
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// ✅ Updated NavItem Component with mobile support
function NavItem({
  href,
  label,
  isScrolled,
  isMobile = true,
}: {
  href: string;
  label: string;
  isScrolled: boolean;
  isMobile?: boolean;
}) {
  // For mobile, always use white text due to green background
  const textColor = isMobile
    ? "text-white/90 hover:text-white"
    : isScrolled
      ? "text-[#017840]/70 hover:text-[#017840]"
      : "text-white/90 hover:text-white";

  const underlineColor = isMobile
    ? "bg-white"
    : isScrolled
      ? "bg-[#BD9946]"
      : "bg-white";

  return (
    <Link
      href={href}
      className={clsx(
        "relative px-2 py-1 text-sm uppercase tracking-wide transition group",
        textColor
      )}
    >
      {label}
      <span
        className={clsx(
          "absolute left-0 -bottom-1 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300",
          underlineColor
        )}
      ></span>
    </Link>
  );
}

// ✅ Updated Hamburger Menu - always white for mobile
function Hamburger({
  isOpen,
  // isMobile = true,
}: {
  isOpen: boolean;
  isMobile?: boolean;
}) {
  // For mobile, always use white bars
  const barColor = "bg-white";

  return (
    <div className="w-7 h-7 relative flex flex-col justify-center items-center">
      <span
        className={clsx(
          "absolute w-7 h-0.5 rounded-full transition-transform duration-300",
          barColor,
          isOpen ? "rotate-45" : "-translate-y-2"
        )}
      />
      <span
        className={clsx(
          "absolute w-7 h-0.5 rounded-full transition-opacity duration-300",
          barColor,
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={clsx(
          "absolute w-7 h-0.5 rounded-full transition-transform duration-300",
          barColor,
          isOpen ? "-rotate-45" : "translate-y-2"
        )}
      />
    </div>
  );
}
