"use client";

import type React from "react";
import { useState } from "react";
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
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

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
        <TooltipProvider>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='  transform -translate-y-1/2 z-50 md:block'
            >
                <div className='bg-background/80 backdrop-blur-md border border-primary/10 rounded-full shadow-lg p-2 flex items-center flex-col'>
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
                    <div className='hidden md:flex flex-col items-center gap-4 space-y-1'>
                        {navItems.map((item) => (
                            <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => scrollToSection(item.id)}
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
                                <TooltipContent side='right'>
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
                            <TooltipContent side='right'>
                                <p>Toggle theme</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </motion.div>
        </TooltipProvider>
    );
}
