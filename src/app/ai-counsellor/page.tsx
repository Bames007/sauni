import React from "react";
import AICounsellor from "./AICounsellorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Counsellor",
  description:
    "Connect with Southern Atlantic University's AI Counsellor for guidance and support.",
  openGraph: {
    title: "AI Counsellor | Southern Atlantic University",
    description:
      "Get personalized guidance and support with Southern Atlantic University's AI Counsellor.",
    url: "https://www.sauni.edu.ng/ai-counsellor",
    siteName: "Southern Atlantic University",
    images: [
      {
        url: "https://www.sauni.edu.ng/ai.jpg",
        width: 1200,
        height: 630,
        alt: "Southern Atlantic University AI Counsellor Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Counsellor | Southern Atlantic University",
    description:
      "Get personalized guidance and support with Southern Atlantic University's AI Counsellor.",
    images: ["https://www.sauni.edu.ng/ai.jpg"],
    // You can also add: creator: '@YourUniversityTwitterHandle',
  },
  keywords: ["AI Counsellor", "university guidance", "student support"],
};

const AICounsellorPage = () => {
  return <AICounsellor />;
};

export default AICounsellorPage;
