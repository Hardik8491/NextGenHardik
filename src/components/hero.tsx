"use client";

import { useState, useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    ChevronDown,
    ExternalLink,
    Mail,
    Download,
    Facebook,
} from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { TbBrandLeetcode } from "react-icons/tb";

const socialIcons = {
    leetcode: <TbBrandLeetcode className='h-5 w-5' />,
    linkdin: <Linkedin className='h-5 w-5' />,
    github: <Github className='h-5 w-5' />,
    facebook: <Facebook className='h-5 w-5' />,
    instagram: <Instagram className='h-5 w-5' />,
};

interface HeroProps {
    pageInfo: any;
    socials: any;
}

export default function HeroSection({ pageInfo, socials }: HeroProps) {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    const [loadedSections, setLoadedSections] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const filter = useTransform(
        scrollYProgress,
        [0, 1],
        ["blur(0px)", "blur(5px)"]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);


    useEffect(() => {
        const animationTimeline = setTimeout(() => {
            setLoadedSections((prev) => Math.min(prev + 1, 3));
        }, 700);

        return () => clearTimeout(animationTimeline);
    }, [loadedSections]);

  



    const handleDownload = () => {
        // Google Drive file ID (replace with your actual file ID)
        const fileId = "1mxnp_bN_LSQuyPrHmZBZN-uYed-PIaBN";

        // Construct the direct download URL
        const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.download = "My_Resume.pdf";

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    };


    // Stagger delay for social icons
    const socialVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 10,
            },
        }),
    };

    return (
        <section
            ref={ref}
            className='relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden'
            id='hero'
        >
            <motion.div
                style={{ y, filter, opacity, scale }}
                className='container max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center relative'
                ref={containerRef}
            >
                {/* Mouse follower cursor effect (only visible on desktop) */}
                {/* <AnimatePresence mode='wait'>
                    {shouldShowCustomCursor && (
                        <motion.div
                            className='fixed hidden md:flex items-center justify-center pointer-events-none z-50 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-sm border border-white/10'
                            variants={cursorVariants}
                            animate={cursorVariant}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 28,
                                mass: 0.5,
                            }}
                            initial={false}
                        >
                            {cursorVariant === "text" && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className='text-sm font-medium text-white mix-blend-difference'
                                >
                                    {cursorText}
                                </motion.span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence> */}

                <div className='flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full'>
                    {/* Left content - Profile image */}
                    <motion.div
                        className='relative w-full md:w-1/3'
                        initial={{ opacity: 0, x: -50 }}
                        animate={{
                            opacity: loadedSections >= 1 ? 1 : 0,
                            x: loadedSections >= 1 ? 0 : -50,
                        }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <div
                            className='relative w-60 h-60 md:w-80 md:h-80 mx-auto'
                            // onMouseEnter={() => handleMouseOver("View Profile")}
                            // onMouseLeave={handleMouseLeave}
                        >
                            <motion.div className='absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary rotate-0 animate-rotate-shine opacity-70' />
                            <motion.div
                                className='absolute inset-3 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary p-1 overflow-hidden blob-animation'
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(var(--primary-rgb), 0.3)",
                                        "0 0 30px rgba(var(--primary-rgb), 0.5)",
                                        "0 0 20px rgba(var(--primary-rgb), 0.3)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                }}
                            >
                                <div className='w-full h-full overflow-hidden rounded-full bg-background p-1'>
                                    <div className='w-full h-full overflow-hidden rounded-full bg-background relative'>
                                        {pageInfo?.heroImage && (
                                            <Image
                                                src={
                                                    urlFor(
                                                        pageInfo.heroImage
                                                    ).url() ||
                                                    "/placeholder.svg"
                                                }
                                                alt={
                                                    pageInfo?.name ||
                                                    "Profile Image"
                                                }
                                                fill
                                                className='object-cover transition-transform duration-500 hover:scale-110'
                                                priority
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right content - Text and buttons */}
                    <motion.div
                        className='w-full md:w-2/3 text-center md:text-left space-y-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className='space-y-2'>
                            <motion.div
                                className='text-reveal-container'
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                            >
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{
                                        y: loadedSections >= 1 ? 0 : 100,
                                        opacity: loadedSections >= 1 ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        type: "spring",
                                    }}
                                >
                                    <h2 className='text-xl font-medium text-accent'>
                                        Hello, I&apos;m
                                    </h2>
                                </motion.div>
                            </motion.div>

                            <motion.div className='text-reveal-container'>
                                <motion.h1
                                    className='text-4xl md:text-6xl lg:text-7xl font-bold gradient-text text-glow'
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{
                                        y: loadedSections >= 2 ? 0 : 100,
                                        opacity: loadedSections >= 2 ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.1,
                                        type: "spring",
                                    }}
                                >
                                    {pageInfo?.name || "Your Name"}
                                </motion.h1>
                            </motion.div>

                            <motion.div className='text-reveal-container'>
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{
                                        y: loadedSections >= 3 ? 0 : 100,
                                        opacity: loadedSections >= 3 ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2,
                                        type: "spring",
                                    }}
                                >
                                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground'>
                                        <span className='text-gradient-animate from-secondary via-tertiary to-primary'>
                                            {pageInfo?.role ||
                                                "Developer & Designer"}
                                        </span>
                                    </h2>
                                </motion.div>
                            </motion.div>
                        </div>

                        <motion.p
                            className='text-muted-foreground text-base md:text-lg max-w-2xl mx-auto md:mx-0'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: loadedSections >= 3 ? 1 : 0,
                                y: loadedSections >= 3 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {
                                // pageInfo?.backgroundInformations ||
                                "I'm a passionate developer specializing in creating exceptional digital experiences. Focused on building accessible, human-centered products."
                            }
                        </motion.p>

                        <motion.div
                            className='flex flex-wrap gap-4 justify-center md:justify-start'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: loadedSections >= 3 ? 1 : 0,
                                y: loadedSections >= 3 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Button
                                className='group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300'
                                size='lg'
                                onClick={() =>
                                    document
                                        .getElementById("contact")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                              
                            >
                                <Mail className='mr-2 h-4 w-4 group-hover:animate-pulse' />
                                Contact Me
                                <span className='absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
                            </Button>

                            <Button
                                variant='outline'
                                className='group relative overflow-hidden rounded-full border border-primary/20 hover:border-primary hover:shadow-glow transition-all duration-300'
                                size='lg'
                                onClick={handleDownload}
                              
                            >
                                <Download className='mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform duration-300' />
                                Download CV
                                <span className='absolute inset-0 w-full h-full bg-primary/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
                            </Button>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            className='flex flex-wrap gap-3 justify-center md:justify-start mt-6'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            {socials?.map((social: any, i: number) => (
                                <motion.div
                                    key={social._id}
                                    custom={i}
                                    variants={socialVariants}
                                    initial='hidden'
                                    animate={
                                        loadedSections >= 3
                                            ? "visible"
                                            : "hidden"
                                    }
                                >
                                    <Link
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-block'
                                      
                                    >
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            className='rounded-full border-primary/20 hover:border-primary hover:bg-primary/10 hover:shadow-glow transition-all duration-300 group'
                                        >
                                            {socialIcons[
                                                social.title.toLowerCase() as keyof typeof socialIcons
                                            ] || (
                                                <ExternalLink className='h-5 w-5' />
                                            )}
                                            <span className='sr-only'>
                                                {social.title}
                                            </span>
                                        </Button>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 1.2,
                        y: {
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        },
                    }}
                >
                    <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full hover:bg-primary/10 transition-colors border border-primary/20'
                        onClick={() =>
                            document
                                .getElementById("about")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    
                    >
                        <ChevronDown className='h-6 w-6 text-primary' />
                    </Button>
                </motion.div>
            </motion.div>

            {/* Background elements */}
            <motion.div
                className='absolute inset-0 -z-10 overflow-hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]' />
                <motion.div
                    className='absolute inset-0'
                    animate={{
                        background: [
                            "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0) 50%)",
                            "radial-gradient(circle at 50% 50%, rgba(var(--secondary-rgb), 0.15) 0%, rgba(var(--secondary-rgb), 0) 50%)",
                            "radial-gradient(circle at 50% 50%, rgba(var(--tertiary-rgb), 0.15) 0%, rgba(var(--tertiary-rgb), 0) 50%)",
                            "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0) 50%)",
                        ],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                />

                {/* Animated blobs */}
                <motion.div
                    className='absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-tertiary/20 blur-3xl'
                    animate={{
                        x: [0, 30, -30, 0],
                        y: [0, -30, 30, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                />

                <motion.div
                    className='absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 blur-3xl'
                    animate={{
                        x: [0, -30, 30, 0],
                        y: [0, 30, -30, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        delay: 2,
                    }}
                />
            </motion.div>
        </section>
    );
}
