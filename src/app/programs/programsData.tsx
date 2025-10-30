import type { Program } from "./program_type";

export const programData: Program[] = [
  //Accounting
  {
    id: "bsc-accounting",
    programCode: "ACC101",
    title: "BSc (Hons) Accounting",
    slug: "/programs/bsc-accounting",
    tagline: "Decode the Language of Business. Shape the Future of Finance.",
    overview: {
      description:
        "Our BSc Accounting program provides a rigorous foundation in financial reporting, auditing, taxation, and strategic management accounting. You'll learn to interpret complex financial data, ensure regulatory compliance, and provide insights that drive business strategy. This degree is your first step toward becoming a qualified chartered accountant and a strategic business leader.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Accountants are the unsung heroes of the economic world. They provide the transparency that allows investors to trust corporations, the analysis that enables businesses to grow sustainably, and the diligence that protects public funds. From uncovering fraud and optimizing tax strategies to guiding multi-million dollar investments and helping startups manage their cash flow, accountants solve the critical problems that keep our global economy functioning with integrity.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Ngozi Adekunle",
      title: "Professor of Accounting & Finance",
      imageUrl: "/images/faculty/dr-ngozi-adekunle.jpg",
      bio: "Dr. Adekunle is a renowned expert in forensic accounting with over 20 years of industry and academic experience. She has consulted for major financial institutions across West Africa and published extensively on corporate governance and ethical financial practices.",
      email: "n.adekunle@sauni.edu.ng",
      message:
        "Welcome to a program that doesn't just teach you accounting rules, but teaches you how to think like a financial strategist. We blend technical excellence with ethical leadership to prepare you for a career where you can truly make a difference in Africa's economic landscape.",
    },
    whyThisProgram: [
      "Get up to 9 exemptions from ACCA professional exams, fast-tracking your qualification.",
      "Learn using industry-standard software like Sage, QuickBooks, and SAP in our dedicated Financial Analytics Lab.",
      "Guaranteed internship placement with one of our partner firms, including the 'Big Four'.",
      "Be taught by faculty who are active researchers and industry consultants, bringing real-world cases into the classroom.",
    ],
    keyTopics: [
      "Financial Accounting & Reporting (IFRS)",
      "Advanced Auditing and Assurance",
      "Corporate and Business Law",
      "Performance Management and Analytics",
      "Taxation (Corporate and Personal)",
      "Ethics and Professional Skepticism",
    ],
    programBreakdown: {
      coreCourses: 70,
      electives: 20,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Foundation Principles",
        semesters: {
          first: [
            "Introduction to Financial Accounting",
            "Business Mathematics",
            "Principles of Management",
            "Introduction to Economics",
            "Communication Skills",
          ],
          second: [
            "Introduction to Cost Accounting",
            "Business Statistics",
            "Financial Markets",
            "Principles of Marketing",
            "Business Law",
          ],
        },
      },
      {
        year: 2,
        theme: "Intermediate Application",
        semesters: {
          first: [
            "Intermediate Financial Accounting I",
            "Corporate Finance I",
            "Quantitative Techniques",
            "Human Resource Management",
            "Nigerian Tax System",
          ],
          second: [
            "Intermediate Financial Accounting II",
            "Corporate Finance II",
            "Auditing Principles",
            "Entrepreneurship Studies",
            "Public Sector Accounting",
          ],
        },
      },
      {
        year: 3,
        theme: "Advanced Topics & Specialization",
        semesters: {
          first: [
            "Advanced Financial Accounting",
            "Management Accounting",
            "Research Methodology",
            "Company Law",
            "Elective I (e.g., Forensic Accounting)",
          ],
          second: [
            "Accounting Theory",
            "Auditing and Investigation",
            "Financial Modeling",
            "Ethics in Accounting",
            "Elective II (e.g., International Taxation)",
          ],
        },
      },
      {
        year: 4,
        theme: "Integration & Professional Preparation",
        semesters: {
          first: [
            "Advanced Auditing",
            "Strategic Management Accounting",
            "Capstone Project",
            "Elective III",
            "Elective IV",
          ],
          second: [
            "Forensic Accounting",
            "International Accounting",
            "Research Project",
            "Professional Practice",
            "IT in Accounting",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Chinedu Okoro",
        position: "Partner, KPMG Nigeria",
        graduationYear: 2005,
        imageUrl: "/images/alumni/chinedu-okoro.jpg",
        testimonial:
          "The rigorous analytical training I received at SAU gave me the foundation to navigate complex financial landscapes and lead teams effectively. The alumni network continues to be an invaluable resource throughout my career.",
      },
      {
        name: "Amina Suleiman",
        position: "CFO, Dangote Group",
        graduationYear: 1998,
        imageUrl: "/images/alumni/amina-suleiman.jpg",
        testimonial:
          "This program doesn't just teach accounting—it teaches strategic thinking and ethical leadership that extends far beyond the balance sheet. The case-based approach prepared me for the high-stakes decisions I make daily.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_ACCOUNTING",
    careerPaths: [
      {
        title: "Chartered Accountant",
        sectors: ["Public Practice", "Corporate", "Government"],
      },
      {
        title: "Financial Analyst",
        sectors: ["Investment Banks", "Asset Management", "Corporate Finance"],
      },
      {
        title: "Tax Consultant",
        sectors: ["Accounting Firms", "Law Firms", "Self-Employed"],
      },
      {
        title: "Forensic Accountant",
        sectors: ["Risk Advisory", "Law Enforcement", "Insurance"],
      },
      {
        title: "Chief Financial Officer (CFO)",
        sectors: ["Multinational Corporations", "Start-ups", "NGOs"],
      },
    ],
    learningOutcomes: [
      "Prepare and critically analyze financial statements for complex entities in full compliance with IFRS.",
      "Design and execute audit procedures to provide assurance and investigate potential financial irregularities.",
      "Develop and defend strategic tax planning and compliance strategies for individuals and corporations.",
      "Utilize accounting information systems and data analytics tools to model business scenarios and support decision-making.",
      "Evaluate ethical dilemmas and articulate solutions that align with professional codes of conduct and social responsibility.",
    ],
    interestingFacts: [
      "The first known written language, Cuneiform, was developed by ancient accountants in Mesopotamia around 5,000 years ago to record trades of barley and livestock.",
      "The global accounting software market is projected to exceed $70 billion by 2030, driven by AI and automation, creating new tech-focused accounting roles.",
      "A study found that companies with CFOs who have deep accounting expertise (a 'CFO-as-Cop') are significantly less likely to commit financial statement fraud.",
    ],
    accreditation: ["ICAN", "ACCA", "CIMA"],
    testPreparation:
      "This program provides exemptions from ACCA Papers: F1, F2, F3, F4, F5, F6, F7, F8, F9.",
    facilities: [
      "Financial Analytics Lab with terminals running Sage, QuickBooks, SAP, and Bloomberg data.",
      "Dedicated quiet study zones and collaborative workspaces for group projects.",
      "Mock presentation room for practicing client pitches and thesis defenses.",
    ],
    industryConnections: {
      partners: ["KPMG", "PwC", "Deloitte", "EY", "Central Bank of Nigeria"],
      initiatives: [
        "Annual Accounting Career Fair",
        "Executive-in-Residence Lecture Series",
        "Sponsored Case Competitions",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Academic Excellence Scholarship",
        description:
          "Covers up to 50% of tuition for students with a top 5% JAMB score.",
      },
      {
        name: "Women in Finance Bursary",
        description:
          "Awarded to outstanding female applicants pursuing careers in accounting and finance.",
      },
    ],
    contactInfo: {
      department: "Department of Accounting & Finance",
      email: "accounting@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Accounting",
            "Economics",
            "Any other relevant subject (e.g., Commerce, Government, Business Studies, Geography)",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings in WAEC (WASSCE), NECO, or equivalent examinations. Accounting is specifically required. Some private universities may accept one sitting.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Accounting",
          "Economics/Commerce/Government",
        ],
        jambScore: {
          minimum: 150,
          competitive: 200,
          note: "Private universities may have lower cut-offs, but competitive scores for Accounting are typically higher due to demand.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Accounting, Economics, Mathematics, or Business Studies.",
          },
          {
            type: "OND",
            requirements:
              "OND in Accounting, Banking & Finance, or Business Administration with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Accounting or Business Education with good grades (e.g., Merit level).",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Business-related courses with a minimum of 5 points (varies by institution).",
          },
          {
            type: "Professional Certificates",
            requirements:
              "ATS-ICAN final stage, ANAN final stage, or equivalent professional qualifications.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements listed above.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Minimum age of 16 years at the time of admission.",
        "Participation in Post-UTME screening (e.g., written test or interview) may be required.",
        "Meeting departmental cut-off mark (typically 50% or higher in Post-UTME).",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%).",
      },
    },
  },
  //Business Administration
  {
    id: "bsc-business-administration",
    programCode: "BUS101",
    title: "BSc (Hons) Business Administration",
    slug: "/programs/bsc-business-administration",
    tagline: "Master the Art and Science of Leadership. Launch Your Vision.",
    overview: {
      description:
        "Our BSc Business Administration program provides a comprehensive, 360-degree view of the modern business world. You'll develop a strong foundation in core principles like marketing, finance, operations, and human resources, while cultivating the critical thinking, strategic analysis, and leadership skills needed to manage organizations and launch successful ventures in a dynamic global economy.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Business administrators are the operational backbone of every industry. They are the project managers who deliver innovations on time, the marketing managers who connect products with customers, the HR specialists who build thriving cultures, and the entrepreneurs who turn ideas into enterprises. They solve complex problems, optimize processes, lead teams, and drive growth, making them indispensable to the success and scalability of any organization, from local non-profits to multinational corporations.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Adebola Williams",
      title: "Professor of Strategic Management",
      imageUrl: "/images/faculty/dr-adebola-williams.jpg",
      bio: "Dr. Williams is a seasoned strategist with 15 years of experience in corporate consulting across West Africa. His research focuses on competitive strategy in emerging markets, and he is a frequent commentator on business news channels.",
      email: "a.williams@sauni.edu.ng",
      message:
        "This program is designed for future captains of industry and innovative entrepreneurs. We don't just teach business theory; we immerse you in real-world challenges to hone your decision-making and leadership capabilities from day one.",
    },
    whyThisProgram: [
      "Choose from specialized tracks in Entrepreneurship, International Business, or Marketing in your final year.",
      "Participate in our annual 'Startup Incubator' competition, with seed funding awarded to the top business plan.",
      "Gain global perspective through our semester-abroad exchange programs with partner universities in Europe and North America.",
      "Learn from a faculty blend of acclaimed academics and successful entrepreneurs who provide mentorship and industry connections.",
    ],
    keyTopics: [
      "Strategic Management & Leadership",
      "Financial Management & Analysis",
      "Digital Marketing & E-Commerce",
      "Organizational Behavior & Human Resources",
      "Operations & Supply Chain Management",
      "Business Ethics & Corporate Social Responsibility",
    ],
    programBreakdown: {
      coreCourses: 65,
      electives: 25,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Business Fundamentals",
        semesters: {
          first: [
            "Introduction to Business",
            "Principles of Microeconomics",
            "Business Mathematics",
            "Introduction to ICT",
            "Communication Skills",
          ],
          second: [
            "Principles of Accounting",
            "Principles of Macroeconomics",
            "Business Statistics",
            "Introduction to Psychology",
            "Nigerian Business Environment",
          ],
        },
      },
      {
        year: 2,
        theme: "Functional Core Areas",
        semesters: {
          first: [
            "Financial Management I",
            "Principles of Marketing",
            "Human Resource Management",
            "Business Law",
            "Quantitative Methods",
          ],
          second: [
            "Financial Management II",
            "Consumer Behavior",
            "Operations Management",
            "Corporate Law",
            "Management Information Systems",
          ],
        },
      },
      {
        year: 3,
        theme: "Application & Analysis",
        semesters: {
          first: [
            "Strategic Management",
            "Organizational Theory",
            "Research Methodology",
            "Elective I",
            "Elective II",
          ],
          second: [
            "Entrepreneurship & Innovation",
            "International Business",
            "Business Analytics",
            "Elective III",
            "Elective IV",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Integration",
        semesters: {
          first: [
            "Leadership & Change Management",
            "Project Management",
            "Capstone Business Simulation",
            "Track Elective I",
            "Track Elective II",
          ],
          second: [
            "Business Policy & Ethics",
            "Internship/Industrial Attachment",
            "Research Project",
            "Track Elective III",
            "Track Elective IV",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Temi Balogun",
        position: "Founder & CEO, 'NairaCart' E-Commerce Platform",
        graduationYear: 2016,
        imageUrl: "/images/alumni/temi-balogun.jpg",
        testimonial:
          "The startup incubator program was the launchpad for my company. The critical feedback and network I gained at SAU were invaluable. They treated my idea like a real business from the start.",
      },
      {
        name: "Kunle Adebayo",
        position: "Regional Operations Manager, MTN Nigeria",
        graduationYear: 2010,
        imageUrl: "/images/alumni/kunle-adebayo.jpg",
        testimonial:
          "The case-study method used throughout the program prepared me for the complex, fast-paced decision-making required in my career at MTN. I learned to analyze situations from every angle.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_BUSINESS_ADMIN",
    careerPaths: [
      {
        title: "Business Development Manager",
        sectors: ["Technology", "FMCG", "Financial Services", "Healthcare"],
      },
      {
        title: "Management Consultant",
        sectors: ["Consulting Firms", "Self-Employed", "Government Agencies"],
      },
      {
        title: "Operations Manager",
        sectors: ["Manufacturing", "Logistics", "Retail", "Hospitality"],
      },
      {
        title: "Marketing Manager",
        sectors: [
          "Digital Agencies",
          "Corporate Brands",
          "Non-Profit Organizations",
        ],
      },
      {
        title: "Entrepreneur / Business Owner",
        sectors: [
          "Start-ups",
          "Small & Medium Enterprises",
          "Social Enterprises",
        ],
      },
    ],
    learningOutcomes: [
      "Formulate, implement, and evaluate cross-functional business strategies to achieve organizational goals.",
      "Analyze financial statements and market data to inform strategic business decisions and resource allocation.",
      "Lead and motivate teams, manage organizational change, and apply principles of effective human resource management.",
      "Design and execute a comprehensive marketing plan for products or services in a digital landscape.",
      "Develop a viable business plan, assess risks, and pitch to potential investors or stakeholders.",
    ],
    interestingFacts: [
      "The concept of 'management' dates back to the construction of the pyramids in ancient Egypt, which required coordinating thousands of workers—a massive project management feat.",
      "Studies show that companies with diverse management teams have 19% higher revenue due to innovation.",
      "Soft skills like communication, flexibility, and problem-solving are consistently ranked as the most desired attributes in business graduates by employers worldwide.",
    ],
    accreditation: [
      "Nigerian University Commission (NUC)",
      "Association of MBAs (AMBA)",
    ],
    testPreparation:
      "This program provides a strong foundation for professional certifications such as Project Management Professional (PMP), Chartered Institute of Marketing (CIM), and Senior Professional in Human Resources (SPHR).",
    facilities: [
      "Center for Entrepreneurship & Innovation, featuring collaborative workspaces and prototyping labs.",
      "Trading Room with real-time financial data feeds and simulation software.",
      "Digital media lab for marketing students to create and analyze campaigns.",
    ],
    industryConnections: {
      partners: [
        "MTN Nigeria",
        "Procter & Gamble",
        "Stanbic IBTC",
        "Jumia",
        "KPMG",
      ],
      initiatives: [
        "Annual Business Leadership Conference",
        "Executive Mentorship Program",
        "Corporate Challenge Projects",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Future Leader Scholarship",
        description:
          "Awarded to students demonstrating exceptional leadership potential in their extracurricular activities and interviews.",
      },
      {
        name: "Family Legacy Grant",
        description:
          "Available for children of entrepreneurs and business owners, supporting the next generation of business leadership.",
      },
    ],
    contactInfo: {
      department: "Department of Management & Entrepreneurship",
      email: "business.admin@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Economics",
            "Any two of Commerce, Government, Accounting, Business Studies, or Geography",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. Economics is commonly required. Private universities may accept one sitting.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Economics",
          "Any of Commerce, Government, or Accounting",
        ],
        jambScore: {
          minimum: 150,
          competitive: 180,
          note: "Business Administration may have a slightly lower competitive score compared to Accounting.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Economics, Business Studies, or Mathematics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Business Administration, Management, or related fields with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Business Education or related fields with good grades.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Social Sciences or Business-related courses with a minimum of 4 points.",
          },
          {
            type: "Professional Certificates",
            requirements:
              "Certificates from recognized professional bodies (e.g., CIBN, CIM) may be considered.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Minimum age of 16 years at the time of admission.",
        "Some universities may require a personal statement or interview.",
        "Meeting departmental cut-off mark (typically 45% or higher in Post-UTME).",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%).",
      },
    },
  },
  //Hospitality and Tourism Management
  {
    id: "bsc-hospitality-tourism",
    programCode: "HTM102",
    title: "BSc (Hons) Hospitality & Tourism Management",
    slug: "/programs/bsc-hospitality-tourism",
    tagline:
      "Craft Unforgettable Experiences. Build a Career in the World's Largest Industry.",
    overview: {
      description:
        "This dynamic program blends business acumen with creative service design to prepare you for a leadership career in the global hospitality and tourism sector. You will master the operational aspects of hotel, resort, and event management while learning to develop sustainable tourism products that showcase Nigeria's rich cultural heritage and drive economic development.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Hospitality and tourism professionals are experience architects. They create the moments of joy, relaxation, and discovery that define vacations, business trips, and celebrations. This sector is a powerful engine for economic growth, creating jobs, supporting local artisans, and preserving cultural and natural heritage. In a post-pandemic world, these professionals are at the forefront of rebuilding travel with a focus on sustainability, safety, and personalized service, making them crucial to national economies and global connection.",
    duration: "4 Years (Includes a mandatory 6-month internship)",
    headOfDepartment: {
      name: "Mrs. Chioma Okonkwo",
      title: "Associate Professor of Hospitality Management",
      imageUrl: "/images/faculty/mrs-chioma-okonkwo.jpg",
      bio: "A former general manager of a leading luxury resort, Mrs. Okonkwo brings two decades of practical industry expertise into the classroom. She is a certified trainer in service excellence and sustainable tourism development.",
      email: "c.okonkwo@sauni.edu.ng",
      message:
        "Tourism is Nigeria's next great frontier. We are training the future leaders who will not only manage world-class facilities but also innovate to put West Africa on the global tourism map. Get ready to roll up your sleeves and create magic for guests.",
    },
    whyThisProgram: [
      "Gain hands-on experience in our on-campus training restaurant and mock hotel suite.",
      "Secure guaranteed internships with our international partners, including Marriott International, Hilton, and Tour Nigeria.",
      "Specialize in high-demand areas like Sustainable Tourism or Event Management in your final year.",
      "Participate in field trips to national parks, heritage sites, and major hospitality hubs across Nigeria.",
    ],
    keyTopics: [
      "Hotel Operations & Revenue Management",
      "Food & Beverage Management",
      "Sustainable Tourism Development",
      "Destination Marketing & Branding",
      "Event Planning & Management",
      "Customer Experience & Service Design",
    ],
    programBreakdown: {
      coreCourses: 60,
      electives: 20,
      projectsInternships: 20,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Introduction to the Industry",
        semesters: {
          first: [
            "Introduction to Hospitality & Tourism",
            "Principles of Management",
            "Food Production Principles I",
            "Communication for Tourism",
            "Introduction to Sociology",
          ],
          second: [
            "Tourism Geography of Nigeria",
            "Principles of Accounting",
            "Food Production Principles II",
            "Customer Service Fundamentals",
            "French for Tourism I",
          ],
        },
      },
      {
        year: 2,
        theme: "Core Operational Skills",
        semesters: {
          first: [
            "Front Office Operations",
            "Food & Beverage Service",
            "Hospitality Law",
            "Tourism Economics",
            "French for Tourism II",
          ],
          second: [
            "Housekeeping Management",
            "Food & Beverage Management",
            "Human Resources in Hospitality",
            "Principles of Marketing",
            "Research Methods",
          ],
        },
      },
      {
        year: 3,
        theme: "Management & Strategy",
        semesters: {
          first: [
            "Hospitality Finance & Analytics",
            "Facility Planning & Design",
            "Sustainable Tourism",
            "Elective I",
            "Elective II",
          ],
          second: [
            "Revenue Management",
            "Destination Management & Marketing",
            "Strategic Management",
            "Elective III",
            "Elective IV",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Professional Integration",
        semesters: {
          first: [
            "Event Management",
            "Entrepreneurship in Hospitality",
            "Capstone Project",
            "Track Elective I",
            "Track Elective II",
          ],
          second: [
            "6-Month Industrial Attachment (Internship)",
            "Research Project",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Femi Alabi",
        position: "Director of Operations, Eko Hotels & Suites, Lagos",
        graduationYear: 2012,
        imageUrl: "/images/alumni/femi-alabi.jpg",
        testimonial:
          "The SAU program's focus on practical skills meant I walked into my first management role with confidence. The network of alumni in top hotels across Africa is a powerful asset.",
      },
      {
        name: "Zainab Bello",
        position: "Founder, 'Naija Adventures' Eco-Tour Company",
        graduationYear: 2015,
        imageUrl: "/images/alumni/zainab-bello.jpg",
        testimonial:
          "My passion for showcasing the real Nigeria was nurtured here. The courses on sustainable tourism gave me the framework to build a business that benefits both tourists and local communities.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_HOSPITALITY",
    careerPaths: [
      {
        title: "Hotel / Resort Manager",
        sectors: [
          "Luxury Hotels",
          "Resort Chains",
          "Boutique Lodges",
          "Safari Camps",
        ],
      },
      {
        title: "Tour Operator & Manager",
        sectors: [
          "Adventure Travel",
          "Cultural Tourism",
          "Eco-Tourism",
          "Corporate Travel",
        ],
      },
      {
        title: "Event & Conference Planner",
        sectors: [
          "Conference Centers",
          "Wedding Planning",
          "Corporate Events",
          "Exhibition Centers",
        ],
      },
      {
        title: "Food & Beverage Director",
        sectors: [
          "Restaurant Groups",
          "Cruise Lines",
          "Casinos",
          "Corporate Catering",
        ],
      },
      {
        title: "Tourism Development Officer",
        sectors: [
          "Government Tourism Boards",
          "Development Agencies",
          "Destination Marketing Organizations",
        ],
      },
    ],
    learningOutcomes: [
      "Manage the core operational departments of a hotel (front office, housekeeping, F&B) to ensure efficiency and profitability.",
      "Develop and market a sustainable tourism product that minimizes environmental impact and maximizes community benefit.",
      "Apply principles of revenue management and analytics to optimize pricing and occupancy strategies.",
      "Plan and execute a large-scale event, from conceptualization and budgeting to logistics and evaluation.",
      "Design and deliver a customer service experience that exceeds guest expectations and builds brand loyalty.",
    ],
    interestingFacts: [
      "The hospitality industry is one of the world's largest employers, accounting for 1 in 10 jobs globally.",
      '"Experience-based" travel is the fastest-growing segment, with travelers seeking authentic cultural immersion over traditional sightseeing.',
      'The famous concept of "The Customer is Always Right" was coined by hotel magnates César Ritz and Harry Gordon Selfridge in the early 1900s.',
    ],
    accreditation: [
      "Nigerian University Commission (NUC)",
      "Institute of Hospitality (IOH, UK)",
    ],
    testPreparation:
      "The curriculum aligns with the certification requirements of the Institute of Hospitality (IOH) and provides a pathway to Certified Hotel Administrator (CHA) qualifications.",
    facilities: [
      "The 'SAU Taste' Training Restaurant, open to the public and managed by students.",
      "Mock hotel room and front desk for practical check-in/check-out simulations.",
      "Event planning studio with equipment for designing and staging events.",
    ],
    industryConnections: {
      partners: [
        "Marriott International",
        "Transcorp Hotels",
        "Tour Nigeria",
        "Journeys Africa",
        "The Wedding Place",
      ],
      initiatives: [
        "Annual Hospitality Career Expo",
        "Guest Speaker Series with Industry Leaders",
        "International Student Exchange Programs",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Service Excellence Scholarship",
        description:
          "For students with prior experience in the service industry who demonstrate a passion for hospitality.",
      },
    ],
    contactInfo: {
      department: "Department of Hospitality & Tourism",
      email: "htm@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Economics",
            "Geography",
            "Any other subject (e.g., History, Government, Business Studies, Home Economics)",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. Geography or Economics is often preferred. Private universities may accept one sitting.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Economics/Geography",
          "Any of History, Government, or Home Economics",
        ],
        jambScore: {
          minimum: 150,
          competitive: 160,
          note: "Hospitality & Tourism Management may have a lower competitive score due to niche demand.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Geography, Economics, or Social Sciences.",
          },
          {
            type: "OND",
            requirements:
              "OND in Hospitality Management, Tourism, or related fields with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Home Economics, Social Sciences, or related fields with good grades.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Social Sciences or Management-related courses with a minimum of 4 points.",
          },
          {
            type: "Professional Certificates",
            requirements:
              "Certificates from hospitality or tourism institutes (e.g., NIHOTOUR) may be considered.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Minimum age of 16 years at the time of admission.",
        "Some universities may require a personal interview or aptitude test for hospitality skills.",
        "Meeting departmental cut-off mark (typically 40% or higher in Post-UTME).",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%).",
      },
    },
  },
  //Public Administration
  {
    id: "bsc-public-administration",
    programCode: "PAD103",
    title: "BSc (Hons) Public Administration",
    slug: "/programs/bsc-public-administration",
    tagline: "Steer the Machinery of Government. Drive Policy for Public Good.",
    overview: {
      description:
        "This program equips you with the knowledge and skills to effectively manage public institutions, shape sound policy, and serve as an ethical leader in governance. You will study the intersection of law, economics, management, and political science, preparing for a career where you can implement programs that improve lives and strengthen communities at the local, state, and national levels.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Public administrators are the vital link between government policy and tangible public services. They are the city managers who ensure clean water and safe roads, the policy analysts who design effective healthcare programs, the foreign service officers who represent national interests abroad, and the non-profit directors who address social inequalities. They work within the system to make it more efficient, transparent, and responsive to the needs of citizens, playing a critical role in nation-building and democratic governance.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Ken Nwosu",
      title: "Professor of Public Policy & Governance",
      imageUrl: "/images/faculty/dr-ken-nwosu.jpg",
      bio: "Dr. Nwosu is a renowned governance expert who has advised state and federal governments on public sector reform. He is the author of several books on fiscal federalism and anti-corruption strategies in Nigeria.",
      email: "k.nwosu@sauni.edu.ng",
      message:
        "If you are driven by a desire to serve your community and make a lasting impact on society, this is the program for you. We are committed to training a new generation of public servants who are equipped with integrity, competence, and a passion for good governance.",
    },
    whyThisProgram: [
      "Engage with real-world policy challenges through our partnership with government ministries and agencies.",
      "Learn from faculty who are active policy consultants and have firsthand experience in the public sector.",
      "Specialize in high-impact areas like Public Finance, Local Government Administration, or Non-Profit Management.",
      "Participate in our annual Model United Nations and Public Policy Debates to hone your diplomacy and analysis skills.",
    ],
    keyTopics: [
      "Public Policy Analysis & Evaluation",
      "Public Financial Management & Budgeting",
      "Human Resource Management in the Public Sector",
      "Administrative Law & Ethics",
      "Local Government & Development Administration",
      "Non-Profit Management & Governance",
    ],
    programBreakdown: {
      coreCourses: 70,
      electives: 20,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Foundations of Governance",
        semesters: {
          first: [
            "Introduction to Public Administration",
            "Nigerian Constitutional Development",
            "Introduction to Sociology",
            "Introduction to Economics",
            "Use of English",
          ],
          second: [
            "Introduction to Political Science",
            "Nigerian Government & Politics",
            "Introduction to Psychology",
            "Basic Statistics",
            "Logic & Critical Thinking",
          ],
        },
      },
      {
        year: 2,
        theme: "The Administrative System",
        semesters: {
          first: [
            "Theories of Public Administration",
            "Public Personnel Administration",
            "Introduction to Law",
            "Microeconomics",
            "Research Methods",
          ],
          second: [
            "Bureaucracy & Public Policy",
            "Organizational Theory",
            "Administrative Law",
            "Macroeconomics",
            "Nigerian Local Government System",
          ],
        },
      },
      {
        year: 3,
        theme: "Management & Policy Tools",
        semesters: {
          first: [
            "Public Financial Management",
            "Policy Analysis & Implementation",
            "Elective I",
            "Elective II",
            "French / Arabic for Diplomacy",
          ],
          second: [
            "Budgeting & Fiscal Policy",
            "Program Evaluation",
            "Elective III",
            "Elective IV",
            "IT in Public Administration",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Capstone",
        semesters: {
          first: [
            "Ethics & Accountability",
            "Comparative Public Administration",
            "Strategic Management",
            "Track Elective I",
            "Track Elective II",
          ],
          second: [
            "Internship with Government/MDA",
            "Research Project (Thesis)",
            "Track Elective III",
            "Track Elective IV",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Hajia Aisha Mohammed",
        position: "Permanent Secretary, Federal Ministry of Health",
        graduationYear: 2000,
        imageUrl: "/images/alumni/hajia-aisha-mohammed.jpg",
        testimonial:
          "SAU instilled in me the ethos of servant leadership. The rigorous understanding of public finance and policy I gained has been indispensable in my journey to overseeing national health programs.",
      },
      {
        name: "Emeka Ibe",
        position: "Executive Director, 'Transparency for Nigeria' NGO",
        graduationYear: 2008,
        imageUrl: "/images/alumni/emeka-ibe.jpg",
        testimonial:
          "This program taught me that good governance is the foundation of development. It gave me the tools to not just work within the system, but to also act as a watchdog and advocate for citizens' rights.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_PUBLIC_ADMIN",
    careerPaths: [
      {
        title: "Policy Analyst",
        sectors: [
          "National/State Assemblies",
          "Think Tanks",
          "Federal Ministries",
          "Research Institutes",
        ],
      },
      {
        title: "Public Affairs/Administrative Officer",
        sectors: [
          "Civil Service",
          "Government Agencies (e.g., NNPC, CBN)",
          "Local Government Councils",
        ],
      },
      {
        title: "Diplomat / Foreign Service Officer",
        sectors: [
          "Ministry of Foreign Affairs",
          "International Organizations (UN, AU, ECOWAS)",
        ],
      },
      {
        title: "Non-Profit Program Manager",
        sectors: [
          "International NGOs (e.g., UNICEF, ActionAid)",
          "Local NGOs",
          "Community-Based Organizations",
        ],
      },
      {
        title: "Public Relations Specialist (Government)",
        sectors: [
          "Government Houses",
          "Ministries of Information",
          "Public Corporations",
        ],
      },
    ],
    learningOutcomes: [
      "Analyze, formulate, and evaluate public policies to address complex socio-economic problems.",
      "Manage public funds responsibly by understanding budgeting processes, auditing, and fiscal accountability.",
      "Apply principles of human resource management, administrative law, and ethical conduct within public institutions.",
      "Design and manage programs and projects for government and non-profit organizations effectively.",
      "Critically assess the role of public administration in promoting good governance and sustainable development.",
    ],
    interestingFacts: [
      "The modern study of public administration is often traced back to Woodrow Wilson's 1887 essay, arguing for the separation of politics (what to do) from administration (how to do it).",
      "The United Nations Public Service Award is given annually to recognize creative achievements and contributions in public service that lead to a more effective and responsive government.",
      "A 2023 study found that countries with higher-quality public administration (merit-based hiring, low corruption) experience significantly higher economic growth rates.",
    ],
    accreditation: ["Nigerian University Commission (NUC)"],
    testPreparation:
      "The program provides an excellent foundation for civil service entrance examinations and certifications from the Nigerian Institute of Management (NIM) and the Association of Enterprise Risk Management Professionals (AERMP).",
    facilities: [
      "Policy Simulation Lab, where students debate and model the outcomes of real policy proposals.",
      "Extensive law and public policy library with access to government gazettes and policy documents.",
      "Moot court for practicing administrative law and public inquiry scenarios.",
    ],
    industryConnections: {
      partners: [
        "Office of the Head of Civil Service",
        "Bureau of Public Service Reforms",
        "National Institute for Policy and Strategic Studies (NIPSS)",
        "DFID",
        "ActionAid Nigeria",
      ],
      initiatives: [
        "Annual Public Service Week",
        "Legislative Internship Program with the National Assembly",
        "Policy Hackathons",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Future Public Leader Scholarship",
        description:
          "For students with a proven record of community service and leadership in their local communities.",
      },
    ],
    contactInfo: {
      department: "Department of Political Science & Public Administration",
      email: "public.admin@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Government",
            "Economics",
            "Any other relevant subject (e.g., Commerce, History, Geography)",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings in WAEC (WASSCE), NECO, or equivalent examinations. Private universities may accept one sitting.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Government",
          "Economics",
          "Any other Social Science subject",
        ],
        jambScore: {
          minimum: 150,
          competitive: 180,
          note: "JAMB cut-off for Public Administration is typically moderate. Competitive scores may vary by institution.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Government, Economics, or Social Sciences.",
          },
          {
            type: "OND",
            requirements:
              "OND in Public Administration, Business Administration, or related fields with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Social Sciences or related fields with good grades.",
          },
          {
            type: "Professional Certificates",
            requirements:
              "Certificates from recognized professional bodies (e.g., CIPM, NIM) may be considered.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Minimum age of 16 years at the time of admission.",
        "Participation in Post-UTME screening (e.g., written test or interview).",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Political Science
  {
    id: "bsc-political-science",
    programCode: "POS108",
    title: "BSc (Hons) Political Science",
    slug: "/programs/bsc-political-science",
    tagline: "Understand Power. Shape Policy. Transform Society.",
    overview: {
      description:
        "Our BSc Political Science program provides a comprehensive understanding of political systems, power dynamics, and governance structures. You'll analyze political behavior, public policy, international relations, and comparative politics while developing critical thinking, research, and analytical skills. This degree prepares you to engage meaningfully in political processes, influence public policy, and contribute to democratic development in Nigeria and beyond.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Political scientists are essential to the functioning of healthy democracies and effective governance. They analyze voting patterns that determine election outcomes, design policies that address societal challenges, advise governments on international relations, and help citizens understand their political rights and responsibilities. In a rapidly changing global landscape, political scientists provide the evidence-based analysis needed to navigate complex issues like climate change, security threats, economic inequality, and democratic consolidation. They serve as bridges between citizens and institutions, ensuring that governance remains responsive, accountable, and effective.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Adewale Balogun",
      title: "Professor of Comparative Politics",
      imageUrl: "/images/faculty/dr-adewale-balogun.jpg",
      bio: "Dr. Balogun is a renowned political analyst who has advised both national and state governments on constitutional reforms and electoral processes. With a PhD from Oxford University, he has published extensively on democratization in West Africa and serves as a regular commentator on national news networks.",
      email: "a.balogun@sauni.edu.ng",
      message:
        "Political science is not just about understanding how power works—it's about learning how to wield it responsibly for the public good. We equip you with the analytical tools to dissect complex political phenomena and the ethical foundation to engage in transformative leadership.",
    },
    whyThisProgram: [
      "Gain practical experience through our mandatory internship program with National Assembly members, government agencies, NGOs, or international organizations.",
      "Participate in our annual Model United Nations and Model ECOWAS simulations, developing diplomacy and negotiation skills.",
      "Learn from faculty who are actively engaged as policy advisors, electoral observers, and consultants to national and international bodies.",
      "Specialize in high-demand areas like International Relations, Public Policy, or Peace and Conflict Studies in your final year.",
    ],
    keyTopics: [
      "Political Theory & Philosophy",
      "Comparative Politics",
      "International Relations & Diplomacy",
      "Public Policy Analysis",
      "Nigerian Government & Politics",
      "Research Methods in Political Science",
    ],
    programBreakdown: {
      coreCourses: 65,
      electives: 25,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Foundations of Political Inquiry",
        semesters: {
          first: [
            "Introduction to Political Science",
            "Nigerian Constitutional Development",
            "Introduction to Sociology",
            "Logic & Critical Thinking",
            "Use of English",
          ],
          second: [
            "History of Political Thought",
            "Introduction to Economics",
            "Nigerian Government & Politics",
            "Introduction to Psychology",
            "Communication Skills",
          ],
        },
      },
      {
        year: 2,
        theme: "Core Disciplines & Methods",
        semesters: {
          first: [
            "Comparative Politics",
            "Political Theory",
            "Research Methods I",
            "Introduction to International Relations",
            "Statistics for Social Sciences",
          ],
          second: [
            "Public Administration",
            "Nigerian Foreign Policy",
            "Research Methods II",
            "Political Economy",
            "Peace and Conflict Studies",
          ],
        },
      },
      {
        year: 3,
        theme: "Advanced Analysis & Application",
        semesters: {
          first: [
            "International Organizations",
            "Public Policy Analysis",
            "Elective I (e.g., Gender & Politics)",
            "Elective II (e.g., Development Studies)",
            "French for Diplomacy I",
          ],
          second: [
            "Political Parties & Electoral Systems",
            "Foreign Policy Analysis",
            "Elective III (e.g., Human Rights)",
            "Elective IV (e.g., Federalism)",
            "French for Diplomacy II",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Capstone",
        semesters: {
          first: [
            "Political Sociology",
            "Capstone Project I",
            "Track Elective I",
            "Track Elective II",
            "Professional Ethics",
          ],
          second: [
            "Strategic Studies",
            "Capstone Project II",
            "Internship (12 weeks)",
            "Seminar in Political Science",
            "Democracy and Governance",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Hon. Fatima Bello",
        position: "Member, House of Representatives",
        graduationYear: 2010,
        imageUrl: "/images/alumni/fatima-bello.jpg",
        testimonial:
          "SAU's Political Science program didn't just teach me about politics—it taught me how to practice it with integrity. The understanding of legislative processes and policy analysis I gained has been invaluable in my work representing my constituents.",
      },
      {
        name: "Tunde Okeke",
        position: "Policy Advisor, United Nations Development Programme (UNDP)",
        graduationYear: 2015,
        imageUrl: "/images/alumni/tunde-okeke.jpg",
        testimonial:
          "The rigorous training in research methods and international relations prepared me perfectly for a career in international development. The faculty's connections helped me secure my first internship at the UN, which launched my career.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_POLITICAL_SCIENCE",
    careerPaths: [
      {
        title: "Policy Analyst/Advisor",
        sectors: [
          "Government Ministries",
          "Think Tanks",
          "Legislative Offices",
          "International Organizations",
        ],
      },
      {
        title: "Diplomat/Foreign Service Officer",
        sectors: [
          "Ministry of Foreign Affairs",
          "Embassies/High Commissions",
          "International Organizations (UN, AU, ECOWAS)",
        ],
      },
      {
        title: "Political Consultant",
        sectors: [
          "Political Parties",
          "Election Management Bodies",
          "Media Organizations",
          "Polling Firms",
        ],
      },
      {
        title: "Legislative Aide",
        sectors: [
          "National Assembly",
          "State Houses of Assembly",
          "Local Government Councils",
        ],
      },
      {
        title: "NGO Program Manager",
        sectors: [
          "Governance NGOs",
          "Human Rights Organizations",
          "Transparency International",
          "Community Development Organizations",
        ],
      },
    ],
    learningOutcomes: [
      "Analyze and compare different political systems, institutions, and processes across various countries and contexts.",
      "Design, conduct, and present original research on political phenomena using appropriate qualitative and quantitative methods.",
      "Critically evaluate public policies, assess their impacts, and propose evidence-based alternatives.",
      "Analyze international political events, understand diplomatic practices, and explain Nigeria's role in the global community.",
      "Articulate complex political concepts clearly and persuasively in both written and oral formats for diverse audiences.",
    ],
    interestingFacts: [
      "The oldest political science department in the world was established at Columbia University in 1880, but the study of politics dates back to ancient Greek philosophers like Plato and Aristotle.",
      "Nigeria has one of the most complex federal systems in the world, with 36 states and a federal capital territory, making it a fascinating case study for federalism.",
      "Political forecasting models can predict election outcomes with surprising accuracy by analyzing economic indicators, approval ratings, and other data points.",
    ],
    accreditation: ["Nigerian University Commission (NUC)"],
    testPreparation:
      "This program provides excellent preparation for foreign service entrance examinations, civil service exams, and graduate studies in law, public administration, and international relations.",
    facilities: [
      "Model UN/ECOWAS Chamber: A dedicated space equipped for simulations of international organizations and legislative debates.",
      "Political Research Lab: With access to major databases, statistical software (SPSS, Stata), and survey research tools.",
      "Archival Library: Featuring extensive collections of government documents, policy papers, and historical political texts.",
    ],
    industryConnections: {
      partners: [
        "National Institute for Policy and Strategic Studies (NIPSS)",
        "Independent National Electoral Commission (INEC)",
        "Ministry of Foreign Affairs",
        "Centre for Democracy and Development (CDD)",
        "ECOWAS Commission",
      ],
      initiatives: [
        "Annual Democracy Lecture Series",
        "Legislative Internship Program",
        "Election Observation Missions",
        "Policy Hackathons",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Future Leader Scholarship",
        description:
          "Awarded to students with demonstrated leadership potential through student government, debate clubs, or community organizing.",
      },
      {
        name: "Public Service Scholarship",
        description:
          "For students from rural communities who demonstrate a commitment to returning to serve in local government or community development.",
      },
    ],
    contactInfo: {
      department: "Department of Political Science & International Relations",
      email: "political.science@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Government",
            "Economics",
            "Any other relevant subject (e.g., History, Literature-in-English, Geography)",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. Government or History is often required. Private universities may accept one sitting.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Government",
          "Economics",
          "Any other Social Science or Arts subject",
        ],
        jambScore: {
          minimum: 150,
          competitive: 190,
          note: "Political Science may have a higher competitive score due to demand.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Government, Economics, or History.",
          },
          {
            type: "OND",
            requirements:
              "OND in Political Science, Public Administration, or related fields with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements: "NCE in Social Sciences or Arts with good grades.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Social Sciences or Arts with required points.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Minimum age of 16 years at the time of admission.",
        "Some universities may require a personal statement or interview.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Criminology and Security Studies
  {
    id: "bsc-criminology-security",
    programCode: "CSS202",
    title: "BSc (Hons) Criminology & Security Studies",
    slug: "/programs/bsc-criminology-security-studies",
    tagline:
      "Analyze Threats, Forge Solutions. Become a Leader in National Security and Justice.",
    overview: {
      description:
        "This interdisciplinary program fuses classical criminological theory with modern security challenges. You will explore the root causes of crime, the workings of the criminal justice system, and the complex landscape of national and cyber security. Graduates are equipped to analyze risks, develop policy, and implement strategies to create a safer society.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "In an era of evolving cybercrime, transnational terrorism, and complex social unrest, experts in criminology and security are essential. They work at the front lines, from profiling criminal behavior and rehabilitating offenders to protecting critical national infrastructure and corporate assets from digital and physical threats. This field is dedicated to understanding the 'why' behind crime and the 'how' behind preventing it, making our communities and nation more resilient.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Abiodun Falaye",
      title: "Professor of Security Studies & Former National Security Advisor",
      imageUrl: "/images/staff/prof-abiodun-falaye.jpg",
      bio: "Dr. Falaye brings over 25 years of field experience from his tenure in national security advisory and international peacekeeping missions. His research focuses on counter-terrorism strategy and cybersecurity policy in West Africa.",
      email: "a.falaye@sauni.edu.ng",
      message:
        "Welcome to the nerve center for future security leaders. At Southern Atlantic, we move beyond the textbook to tackle the real-world security dilemmas facing Nigeria and the world. Your journey to safeguarding the future starts here.",
    },
    whyThisProgram: [
      "Gain hands-on experience with digital forensics tools and security simulation software in our state-of-the-art Security Operations Lab.",
      "Participate in exclusive field visits to institutions like the Nigerian Security and Civil Defence Corps (NSCDC), INTERPOL, and leading private security firms.",
      "Learn from a faculty comprising seasoned criminologists, former intelligence officers, and cybersecurity experts.",
      "Option to specialize in high-demand tracks: Cyber Criminology or Strategic Security Management.",
    ],
    keyTopics: [
      "Theories of Crime and Social Deviance",
      "Criminal Law & Judicial Process",
      "National Security & Intelligence Analysis",
      "Cybercrime & Digital Forensics",
      "Terrorism & Counter-Terrorism Strategies",
      "Victimology & Restorative Justice",
    ],
    programBreakdown: {
      coreCourses: 75,
      electives: 15,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Foundations of Crime and Society",
        semesters: {
          first: [
            "Introduction to Criminology",
            "Nigerian Legal System",
            "Sociology of Deviance",
            "Introduction to Psychology",
            "Use of Library",
          ],
          second: [
            "Introduction to Security Studies",
            "Law of Crimes",
            "Logic & Critical Thinking",
            "Nigerian Government & Politics",
            "Peace & Conflict Studies",
          ],
        },
      },
      {
        year: 2,
        theme: "The Criminal Justice System",
        semesters: {
          first: [
            "Policing & Society",
            "Penology & Correctional Administration",
            "Research Methods",
            "Victimology",
            "Human Rights Law",
          ],
          second: [
            "Criminal Investigation",
            "Courts & Judicial Process",
            "Quantitative Methods",
            "Organized Crime",
            "Ethics in Criminal Justice",
          ],
        },
      },
      {
        year: 3,
        theme: "Advanced Security Challenges",
        semesters: {
          first: [
            "Terrorism & Counter-Terrorism",
            "Intelligence Studies",
            "Cyber Criminology",
            "Elective I (e.g., Forensic Psychology)",
            "Elective II (e.g., White-Collar Crime)",
          ],
          second: [
            "Strategic Security Management",
            "Conflict Resolution & Peace Building",
            "Digital Forensics",
            "Elective III (e.g., Maritime Security)",
            "SIWES (Internship)",
          ],
        },
      },
      {
        year: 4,
        theme: "Capstone & Specialization",
        semesters: {
          first: [
            "Research Project I",
            "Advanced Criminological Theory",
            "Elective IV",
            "Elective V",
            "Policy Analysis",
          ],
          second: [
            "Research Project II (Thesis)",
            "Contemporary Security Issues",
            "Professional Practice",
            "Elective VI",
            "Capstone Simulation Exercise",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Chioma Adeyemi",
        position: "Head of Cyber Intelligence, EFCC",
        graduationYear: 2016,
        imageUrl: "/images/alumni/chioma-adeyemi.jpg",
        testimonial:
          "The program's focus on both theory and practical tech skills allowed me to seamlessly transition into a role combating financial cybercrime. The network I built at SAU is unparalleled.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/sau-criminology-overview",
    careerPaths: [
      {
        title: "Intelligence Analyst",
        sectors: [
          "DSS",
          "NIA",
          "EFCC",
          "Police Force",
          "Private Security Firms",
        ],
      },
      {
        title: "Cyber Security Specialist",
        sectors: [
          "Banking",
          "Tech Companies",
          "Government Agencies",
          "Consulting",
        ],
      },
      {
        title: "Policy Advisor",
        sectors: [
          "Ministry of Justice",
          "National Assembly",
          "NGOs (e.g., UNODC)",
          "Think Tanks",
        ],
      },
      {
        title: "Corrections Officer / Prison Administrator",
        sectors: ["Nigerian Correctional Service", "State Governments"],
      },
      {
        title: "Security Consultant",
        sectors: [
          "Multinational Corporations",
          "Oil & Gas",
          "Aviation",
          "Maritime",
        ],
      },
    ],
    learningOutcomes: [
      "Critically evaluate major criminological theories and apply them to analyze contemporary crime patterns.",
      "Design and conduct ethical research on crime, security trends, and the efficacy of justice policies.",
      "Perform basic digital forensic analysis and assess vulnerabilities in security systems.",
      "Develop strategic security risk assessments and policy recommendations for public and private organizations.",
      "Articulate complex security issues effectively to diverse audiences, from community groups to executive boards.",
    ],
    interestingFacts: [
      "Modern criminology is deeply intertwined with psychology, sociology, and even data science, making it a truly interdisciplinary field.",
      "The global cybersecurity market is expected to exceed $500 billion by 2030, creating a massive demand for experts who understand the criminal mind behind cyber attacks.",
      "Predictive policing, using data analytics to forecast crime hotspots, is a rapidly growing application of criminological research.",
    ],
    accreditation: ["National Universities Commission (NUC)"],
    testPreparation:
      "This program provides a strong foundation for professional certifications such as Certified Cyber Security Consultant (CCSC), Certified Fraud Examiner (CFE), and other security management credentials.",
    facilities: [
      "Security Operations Lab (SecLab) with simulation software and digital forensics workstations.",
      "Mock courtroom for practicing judicial procedures and mock trials.",
      "Dedicated debate and negotiation room for crisis simulation exercises.",
    ],
    industryConnections: {
      partners: [
        "Nigerian Police Force",
        "NSCDC",
        "EFCC",
        "Intersec Group",
        "PulseTech Solutions",
      ],
      initiatives: [
        "Annual Security Summit",
        "Cyber Range Challenge",
        "Guest Lecture Series from Intelligence Community Leaders",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Future Defender Scholarship",
        description:
          "Awarded to students demonstrating exceptional leadership potential and a commitment to public service.",
      },
    ],
    contactInfo: {
      department: "Department of Criminology & Security Studies",
      email: "criminology@sauni.edu.ng",
      phone: "+234 803 123 4567",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Government or History",
            "Economics",
            "Any other relevant subject (e.g., Biology, Commerce, Literature-in-English)",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. Government or History is specifically required. Private universities may accept one sitting.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Government",
          "Economics",
          "Any other Social Science or Science subject",
        ],
        jambScore: {
          minimum: 150,
          competitive: 180,
          note: "JAMB cut-off for Criminology and Security Studies is typically moderate.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Government, Economics, or Social Sciences.",
          },
          {
            type: "OND",
            requirements:
              "OND in Criminology, Security Studies, or related fields with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Social Sciences or related fields with good grades.",
          },
          {
            type: "Professional Certificates",
            requirements:
              "Certificates from security or criminology institutes may be considered.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Minimum age of 16 years at the time of admission.",
        "Participation in Post-UTME screening (e.g., written test or interview).",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Petroleum Chemistry
  {
    id: "bsc-petroleum-chemistry",
    programCode: "PCH301",
    title: "BSc (Hons) Petroleum Chemistry",
    slug: "/programs/bsc-petroleum-chemistry",
    tagline: "Fuel the Future. Master the Science Behind Energy.",
    overview: {
      description:
        "This specialized program applies the core principles of chemistry to the entire petroleum value chain, from upstream exploration and extraction to downstream refining and petrochemical production. You will gain expertise in analyzing hydrocarbons, solving complex production challenges, and developing sustainable processes for the energy industry.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Petroleum chemists are the problem-solvers of the energy sector. They ensure the quality of fuel we put in our cars, develop new materials from plastics to pharmaceuticals, and work on cutting-edge solutions to reduce environmental impact, such as carbon capture and cleaner refining techniques. They are essential to maximizing the value of Nigeria's natural resources while pioneering the path to a sustainable energy future.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Kenichi Okoro",
      title: "Professor of Petrochemical Engineering & Chemistry",
      imageUrl: "/images/staff/dr-kenichi-okoro.jpg",
      bio: "With a PhD from Imperial College London and 15 years of experience at Shell, Dr. Okoro is a leading expert in catalysis and refinery process optimization. He holds several patents for improving fuel efficiency.",
      email: "k.okoro@sauni.edu.ng",
      message:
        "Nigeria's economy is built on oil and gas, but its future will be built on the scientists who innovate within it. This program is your gateway to a high-impact career where you will directly contribute to national revenue, energy security, and technological advancement.",
    },
    whyThisProgram: [
      "Get hands-on experience in our modern laboratories with crude oil assay testing, distillation units, and chromatographic equipment.",
      "Benefit from our strong industry ties with guaranteed internship placements at leading oil and gas companies.",
      "Learn the specific chemical processes and challenges relevant to the Niger Delta region's crude oil composition.",
      "Focus on emerging areas like flow assurance, refinery chemistry, and environmental remediation.",
    ],
    keyTopics: [
      "Organic Chemistry of Hydrocarbons",
      "Analytical Chemistry & Instrumentation (GC-MS, HPLC)",
      "Petroleum Geology & Reservoir Fluids",
      "Oil Refining Processes & Petrochemistry",
      "Corrosion Science in the Oilfield",
      "Environmental Chemistry & Pollution Control",
    ],
    programBreakdown: {
      coreCourses: 75,
      electives: 15,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Foundational Sciences",
        semesters: {
          first: [
            "General Chemistry I",
            "Introductory Physics I",
            "Calculus I",
            "Use of English",
            "Basic Geology",
          ],
          second: [
            "General Chemistry II",
            "Introductory Physics II",
            "Calculus II",
            "Introduction to Computing",
            "Technical Drawing",
          ],
        },
      },
      {
        year: 2,
        theme: "Core Chemistry Principles",
        semesters: {
          first: [
            "Organic Chemistry I",
            "Physical Chemistry I",
            "Analytical Chemistry",
            "Mathematics for Chemists",
            "Introduction to Petroleum Industry",
          ],
          second: [
            "Organic Chemistry II",
            "Physical Chemistry II",
            "Inorganic Chemistry",
            "Statistics for Scientists",
            "Health, Safety & Environment (HSE)",
          ],
        },
      },
      {
        year: 3,
        theme: "Applied Petroleum Chemistry",
        semesters: {
          first: [
            "Petroleum Geology",
            "Chemistry of Hydrocarbons",
            "Instrumental Methods of Analysis",
            "Chemical Thermodynamics",
            "Elective I (e.g., Polymer Chemistry)",
          ],
          second: [
            "Drilling & Production Chemistry",
            "Corrosion Science",
            "Research Methodology",
            "Elective II",
            "SIWES (Internship)",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Capstone",
        semesters: {
          first: [
            "Petroleum Refining & Petrochemicals",
            "Environmental Chemistry",
            "Project I",
            "Elective III (e.g., Catalyst Science)",
            "Elective IV",
          ],
          second: [
            "Petroleum Product Quality & Testing",
            "Project II (Thesis)",
            "Economics of Petroleum",
            "Elective V",
            "Petroleum Legislation & Policy",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Ngozi Eze",
        position: "Senior Process Chemist, TotalEnergies",
        graduationYear: 2015,
        imageUrl: "/images/alumni/ngozi-eze.jpg",
        testimonial:
          "The practical labs at SAU mirrored the real-world problems I faced on the offshore platform. The program's focus on Niger Delta crude specifics gave me a significant advantage from day one.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/sau-petchem-overview",
    careerPaths: [
      {
        title: "Production Chemist",
        sectors: [
          "Upstream E&P Companies (Shell, Chevron, ExxonMobil)",
          "Service Companies (Schlumberger, Halliburton)",
        ],
      },
      {
        title: "Process Chemist",
        sectors: [
          "Refineries (NNPC, Dangote Refinery)",
          "Petrochemical Plants",
        ],
      },
      {
        title: "Quality Control/Assurance Chemist",
        sectors: [
          "Fuel Marketing Companies",
          "Product Storage Terminals",
          "Regulatory Agencies (DPR)",
        ],
      },
      {
        title: "Environmental Chemist",
        sectors: [
          "HSE Departments",
          "Environmental Consultancy Firms",
          "Remediation Companies",
        ],
      },
      {
        title: "Research Scientist",
        sectors: [
          "Research Institutes",
          "University Academia",
          "Corporate R&D Centers",
        ],
      },
    ],
    learningOutcomes: [
      "Analyze the chemical composition of crude oil and petroleum products using advanced instrumental techniques.",
      "Diagnose and solve chemical-related problems in oil production (e.g., scale, corrosion, emulsion).",
      "Explain the fundamental chemical processes involved in refining crude oil into valuable products.",
      "Design and execute experiments to investigate petrochemical reactions and processes.",
      "Assess the environmental impact of petroleum operations and propose mitigation strategies.",
    ],
    interestingFacts: [
      "A single barrel of crude oil (42 gallons) can be refined into over 19 gallons of gasoline, but also into products like asphalt, lubricants, and the raw materials for plastics, solvents, and even cosmetics.",
      "Chemistry is key to 'enhanced oil recovery'—using surfactants and polymers to squeeze more oil out of aging fields.",
      "The challenge of 'flow assurance'—keeping oil flowing in pipelines in deep, cold water—is solved by chemists who develop additives to prevent wax and hydrate formation.",
    ],
    accreditation: [
      "National Universities Commission (NUC)",
      "Council of Nigerian Society of Chemical Engineers (CONSCHE)",
    ],
    testPreparation:
      "This program provides a direct pathway to professional certification with the Nigerian Society of Chemical Engineers (NSChE) and is excellent preparation for roles requiring certification from the Department of Petroleum Resources (DPR).",
    facilities: [
      "Petroleum Processing Lab with small-scale distillation and cracking units.",
      "Analytical Chemistry Lab with Gas Chromatographs (GC), HPLC, and Spectrophotometers.",
      "Drilling Fluids and Production Chemistry Lab for emulsion and corrosion testing.",
    ],
    industryConnections: {
      partners: [
        "NNPC",
        "Shell Nigeria",
        "Chevron",
        "NLNG",
        "Dangote Refinery",
      ],
      initiatives: [
        "Annual Petrobowl Competition",
        "Industry Advisory Board Projects",
        "Field Trips to Refineries and Flow Stations",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "NNPC/SAU National Energy Scholarship",
        description:
          "Full tuition scholarship for top-performing students, sponsored by the Nigerian National Petroleum Corporation.",
      },
    ],
    contactInfo: {
      department: "Department of Petroleum Chemistry & Chemical Engineering",
      email: "pet.chemistry@sauni.edu.ng",
      phone: "+234 807 123 7890",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Chemistry",
            "Physics",
            "Biology or Further Mathematics",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. Chemistry and Physics are core subjects. Private universities may accept one sitting.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Chemistry",
          "Physics",
          "Mathematics or Biology",
        ],
        jambScore: {
          minimum: 150,
          competitive: 200,
          note: "Petroleum Chemistry may require a higher competitive score due to its specialized nature.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Chemistry, Physics, or Mathematics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Petroleum Chemistry, Chemical Engineering, or related fields with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Science Education (Chemistry major) with good grades.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Sciences with required points.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Minimum age of 16 years at the time of admission.",
        "Participation in Post-UTME screening (e.g., written test or practical assessment).",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //International Relations and Diplomacy
  {
    id: "bsc-international-relations",
    programCode: "IRD402",
    title: "BSc (Hons) International Relations & Diplomacy",
    slug: "/programs/bsc-international-relations-diplomacy",
    tagline: "Navigate the Global Stage. Forge Peace and Prosperity.",
    overview: {
      description:
        "This program provides a comprehensive understanding of the political, economic, and cultural forces that shape interactions between states, organizations, and peoples. You will study global governance, foreign policy analysis, conflict resolution, and the art of diplomacy, preparing for a career on the world stage.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "In our interconnected world, challenges like climate change, pandemics, terrorism, and trade disputes cannot be solved by any one nation alone. Experts in international relations and diplomacy are the negotiators, analysts, and leaders who build the alliances and craft the agreements that promote global peace, security, and sustainable development. They represent national interests while fostering international cooperation.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Ambassador (Dr.) Fatima Aliyu",
      title: "Professor of Diplomacy & Former Ambassador to the UN",
      imageUrl: "/images/staff/amb-fatima-aliyu.jpg",
      bio: "Amb. Aliyu had a distinguished 30-year career in the Nigerian Foreign Service, serving as Ambassador to Belgium and the UN. She is a leading voice on African multilateralism and humanitarian law.",
      email: "f.aliyu@sauni.edu.ng",
      message:
        "This is more than a degree; it's a passport to a global career. We train you not just to understand the world, but to engage with it confidently and ethically. You will learn the theory of IR and the practical craft of diplomacy from those who have lived it.",
    },
    whyThisProgram: [
      "Receive practical training in diplomatic protocol, negotiation, and public speaking from former ambassadors and foreign service officers.",
      "Join our top-ranked Model UN team, which regularly travels to international conferences.",
      "Focus on Africa's role in global affairs, with specialized courses on AU, ECOWAS, and Nigeria's foreign policy.",
      "Unmatched internship opportunities with embassies, international NGOs, and multinational corporations in Nigeria.",
    ],
    keyTopics: [
      "Theories of International Relations",
      "Nigerian Foreign Policy",
      "International Law & Organizations",
      "Diplomacy & Negotiation Theory",
      "Global Political Economy",
      "Security & Strategic Studies",
    ],
    programBreakdown: {
      coreCourses: 65,
      electives: 25,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "The Global Landscape",
        semesters: {
          first: [
            "Introduction to International Relations",
            "History of the International System",
            "Introduction to Political Science",
            "Microeconomics",
            "World History",
          ],
          second: [
            "Introduction to Diplomacy",
            "Nigerian Foreign Policy",
            "Macroeconomics",
            "Introduction to Law",
            "French for Diplomacy I",
          ],
        },
      },
      {
        year: 2,
        theme: "Structures and Processes",
        semesters: {
          first: [
            "Theories of International Relations",
            "International Law",
            "International Organizations",
            "Research Methods",
            "French for Diplomacy II",
          ],
          second: [
            "Foreign Policy Analysis",
            "International Political Economy",
            "Peace & Conflict Studies",
            "Statistics",
            "Public International Law",
          ],
        },
      },
      {
        year: 3,
        theme: "Specialization and Application",
        semesters: {
          first: [
            "Diplomatic Practice & Protocol",
            "Strategic Studies",
            "Africa in World Politics",
            "Elective I (e.g., Human Rights)",
            "Elective II (e.g., Environmental Politics)",
          ],
          second: [
            "International Economic Relations",
            "Conflict Resolution & Mediation",
            "Elective III",
            "Elective IV",
            "SIWES (Internship)",
          ],
        },
      },
      {
        year: 4,
        theme: "Capstone and Advanced Diplomacy",
        semesters: {
          first: [
            "Project I",
            "Terrorism & Counter-Terrorism",
            "Elective V",
            "Elective VI",
            "Negotiation & Mediation Lab",
          ],
          second: [
            "Project II (Thesis)",
            "Seminar in Contemporary International Issues",
            "Elective VII",
            "Elective VIII",
            "International Ethics",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Emeka Nwosu",
        position: "Political Affairs Officer, United Nations (New York)",
        graduationYear: 2012,
        imageUrl: "/images/alumni/emeka-nwosu.jpg",
        testimonial:
          "The negotiation simulations and the focus on practical writing skills at SAU were directly applicable to my work at the UN. The global perspective I gained was invaluable.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/sau-ir-overview",
    careerPaths: [
      {
        title: "Diplomat / Foreign Service Officer",
        sectors: [
          "Ministry of Foreign Affairs",
          "Nigerian Embassies/High Commissions",
        ],
      },
      {
        title: "International Civil Servant",
        sectors: ["United Nations", "African Union", "World Bank", "ECOWAS"],
      },
      {
        title: "Policy Analyst / Researcher",
        sectors: [
          "Think Tanks (e.g., NIIA)",
          "Research Institutes",
          "NGOs (Amnesty International, ICRC)",
        ],
      },
      {
        title: "Corporate International Relations",
        sectors: ["Multinational Corporations", "Banks", "Oil & Gas Companies"],
      },
      {
        title: "Journalist / Foreign Correspondent",
        sectors: [
          "International Media Houses (BBC, CNN, Al Jazeera)",
          "Print Media",
        ],
      },
    ],
    learningOutcomes: [
      "Critically analyze international events using the major theoretical paradigms of IR.",
      "Evaluate the role and effectiveness of international organizations and law in global governance.",
      "Draft policy briefs, diplomatic cables, and position papers for governmental and non-governmental actors.",
      "Design and execute a mediated negotiation or conflict resolution strategy for a simulated international dispute.",
      "Articulate the principles and conduct of Nigerian foreign policy within the broader African and global context.",
    ],
    interestingFacts: [
      "The Congress of Vienna in 1815 is often considered the founding moment of modern multilateral diplomacy, establishing a system for great power cooperation that lasted a century.",
      "The field of International Relations was formally born after World War I, driven by a desire to understand the causes of war and create a lasting peace.",
      "Less than 1% of the world's population will ever set foot inside a UN headquarters, making IR graduates part of an elite group with a truly global perspective.",
    ],
    accreditation: ["National Universities Commission (NUC)"],
    testPreparation:
      "This program provides an ideal foundation for the Nigerian Foreign Service Exam and advanced degrees like a Master's in International Affairs (MIA) or Law (LLM in International Law).",
    facilities: [
      "Diplomacy Lab: A simulated embassy environment for protocol and negotiation exercises.",
      "Model UN Chamber with country placards and full audio-visual support.",
      "International Documents Library with access to UN, AU, and ECOWAS databases and publications.",
    ],
    industryConnections: {
      partners: [
        "Ministry of Foreign Affairs",
        "Nigerian Institute of International Affairs (NIIA)",
        "Embassies in Abuja",
        "ECOWAS Commission",
        "IFRC",
      ],
      initiatives: [
        "Ambassador-in-Residence Program",
        "Annual International Crisis Simulation",
        "Career Talks with International Organizations",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Global Citizen Scholarship",
        description:
          "For students demonstrating exceptional academic merit and proficiency in a second international language (French, Arabic, Mandarin).",
      },
    ],
    contactInfo: {
      department: "Department of International Relations & Strategic Studies",
      email: "international.relations@sauni.edu.ng",
      phone: "+234 809 888 4321",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Government or History",
            "Economics",
            "A Literature-in-English or CRS/IRS or any other Arts/Social Science subject",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. A strong emphasis is placed on English and Government/History.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Government or History",
          "Economics",
          "Any other subject from Arts or Social Sciences",
        ],
        jambScore: {
          minimum: 150,
          competitive: 180,
          note: "Top universities often have higher cut-offs. A good score in Government/History and English is crucial.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects such as Government, History, Economics, or Sociology.",
          },
          {
            type: "OND",
            requirements:
              "OND in Mass Communication, Public Administration, Business Administration, or related Social Science fields with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Government, History, Social Studies, or related areas with good grades.",
          },
          {
            type: "First Degree",
            requirements:
              "A good first degree (minimum of Second Class Lower) in a related field for postgraduate diplomas or second degree entry.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements. Proficiency in a foreign language (e.g., French) is a strong advantage.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Strong written and verbal communication skills are essential.",
        "Participation in Post-UTME screening, which often includes an essay-based exam.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Economics
  {
    id: "bsc-economics",
    programCode: "ECO105",
    title: "BSc (Hons) Economics",
    slug: "/programs/bsc-economics",
    tagline:
      "Master the Science of Choice. Decode the Forces that Shape Our World.",
    overview: {
      description:
        "Our Economics program provides a rigorous, quantitative foundation in microeconomic and macroeconomic theory, equipping you with the analytical tools to understand how individuals, businesses, and governments allocate resources. You will learn to model complex behaviors, interpret data, and forecast trends to solve real-world financial and policy challenges.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Economists are the diagnosticians and forecasters of the modern world. They analyze market trends to advise investors, evaluate government policies to recommend improvements, and model the potential impacts of everything from a new tax law to a climate change initiative. In a developing economy like Nigeria's, economists are crucial for designing strategies to fight inflation, reduce unemployment, attract foreign investment, and promote sustainable and inclusive growth.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Prof. Chinedu Adebayo",
      title: "Professor of Development Economics",
      imageUrl: "/images/staff/prof-chinedu-adebayo.jpg",
      bio: "A former consultant to the Central Bank of Nigeria and the World Bank, Prof. Adebayo is a leading expert on monetary policy and economic development in Sub-Saharan Africa. His work focuses on financial inclusion and SME growth.",
      email: "c.adebayo@sauni.edu.ng",
      message:
        "Economics is not about money; it's about the intricate web of choices that define our existence. At SAU, we empower you with the data-driven toolkit to understand these choices and to become an architect of prosperity for Nigeria and beyond.",
    },
    whyThisProgram: [
      "Gain proficiency in industry-standard software and programming languages like Stata, R, Python, and EViews in our dedicated Econometrics Lab.",
      "Apply theory to practice through our 'Economics Clinic,' where students work on real projects for local businesses and government agencies.",
      "Learn from a faculty that includes former central bankers, financial market analysts, and development policy advisors.",
      "Specialize in high-demand fields like Financial Economics, Development Economics, or Data Analytics.",
    ],
    keyTopics: [
      "Microeconomic & Macroeconomic Theory",
      "Econometrics & Statistical Modeling",
      "Mathematical Economics",
      "Monetary Theory & Policy",
      "International Trade & Finance",
      "Development Economics & Growth Models",
    ],
    programBreakdown: {
      coreCourses: 70,
      electives: 20,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Principles and Tools",
        semesters: {
          first: [
            "Principles of Economics I",
            "Introduction to Statistics",
            "Calculus for Economists I",
            "Introduction to Sociology",
            "Use of English",
          ],
          second: [
            "Principles of Economics II",
            "Introduction to Computer Science",
            "Calculus for Economists II",
            "Nigerian Economic History",
            "Logic & Critical Thinking",
          ],
        },
      },
      {
        year: 2,
        theme: "Intermediate Theory and Application",
        semesters: {
          first: [
            "Microeconomic Theory I",
            "Macroeconomic Theory I",
            "Mathematics for Economists",
            "Statistics for Economists",
            "History of Economic Thought",
          ],
          second: [
            "Microeconomic Theory II",
            "Macroeconomic Theory II",
            "Introduction to Econometrics",
            "Money, Banking & Finance",
            "Structure of the Nigerian Economy",
          ],
        },
      },
      {
        year: 3,
        theme: "Advanced Analysis and Specialization",
        semesters: {
          first: [
            "Econometrics I",
            "Public Finance",
            "International Trade Theory",
            "Elective I (e.g., Labor Economics)",
            "Elective II (e.g., Health Economics)",
          ],
          second: [
            "Econometrics II",
            "International Finance",
            "Development Economics I",
            "Research Methodology",
            "SIWES (Internship)",
          ],
        },
      },
      {
        year: 4,
        theme: "Capstone and Policy Focus",
        semesters: {
          first: [
            "Project I",
            "Development Economics II",
            "Monetary Economics",
            "Elective III (e.g., Environmental Econ)",
            "Elective IV (e.g., Game Theory)",
          ],
          second: [
            "Project II (Thesis)",
            "Nigerian Fiscal Policy",
            "Economics of Regulation",
            "Elective V",
            "Advanced Seminar in Economics",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Tope Alake",
        position: "Lead Analyst, Renaissance Capital",
        graduationYear: 2014,
        imageUrl: "/images/alumni/tope-alake.jpg",
        testimonial:
          "The intense focus on quantitative skills and econometrics at SAU set me apart. I was running complex regression models and building forecasts on day one of my job, while others were still learning the basics.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/sau-economics-overview",
    careerPaths: [
      {
        title: "Economic Analyst",
        sectors: [
          "Central Bank of Nigeria",
          "National Bureau of Statistics",
          "Ministry of Finance",
          "Commercial Banks",
        ],
      },
      {
        title: "Data Analyst / Scientist",
        sectors: [
          "FinTech Companies",
          "Telecoms",
          "Consulting Firms (McKinsey, KPMG)",
          "E-commerce",
        ],
      },
      {
        title: "Policy Advisor",
        sectors: [
          "World Bank/IMF",
          "African Development Bank",
          "Local & International NGOs",
          "Think Tanks",
        ],
      },
      {
        title: "Financial Risk Analyst",
        sectors: [
          "Investment Banks",
          "Asset Management Firms",
          "Insurance Companies",
        ],
      },
      {
        title: "Research Economist",
        sectors: ["University Academia", "Private Research Institutes"],
      },
    ],
    learningOutcomes: [
      "Apply advanced microeconomic and macroeconomic models to analyze market behavior and national economic performance.",
      "Design, estimate, and interpret econometric models to test hypotheses and forecast economic trends.",
      "Critically evaluate the impact of fiscal, monetary, and trade policies on the Nigerian economy.",
      "Analyze datasets using statistical software to derive actionable insights for business and policy decisions.",
      "Communicate complex economic arguments and data findings effectively to both technical and non-technical audiences.",
    ],
    interestingFacts: [
      "The famous 'Adam Smith's invisible hand' metaphor only appears once in his seminal book, *The Wealth of Nations*.",
      "The field of behavioral economics, which won a Nobel Prize, shows that humans often make irrational economic decisions based on cognitive biases, challenging classical theory.",
      "Economists can now analyze real-time economic activity using 'big data' sources like satellite images of nighttime lights, social media sentiment, and satellite shipping traffic.",
    ],
    accreditation: ["National Universities Commission (NUC)"],
    testPreparation:
      "This program provides a strong foundation for professional certifications such as the Chartered Financial Analyst (CFA) program and is excellent preparation for graduate studies in Economics (MSc, PhD), Data Science, and Business Administration (MBA).",
    facilities: [
      "Econometrics and Data Lab with dedicated terminals running Stata, R, Python, and Bloomberg terminals.",
      "Trading Simulation Room with real-time market data feeds.",
      "Collaborative research pods for group projects and data analysis.",
    ],
    industryConnections: {
      partners: [
        "Central Bank of Nigeria",
        "National Bureau of Statistics",
        "NGX Group",
        "Stanbic IBTC",
        "PwC Nigeria",
      ],
      initiatives: [
        "Annual Economic Forecasting Summit",
        "CBN Governor's Lecture Series",
        "Student Managed Fund Project",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "CBN Future Economist Scholarship",
        description:
          "Merit-based scholarship for students demonstrating exceptional quantitative skills and a passion for monetary policy.",
      },
    ],
    contactInfo: {
      department: "Department of Economics",
      email: "economics@sauni.edu.ng",
      phone: "+234 701 234 5678",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Economics",
            "Any other two subjects from Social Sciences, Arts, or Sciences",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. A credit in Mathematics is non-negotiable for most universities.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Economics",
          "Any other Social Science or Arts subject",
        ],
        jambScore: {
          minimum: 150,
          competitive: 190,
          note: "This is a highly competitive course. Top-tier universities require very high JAMB and Post-UTME scores.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in relevant subjects including Economics and Mathematics or Statistics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Accounting, Business Administration, Banking and Finance, or Statistics with Lower Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE with Economics as a major subject and good grades.",
          },
          {
            type: "First Degree",
            requirements:
              "A good first degree (minimum of Second Class Lower) in a quantitative field for postgraduate entry.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements. A strong aptitude for mathematics and statistics is critical.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Participation in a typically rigorous Post-UTME screening focused on Mathematics and Economics.",
        "Some universities may require an interview for Direct Entry candidates.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //ICT
  {
    id: "bsc-information-communication-technology",
    programCode: "ICT205",
    title: "BSc (Hons) Information & Communication Technology",
    slug: "/programs/bsc-information-communication-technology",
    tagline:
      "Bridge the Digital Divide. Engineer the Future of Business and Society.",
    overview: {
      description:
        "Our ICT program blends the theoretical foundations of computing with the practical skills needed to design, implement, and manage modern information systems. You will gain expertise in networking, software development, database management, and cybersecurity, preparing you to be the crucial link between business needs and technological solutions.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "ICT professionals are the backbone of the digital transformation sweeping every industry. They don't just fix computers; they architect the cloud networks that businesses run on, develop the apps we use daily, secure sensitive data from cyber threats, and analyze big data to drive strategic decisions. In Nigeria's rapidly growing tech ecosystem, ICT graduates are the engine of innovation, enabling efficiency, creating new business models, and connecting communities.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Funmi Adeyemi",
      title: "Professor of Network Systems & Cybersecurity",
      imageUrl: "/images/staff/dr-funmi-adeyemi.jpg",
      bio: "A Cisco Certified Internetwork Expert (CCIE) and founder of a tech startup, Dr. Adeyemi is a renowned expert in network infrastructure and secure software development. She consults for major banks on their cybersecurity frameworks.",
      email: "f.adeyemi@sauni.edu.ng",
      message:
        "Technology is a tool for solving human problems. Our ICT program is designed to create 'hybrid' professionals—those with deep technical knowledge and the business acumen to apply it effectively. We are building the next generation of tech leaders for Africa.",
    },
    whyThisProgram: [
      "Get hands-on access to our Cisco Networking Academy, AWS Academy, and Microsoft Learn labs for industry-recognized training and certifications.",
      "Work on real-world projects through our Tech Innovation Hub, partnering with local startups and NGOs.",
      "Specialize in high-demand areas like Cybersecurity, Data Science, or Software Engineering through dedicated course tracks.",
      "Be taught by faculty who are active industry consultants, ensuring curriculum relevance to the latest tech trends.",
    ],
    keyTopics: [
      "Programming & Software Development (Python, Java, Web Tech)",
      "Computer Networking & Cloud Computing",
      "Database Design & Management (SQL, NoSQL)",
      "Cybersecurity Principles & Ethical Hacking",
      "Systems Analysis & Design",
      "Data Analytics & Visualization",
    ],
    programBreakdown: {
      coreCourses: 65,
      electives: 25,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Computing Fundamentals",
        semesters: {
          first: [
            "Introduction to Programming",
            "Computer Hardware & Architecture",
            "Introduction to Databases",
            "Calculus",
            "Communication Skills",
          ],
          second: [
            "Object-Oriented Programming",
            "Digital Logic Design",
            "Web Design & Development",
            "Discrete Mathematics",
            "Statistics for Computing",
          ],
        },
      },
      {
        year: 2,
        theme: "Core ICT Systems",
        semesters: {
          first: [
            "Data Structures & Algorithms",
            "Computer Networks",
            "Systems Analysis & Design",
            "Operating Systems",
            "Entrepreneurship",
          ],
          second: [
            "Software Engineering",
            "Database Management Systems",
            "Network Security",
            "Human-Computer Interaction",
            "Research Methods",
          ],
        },
      },
      {
        year: 3,
        theme: "Advanced Applications",
        semesters: {
          first: [
            "Web Application Development",
            "Mobile Computing",
            "Cloud Computing",
            "Elective I (e.g., AI Fundamentals)",
            "Elective II (e.g., UI/UX Design)",
          ],
          second: [
            "Cybersecurity",
            "Data Science Fundamentals",
            "IT Project Management",
            "Elective III",
            "SIWES (Internship)",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Capstone",
        semesters: {
          first: [
            "Project I",
            "Enterprise Architecture",
            "Elective IV",
            "Elective V",
            "IT Law & Ethics",
          ],
          second: [
            "Project II (Thesis)",
            "Emerging Technologies",
            "Elective VI",
            "Elective VII",
            "Professional Practice",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "David Ojukwu",
        position: "Co-Founder & CTO, PayVantage",
        graduationYear: 2018,
        imageUrl: "/images/alumni/david-ojukwu.jpg",
        testimonial:
          "The SAU ICT program gave me the full stack of skills—from backend database design to frontend UX—that I needed to build a fintech product from the ground up. The innovation hub was our first office.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/sau-ict-overview",
    careerPaths: [
      {
        title: "Software Developer/Engineer",
        sectors: ["FinTech", "E-commerce", "Telecoms", "Software Houses"],
      },
      {
        title: "Network/Systems Administrator",
        sectors: [
          "All Industries (Banks, Oil & Gas, Education)",
          "Internet Service Providers",
        ],
      },
      {
        title: "IT Business Analyst",
        sectors: ["Consulting Firms", "Banking", "Multinational Corporations"],
      },
      {
        title: "Cybersecurity Analyst",
        sectors: [
          "Cybersecurity Firms",
          "Financial Institutions",
          "Government Agencies",
        ],
      },
      {
        title: "Data Analyst",
        sectors: [
          "Marketing Agencies",
          "Research Firms",
          "Healthcare",
          "Telecoms",
        ],
      },
    ],
    learningOutcomes: [
      "Design, develop, and deploy secure software applications and web services using modern programming languages and frameworks.",
      "Design, configure, and troubleshoot local and cloud-based computer networks.",
      "Model, implement, and manage relational and non-relational databases to support business applications.",
      "Identify vulnerabilities in IT systems and implement appropriate cybersecurity countermeasures.",
      "Manage the full lifecycle of an IT project, from requirement gathering to deployment and maintenance.",
    ],
    interestingFacts: [
      "The concept of a 'bug' in programming originated in 1947 when a real moth was found stuck in a relay of the Harvard Mark II computer, causing a malfunction.",
      "Data is the new oil. It's estimated that over 90% of the world's data was created in the last two years alone.",
      "The global cybersecurity skills gap means there are millions of unfilled jobs, making it one of the most secure and high-demand career paths in tech.",
    ],
    accreditation: [
      "National Universities Commission (NUC)",
      "Computer Professionals Registration Council of Nigeria (CPN)",
    ],
    testPreparation:
      "This program integrates preparation for industry certifications from Cisco (CCNA), Microsoft (Azure Fundamentals), AWS (Cloud Practitioner), and CompTIA (Security+).",
    facilities: [
      "Cisco Networking Lab with physical routers and switches for real-world configuration.",
      "Software Development Lab with high-performance computers and multiple OS environments.",
      "Cyber Range for simulating cyber-attacks and defense exercises.",
      "Tech Innovation Hub with meeting spaces and prototyping equipment.",
    ],
    industryConnections: {
      partners: [
        "Microsoft Nigeria",
        "Cisco Nigeria",
        "Andela",
        "Flutterwave",
        "NITDA",
      ],
      initiatives: [
        "Annual Hackathon",
        "Tech Career Fair",
        "Startup Incubation Program",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Women in Tech Scholarship",
        description:
          "Aimed at increasing female participation in the tech industry, awarded based on merit and a personal statement.",
      },
    ],
    contactInfo: {
      department: "Department of Information & Communication Technology",
      email: "ict@sauni.edu.ng",
      phone: "+234 902 345 6789",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Further Mathematics or Biology or Economics",
          ],
          notes:
            "Five (5) O'Level credit passes in Science subjects at not more than two sittings. Credit in Mathematics and Physics is mandatory.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Physics",
          "Chemistry or Biology or Economics",
        ],
        jambScore: {
          minimum: 150,
          competitive: 180,
          note: "Practical technical skills and programming knowledge are highly valued alongside the score.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in Science subjects including Mathematics and Physics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Computer Science, Electrical/Electronic Engineering, or any IT-related field with Upper Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Computer Science/Mathematics or Physics/Mathematics with good grades.",
          },
          {
            type: "Certifications",
            requirements:
              "Relevant professional certifications (e.g., A+, CCNA) may be considered as an advantage but not usually as a direct entry qualification on their own.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements. Demonstrable programming or networking skills are a major plus.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Participation in Post-UTME screening, which may include a practical computer-based test.",
        "Logical reasoning and problem-solving aptitude are key for success.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Microbiology
  {
    id: "bsc-microbiology",
    programCode: "MCB307",
    title: "BSc (Hons) Microbiology",
    slug: "/programs/bsc-microbiology",
    tagline:
      "Explore the Unseen Universe. Solve Global Challenges in Health, Food, and the Environment.",
    overview: {
      description:
        "This program delves into the fascinating world of bacteria, viruses, fungi, and parasites. You will study their biology, ecology, and genetics, and learn how to harness beneficial microbes and combat pathogenic ones in fields ranging from medicine and pharmaceuticals to agriculture and environmental protection.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Microbiologists are on the front lines of humanity's biggest challenges. They develop antibiotics and vaccines to fight infectious diseases, create quality control protocols to ensure our food and water are safe, engineer microbes to clean up oil spills and pollution, and manipulate microorganisms to produce life-saving drugs like insulin. The COVID-19 pandemic highlighted the critical, life-saving role of microbiologists in tracking, understanding, and stopping the spread of pathogens.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Prof. Aisha Mohammed",
      title: "Professor of Molecular Microbiology & Infectious Diseases",
      imageUrl: "/images/staff/prof-aisha-mohammed.jpg",
      bio: "A leading researcher in antimicrobial resistance (AMR), Prof. Mohammed leads a team that surveils resistant pathogens in Nigerian hospitals. She has collaborated with the Nigeria Centre for Disease Control (NCDC) on several public health initiatives.",
      email: "a.mohammed@sauni.edu.ng",
      message:
        "Microbes run the world. They are the oldest, most diverse, and most powerful life forms on Earth. In this program, you will learn to speak their language, unlocking solutions to diseases, industrial problems, and environmental crises. Your work here will have a tangible impact on human health and well-being.",
    },
    whyThisProgram: [
      "Gain extensive hands-on experience in our BSL-2 containment lab, molecular biology lab, and fermentation suite.",
      "Participate in groundbreaking undergraduate research projects on topics from antibiotic discovery to biofuel production.",
      "Benefit from our strong ties to the Nigerian Institute of Medical Research (NIMR) and leading pharmaceutical companies for internships.",
      "Focus on specialized fields like Medical Microbiology, Environmental Microbiology, or Industrial Microbiology.",
    ],
    keyTopics: [
      "General & Agricultural Microbiology",
      "Medical Microbiology & Immunology",
      "Microbial Genetics & Molecular Biology",
      "Virology",
      "Food & Dairy Microbiology",
      "Environmental Microbiology & Bioremediation",
    ],
    programBreakdown: {
      coreCourses: 75,
      electives: 15,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Biological Foundations",
        semesters: {
          first: [
            "Introductory Biology I",
            "General Chemistry I",
            "Basic Physics",
            "Introduction to Microbiology",
            "Use of English",
          ],
          second: [
            "Introductory Biology II",
            "General Chemistry II",
            "Organic Chemistry I",
            "Statistics for Biological Sciences",
            "Communication Skills",
          ],
        },
      },
      {
        year: 2,
        theme: "Core Microbiology",
        semesters: {
          first: [
            "General Microbiology",
            "Biochemistry I",
            "Cell Biology",
            "Microbial Physiology",
            "Mathematics for Life Sciences",
          ],
          second: [
            "Microbial Diversity",
            "Biochemistry II",
            "Genetics",
            "Introduction to Immunology",
            "Research Methods",
          ],
        },
      },
      {
        year: 3,
        theme: "Applied Microbiology",
        semesters: {
          first: [
            "Medical Microbiology",
            "Virology",
            "Microbial Genetics",
            "Elective I (e.g., Parasitology)",
            "Elective II (e.g., Mycology)",
          ],
          second: [
            "Food Microbiology",
            "Environmental Microbiology",
            "Pharmacology & Toxicology",
            "Elective III",
            "SIWES (Internship)",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Research",
        semesters: {
          first: [
            "Project I",
            "Industrial Microbiology",
            "Molecular Biology",
            "Elective IV (e.g., Epidemiology)",
            "Elective V (e.g., Bioinformatics)",
          ],
          second: [
            "Project II (Thesis)",
            "Public Health Microbiology",
            "Biostatistics",
            "Elective VI",
            "Seminar",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Dr. Ifeanyi Okonkwo",
        position: "Lead Quality Control Microbiologist, Fidson Healthcare PLC",
        graduationYear: 2013,
        imageUrl: "/images/alumni/ifeanyi-okonkwo.jpg",
        testimonial:
          "The rigorous practical training in aseptic techniques and quality assurance protocols at SAU meant I was immediately valuable in the pharmaceutical manufacturing environment. They teach you the standards the industry demands.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/sau-microbiology-overview",
    careerPaths: [
      {
        title: "Medical Microbiologist",
        sectors: [
          "Hospitals",
          "Public Health Labs (NCDC)",
          "Research Institutes (NIMR)",
        ],
      },
      {
        title: "Quality Control/Assurance Officer",
        sectors: [
          "Pharmaceutical Industry",
          "Food & Beverage Industry",
          "Water Treatment Companies",
        ],
      },
      {
        title: "Research Scientist",
        sectors: [
          "University Academia",
          "Agricultural Research Institutes",
          "Biotech Startups",
        ],
      },
      {
        title: "Sales & Technical Representative",
        sectors: ["Pharmaceutical Companies", "Laboratory Equipment Suppliers"],
      },
      {
        title: "Environmental Microbiologist",
        sectors: [
          "Oil & Gas Companies (Bioremediation)",
          "Environmental Consultancy Firms",
          "Waste Management Agencies",
        ],
      },
    ],
    learningOutcomes: [
      "Isolate, culture, and identify unknown microorganisms using classical and molecular techniques.",
      "Explain the pathogenesis of major infectious diseases and the principles of immunological defense.",
      "Apply microbiological principles to solve problems in food safety, water quality, and pharmaceutical production.",
      "Design and execute experiments to test hypotheses about microbial function and interaction.",
      "Critically evaluate scientific literature and effectively communicate microbiological concepts and research findings.",
    ],
    interestingFacts: [
      "There are more bacterial cells in your body than human cells, and this microbiome is essential for your health, digestion, and immune system.",
      "Less than 1% of all microbes are pathogenic (disease-causing); the vast majority are beneficial or essential for life on Earth, driving chemical cycles like decomposition and nitrogen fixation.",
      "Some of the most powerful tools in molecular biology and biotechnology, like CRISPR gene editing, were discovered in and are derived from microbial defense systems.",
    ],
    accreditation: [
      "National Universities Commission (NUC)",
      "Institute of Medical Laboratory Science Council of Nigeria (IMLSCN) - for relevant modules",
    ],
    testPreparation:
      "This program provides excellent preparation for licensure with the Institute of Medical Laboratory Science Council of Nigeria (IMLSCN) and for postgraduate studies in Medicine, Public Health, and Research (MSc, PhD).",
    facilities: [
      "Containment Level (BSL-2) Laboratory for working with moderate-risk pathogens.",
      "Molecular Biology Lab with PCR machines, gel electrophoresis, and other equipment for genetic analysis.",
      "Fermentation Technology Lab with bioreactors for industrial microbiology applications.",
      "Microbial Culture Collection with a wide range of reference strains.",
    ],
    industryConnections: {
      partners: [
        "Nigerian Institute of Medical Research (NIMR)",
        "NCDC",
        "Fidson Healthcare",
        "Nestle Nigeria",
        "NLNG",
      ],
      initiatives: [
        "Annual Public Health Symposium",
        "Industrial Placement Program",
        "Joint Research Projects with NIMR",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "NIMR Research Scholarship",
        description:
          "For final-year students demonstrating exceptional research potential in medical microbiology or virology.",
      },
    ],
    contactInfo: {
      department: "Department of Microbiology",
      email: "microbiology@sauni.edu.ng",
      phone: "+234 903 456 7890",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Chemistry",
            "Physics",
            "Biology",
          ],
          notes:
            "Five (5) O'Level credit passes in Science subjects at not more than two sittings. Credit in Biology and Chemistry is absolutely mandatory.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Biology",
          "Chemistry",
          "Physics or Mathematics",
        ],
        jambScore: {
          minimum: 150,
          competitive: 200,
          note: "This is a very competitive course in the sciences. Top universities require high JAMB and Post-UTME scores, especially in Biology and Chemistry.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in Biology, Chemistry, or Physics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Science Technology (Microbiology, Biochemistry, Food Technology) or related fields with Upper Credit or higher.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Biology/Chemistry or Agricultural Science with good grades.",
          },
          {
            type: "First Degree",
            requirements:
              "A good first degree (minimum of Second Class Lower) in a related Biological Science for postgraduate entry.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements. A strong foundation in practical laboratory skills is advantageous.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice in JAMB registration.",
        "Participation in Post-UTME screening, which often tests knowledge in Biology and Chemistry.",
        "Candidates must have a keen interest in laboratory work and scientific research.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Physics with Electronics
  {
    id: "bsc-physics-electronics",
    programCode: "PHY104",
    title: "BSc (Hons) Physics with Electronics",
    slug: "/programs/bsc-physics-electronics",
    tagline:
      "Probe the Fundamentals of the Universe. Engineer the Technology of Tomorrow.",
    overview: {
      description:
        "This program offers a unique fusion of deep theoretical physics and applied electronics engineering. You will explore the principles governing matter and energy, from quantum mechanics to electromagnetism, while gaining hands-on skills in circuit design, microcontroller programming, and signal processing. This powerful combination prepares you to innovate at the intersection of scientific discovery and technological development.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Physicists with electronics expertise are the innovators behind modern technology. They design the sensors that make autonomous vehicles see, the microchips that power every computing device, the medical imaging equipment that saves lives, and the communication systems that connect the globe. They solve complex problems by applying fundamental physical principles to create tangible, cutting-edge solutions that drive progress in nearly every industry, from renewable energy to telecommunications.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Ibrahim Chukwu",
      title: "Professor of Solid-State Physics",
      imageUrl: "/images/faculty/dr-ibrahim-chukwu.jpg",
      bio: "Dr. Chukwu's research focuses on semiconductor materials for next-generation solar cells. He has collaborated with tech firms across Europe and Africa and holds several patents in photovoltaic device design.",
      email: "i.chukwu@sauni.edu.ng",
      message:
        "This program is for those who are not just satisfied with understanding how the world works, but are driven to build devices that change it. We bridge the gap between abstract theory and practical, world-changing engineering.",
    },
    whyThisProgram: [
      "Gain extensive hands-on experience in our advanced physics and electronics labs, equipped with oscilloscopes, signal generators, and FPGA development boards.",
      "Work on real-world projects sponsored by our industry partners, such as designing IoT sensors for agricultural monitoring.",
      "Option to undertake a final-year research project in our dedicated Solid-State Physics or Applied Optics research groups.",
      "Curriculum is designed to align with the requirements of the Institute of Physics (IOP) and IEEE.",
    ],
    keyTopics: [
      "Classical Mechanics & Thermodynamics",
      "Quantum Mechanics & Semiconductor Physics",
      "Electromagnetism & Wave Theory",
      "Analog & Digital Circuit Design",
      "Microcontroller Programming & Embedded Systems",
      "Signal Processing & Communications",
    ],
    programBreakdown: {
      coreCourses: 75,
      electives: 15,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Foundations",
        semesters: {
          first: [
            "Introductory Mechanics",
            "Electricity & Magnetism",
            "Calculus I",
            "General Chemistry I",
            "Use of English",
          ],
          second: [
            "Waves & Optics",
            "Thermal Physics",
            "Calculus II",
            "Basic Electronics I",
            "Programming for Scientists (Python)",
          ],
        },
      },
      {
        year: 2,
        theme: "Core Principles",
        semesters: {
          first: [
            "Mathematical Methods I",
            "Modern Physics",
            "Analog Electronics",
            "Digital Electronics I",
            "Vector Analysis",
          ],
          second: [
            "Mathematical Methods II",
            "Electromagnetic Theory",
            "Circuit Theory & Analysis",
            "Digital Electronics II",
            "Microprocessors",
          ],
        },
      },
      {
        year: 3,
        theme: "Advanced Theory & Application",
        semesters: {
          first: [
            "Quantum Mechanics I",
            "Signals & Systems",
            "Electronic Instrumentation",
            "Elective I (e.g., Solid State Physics)",
            "Numerical Methods",
          ],
          second: [
            "Quantum Mechanics II",
            "Communication Systems",
            "Control Systems",
            "Elective II (e.g., Applied Optics)",
            "Research Methodology",
          ],
        },
      },
      {
        year: 4,
        theme: "Specialization & Capstone",
        semesters: {
          first: [
            "Project I",
            "Embedded Systems Design",
            "Elective III",
            "Elective IV",
            "Seminar",
          ],
          second: [
            "Project II",
            "VLSI Design",
            "Elective V",
            "Professional Ethics",
            "Industrial Attachment",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Ngozi Eze",
        position: "Hardware Engineer, Samsung R&D Institute",
        graduationYear: 2017,
        imageUrl: "/images/alumni/ngozi-eze.jpg",
        testimonial:
          "The strong foundation in both physics and practical electronics from SAU set me apart. I was designing and testing circuits in my first job while others were still learning the basics.",
      },
      {
        name: "Tunde Okeowo",
        position: "Co-Founder, 'SunSpark' Solar Tech",
        graduationYear: 2014,
        imageUrl: "/images/alumni/tunde-okeowo.jpg",
        testimonial:
          "My final year project on improving solar cell efficiency became the prototype for our company's first product. The program teaches you to turn theory into viable technology.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_PHYSICS_ELECTRONICS",
    careerPaths: [
      {
        title: "Electronics Design Engineer",
        sectors: [
          "Consumer Electronics",
          "Telecommunications",
          "Automotive",
          "Aerospace",
        ],
      },
      {
        title: "Research Scientist",
        sectors: [
          "National Research Institutes",
          "University Labs",
          "R&D Departments",
          "Renewable Energy",
        ],
      },
      {
        title: "Medical Physicist",
        sectors: [
          "Hospitals",
          "Medical Equipment Manufacturers",
          "Research Labs",
        ],
      },
      {
        title: "Systems Engineer",
        sectors: [
          "Defense",
          "IoT Companies",
          "Industrial Automation",
          "Network Infrastructure",
        ],
      },
      {
        title: "Academia & Lecturer",
        sectors: ["Universities", "Polytechnics", "Technical Colleges"],
      },
    ],
    learningOutcomes: [
      "Apply the principles of quantum mechanics and electromagnetism to analyze and solve complex physical problems.",
      "Design, simulate, build, and test analog and digital electronic circuits to meet specific functional requirements.",
      "Program microcontrollers and develop embedded systems for applications in automation, sensing, and control.",
      "Utilize advanced laboratory equipment to conduct experiments, collect data, and analyze results with a high degree of precision.",
      "Communicate complex technical concepts effectively, both in writing and orally, to specialist and non-specialist audiences.",
    ],
    interestingFacts: [
      "The transistor, the building block of all modern electronics, was invented by physicists at Bell Labs in 1947, revolutionizing the world.",
      "Quantum tunneling, a phenomenon where particles pass through barriers, is not just a theory—it's essential for the flash memory in your USB drives and smartphones.",
      "Physics principles are used in finance ('econophysics') to model stock market behavior and manage risk in complex investments.",
    ],
    accreditation: [
      "Nigerian University Commission (NUC)",
      "Institute of Physics (IOP, UK)",
    ],
    testPreparation:
      "This program provides a strong foundation for professional certifications and further chartered status with the Institute of Physics (IOP) and the IEEE.",
    facilities: [
      "Advanced Physics Laboratory with optical benches, vacuum systems, and cryogenic equipment.",
      "Digital Electronics Lab with FPGA and CPLD development stations, logic analyzers, and soldering stations.",
      "Dedicated project lab for final-year students with 3D printers and PCB milling machines.",
    ],
    industryConnections: {
      partners: [
        "Samsung Engineering Nigeria",
        "MTN Nigeria",
        "National Agency for Science and Engineering Infrastructure (NASENI)",
        "Intel West Africa",
      ],
      initiatives: [
        "Annual Tech Innovation Challenge",
        "Industry Sponsored Final Year Projects",
        "IEEE Student Chapter Workshops",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Future Innovator Scholarship",
        description:
          "Awarded to students with a demonstrable passion for building and inventing, as shown through personal projects or science fairs.",
      },
    ],
    contactInfo: {
      department: "Department of Physics & Electronics",
      email: "physics.electronics@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Further Mathematics, Biology, or Geography",
          ],
          notes:
            "Five (5) SSCE credit passes in the required subjects at not more than two sittings. Physics and Mathematics are core. A credit in Further Mathematics is a strong advantage.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Physics",
          "Mathematics",
          "Chemistry",
        ],
        jambScore: {
          minimum: 150,
          competitive: 180,
          note: "Top-tier universities often require scores of 200 and above for this competitive course.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements: "Two A-Level passes in Physics and Mathematics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Electrical/Electronic Engineering, Physics, or related disciplines with at least a Lower Credit.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in Physics/Mathematics or Physics/Computer with good grades.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Physics/Mathematics/Electronics with required points.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice.",
        "Candidates may be required to present a testimonial of good conduct.",
        "Mandatory participation in the university's Post-UTME screening, which may include a practical physics test.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Computer Science
  {
    id: "bsc-computer-science",
    programCode: "CSC105",
    title: "BSc (Hons) Computer Science",
    slug: "/programs/bsc-computer-science",
    tagline: "Master the Theory. Build the Future. Code Your Career.",
    overview: {
      description:
        "Our BSc Computer Science program provides a deep and comprehensive foundation in the fundamental principles of computing. You will master the art of algorithmic thinking, software development, data structures, and system design. This rigorous program prepares you not just to use technology, but to understand its core principles and create the innovative software solutions that will define the next decade.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Computer scientists are the architects of the digital age. They write the algorithms that power search engines and social media, develop the operating systems that run billions of devices, create the databases that manage global information, and pioneer the fields of artificial intelligence and machine learning. In an increasingly digital world, their skills are critical for solving complex problems in every sector, from healthcare and finance to entertainment and environmental science, making them among the most sought-after professionals globally.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Funmi Adeyemi",
      title: "Professor of Artificial Intelligence",
      imageUrl: "/images/faculty/dr-funmi-adeyemi.jpg",
      bio: "Dr. Adeyemi is a leading researcher in Natural Language Processing (NLP) for African dialects. She leads SAU's AI Research Lab and has served as an advisor to tech startups across the continent.",
      email: "f.adeyemi@sauni.edu.ng",
      message:
        "Computer Science is more than just programming; it's a new way of thinking. We teach you how to decompose complex problems, design efficient solutions, and continuously adapt to the relentless pace of technological change. Welcome to the engine room of innovation.",
    },
    whyThisProgram: [
      "Choose from specializations in AI & Machine Learning, Data Science, or Cloud Computing in your final year.",
      "Build a robust portfolio through numerous individual and team-based projects, culminating in a capstone project solved for a real client.",
      "Learn in our state-of-the-art computing labs with high-performance machines and dedicated servers for big data and cloud computing exercises.",
      "Get career-ready with our intensive preparation for technical interviews and coding assessments used by top tech firms.",
    ],
    keyTopics: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming & Software Engineering",
      "Database Management Systems",
      "Computer Architecture & Operating Systems",
      "Networks & Cybersecurity Fundamentals",
      "Artificial Intelligence & Machine Learning",
    ],
    programBreakdown: {
      coreCourses: 70,
      electives: 20,
      projectsInternships: 10,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Programming Foundations",
        semesters: {
          first: [
            "Introduction to Programming (Python)",
            "Discrete Mathematics",
            "Introduction to Computer Science",
            "Calculus I",
            "Use of English",
          ],
          second: [
            "Object-Oriented Programming (Java)",
            "Digital Logic Design",
            "Web Technologies (HTML, CSS)",
            "Statistics for CS",
            "Communication Skills",
          ],
        },
      },
      {
        year: 2,
        theme: "Core CS Principles",
        semesters: {
          first: [
            "Data Structures & Algorithms",
            "Computer Architecture",
            "Database Systems I",
            "Systems Programming (C/C++)",
            "Linear Algebra",
          ],
          second: [
            "Advanced Algorithms",
            "Operating Systems",
            "Database Systems II",
            "Software Engineering I",
            "Computer Networks",
          ],
        },
      },
      {
        year: 3,
        theme: "Advanced Topics & Specialization",
        semesters: {
          first: [
            "Theory of Computation",
            "Software Engineering II",
            "Web Application Development",
            "Elective I (e.g., Intro to AI)",
            "Research Methodology",
          ],
          second: [
            "Compiler Construction",
            "Human-Computer Interaction",
            "Mobile App Development",
            "Elective II (e.g., Data Mining)",
            "Entrepreneurship",
          ],
        },
      },
      {
        year: 4,
        theme: "Capstone & Professional Prep",
        semesters: {
          first: [
            "Capstone Project I",
            "Distributed Systems",
            "Track Elective I",
            "Track Elective II",
            "Professional Ethics",
          ],
          second: [
            "Capstone Project II",
            "Information Security",
            "Track Elective III",
            "Industrial Attachment",
            "Seminar",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "David Olamide",
        position: "Software Engineer, Google (USA)",
        graduationYear: 2018,
        imageUrl: "/images/alumni/david-olamide.jpg",
        testimonial:
          "The intense focus on algorithms and data structures at SAU was the single biggest factor in passing my Google interviews. The problem-solving approach is world-class.",
      },
      {
        name: "Chiamaka Nwosu",
        position: "CTO & Co-Founder, 'FarmSmart' Agritech",
        graduationYear: 2016,
        imageUrl: "/images/alumni/chiamaka-nwosu.jpg",
        testimonial:
          "My capstone project evolved into a startup that now helps thousands of farmers. The program gives you the technical depth and confidence to build scalable, real-world systems.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_COMPUTER_SCIENCE",
    careerPaths: [
      {
        title: "Software Engineer/Developer",
        sectors: [
          "Tech Giants (FAANG)",
          "Fintech",
          "E-Commerce",
          "Gaming",
          "Startups",
        ],
      },
      {
        title: "Data Scientist",
        sectors: [
          "Healthcare",
          "Finance",
          "Marketing",
          "Research",
          "Consulting",
        ],
      },
      {
        title: "Systems Analyst/Architect",
        sectors: [
          "Enterprise Software",
          "Banking",
          "Telecommunications",
          "Government",
        ],
      },
      {
        title: "AI/ML Engineer",
        sectors: [
          "AI Research Labs",
          "Automotive (Self-driving)",
          "Robotics",
          "Natural Language Processing",
        ],
      },
      {
        title: "Academic Researcher",
        sectors: [
          "Universities",
          "Industrial R&D Labs",
          "Public Research Institutions",
        ],
      },
    ],
    learningOutcomes: [
      "Design, implement, and analyze efficient algorithms and data structures to solve complex computational problems.",
      "Develop robust, scalable, and secure software applications using modern programming languages and software engineering methodologies.",
      "Design and manage relational and non-relational databases to store, retrieve, and manipulate data effectively.",
      "Explain the function of computer system components, from hardware architecture to operating system principles.",
      "Apply principles of artificial intelligence and machine learning to develop intelligent systems and analyze large datasets.",
    ],
    interestingFacts: [
      "The first computer programmer was a woman, Ada Lovelace, who wrote an algorithm for Charles Babbage's Analytical Engine in the 1840s.",
      "There are over 700 programming languages in existence, but most professional software is built using fewer than 20.",
      "The concept of 'debugging' came from Admiral Grace Hopper, who literally removed a moth from a computer in 1947.",
    ],
    accreditation: [
      "Nigerian University Commission (NUC)",
      "Computer Professionals Registration Council of Nigeria (CPN)",
    ],
    testPreparation:
      "The curriculum is designed to provide a strong foundation for technical interviews and certifications from vendors like AWS, Microsoft Azure, and Oracle.",
    facilities: [
      "High-Performance Computing Lab with dedicated servers for parallel computing and big data projects.",
      "Collaborative Software Development Studio with agile project management tools and large monitors.",
      "Cisco Networking Lab for practical networking and security exercises.",
    ],
    industryConnections: {
      partners: [
        "Google",
        "Microsoft Nigeria",
        "Interswitch",
        "Andela",
        "Flutterwave",
      ],
      initiatives: [
        "Annual Hackathon",
        "Tech Career Fair",
        "Guest Lectures from Silicon Valley Engineers",
        "Open Source Project Contributions",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Women in Tech Scholarship",
        description:
          "Aimed at increasing female participation in computing, awarded to top-performing female applicants in the program.",
      },
      {
        name: "Code Ninja Bursary",
        description:
          "For students who demonstrate exceptional coding skills through an entrance challenge or prior project portfolio.",
      },
    ],
    contactInfo: {
      department: "Department of Computer Science",
      email: "compsci@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Further Mathematics, Biology, or Economics",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. Mathematics and Physics are absolutely essential. A credit in Further Mathematics is a significant advantage.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Physics",
          "Chemistry, Economics, or Biology",
        ],
        jambScore: {
          minimum: 150,
          competitive: 200,
          note: "Computer Science is highly competitive. Top universities (federal and state) often have cut-offs of 220 and above.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements: "Two A-Level passes in Mathematics and Physics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Computer Science, Data Processing, or Electrical/Electronic Engineering with a minimum of Lower Credit.",
          },
          {
            type: "HND",
            requirements:
              "HND in a relevant field for admission into 200 or 300 level.",
          },
          {
            type: "NCE",
            requirements: "NCE in Computer Science, Mathematics, or Physics.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Science/Engineering with required points.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice.",
        "Strong analytical and problem-solving skills are highly valued.",
        "Mandatory participation in Post-UTME screening, which is often a computer-based test with a focus on logic and quantitative reasoning.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Software Engineering
  {
    id: "bsc-software-engineering",
    programCode: "SWE106",
    title: "BSc (Hons) Software Engineering",
    slug: "/programs/bsc-software-engineering",
    tagline: "Engineer Quality. Build at Scale. Lead Agile Teams.",
    overview: {
      description:
        "This program focuses on the systematic application of engineering principles to the design, development, testing, deployment, and maintenance of large-scale, reliable software systems. You will master the entire software development lifecycle (SDLC), agile methodologies, DevOps practices, and team collaboration tools to become a professional engineer who delivers robust, user-centric software solutions on time and within budget.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Software engineers are the master builders of the digital world. While computer scientists discover new algorithms, software engineers apply proven engineering principles to construct reliable, safe, and scalable systems. They are responsible for the mission-critical software that runs banks, hospitals, power grids, and transportation networks. Their disciplined approach to requirements analysis, design patterns, testing, and project management ensures that software does not just work, but is secure, efficient, maintainable, and meets the precise needs of users and businesses.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Segun Adebayo",
      title: "Professor of Software Systems",
      imageUrl: "/images/faculty/dr-segun-adebayo.jpg",
      bio: "Dr. Adebayo is a certified Scrum Master and DevOps expert who spent a decade in the industry leading engineering teams at major fintech companies before moving to academia.",
      email: "s.adebayo@sauni.edu.ng",
      message:
        "We don't just teach you how to code; we teach you how to engineer software. This means understanding the entire process, from gathering user stories and designing architecture to writing tests that ensure quality and deploying with confidence. It's about building software the right way.",
    },
    whyThisProgram: [
      "Experience a simulated industry environment through our 'Software Factory,' where student teams work on projects for real clients under deadline pressure.",
      "Become proficient in the industry-standard tools of the trade: Git, Docker, Kubernetes, Jenkins, and Jira.",
      "Learn Agile, Scrum, and DevOps methodologies directly from certified practitioners and apply them in team projects every semester.",
      "Focus on building a portfolio of not just code, but full-stack, deployed applications with proper documentation and test suites.",
    ],
    keyTopics: [
      "Software Requirements Engineering",
      "Software Design Patterns & Architecture",
      "Agile Methodologies & Project Management",
      "Software Testing, Verification & Validation",
      "DevOps & Continuous Integration/Deployment (CI/CD)",
      "User Experience (UX) Design Principles",
    ],
    programBreakdown: {
      coreCourses: 65,
      electives: 15,
      projectsInternships: 20,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Programming & Fundamentals",
        semesters: {
          first: [
            "Programming Fundamentals I",
            "Discrete Structures",
            "Introduction to Software Engineering",
            "Web Development Basics",
            "Communication Skills",
          ],
          second: [
            "Programming Fundamentals II",
            "Data Structures",
            "Database Fundamentals",
            "Object-Oriented Design",
            "Introduction to Linux",
          ],
        },
      },
      {
        year: 2,
        theme: "Engineering Principles",
        semesters: {
          first: [
            "Algorithms & Complexity",
            "Software Requirements Engineering",
            "Human-Computer Interaction",
            "Computer Networks",
            "Statistics for Engineers",
          ],
          second: [
            "Software Design & Architecture",
            "Software Construction",
            "Software Testing & QA",
            "Team Project I",
            "Professional Practice",
          ],
        },
      },
      {
        year: 3,
        theme: "Process & Management",
        semesters: {
          first: [
            "Agile Software Development",
            "Web API Development",
            "Elective I (e.g., Mobile Dev)",
            "Team Project II",
            "Research Methods",
          ],
          second: [
            "Software Project Management",
            "DevOps Practices",
            "Elective II (e.g., Cloud Native)",
            "Security Engineering",
            "Entrepreneurship",
          ],
        },
      },
      {
        year: 4,
        theme: "Capstone & Specialization",
        semesters: {
          first: [
            "Enterprise Software Architecture",
            "Capstone Project I",
            "Track Elective I",
            "Track Elective II",
            "Legal & Ethical Issues",
          ],
          second: [
            "Software Maintenance & Evolution",
            "Capstone Project II",
            "Industrial Internship (6 months)",
            "Seminar",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Bola Ahmed",
        position: "Senior DevOps Engineer, Paystack",
        graduationYear: 2019,
        imageUrl: "/images/alumni/bola-ahmed.jpg",
        testimonial:
          "The 'Software Factory' was my bootcamp for the real world. I was already proficient with Docker and CI/CD pipelines before my first job interview, which gave me a huge advantage.",
      },
      {
        name: "Ifeoma Okoro",
        position: "Product Manager, Microsoft",
        graduationYear: 2017,
        imageUrl: "/images/alumni/ifeoma-okoro.jpg",
        testimonial:
          "Understanding the engineering process from end-to-end allowed me to transition seamlessly from developer to product manager. I can communicate effectively with both engineers and stakeholders.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_SOFTWARE_ENG",
    careerPaths: [
      {
        title: "Software Engineer",
        sectors: [
          "SaaS Companies",
          "Enterprise Software",
          "Fintech",
          "E-Commerce",
        ],
      },
      {
        title: "DevOps Engineer",
        sectors: [
          "Cloud Providers (AWS, Azure, GCP)",
          "Tech Companies",
          "Banking",
          "Any organization with CI/CD needs",
        ],
      },
      {
        title: "Quality Assurance (QA) Engineer",
        sectors: [
          "Gaming",
          "Medical Software",
          "Automotive Software",
          "All software development teams",
        ],
      },
      {
        title: "Software Architect",
        sectors: [
          "Large-scale System Integrators",
          "IT Consulting",
          "Government IT Projects",
        ],
      },
      {
        title: "Technical Project Manager",
        sectors: [
          "IT Project Management",
          "Product Management",
          "Agile Coaching",
        ],
      },
    ],
    learningOutcomes: [
      "Elicit, analyze, specify, and validate software requirements using industry-standard techniques and tools.",
      "Design and document software system architectures using appropriate design patterns and modeling languages (e.g., UML).",
      "Apply Agile and Scrum methodologies to manage software projects effectively in a team environment.",
      "Develop and execute comprehensive test plans, including unit, integration, and system tests, to ensure software quality.",
      "Configure and utilize DevOps toolchains for version control, continuous integration, continuous deployment, and infrastructure as code.",
    ],
    interestingFacts: [
      "The term 'Software Engineering' was coined in 1968 to emphasize a disciplined, engineering-based approach to software development, moving away from ad-hoc 'code and fix' methods.",
      "The average cost to fix a bug found during implementation is about 6x more than one found during design, and 15x more if found after release, highlighting the importance of good engineering practices.",
      "The largest software project in history is likely the Linux kernel, with over 27 million lines of code and contributions from more than 15,000 developers.",
    ],
    accreditation: ["Nigerian University Commission (NUC)"],
    testPreparation:
      "The program prepares students for certifications such as Certified ScrumMaster (CSM), AWS Certified DevOps Engineer, and ISTQB Certified Tester.",
    facilities: [
      "The 'Software Factory': A dedicated project room modeled after a tech startup, with agile boards, meeting spaces, and presentation equipment.",
      "DevOps Lab with a private cloud environment for practicing containerization, orchestration, and pipeline automation.",
      "Usability Testing Lab with equipment for recording and analyzing user interactions with software.",
    ],
    industryConnections: {
      partners: [
        "Amazon Web Services (AWS)",
        "GitHub",
        "Paystack",
        "Konga",
        "SystemSpecs",
      ],
      initiatives: [
        "Agile Simulation Workshops",
        "DevOps Days Conference",
        "Industry-led Code Reviews",
        "Incubation Support for Student Startups",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Engineering Excellence Award",
        description:
          "Awarded to students who demonstrate exceptional problem-solving and systematic thinking in their first-year projects.",
      },
    ],
    contactInfo: {
      department: "Department of Software Engineering",
      email: "swe@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Further Mathematics, Biology, or Economics",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. Strong proficiency in Mathematics is critical. A credit in Further Mathematics is highly recommended.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Physics",
          "Chemistry, Economics, or Biology",
        ],
        jambScore: {
          minimum: 150,
          competitive: 200,
          note: "As a specialized and in-demand field, competitive scores are very high, often mirroring or exceeding those of Computer Science.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements: "Two A-Level passes in Mathematics and Physics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Computer Science, Software Engineering, or Information Technology with a minimum of Lower Credit.",
          },
          {
            type: "HND",
            requirements:
              "HND in a relevant IT field for admission into 200 or 300 level.",
          },
          {
            type: "NCE",
            requirements:
              "NCE in a relevant science subject with a strong IT background.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Science/Engineering with required points.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements. Some universities may require a portfolio of programming projects.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice.",
        "Logical thinking and problem-solving aptitude are essential.",
        "Mandatory participation in Post-UTME screening, which may include basic logic tests.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
  //Cybersecurity
  {
    id: "bsc-cyber-security",
    programCode: "CYS107",
    title: "BSc (Hons) Cyber Security",
    slug: "/programs/bsc-cyber-security",
    tagline:
      "Defend Digital Frontiers. Outsmart Cyber Threats. Become a Digital Guardian.",
    overview: {
      description:
        "This specialized program prepares you to protect critical information systems from evolving cyber threats. You will learn to think like both a defender and an attacker, mastering skills in ethical hacking, digital forensics, network security, and cryptography. This hands-on, offensive-and-defensive program equips you with the technical expertise and ethical foundation to build resilient systems, investigate cybercrimes, and lead security efforts in any organization.",
      startDates: ["October 2025"],
    },
    realLifeImportance:
      "Cybersecurity professionals are the digital first responders and guardians of our online world. They protect national infrastructure from attacks, safeguard personal data from theft, ensure the integrity of financial transactions, and help bring cybercriminals to justice. In an era where a single breach can cost millions and damage reputations, their role is critically important to national security, economic stability, and individual privacy. They work on the front lines of a constant, evolving battle to keep our digital lives safe.",
    duration: "4 Years",
    headOfDepartment: {
      name: "Dr. Zainab Bello",
      title: "Professor of Digital Forensics",
      imageUrl: "/images/faculty/dr-zainab-bello.jpg",
      bio: "A former consultant for the EFCC's cybercrime unit, Dr. Bello is a certified ethical hacker and forensics expert. She specializes in tracking advanced persistent threats (APTs) and has testified as an expert witness in high-profile cybercrime cases.",
      email: "z.bello@sauni.edu.ng",
      message:
        "Cybersecurity is not a product; it's a process. It requires constant vigilance, creativity, and a deep understanding of technology and human behavior. We train you to be resilient, resourceful, and always ethical in this high-stakes field.",
    },
    whyThisProgram: [
      "Train in our dedicated Cyber Range—a isolated, controlled virtual environment for practicing penetration testing, digital forensics, and incident response on real-world scenarios.",
      "Earn industry certifications like CompTIA Security+, CEH (Certified Ethical Hacker), and CHFI (Computer Hacking Forensics Investigator) as part of your coursework.",
      "Participate in national and international Capture The Flag (CTF) competitions as part of the SAU Cyber Eagles team.",
      "Learn from faculty who are active practitioners and consultants in the cybersecurity field.",
    ],
    keyTopics: [
      "Network Security & Defense",
      "Ethical Hacking & Penetration Testing",
      "Digital Forensics & Incident Response",
      "Cryptography & Secure Communications",
      "Security Risk Analysis & Governance",
      "Operating System & Application Security",
    ],
    programBreakdown: {
      coreCourses: 70,
      electives: 15,
      projectsInternships: 15,
    },
    semesterOutline: [
      {
        year: 1,
        theme: "Computing Foundations",
        semesters: {
          first: [
            "Introduction to Cybersecurity",
            "Programming for Security (Python)",
            "Computer Hardware & OS",
            "Introduction to Networking",
            "Discrete Mathematics",
          ],
          second: [
            "Principles of Secure Programming",
            "Database Systems",
            "Network Protocols",
            "Legal & Ethical Issues in Computing",
            "Communication Skills",
          ],
        },
      },
      {
        year: 2,
        theme: "Core Security Principles",
        semesters: {
          first: [
            "Network Security",
            "System Administration & Hardening",
            "Cryptography",
            "Data Structures",
            "Probability & Statistics",
          ],
          second: [
            "Web Application Security",
            "Introduction to Digital Forensics",
            "Windows & Linux Security",
            "Human Factors in Security",
            "Professional Practice",
          ],
        },
      },
      {
        year: 3,
        theme: "Offensive & Defensive Security",
        semesters: {
          first: [
            "Ethical Hacking & Pen Testing",
            "Digital Forensics II",
            "Cyber Threat Intelligence",
            "Elective I (e.g., Cloud Security)",
            "Research Methods",
          ],
          second: [
            "Incident Response & Recovery",
            "Malware Analysis",
            "Security Operations Center (SOC) Management",
            "Elective II (e.g., IoT Security)",
            "Entrepreneurship",
          ],
        },
      },
      {
        year: 4,
        theme: "Advanced Topics & Capstone",
        semesters: {
          first: [
            "Cyber Risk Management & Governance",
            "Digital Forensics III",
            "Capstone Project I",
            "Track Elective I",
            "Cyber Law",
          ],
          second: [
            "Advanced Penetration Testing",
            "Capstone Project II",
            "Industrial Internship",
            "Seminar",
          ],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Kemi Adekunle",
        position: "Security Analyst, Central Bank of Nigeria",
        graduationYear: 2020,
        imageUrl: "/images/alumni/kemi-adekunle.jpg",
        testimonial:
          "The hands-on experience in the Cyber Range was unparalleled. On my first day at the CBN, I was already familiar with the tools and procedures they use for monitoring threats. I felt immediately productive.",
      },
      {
        name: "Jide Sowole",
        position: "Founder, 'ShieldGate' Cybersecurity Consultancy",
        graduationYear: 2018,
        imageUrl: "/images/alumni/jide-sowole.jpg",
        testimonial:
          "The program's focus on both technical skills and risk management allowed me to not only find vulnerabilities but also effectively communicate the business impact to clients, which is the key to a successful consultancy.",
      },
    ],
    videoUrl: "https://www.youtube.com/watch?v=SAU_CYBER_SECURITY",
    careerPaths: [
      {
        title: "Security Analyst / SOC Analyst",
        sectors: [
          "Financial Institutions",
          "Managed Security Service Providers (MSSPs)",
          "Large Corporations",
          "Government Agencies",
        ],
      },
      {
        title: "Penetration Tester (Ethical Hacker)",
        sectors: [
          "Cybersecurity Consulting Firms",
          "Freelance (Bug Bounty Programs)",
          "Internal Red Teams",
        ],
      },
      {
        title: "Digital Forensics Investigator",
        sectors: [
          "Law Enforcement (EFCC, Police)",
          "Corporate Investigation",
          "Legal Firms",
          "Insurance Companies",
        ],
      },
      {
        title: "Security Architect",
        sectors: [
          "Enterprise IT Departments",
          "Cloud Service Providers",
          "Software Companies",
        ],
      },
      {
        title: "Chief Information Security Officer (CISO)",
        sectors: ["Executive Leadership in any large organization"],
      },
    ],
    learningOutcomes: [
      "Conduct vulnerability assessments and penetration tests on networks and applications to identify security weaknesses.",
      "Perform digital forensic investigations to collect, preserve, and analyze digital evidence from various devices.",
      "Design, implement, and manage security infrastructure, including firewalls, IDS/IPS, and SIEM systems.",
      "Analyze and assess cyber risks to an organization and develop policies and strategies to mitigate them.",
      "Apply cryptographic principles to secure data in transit and at rest, and understand the strengths/weaknesses of various algorithms.",
    ],
    interestingFacts: [
      "The first computer virus, called 'Creeper,' was created as an experiment in 1971. It simply displayed the message 'I'm the creeper, catch me if you can!'",
      "Human error is still the cause of over 90% of cybersecurity breaches, highlighting the importance of security awareness training.",
      "The global cybersecurity market is projected to exceed $300 billion by 2025, reflecting the massive and growing demand for expertise.",
    ],
    accreditation: ["Nigerian University Commission (NUC)"],
    testPreparation:
      "The curriculum is designed to prepare students for industry certifications such as CompTIA Security+, Certified Ethical Hacker (CEH), and Certified Digital Forensics Examiner (CDFE).",
    facilities: [
      "The Cyber Range: A isolated, virtualized lab environment for conducting realistic cyber warfare exercises, penetration testing, and forensics investigations.",
      "Digital Forensics Lab: Equipped with write-blockers, forensic workstations, and specialized software (e.g., FTK, EnCase) for analyzing hard drives and mobile devices.",
      "Dedicated Networking Lab: With hardware for configuring and testing firewalls, routers, and switches in secure configurations.",
    ],
    industryConnections: {
      partners: [
        "EFCC Cybercrime Unit",
        "Nigerian Communications Commission (NCC)",
        "Check Point Software",
        "Paladin Security",
        "MainOne",
      ],
      initiatives: [
        "Annual Cyber Defense Exercise",
        "Guest Lectures from National Security Advisers",
        "Participation in National Cyber Awareness Month",
        "CTF Team Sponsorships",
      ],
    },
    programType: "Full-time",
    scholarships: [
      {
        name: "Women in Cyber Scholarship",
        description:
          "Designed to encourage and support female students entering the cybersecurity field, which has a significant gender gap.",
      },
      {
        name: "National Security Scholarship",
        description:
          "For students demonstrating exceptional talent and a commitment to pursuing a career in protecting national critical infrastructure.",
      },
    ],
    contactInfo: {
      department: "Department of Cyber Security",
      email: "cybersecurity@sauni.edu.ng",
      phone: "+234 707 356 6121",
    },
    admissionRequirements: {
      utme: {
        oLevel: {
          required: [
            "English Language",
            "Mathematics",
            "Physics",
            "Chemistry",
            "Further Mathematics, Biology, Economics, or ICT",
          ],
          notes:
            "Five (5) O'Level credit passes at not more than two sittings. A credit in ICT or Computer Studies is a distinct advantage.",
        },
        jambSubjects: [
          "English Language (Compulsory)",
          "Mathematics",
          "Physics",
          "Chemistry, Economics, Biology, or ICT",
        ],
        jambScore: {
          minimum: 150,
          competitive: 190,
          note: "This is an emerging and high-demand field. Competitive scores are rising rapidly at universities that offer it.",
        },
      },
      directEntry: {
        options: [
          {
            type: "A-Level",
            requirements:
              "Two A-Level passes in Science subjects including Mathematics.",
          },
          {
            type: "OND",
            requirements:
              "OND in Computer Science, Cybersecurity, Networking, or Information Technology with a minimum of Lower Credit.",
          },
          {
            type: "HND",
            requirements:
              "HND in a relevant IT field for admission into 200 or 300 level.",
          },
          {
            type: "Professional Certifications",
            requirements:
              "Relevant foundational IT certifications (e.g., CompTIA Security+, CEH) may be considered as an advantage but not usually as a standalone entry requirement.",
          },
          {
            type: "Foundation",
            requirements:
              "Completion of JUPEB/Foundation program in Science/Engineering with required points.",
          },
        ],
        note: "Direct Entry candidates must also meet the O'Level requirements. A demonstrated interest in computing (e.g., programming, networking) is valued.",
      },
      otherRequirements: [
        "UTME candidates must choose the university as first choice.",
        "Strong ethical standing is paramount for this field.",
        "Mandatory participation in Post-UTME screening, which may include an interview to assess aptitude and character.",
      ],
      gradingSystem: {
        scale: "5-point scale",
        details:
          "First Class (70-100%), Second Class Upper (60-69%), Second Class Lower (50-59%), Third Class (45-49%), Pass (40-44%), Fail (0-39%)",
      },
    },
  },
];
