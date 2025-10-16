"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Download,
  MapPin,
  Clock,
  BookOpen,
  GraduationCap,
  Filter,
  Grid,
  List,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

// Define types
interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  endDate?: Date;
  description: string;
  type: "academic" | "holiday" | "deadline" | "event";
  location?: string;
  time?: string;
}

interface MonthYear {
  month: number;
  year: number;
}

// Define filter type
type FilterType = "all" | "academic" | "holiday" | "deadline" | "event";

// Define filter item interface
interface FilterItem {
  key: FilterType;
  label: string;
  icon?: ReactNode;
}

const AcademicCalendar = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<"month" | "list">("month");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sample academic calendar events for Southern Atlantic University
  const [events] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Fall Semester Begins",
      date: new Date(currentMonthYear.year, 7, 15),
      description: "First day of classes for the Fall semester",
      type: "academic",
    },
    {
      id: 2,
      title: "Labor Day Holiday",
      date: new Date(currentMonthYear.year, 8, 4),
      description: "University closed for Labor Day",
      type: "holiday",
    },
    {
      id: 3,
      title: "Midterm Examinations",
      date: new Date(currentMonthYear.year, 9, 9),
      endDate: new Date(currentMonthYear.year, 9, 13),
      description: "Midterm examination period",
      type: "academic",
    },
    {
      id: 4,
      title: "Fall Break",
      date: new Date(currentMonthYear.year, 10, 20),
      endDate: new Date(currentMonthYear.year, 10, 24),
      description: "No classes - Fall break",
      type: "holiday",
    },
    {
      id: 5,
      title: "Registration Deadline",
      date: new Date(currentMonthYear.year, 10, 30),
      description: "Last day to register for Spring classes",
      type: "deadline",
    },
    {
      id: 6,
      title: "Final Examinations",
      date: new Date(currentMonthYear.year, 11, 11),
      endDate: new Date(currentMonthYear.year, 11, 15),
      description: "Final examination period",
      type: "academic",
    },
    {
      id: 7,
      title: "Commencement Ceremony",
      date: new Date(currentMonthYear.year, 11, 16),
      description: "Fall graduation ceremony",
      type: "event",
      location: "Main Auditorium",
      time: "10:00 AM",
    },
    {
      id: 8,
      title: "Spring Semester Begins",
      date: new Date(currentMonthYear.year + 1, 0, 8),
      description: "First day of classes for the Spring semester",
      type: "academic",
    },
    {
      id: 9,
      title: "Research Symposium",
      date: new Date(currentMonthYear.year + 1, 2, 15),
      description: "Annual student research symposium",
      type: "event",
      location: "Science Building",
      time: "9:00 AM - 4:00 PM",
    },
  ]);

  // Filter events based on selected filter
  const filteredEvents = events.filter(
    (event) => filter === "all" || event.type === filter
  );

  // Get events for the selected date
  const eventsForSelectedDate = selectedDate
    ? filteredEvents.filter(
        (event) =>
          event.date.toDateString() === selectedDate.toDateString() ||
          (event.endDate &&
            selectedDate >= event.date &&
            selectedDate <= event.endDate)
      )
    : [];

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonthYear((prev) => ({
      month: prev.month === 0 ? 11 : prev.month - 1,
      year: prev.month === 0 ? prev.year - 1 : prev.year,
    }));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonthYear((prev) => ({
      month: prev.month === 11 ? 0 : prev.month + 1,
      year: prev.month === 11 ? prev.year + 1 : prev.year,
    }));
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentMonthYear({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    setSelectedDate(new Date());
    setIsMobileMenuOpen(false);
  };

  // Generate days for the current month
  const getDaysInMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonthYear.month, currentMonthYear.year);

  // Get event type styling
  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "holiday":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "deadline":
        return "bg-rose-500/10 text-rose-600 border-rose-200";
      case "event":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  // Get event type icon
  const getEventTypeIcon = (type: string): ReactNode => {
    switch (type) {
      case "academic":
        return <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "holiday":
        return <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "deadline":
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "event":
        return <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Mobile-friendly date format
  const formatDateMobile = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Get month name
  const monthName = new Date(
    currentMonthYear.year,
    currentMonthYear.month
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Mobile month name
  const monthNameMobile = new Date(
    currentMonthYear.year,
    currentMonthYear.month
  ).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  // Define filter items with proper typing
  const filterItems: FilterItem[] = [
    { key: "all", label: "All Events" },
    {
      key: "academic",
      label: "Academic",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      key: "holiday",
      label: "Holidays",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      key: "deadline",
      label: "Deadlines",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      key: "event",
      label: "Events",
      icon: <GraduationCap className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-4 px-3 sm:py-8 sm:px-4">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800">Menu</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">View</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setView("month");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 ${
                        view === "month"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-slate-600 hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                      Month View
                    </button>
                    <button
                      onClick={() => {
                        setView("list");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 ${
                        view === "list"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-slate-600 hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <List className="w-4 h-4" />
                      List View
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">Filter</h4>
                  <div className="space-y-2">
                    {filterItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => {
                          setFilter(item.key);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                          filter === item.key
                            ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200"
                            : "text-slate-600 hover:bg-slate-50 border border-transparent"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={goToToday}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold transition-all duration-200 mb-3"
                  >
                    Go to Today
                  </button>
                  <button className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Calendar
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-6 sm:mb-12"
        >
          <div className="flex items-center gap-4 px-4">
            <Image
              src="/sauni-logo.png"
              alt="Southern Atlantic University Logo"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              priority
            />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                Southern Atlantic University
              </h1>
              <p className="text-sm sm:text-xl text-emerald-600 font-semibold mt-1">
                Academic Calendar
              </p>
            </div>
          </div>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header Actions */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-slate-200/60">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
                    {isMobile ? monthNameMobile : monthName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Academic Year {currentMonthYear.year}
                  </p>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 sm:hidden rounded-lg bg-slate-800 text-white"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Buttons */}
              <div className="hidden sm:flex flex-wrap items-center gap-2 md:gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goToToday}
                  className="px-4 py-2 md:px-6 md:py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg md:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  Today
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 md:px-6 md:py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg md:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm md:text-base"
                >
                  <Download className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Export</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-4 py-2 md:px-6 md:py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg md:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm md:text-base"
                  >
                    <Filter className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </motion.button>

                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 min-w-[160px] z-10"
                      >
                        <div className="space-y-1">
                          {filterItems.map((item) => (
                            <button
                              key={item.key}
                              onClick={() => {
                                setFilter(item.key);
                                setIsFilterOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm ${
                                filter === item.key
                                  ? "bg-blue-50 text-blue-600 font-semibold"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {item.icon}
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 flex items-center justify-between">
            <div className="flex gap-1 bg-slate-100 rounded-lg sm:rounded-xl p-1">
              <button
                onClick={() => setView("month")}
                className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  view === "month"
                    ? "bg-white text-slate-800 shadow-md"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Month</span>
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  view === "list"
                    ? "bg-white text-slate-800 shadow-md"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">List</span>
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevMonth}
                className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextMonth}
                className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              </motion.button>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {view === "month" ? (
              /* Month View - Mobile Optimized */
              <div className="space-y-4">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center font-bold text-slate-500 text-xs sm:text-sm uppercase tracking-wider py-2 sm:py-3"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {days.map((day, index) => {
                    const isToday =
                      day && day.toDateString() === new Date().toDateString();
                    const isSelected =
                      day &&
                      selectedDate &&
                      day.toDateString() === selectedDate.toDateString();
                    const hasEvents =
                      day &&
                      filteredEvents.some(
                        (event) =>
                          event.date.toDateString() === day.toDateString() ||
                          (event.endDate &&
                            day >= event.date &&
                            day <= event.endDate)
                      );

                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`min-h-12 sm:min-h-16 md:min-h-20 lg:min-h-24 p-1 sm:p-2 rounded-lg sm:rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          !day
                            ? "border-transparent"
                            : isSelected
                              ? "border-blue-500 bg-blue-50/50 shadow-md"
                              : isToday
                                ? "border-emerald-500 bg-emerald-50/50"
                                : "border-slate-100 bg-white/50 hover:border-slate-200 hover:shadow-md"
                        }`}
                        onClick={() => day && setSelectedDate(day)}
                      >
                        {day && (
                          <>
                            <div className="flex justify-between items-start mb-1">
                              <span
                                className={`text-sm sm:text-base font-bold ${
                                  isSelected
                                    ? "text-blue-600"
                                    : isToday
                                      ? "text-emerald-600"
                                      : "text-slate-700"
                                }`}
                              >
                                {day.getDate()}
                              </span>
                              {hasEvents && (
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1"></div>
                              )}
                            </div>

                            <div className="space-y-1">
                              {filteredEvents
                                .filter(
                                  (event) =>
                                    event.date.toDateString() ===
                                      day.toDateString() ||
                                    (event.endDate &&
                                      day >= event.date &&
                                      day <= event.endDate)
                                )
                                .slice(0, isMobile ? 1 : 2)
                                .map((event) => (
                                  <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`text-[10px] xs:text-xs p-1 rounded-lg border ${getEventTypeStyle(
                                      event.type
                                    )} backdrop-blur-sm`}
                                  >
                                    <div className="font-semibold truncate hidden xs:block">
                                      {event.title}
                                    </div>
                                    <div className="xs:hidden text-center">
                                      {getEventTypeIcon(event.type)}
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* List View - Mobile Optimized */
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
                  {isMobile ? monthNameMobile : monthName} Events
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {filteredEvents
                    .filter((event) => {
                      const eventMonth = event.date.getMonth();
                      const eventYear = event.date.getFullYear();
                      return (
                        eventMonth === currentMonthYear.month &&
                        eventYear === currentMonthYear.year
                      );
                    })
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        className="bg-white rounded-xl sm:rounded-2xl p-4 shadow-lg hover:shadow-xl border border-slate-100 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={`p-2 sm:p-3 rounded-lg ${getEventTypeStyle(
                              event.type
                            )}`}
                          >
                            {getEventTypeIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-1 sm:mb-2 line-clamp-1">
                              {event.title}
                            </h3>
                            <p className="text-slate-600 text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2">
                              {event.description}
                            </p>
                            <div className="space-y-1 text-xs sm:text-sm text-slate-500">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>
                                  {event.endDate && event.endDate > event.date
                                    ? `${formatDateMobile(event.date)} - ${formatDateMobile(event.endDate)}`
                                    : formatDateMobile(event.date)}
                                </span>
                              </div>
                              {event.time && (
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span>{event.time}</span>
                                </div>
                              )}
                              {event.location && (
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {event.location}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>

                {filteredEvents.filter((event) => {
                  const eventMonth = event.date.getMonth();
                  const eventYear = event.date.getFullYear();
                  return (
                    eventMonth === currentMonthYear.month &&
                    eventYear === currentMonthYear.year
                  );
                }).length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 sm:py-16"
                  >
                    <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3 sm:mb-4" />
                    <p className="text-slate-500 text-sm sm:text-lg">
                      No events scheduled for{" "}
                      {isMobile ? monthNameMobile : monthName}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Selected Date Events Panel */}
            <AnimatePresence>
              {selectedDate && eventsForSelectedDate.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 sm:mt-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/60"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">
                    {isMobile
                      ? `Events on ${formatDateMobile(selectedDate)}`
                      : `Events on ${formatDate(selectedDate)}`}
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {eventsForSelectedDate.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-slate-100"
                      >
                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg ${getEventTypeStyle(
                              event.type
                            )}`}
                          >
                            {getEventTypeIcon(event.type)}
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm sm:text-base md:text-lg line-clamp-2">
                            {event.title}
                          </h4>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="space-y-1 text-xs text-slate-500">
                          {event.time && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
