"use client";

import { useState } from "react";
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
} from "lucide-react";

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

const AcademicCalendar = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<"month" | "list">("month");
  const [filter, setFilter] = useState<
    "all" | "academic" | "holiday" | "deadline" | "event"
  >("all");

  // Sample academic calendar events for Southern Atlantic University
  const [events] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Fall Semester Begins",
      date: new Date(currentMonthYear.year, 7, 15), // August 15
      description: "First day of classes for the Fall semester",
      type: "academic",
    },
    {
      id: 2,
      title: "Labor Day Holiday",
      date: new Date(currentMonthYear.year, 8, 4), // September 4
      description: "University closed for Labor Day",
      type: "holiday",
    },
    {
      id: 3,
      title: "Midterm Examinations",
      date: new Date(currentMonthYear.year, 9, 9), // October 9
      endDate: new Date(currentMonthYear.year, 9, 13), // October 13
      description: "Midterm examination period",
      type: "academic",
    },
    {
      id: 4,
      title: "Fall Break",
      date: new Date(currentMonthYear.year, 10, 20), // November 20
      endDate: new Date(currentMonthYear.year, 10, 24), // November 24
      description: "No classes - Fall break",
      type: "holiday",
    },
    {
      id: 5,
      title: "Registration Deadline",
      date: new Date(currentMonthYear.year, 10, 30), // November 30
      description: "Last day to register for Spring classes",
      type: "deadline",
    },
    {
      id: 6,
      title: "Final Examinations",
      date: new Date(currentMonthYear.year, 11, 11), // December 11
      endDate: new Date(currentMonthYear.year, 11, 15), // December 15
      description: "Final examination period",
      type: "academic",
    },
    {
      id: 7,
      title: "Commencement Ceremony",
      date: new Date(currentMonthYear.year, 11, 16), // December 16
      description: "Fall graduation ceremony",
      type: "event",
      location: "Main Auditorium",
      time: "10:00 AM",
    },
    {
      id: 8,
      title: "Spring Semester Begins",
      date: new Date(currentMonthYear.year + 1, 0, 8), // January 8
      description: "First day of classes for the Spring semester",
      type: "academic",
    },
    {
      id: 9,
      title: "Research Symposium",
      date: new Date(currentMonthYear.year + 1, 2, 15), // March 15
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
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "holiday":
        return "bg-green-100 text-green-800 border-green-200";
      case "deadline":
        return "bg-red-100 text-red-800 border-red-200";
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get event type icon
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <BookOpen className="w-4 h-4" />;
      case "holiday":
        return <Calendar className="w-4 h-4" />;
      case "deadline":
        return <Clock className="w-4 h-4" />;
      case "event":
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
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

  // Get month name
  const monthName = new Date(
    currentMonthYear.year,
    currentMonthYear.month
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#017840] to-[#019a4f] text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Academic Calendar</h1>
              <p className="opacity-90">Southern Atlantic University</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Calendar
              </button>
              <button
                onClick={goToToday}
                className="bg-white text-[#017840] hover:bg-green-50 transition-colors px-4 py-2 rounded-lg font-medium"
              >
                Today
              </button>
            </div>
          </div>
        </div>

        {/* View Toggle and Filters */}
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setView("month")}
              className={`px-4 py-2 rounded-lg ${
                view === "month"
                  ? "bg-[#017840] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Month View
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg ${
                view === "list"
                  ? "bg-[#017840] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              List View
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === "all"
                  ? "bg-[#017840] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter("academic")}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                filter === "academic"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <BookOpen className="w-3 h-3" />
              Academic
            </button>
            <button
              onClick={() => setFilter("holiday")}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                filter === "holiday"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Calendar className="w-3 h-3" />
              Holidays
            </button>
            <button
              onClick={() => setFilter("deadline")}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                filter === "deadline"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Clock className="w-3 h-3" />
              Deadlines
            </button>
            <button
              onClick={() => setFilter("event")}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                filter === "event"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              Events
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="p-6">
          {view === "month" ? (
            /* Month View */
            <div className="flex flex-col">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                  {monthName}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="hidden md:grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
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
                    <div
                      key={index}
                      className={`min-h-20 sm:min-h-24 p-2 border rounded-lg ${
                        !day
                          ? "bg-gray-50 border-gray-100"
                          : isSelected
                            ? "bg-[#017840] text-white"
                            : isToday
                              ? "bg-green-100 border-green-200"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                      } transition-colors cursor-pointer`}
                      onClick={() => day && setSelectedDate(day)}
                    >
                      {day && (
                        <>
                          <div
                            className={`text-right font-medium text-sm sm:text-base ${
                              isSelected ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {day.getDate()}
                          </div>
                          {/* Mobile: show only dot for events */}
                          <div className="mt-1 sm:mt-2 space-y-1">
                            {filteredEvents
                              .filter(
                                (event) =>
                                  event.date.toDateString() ===
                                    day.toDateString() ||
                                  (event.endDate &&
                                    day >= event.date &&
                                    day <= event.endDate)
                              )
                              .slice(0, 2)
                              .map((event) => (
                                <div
                                  key={event.id}
                                  className={`hidden sm:block text-xs p-1 rounded truncate ${
                                    isSelected
                                      ? "bg-white/20"
                                      : getEventTypeStyle(event.type)
                                  }`}
                                >
                                  {event.title}
                                </div>
                              ))}

                            {/* On mobile just a dot */}
                            {hasEvents && (
                              <div className="sm:hidden w-2 h-2 rounded-full bg-[#017840] mx-auto mt-1"></div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {monthName} Events
              </h2>

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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${getEventTypeStyle(
                          event.type
                        )}`}
                      >
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.endDate && event.endDate > event.date
                              ? `${event.date.toLocaleDateString()} - ${event.endDate.toLocaleDateString()}`
                              : event.date.toLocaleDateString()}
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

              {filteredEvents.filter((event) => {
                const eventMonth = event.date.getMonth();
                const eventYear = event.date.getFullYear();
                return (
                  eventMonth === currentMonthYear.month &&
                  eventYear === currentMonthYear.year
                );
              }).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No events scheduled for {monthName}</p>
                </div>
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
                className="mt-8 border-t pt-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Events on {formatDate(selectedDate)}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {eventsForSelectedDate.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${getEventTypeStyle(
                            event.type
                          )}`}
                        >
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            {event.time && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
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
  );
};

export default AcademicCalendar;
