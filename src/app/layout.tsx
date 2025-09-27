// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Southern Atlantic University",

//   description:
//     "At Southern Atlantic University (SAU), we believe education is more than just a degree—it's a life-changing journey that empowers individuals to make a difference in the world. ",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Southern Atlantic University | Empowering Change Through Education",
    template: "%s | Southern Atlantic University",
  },
  description:
    "Southern Atlantic University (SAU): Where education is a transformative journey. We empower students to build meaningful careers and make a difference in the world.",
  keywords: [
    "university",
    "higher education",
    "SAU",
    "college degrees",
    "transformative learning",
    "academic programs",
    "Nigeria university",
  ],
  authors: [{ name: "Southern Atlantic University" }],
  creator: "Southern Atlantic University",
  publisher: "Southern Atlantic University",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sauni.edu.ng"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Southern Atlantic University | Empowering Change Through Education",
    description:
      "Where education is a transformative journey. Empowering students to make a difference in the world.",
    url: "https://sauni.edu.ng",
    siteName: "Southern Atlantic University",
    images: [
      {
        url: "/sauni-logo.png",
        width: 1200,
        height: 630,
        alt: "Southern Atlantic University Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Southern Atlantic University",
    description:
      "Where education is a transformative journey. Empowering students to make a difference.",
    images: ["/sauni-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
