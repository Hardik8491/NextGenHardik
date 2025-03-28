"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, GraduationCap, Rocket, Mail, Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education-and-skills", label: "Education & Skills", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "contact", label: "Contact", icon: Mail },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav after scrolling down a bit
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Determine active section
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 200

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <AnimatePresence mode="sync">
      {isVisible && (
        <TooltipProvider>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="fixed bottom-6  left-1/2  transform -translate-x-1/2 z-50"
          >
            <div className="bg-background/30 backdrop-blur-xl border border-primary/20 rounded-full shadow-lg shadow-primary/20 p-2 flex  items-center">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="rounded-full hover:bg-primary/20 transition-all duration-300"
                  aria-label="Toggle navigation menu"
                >
                  <motion.div animate={isOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.2 }}>
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </Button>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:flex   items-center space-x-1">
                {navItems.map((item) => (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "rounded-full transition-all duration-300 relative overflow-hidden group",
                          activeSection === item.id
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "hover:bg-primary/10",
                        )}
                        aria-label={item.label}
                      >
                        <item.icon className="h-5 w-5 relative z-10" />
                        {activeSection !== item.id && (
                          <motion.div
                            className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                            animate={{ scale: [0.8, 1], opacity: [0, 1] }}
                            exit={{ scale: 0.8, opacity: 0 }}
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-gradient-to-r from-primary/90 to-tertiary/90 text-white border-none shadow-xl"
                    >
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="rounded-full transition-all duration-300 hover:bg-primary/10 relative overflow-hidden group"
                      aria-label="Toggle theme"
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotate: theme === "dark" ? 0 : 180 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                        className="relative z-10"
                      >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100"
                        initial={false}
                        animate={{ scale: [0.8, 1], opacity: [0, 1] }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-gradient-to-r from-primary/90 to-tertiary/90 text-white border-none shadow-xl"
                  >
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Mobile navigation menu - update with more interactive animations */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-background/50 backdrop-blur-xl border border-primary/20 rounded-lg shadow-lg p-3 w-56 shadow-primary/20 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 opacity-10 noise-bg"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                  <div className="grid grid-cols-3 gap-2 relative z-10">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => scrollToSection(item.id)}
                          className={cn(
                            "flex flex-col items-center justify-center py-2 h-auto w-full relative overflow-hidden group",
                            activeSection === item.id && "bg-primary/20 text-primary shadow-sm",
                          )}
                        >
                          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                            <item.icon className="h-5 w-5 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                          </motion.div>
                          {activeSection === item.id && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-tertiary"
                              layoutId="activeMobileIndicator"
                            />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navItems.length * 0.05, duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="flex flex-col items-center justify-center py-2 h-auto w-full"
                      >
                        <motion.div
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          initial={false}
                          animate={{ rotate: theme === "dark" ? 0 : 180 }}
                          transition={{ duration: 0.5 }}
                        >
                          {theme === "dark" ? (
                            <>
                              <Sun className="h-5 w-5 mb-1" />
                              <span className="text-xs font-medium">Light</span>
                            </>
                          ) : (
                            <>
                              <Moon className="h-5 w-5 mb-1" />
                              <span className="text-xs font-medium">Dark</span>
                            </>
                          )}
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </TooltipProvider>
      )}
    </AnimatePresence>
  )
}

