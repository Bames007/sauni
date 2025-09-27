"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  GraduationCap,
  ArrowLeft,
  Star,
  Clock,
  Target,
  Heart,
} from "lucide-react";
import { Gantari, Bebas_Neue } from "next/font/google";
import Link from "next/link";

const gantari = Gantari({ subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

// Define interfaces first
interface Course {
  id: string;
  name: string;
  matchKeywords?: string[];
}

interface Faculty {
  id: number;
  name: string;
  slug: string;
  description: string;
  courses: Course[];
  color: string;
}

interface RecommendedCourse extends Course {
  faculty: string;
  color: string;
  description: string;
  matchScore: number;
  matchReasons: string[];
}

interface Question {
  id: number;
  question: string;
  type: "text" | "options";
  placeholder?: string;
  field?: string;
  options?: string[];
  keywords?: Record<string, string[]>;
}

interface UserAnswer {
  question: string;
  answer: string;
  timestamp: Date;
  field?: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "options";
  options?: string[];
  recommendations?: RecommendedCourse[];
  field?: string;
  placeholder?: string;
}

// Your faculty data
const facultyData: Faculty[] = [
  {
    id: 1,
    name: "Faculty of Management and Social Sciences",
    slug: "management-social-sciences",
    description:
      "Developing future leaders in business, governance, and social innovation through transformative education and practical experience.",
    courses: [
      {
        id: "bsc-accounting",
        name: "BSc (Hons) Accounting",
        matchKeywords: [
          "analytical",
          "numbers",
          "finance",
          "business",
          "detail",
        ],
      },
      {
        id: "bsc-business-administration",
        name: "BSc Business Administration",
        matchKeywords: [
          "leadership",
          "management",
          "business",
          "strategy",
          "entrepreneur",
        ],
      },
      {
        id: "bsc-hospitality-tourism",
        name: "BSc Hospitality & Tourism Management",
        matchKeywords: [
          "people",
          "service",
          "travel",
          "culture",
          "communication",
        ],
      },
      {
        id: "bsc-public-administration",
        name: "BSc Public Administration",
        matchKeywords: [
          "government",
          "policy",
          "community",
          "leadership",
          "public service",
        ],
      },
      {
        id: "bsc-criminology-security",
        name: "BSc Criminology & Security Studies",
        matchKeywords: [
          "justice",
          "security",
          "analysis",
          "problem-solving",
          "law",
        ],
      },
      {
        id: "bsc-political-science",
        name: "BSc Political Science",
        matchKeywords: [
          "politics",
          "debate",
          "analysis",
          "government",
          "international",
        ],
      },
      {
        id: "bsc-international-relations",
        name: "BSc International Relations & Diplomacy",
        matchKeywords: [
          "global",
          "culture",
          "politics",
          "communication",
          "languages",
        ],
      },
      {
        id: "bsc-economics",
        name: "BSc Economics",
        matchKeywords: [
          "analysis",
          "numbers",
          "trends",
          "research",
          "financial",
        ],
      },
    ],
    color: "#017840",
  },
  {
    id: 2,
    name: "Faculty of Science and Computing",
    slug: "science-computing",
    description:
      "Pioneering innovation in technology and scientific research to solve complex challenges of the modern world.",
    courses: [
      {
        id: "bsc-petroleum-chemistry",
        name: "BSc Petroleum Chemistry",
        matchKeywords: [
          "science",
          "research",
          "chemistry",
          "energy",
          "analysis",
        ],
      },
      {
        id: "bsc-information-communication-technology",
        name: "BSc Information & Communication Technology (ICT)",
        matchKeywords: [
          "technology",
          "communication",
          "systems",
          "problem-solving",
          "innovation",
        ],
      },
      {
        id: "bsc-microbiology",
        name: "BSc Microbiology",
        matchKeywords: [
          "science",
          "research",
          "biology",
          "health",
          "experimentation",
        ],
      },
      {
        id: "bsc-physics-electronics",
        name: "BSc Physics with Electronics",
        matchKeywords: [
          "technology",
          "engineering",
          "problem-solving",
          "innovation",
          "technical",
        ],
      },
      {
        id: "bsc-computer-science",
        name: "BSc Computer Science",
        matchKeywords: [
          "programming",
          "technology",
          "logic",
          "innovation",
          "problem-solving",
        ],
      },
      {
        id: "bsc-software-engineering",
        name: "BSc Software Engineering",
        matchKeywords: [
          "programming",
          "development",
          "creativity",
          "teamwork",
          "innovation",
        ],
      },
      {
        id: "bsc-cyber-security",
        name: "BSc Cyber Security",
        matchKeywords: [
          "security",
          "technology",
          "problem-solving",
          "analysis",
          "protection",
        ],
      },
    ],
    color: "#13660B",
  },
];

// Enhanced question flow with 10 questions
const questionFlow: Question[] = [
  {
    id: 1,
    question: "What's your first name?",
    type: "text",
    placeholder: "Enter your name...",
    field: "name",
  },
  {
    id: 2,
    question: "What are you most passionate about?",
    type: "options",
    options: [
      "Business & Entrepreneurship",
      "Technology & Innovation",
      "Science & Research",
      "Social Change & Politics",
      "Arts & Creativity",
      "Sports & Athletics",
    ],
    keywords: {
      "Business & Entrepreneurship": [
        "business",
        "entrepreneur",
        "management",
        "leadership",
      ],
      "Technology & Innovation": [
        "technology",
        "innovation",
        "computers",
        "digital",
      ],
      "Science & Research": [
        "science",
        "research",
        "discovery",
        "experimentation",
      ],
      "Social Change & Politics": ["social", "politics", "community", "change"],
      "Arts & Creativity": ["arts", "creativity", "design", "expression"],
      "Sports & Athletics": ["sports", "athletics", "competition", "teamwork"],
    },
  },
  {
    id: 3,
    question: "Which subjects did you enjoy most in school?",
    type: "options",
    options: [
      "Mathematics & Logic",
      "Science & Experiments",
      "Languages & Communication",
      "History & Social Studies",
      "Arts & Creative Writing",
      "Computer Science & Technology",
    ],
    keywords: {
      "Mathematics & Logic": ["mathematics", "logic", "numbers", "analysis"],
      "Science & Experiments": [
        "science",
        "experiments",
        "biology",
        "chemistry",
      ],
      "Languages & Communication": [
        "languages",
        "communication",
        "writing",
        "debate",
      ],
      "History & Social Studies": ["history", "social", "culture", "politics"],
      "Arts & Creative Writing": ["arts", "creative", "writing", "design"],
      "Computer Science & Technology": [
        "computer",
        "technology",
        "programming",
        "digital",
      ],
    },
  },
  {
    id: 4,
    question: "What's your ideal work environment?",
    type: "options",
    options: [
      "Office/Corporate Setting",
      "Laboratory/Research Facility",
      "Remote/Flexible Location",
      "Field Work/Outdoors",
      "Creative Studio/Workspace",
      "Educational Institution",
    ],
    keywords: {
      "Office/Corporate Setting": [
        "office",
        "corporate",
        "business",
        "professional",
      ],
      "Laboratory/Research Facility": [
        "lab",
        "research",
        "science",
        "experiments",
      ],
      "Remote/Flexible Location": [
        "remote",
        "flexible",
        "technology",
        "digital",
      ],
      "Field Work/Outdoors": ["field", "outdoors", "practical", "hands-on"],
      "Creative Studio/Workspace": [
        "creative",
        "studio",
        "design",
        "innovation",
      ],
      "Educational Institution": [
        "education",
        "teaching",
        "academic",
        "learning",
      ],
    },
  },
  {
    id: 5,
    question: "Which skills do you consider your strongest?",
    type: "options",
    options: [
      "Analytical Thinking",
      "Creative Problem Solving",
      "Leadership & Management",
      "Communication & Persuasion",
      "Technical & Digital Skills",
      "Research & Analysis",
    ],
    keywords: {
      "Analytical Thinking": ["analytical", "thinking", "logic", "analysis"],
      "Creative Problem Solving": [
        "creative",
        "problem-solving",
        "innovation",
        "solutions",
      ],
      "Leadership & Management": [
        "leadership",
        "management",
        "team",
        "direction",
      ],
      "Communication & Persuasion": [
        "communication",
        "persuasion",
        "people",
        "debate",
      ],
      "Technical & Digital Skills": [
        "technical",
        "digital",
        "technology",
        "computers",
      ],
      "Research & Analysis": ["research", "analysis", "data", "investigation"],
    },
  },
  {
    id: 6,
    question: "What type of challenges excite you?",
    type: "options",
    options: [
      "Complex Mathematical Problems",
      "Scientific Research Questions",
      "Business Strategy Challenges",
      "Social & Community Issues",
      "Technical & Engineering Problems",
      "Creative Design Challenges",
    ],
    keywords: {
      "Complex Mathematical Problems": [
        "mathematical",
        "complex",
        "logic",
        "analysis",
      ],
      "Scientific Research Questions": [
        "scientific",
        "research",
        "discovery",
        "experiments",
      ],
      "Business Strategy Challenges": [
        "business",
        "strategy",
        "management",
        "planning",
      ],
      "Social & Community Issues": ["social", "community", "people", "change"],
      "Technical & Engineering Problems": [
        "technical",
        "engineering",
        "technology",
        "solutions",
      ],
      "Creative Design Challenges": [
        "creative",
        "design",
        "innovation",
        "artistic",
      ],
    },
  },
  {
    id: 7,
    question: "How do you prefer to learn?",
    type: "options",
    options: [
      "Theoretical & Classroom Learning",
      "Practical Hands-on Experience",
      "Research & Independent Study",
      "Group Projects & Collaboration",
      "Online & Self-paced Learning",
      "Internships & Real-world Experience",
    ],
    keywords: {
      "Theoretical & Classroom Learning": [
        "theoretical",
        "classroom",
        "learning",
        "academic",
      ],
      "Practical Hands-on Experience": [
        "practical",
        "hands-on",
        "experience",
        "application",
      ],
      "Research & Independent Study": [
        "research",
        "independent",
        "study",
        "analysis",
      ],
      "Group Projects & Collaboration": [
        "group",
        "collaboration",
        "teamwork",
        "projects",
      ],
      "Online & Self-paced Learning": [
        "online",
        "self-paced",
        "digital",
        "flexible",
      ],
      "Internships & Real-world Experience": [
        "internships",
        "real-world",
        "practical",
        "experience",
      ],
    },
  },
  {
    id: 8,
    question: "What are your career aspirations?",
    type: "options",
    options: [
      "Corporate Leadership",
      "Scientific Research",
      "Technology Innovation",
      "Public Service",
      "Entrepreneurship",
      "Creative Industries",
    ],
    keywords: {
      "Corporate Leadership": [
        "corporate",
        "leadership",
        "management",
        "business",
      ],
      "Scientific Research": [
        "scientific",
        "research",
        "discovery",
        "academic",
      ],
      "Technology Innovation": [
        "technology",
        "innovation",
        "digital",
        "future",
      ],
      "Public Service": ["public", "service", "government", "community"],
      Entrepreneurship: [
        "entrepreneurship",
        "business",
        "startup",
        "innovation",
      ],
      "Creative Industries": ["creative", "arts", "design", "media"],
    },
  },
  {
    id: 9,
    question: "Which values are most important to you?",
    type: "options",
    options: [
      "Innovation & Progress",
      "Stability & Security",
      "Creativity & Expression",
      "Social Impact & Change",
      "Financial Success",
      "Knowledge & Discovery",
    ],
    keywords: {
      "Innovation & Progress": [
        "innovation",
        "progress",
        "technology",
        "future",
      ],
      "Stability & Security": [
        "stability",
        "security",
        "reliable",
        "consistent",
      ],
      "Creativity & Expression": ["creativity", "expression", "arts", "design"],
      "Social Impact & Change": ["social", "impact", "change", "community"],
      "Financial Success": ["financial", "success", "business", "wealth"],
      "Knowledge & Discovery": [
        "knowledge",
        "discovery",
        "learning",
        "research",
      ],
    },
  },
  {
    id: 10,
    question: "What kind of impact do you want to make?",
    type: "options",
    options: [
      "Technological Advancement",
      "Scientific Discovery",
      "Business Innovation",
      "Social Change",
      "Educational Impact",
      "Creative Contribution",
    ],
    keywords: {
      "Technological Advancement": [
        "technology",
        "advancement",
        "innovation",
        "digital",
      ],
      "Scientific Discovery": [
        "scientific",
        "discovery",
        "research",
        "knowledge",
      ],
      "Business Innovation": [
        "business",
        "innovation",
        "entrepreneurship",
        "economic",
      ],
      "Social Change": ["social", "change", "community", "impact"],
      "Educational Impact": ["educational", "impact", "teaching", "learning"],
      "Creative Contribution": ["creative", "contribution", "arts", "culture"],
    },
  },
];

// Enhanced matching logic
const matchCourses = (answers: UserAnswer[]): RecommendedCourse[] => {
  const courseScores: Record<string, { score: number; reasons: string[] }> = {};

  // Initialize all courses with 0 score
  facultyData.forEach((faculty) => {
    faculty.courses.forEach((course) => {
      courseScores[course.id] = { score: 0, reasons: [] };
    });
  });

  // Score courses based on answers (skip the name question)
  answers
    .filter((a) => a.field !== "name")
    .forEach((answer, index) => {
      const question = questionFlow[index + 1]; // +1 because we skip name question

      if (question.type === "options" && question.keywords) {
        const answerKey = answer.answer as keyof typeof question.keywords;
        const keywords = question.keywords[answerKey];

        if (keywords) {
          keywords.forEach((keyword) => {
            facultyData.forEach((faculty) => {
              faculty.courses.forEach((course) => {
                const courseText = (
                  course.name +
                  " " +
                  faculty.name +
                  " " +
                  (course.matchKeywords || []).join(" ")
                ).toLowerCase();
                if (courseText.includes(keyword.toLowerCase())) {
                  courseScores[course.id].score += 2;
                  if (!courseScores[course.id].reasons.includes(keyword)) {
                    courseScores[course.id].reasons.push(keyword);
                  }
                }
              });
            });
          });
        }
      }
    });

  // Get top 3 courses
  const topCourses = Object.entries(courseScores)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 3)
    .map(([courseId, scoreData]) => {
      for (const faculty of facultyData) {
        const course = faculty.courses.find((c) => c.id === courseId);
        if (course) {
          // Remove matchKeywords from the returned object
          const { matchKeywords, ...courseWithoutKeywords } = course;
          return {
            ...courseWithoutKeywords,
            faculty: faculty.name,
            color: faculty.color,
            description: faculty.description,
            matchScore: scoreData.score,
            matchReasons: scoreData.reasons.slice(0, 3), // Top 3 match reasons
          };
        }
      }
      return null;
    })
    .filter((c): c is RecommendedCourse => c !== null);

  return topCourses;
};

export default function AICounselorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Welcome! I'm your AI Course Advisor at Southern Atlantic University. To make this experience personal, may I know your first name?",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
      field: "name",
      placeholder: "Enter your name...",
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState<
    RecommendedCourse[]
  >([]);
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleResponse = (response: string) => {
    const currentQ = questionFlow[currentQuestion];

    // Save the answer
    const newAnswer: UserAnswer = {
      question: currentQ.question,
      answer: response,
      timestamp: new Date(),
      field: currentQ.field,
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    // If this is the name question, save the name
    if (currentQ.field === "name") {
      setUserName(response);
    }

    // Add user's response to chat
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: response,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    // Check if we have more questions
    if (currentQuestion < questionFlow.length - 1) {
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        const nextQ = questionFlow[nextQuestion];

        let nextMessage = nextQ.question;
        if (userName && nextQuestion > 0) {
          nextMessage = `${userName}, ${nextQ.question.toLowerCase()}`;
        }

        // Create the next message with proper typing
        const nextBotMessage: Message = {
          id: messages.length + 2,
          text: nextMessage,
          sender: "bot",
          timestamp: new Date(),
          type: nextQ.type,
          options: nextQ.options,
          placeholder: nextQ.placeholder,
          field: nextQ.field,
        };

        setMessages((prev) => [...prev, nextBotMessage]);
      }, 800);
    } else {
      // Calculate recommendations
      const recommendations = matchCourses(updatedAnswers);
      setRecommendedCourses(recommendations);

      setTimeout(() => {
        setShowResults(true);
        const resultsMessage = userName
          ? `Excellent choices, ${userName}! Based on your answers, I've found the perfect programs that match your interests and strengths.`
          : "Excellent choices! Based on your answers, I've found the perfect programs that match your interests and strengths.";

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: resultsMessage,
            sender: "bot",
            timestamp: new Date(),
            recommendations: recommendations,
          },
        ]);
      }, 1000);
    }

    setInputValue(""); // Clear input
  };

  const handleRestart = () => {
    setMessages([
      {
        id: 1,
        text: "👋 Welcome back! Let's find your perfect program. What's your first name?",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        field: "name",
        placeholder: "Enter your name...",
      },
    ]);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setRecommendedCourses([]);
    setUserName("");
    setInputValue("");
  };

  const getMatchPercentage = (score: number) => {
    const maxPossibleScore = (questionFlow.length - 1) * 2 * 2; // -1 for name question, *2 per question, *2 per keyword
    return Math.min(95, Math.round((score / maxPossibleScore) * 100)) + 5; // Ensure at least 5% and max 100%
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#017840] to-[#13660B] text-white py-6 px-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft size={20} />
              <span className={`${gantari.className} font-semibold`}>
                Back to Home
              </span>
            </Link>
            <div className="text-center">
              <h1 className={`text-4xl ${bebasNeue.className} mb-2`}>
                SAU AI COURSE ADVISOR
              </h1>
              <p className={`text-green-100 ${gantari.className}`}>
                Find Your Perfect Program Match
              </p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Enhanced Info Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-[#017840]">
              <Heart className="mx-auto mb-3 text-[#017840]" size={32} />
              <h3 className={`font-bold text-lg mb-2 ${bebasNeue.className}`}>
                Personalized
              </h3>
              <p className={`text-sm text-gray-600 ${gantari.className}`}>
                Tailored to your unique interests
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-[#13660B]">
              <Target className="mx-auto mb-3 text-[#13660B]" size={32} />
              <h3 className={`font-bold text-lg mb-2 ${bebasNeue.className}`}>
                10 Questions
              </h3>
              <p className={`text-sm text-gray-600 ${gantari.className}`}>
                In-depth analysis
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-[#017840]">
              <GraduationCap
                className="mx-auto mb-3 text-[#017840]"
                size={32}
              />
              <h3 className={`font-bold text-lg mb-2 ${bebasNeue.className}`}>
                15+ Programs
              </h3>
              <p className={`text-sm text-gray-600 ${gantari.className}`}>
                Comprehensive matches
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-[#13660B]">
              <Clock className="mx-auto mb-3 text-[#13660B]" size={32} />
              <h3 className={`font-bold text-lg mb-2 ${bebasNeue.className}`}>
                7-10 Minutes
              </h3>
              <p className={`text-sm text-gray-600 ${gantari.className}`}>
                Quick & accurate
              </p>
            </div>
          </div>

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-green-100"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#017840] to-[#13660B] p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Bot size={28} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold ${bebasNeue.className}`}>
                    Course Advisor Bot
                  </h3>
                  <p className={`text-green-100 text-sm ${gantari.className}`}>
                    {showResults
                      ? "🎉 Recommendation Ready!"
                      : "💬 Online - Getting to know you..."}
                  </p>
                </div>
                {userName && (
                  <div className="bg-white/10 px-4 py-2 rounded-full">
                    <span className={`font-semibold ${gantari.className}`}>
                      Talking with {userName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-purple-600"
                            : "bg-gradient-to-br from-[#017840] to-[#13660B]"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User size={20} className="text-white" />
                        ) : (
                          <Bot size={20} className="text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none border-2 border-green-100 shadow-sm"
                        }`}
                      >
                        <p className={`${gantari.className} leading-relaxed`}>
                          {message.text}
                        </p>

                        {/* Text Input for Name */}
                        {message.type === "text" &&
                          message.sender === "bot" &&
                          !showResults && (
                            <div className="mt-3 flex gap-2">
                              <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={message.placeholder}
                                className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#017840]"
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  inputValue.trim() &&
                                  handleResponse(inputValue.trim())
                                }
                              />
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  inputValue.trim() &&
                                  handleResponse(inputValue.trim())
                                }
                                disabled={!inputValue.trim()}
                                className="bg-[#017840] text-white px-4 py-2 rounded-lg disabled:opacity-50"
                              >
                                <Send size={16} />
                              </motion.button>
                            </div>
                          )}

                        {/* Options for questions */}
                        {message.options &&
                          message.sender === "bot" &&
                          !showResults && (
                            <div className="mt-3 space-y-2">
                              {message.options.map((option, index) => (
                                <motion.button
                                  key={index}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleResponse(option)}
                                  className="block w-full text-left p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-all border border-green-200"
                                >
                                  <span
                                    className={`${gantari.className} font-medium`}
                                  >
                                    {option}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          )}

                        {/* Enhanced Recommendations */}
                        {message.recommendations && (
                          <div className="mt-4 space-y-4">
                            <div className="text-center mb-4">
                              <Star className="inline-block w-6 h-6 text-yellow-500 mb-2" />
                              <h4
                                className={`font-bold text-xl text-[#017840] ${gantari.className}`}
                              >
                                Your Personalized Matches
                              </h4>
                              <p
                                className={`text-sm text-gray-600 ${gantari.className}`}
                              >
                                Based on your unique profile and interests
                              </p>
                            </div>

                            {message.recommendations.map((course, index) => (
                              <motion.div
                                key={course.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="p-4 rounded-xl border-2 bg-gradient-to-r from-white to-gray-50 shadow-sm"
                                style={{ borderColor: course.color }}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: course.color }}
                                    />
                                    <h4
                                      className={`font-bold text-lg text-[#017840] ${gantari.className}`}
                                    >
                                      {course.name}
                                    </h4>
                                  </div>
                                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    {getMatchPercentage(course.matchScore)}%
                                    Match
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <p
                                      className={`text-sm text-gray-600 mb-2 ${gantari.className}`}
                                    >
                                      <strong>Faculty:</strong> {course.faculty}
                                    </p>
                                    <p
                                      className={`text-xs text-gray-500 mb-3 ${gantari.className}`}
                                    >
                                      {course.description}
                                    </p>
                                  </div>

                                  <div>
                                    <p
                                      className={`text-sm font-semibold mb-2 ${gantari.className}`}
                                    >
                                      Why it matches you:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {course.matchReasons.map(
                                        (reason, idx) => (
                                          <span
                                            key={idx}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                          >
                                            {reason}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Action Buttons */}
            {showResults && (
              <div className="p-6 border-t bg-gradient-to-r from-green-50 to-blue-50">
                <div className="text-center mb-4">
                  <p className={`text-gray-600 ${gantari.className}`}>
                    Ready to take the next step in your educational journey?
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRestart}
                    className="bg-white text-[#017840] py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all border-2 border-[#017840]"
                  >
                    🔄 Start New Consultation
                  </motion.button>

                  <Link href="/programs" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#017840] text-white py-3 rounded-lg font-semibold hover:bg-[#016035] transition-all"
                    >
                      📚 Explore All Programs
                    </motion.button>
                  </Link>

                  <Link href="/application" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all"
                    >
                      🚀 Apply Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Enhanced Progress Indicator */}
          {!showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <div
                className={`text-sm text-gray-600 mb-2 ${gantari.className}`}
              >
                Question {currentQuestion + 1} of {questionFlow.length}
                {userName && ` • Personalizing for ${userName}`}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-[#017840] to-[#13660B] h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestion + 1) / questionFlow.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className={`text-xs text-gray-500 ${gantari.className}`}>
                {currentQuestion === 0
                  ? "Let's get started!"
                  : currentQuestion < 4
                    ? "Getting to know you..."
                    : currentQuestion < 7
                      ? "Understanding your strengths..."
                      : "Almost there! Finalizing your matches..."}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
