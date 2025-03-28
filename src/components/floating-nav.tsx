"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    User,
    Briefcase,
    GraduationCap,
    Rocket,
    Mail,
    Moon,
    Sun,
    Menu,
    X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    {
        id: "education-and-skills",
        label: "Education & Skills",
        icon: GraduationCap,
    },
    { id: "projects", label: "Projects", icon: Rocket },
    { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            // Show floating nav after scrolling down a bit
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Determine active section
            const sections = document.querySelectorAll("section[id]");
            const scrollPosition = window.scrollY + 200;

            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute("id") || "";

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    setActiveSection(sectionId);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <TooltipProvider>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50'
                    >
                        <div className='bg-background/80 backdrop-blur-md border border-primary/10 rounded-full shadow-lg p-2 flex items-center'>
                            {/* Mobile menu button */}
                            <div className='md:hidden'>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='rounded-full'
                                    aria-label='Toggle navigation menu'
                                >
                                    {isOpen ? (
                                        <X className='h-5 w-5' />
                                    ) : (
                                        <Menu className='h-5 w-5' />
                                    )}
                                </Button>
                            </div>

                            {/* Desktop navigation */}
                            <div className='hidden md:flex items-center space-x-1'>
                                {navItems.map((item) => (
                                    <Tooltip key={item.id}>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                size='icon'
                                                onClick={() =>
                                                    scrollToSection(item.id)
                                                }
                                                className={cn(
                                                    "rounded-full transition-all duration-300",
                                                    activeSection === item.id
                                                        ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                                        : "hover:bg-primary/10"
                                                )}
                                                aria-label={item.label}
                                            >
                                                <item.icon className='h-5 w-5' />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side='top'>
                                            <p>{item.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant='ghost'
                                            size='icon'
                                            onClick={toggleTheme}
                                            className='rounded-full transition-all duration-300 hover:bg-primary/10'
                                            aria-label='Toggle theme'
                                        >
                                            {theme === "dark" ? (
                                                <Sun className='h-5 w-5' />
                                            ) : (
                                                <Moon className='h-5 w-5' />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side='top'>
                                        <p>Toggle theme</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        {/* Mobile navigation menu */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md border border-primary/10 rounded-lg shadow-lg p-2 w-48'
                                >
                                    <div className='grid grid-cols-3 gap-1'>
                                        {navItems.map((item) => (
                                            <Button
                                                key={item.id}
                                                variant='ghost'
                                                size='sm'
                                                onClick={() =>
                                                    scrollToSection(item.id)
                                                }
                                                className={cn(
                                                    "flex flex-col items-center justify-center py-2 h-auto",
                                                    activeSection === item.id &&
                                                        "bg-primary/10 text-primary"
                                                )}
                                            >
                                                <item.icon className='h-5 w-5 mb-1' />
                                                <span className='text-xs'>
                                                    {item.label}
                                                </span>
                                            </Button>
                                        ))}
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={toggleTheme}
                                            className='flex flex-col items-center justify-center py-2 h-auto'
                                        >
                                            {theme === "dark" ? (
                                                <>
                                                    <Sun className='h-5 w-5 mb-1' />
                                                    <span className='text-xs'>
                                                        Light
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Moon className='h-5 w-5 mb-1' />
                                                    <span className='text-xs'>
                                                        Dark
                                                    </span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </TooltipProvider>
            )}
        </AnimatePresence>
    );
}
