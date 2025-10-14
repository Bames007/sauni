"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Play,
  X,
  Users,
  BookOpen,
  GraduationCap,
  Globe,
  ChevronLeft,
  ChevronRight as RightIcon,
} from "lucide-react";
import React from "react";
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

const WhyChoose = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "World-Class Faculty",
      description: "Learn from industry experts and renowned academics",
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      video: "https://www.youtube.com/watch?v=EZEE1GwBF3U",
      thumbnail:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art labs, libraries, and learning spaces",
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      video: "https://www.youtube.com/watch?v=EZEE1GwBF3U",
      thumbnail:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-green-600 to-teal-600",
    },
    {
      title: "Career Support",
      description: "Dedicated career services to help you succeed",
      icon: <Users className="w-8 h-8 text-orange-600" />,
      video: "https://www.youtube.com/watch?v=EZEE1GwBF3U",
      thumbnail:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-orange-600 to-red-600",
    },
    {
      title: "Global Community",
      description: "Join a diverse student body from around the world",
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      video: "https://www.youtube.com/watch?v=EZEE1GwBF3U",
      thumbnail:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gradient: "from-indigo-600 to-purple-600",
    },
  ];

  const [featureRef, featureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Add this state to track window width
  const [windowWidth, setWindowWidth] = useState(0);

  // Add this useEffect to set window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Replace the transform style with:
  // style={{
  //   transform: `translateX(calc(50% - ${
  //     windowWidth < 768 ? "160px" : "280px"
  //   } - ${
  //     currentIndex * (windowWidth < 768 ? 320 : 560)
  //   }px + ${dragOffset}px))`,
  // }}

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Determine if swipe was significant enough to change card
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0 && currentIndex > 0) {
        // Swipe right - go to previous card
        setCurrentIndex(currentIndex - 1);
      } else if (dragOffset < 0 && currentIndex < features.length - 1) {
        // Swipe left - go to next card
        setCurrentIndex(currentIndex + 1);
      }
    }

    setDragOffset(0);
  };

  const handleVideoSelect = (index: number) => {
    setSelectedVideo(index);
    document.body.style.overflow = "hidden";
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const goToNext = () => {
    if (currentIndex < features.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {}, [currentIndex]);

  return (
    <section
      id="why"
      className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-200 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-green-200 rounded-full opacity-20 blur-3xl animate-float-delayed"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div
          ref={ref}
          className={`mb-10 md:mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#017840] lg:flex-1 lg:text-left ${bebasNeue.className}`}
            >
              WHY CHOOSE SAU FOR YOUR FUTURE SUCCESS AND BEYOND?
            </h2>
            <p
              className={`text-base md:text-lg max-w-3xl leading-relaxed lg:flex-1 lg:text-right ${gantari.className}`}
              style={{ color: "rgba(0,0,0,0.6)" }}
            >
              Discover what makes SAU the perfect choice for your educational
              journey and future career success. Our commitment to excellence
              ensures every student receives a transformative learning
              experience.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-8 mb-12 md:mb-20">
          {/* Left - Video */}
          <div className="w-full lg:w-1/2 relative group flex flex-col">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden transform transition-all duration-700 hover:shadow-2xl md:hover:shadow-3xl hover:-translate-y-1 md:hover:-translate-y-2 flex-1 flex flex-col">
              <div className="relative flex-1 overflow-hidden min-h-[250px] md:min-h-[300px]">
                <Image
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Campus Life"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 min-h-[250px] md:min-h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <button
                  onClick={() => handleVideoSelect(0)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border-2 border-white/30">
                    <Play
                      className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </button>
              </div>
              {/* Moved text content outside the image container */}
              <div className="p-4 md:p-6 bg-gradient-to-r from-green-600 to-emerald-600">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white">
                  Experience Campus Life
                </h3>
                <p className="text-white opacity-90 text-sm md:text-base">
                  Take a virtual tour of our state-of-the-art facilities
                </p>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 lg:grid-cols-1 gap-4 md:gap-6">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  ref={featureRef}
                  className={`bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md md:shadow-lg transform transition-all duration-700 hover:-translate-y-1 md:hover:-translate-y-2 border border-gray-100 overflow-hidden relative group h-full ${
                    featureInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -translate-x-full group-hover:translate-x-0 transform-gpu"></div>

                  <div className="flex items-start space-x-3 md:space-x-4 relative z-10">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-green-50 to-white rounded-lg md:rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {React.cloneElement(feature.icon, {
                        className:
                          "w-5 h-5 md:w-6 md:h-6 text-green-600 group-hover:text-green-700 transition-colors duration-300",
                      })}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-900 group-hover:text-green-800 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tinder-Style Video Card Carousel */}
        <div className="mb-12 md:mb-16">
          <h3
            className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center ${bebasNeue.className}`}
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-green-600 bg-clip-text text-transparent">
              Our Campus
            </span>
          </h3>

          <div className="relative w-full max-w-4xl mx-auto">
            {/* Navigation Arrows - Hidden on mobile, visible on medium screens and up */}
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center transition-opacity duration-300 ${
                currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={goToNext}
              disabled={currentIndex === features.length - 1}
              className={`hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center transition-opacity duration-300 ${
                currentIndex === features.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 hover:bg-gray-100"
              }`}
            >
              <RightIcon className="w-6 h-6 text-gray-700" />
            </button>

            {/* Cards Container */}
            <div
              ref={containerRef}
              className="relative h-[400px] md:h-[520px] overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(50% - ${
                    windowWidth < 768 ? "160px" : "280px"
                  } - ${
                    currentIndex * (windowWidth < 768 ? 320 : 560)
                  }px + ${dragOffset}px))`,
                }}
              >
                {features.map((feature, index) => {
                  const isFocused = index === currentIndex;
                  const scale = isFocused ? 1 : 0.8;
                  const opacity = isFocused ? 1 : 0.6;

                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[300px] md:w-[500px] px-4 md:px-6 transition-all duration-300 ease-out"
                      style={{
                        transform: `scale(${scale})`,
                        opacity: opacity,
                        zIndex: isFocused ? 10 : 1,
                      }}
                    >
                      <div
                        className="group cursor-pointer transform transition-all duration-500"
                        onClick={() => isFocused && handleVideoSelect(index)}
                      >
                        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden border border-gray-200 hover:shadow-xl md:hover:shadow-2xl">
                          {/* Card with portrait aspect ratio (like Tinder) */}
                          <div className="relative h-[380px] md:h-[500px] overflow-hidden">
                            <Image
                              src={feature.thumbnail}
                              alt={feature.title}
                              fill
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Icon Badge */}
                            <div className="absolute top-4 md:top-5 right-4 md:right-5">
                              <div
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg md:shadow-xl`}
                              >
                                {React.cloneElement(feature.icon, {
                                  className: "w-5 h-5 md:w-6 md:h-6 text-white",
                                })}
                              </div>
                            </div>

                            {/* Play Button (only on focused card) */}
                            {isFocused && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 transform group-hover:scale-110 transition-transform duration-300">
                                  <Play
                                    className="w-8 h-8 md:w-10 md:h-10 text-white"
                                    fill="currentColor"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Content Overlay */}
                            <div className="absolute bottom-4 md:bottom-5 left-4 md:left-5 right-4 md:right-5">
                              <div className="bg-gradient-to-r from-black/90 to-black/70 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-5">
                                <h4 className="font-bold text-white text-lg md:text-xl mb-1 md:mb-2">
                                  {feature.title}
                                </h4>
                                <p className="text-gray-200 text-xs md:text-sm">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center mt-6 md:hidden">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center mx-2 ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex === features.length - 1}
                className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center mx-2 ${
                  currentIndex === features.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 hover:bg-gray-100"
                }`}
              >
                <RightIcon className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
              {features.map((_, index) => {
                const isActive = index === currentIndex;

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "w-6 md:w-8 bg-green-600"
                        : "w-2 md:w-3 bg-gray-300 hover:bg-gray-400"
                    } h-2 md:h-3 rounded-full`}
                  >
                    {/* Animated progress bar for active dot */}
                    {isActive && (
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-5000 ease-linear"
                        style={{ width: "100%" }}
                        key={currentIndex}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-black rounded-xl md:rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 md:top-6 right-4 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            {/* Responsive video container */}
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              {" "}
              {/* 16:9 aspect ratio */}
              <iframe
                src={`https://www.youtube.com/embed/EZEE1GwBF3U?autoplay=1`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 10s ease-in-out infinite 1s;
          }
        `}
      </style>
    </section>
  );
};

export default WhyChoose;
