import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import StarsCanvas from "@/components/StarBackground";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

const josefin = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-josefin",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://hardik-dev.tech/"),
    title: "Hardik Bhammar - Aspiring Software Engineer | Full Stack Developer",
    description:
        "Aspiring Software Engineer currently pursuing B.E with a passion for AI, machine learning, and full-stack development. Experienced in developing AI-powered applications, enhancing network management operations, and creating scalable web solutions. Proficient in React, Node.js, and natural language processing.",
    keywords: [
        "Bhammar",
        "Hardik",
        "Hardik Bhammar",
        "Aspiring Software Engineer",
        "AI Enthusiast",
        "Machine Learning",
        "B.Tech Student",
        "GECGN",
        "ECE",
        "ZeroTOHero",
        "DSA",
        "Engineering",
        "Full Stack Developer",
        "AI-powered applications",
        "React Developer",
        "Node.js Developer",
        "NLP",
        "Natural Language Processing",
        "Portfolio",
        "JavaScript Developer",
        "Python Developer",
        "Software Intern",
        "Frontend Developer",
        "Backend Developer",
        "Web Developer",
        "Tech Enthusiast",
    ],
    openGraph: {
        title: "Hardik Bhammar - Aspiring Software Engineer | Full Stack Developer",
        description:
            "Aspiring Software Engineer currently pursuing B.E with a passion for AI, machine learning, and full-stack development. Experienced in developing AI-powered applications, enhancing network management operations, and creating scalable web solutions. Proficient in React, Node.js, and natural language processing. Notable projects include BuyerEdge, SocialPeida, and StudySync.",
        images: "/hdk.png",
        url: "https://hardik-dev.tech",
        siteName: "Hardik Bhammar Portfolio",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hardik Bhammar - Aspiring Software Engineer | Full Stack Developer",
        description:
            "Aspiring Software Engineer with a passion for AI, ML, and Full-Stack Development. Check out my portfolio!",
        images: ["/hdk.png"],
        site: "@your_twitter_handle", // Replace with your Twitter username
    },
    alternates: {
        canonical: "https://hardik-dev.tech",
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                {/* ✅ Corrected Google Site Verification */}
                <meta
                    name="google-site-verification"
                    content="yKQLzB0IIVwWCZlvldcjxC9U_3YxY9sJmiZVHg2_u6A"
                />

                {/* ✅ SEO Enhancements */}
                <meta name="author" content="Hardik Bhammar" />
                <meta name="robots" content="index, follow" />
                <meta name="revisit-after" content="7 days" />
                <meta name="distribution" content="global" />
                <meta name="language" content="English" />

                {/* ✅ Open Graph & Twitter Meta Tags (Added for Social Media) */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://hardik-dev.tech" />
                <meta property="og:title" content="Hardik Bhammar - Aspiring Software Engineer | Full Stack Developer" />
                <meta property="og:description" content="Aspiring Software Engineer with a passion for AI, ML, and Full-Stack Development. Check out my portfolio!" />
                <meta property="og:image" content="/hdk.png" />
                <meta property="og:image:alt" content="Hardik Bhammar Portfolio Preview" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hardik Bhammar - Aspiring Software Engineer | Full Stack Developer" />
                <meta name="twitter:description" content="Aspiring Software Engineer with a passion for AI, ML, and Full-Stack Development. Check out my portfolio!" />
                <meta name="twitter:image" content="/hdk.png" />
            </head>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StarsCanvas />
                    {children}
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </body>
        </html>
    );
}
