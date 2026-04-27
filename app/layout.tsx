import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import WhoamiEgg from "./components/WhoamiEgg";
import { Analytics } from "@vercel/analytics/next"

const fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl = "https://mustafeez.dev";
const ogTitle = "Mustafeez Ur Rehman | Senior Full Stack Engineer";
const ogDescription =
  "Senior Full Stack Engineer with 9+ years building government-grade platforms used by millions across the UAE. JavaScript, Node.js, React, Angular, AI/ML.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: ogTitle,
  description: ogDescription,
  keywords: [
    "Mustafeez Ur Rehman",
    "Senior Full Stack Engineer",
    "TAMM",
    "Government Platforms",
    "React",
    "Node.js",
    "TypeScript",
    "Angular",
    "AI Engineering",
  ],
  authors: [{ name: "Mustafeez Ur Rehman" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mustafeez Ur Rehman",
    title: ogTitle,
    description: ogDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
    { media: "(prefers-color-scheme: light)", color: "#131313" },
  ],
  colorScheme: "dark",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mustafeez Ur Rehman",
  jobTitle: "Senior Full Stack Engineer",
  url: siteUrl,
  email: "mailto:mustafizurrehman@hotmail.com",
  address: { "@type": "PostalAddress", addressCountry: "AE" },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Angular",
    "Microservices",
    "AI Engineering",
  ],
  sameAs: ["https://linkedin.com/in/mustafeez-ur-rehman"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fira.variable} ${inter.variable} ${cormorant.variable} h-full w-full overflow-x-clip antialiased`}
    >
      <body className="min-h-full w-full overflow-x-clip flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <Analytics/>
        <SmoothScroll />
        <CustomCursor />
        <WhoamiEgg />
        {children}
      </body>
    </html>
  );
}
