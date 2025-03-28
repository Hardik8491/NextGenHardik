"use client"

import { useRef } from "react"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TExperience {
  title: string
  companyName: string
  icon: string
  iconBg: string
  date: string
  points: string[]
  companyUrl?: string
}

const experiences: TExperience[] = [
  {
    title: "AI Intern",
    companyName: "IBM SkillsBuild (CSRBOX), GTU",
    icon: "/placeholder.svg?height=60&width=60",
    iconBg: "#383E56",
    date: "July 2024 - August 2024",
    companyUrl: "https://skillsbuild.org/",
    points: [
      "Developed a banking chatbot using IBM Watson Assistant and NLP.",
      "Designed and built a GUI for enhanced user interaction.",
      "Implemented payment, reminders, and balance transfer features.",
      "Worked on API integration, scalability, and security optimizations.",
    ],
  },
  {
    title: "Software Engineer Intern",
    companyName: "Martaxis PVT LTD",
    icon: "/placeholder.svg?height=60&width=60",
    iconBg: "#E6DEDD",
    date: "January 2025 - June 2025",
    companyUrl: "https://martaxis.com/",
    points: [
      "Worked as a Frontend Developer on a trading analysis tool.",
      "Developed user-friendly dashboards for real-time market insights.",
      "Integrated APIs for live trading data and analytics.",
      "Optimized frontend performance and improved user experience.",
    ],
  },
];


const ExperienceCard: React.FC<TExperience & { isLeft: boolean; index: number }> = ({
  title,
  companyName,
  icon,
  iconBg,
  date,
  points,
  isLeft,
  index,
  companyUrl,
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <VerticalTimelineElement
      visible={true}
      contentStyle={{
        background: "transparent",
        boxShadow: "none",
        padding: 0,
      }}
      contentArrowStyle={{
        borderRight: isLeft ? "7px solid hsl(var(--primary))" : "none",
        borderLeft: isLeft ? "none" : "7px solid hsl(var(--primary))",
      }}
      date={date}
      iconStyle={{ background: iconBg }}
      position={isLeft ? "left" : "right"}
      icon={
        <div className="flex items-center justify-center w-full h-full">
          <Image src={icon || "/placeholder.svg"} alt={companyName} width={60} height={60} className="rounded-full" />
        </div>
      }
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="relative">
            <CardTitle className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
              {title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-muted-foreground">{companyName}</p>
              {companyUrl && (
                <Link href={companyUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="mt-4 space-y-3">
              {points.map((point, index) => (
                <motion.li
                  key={`experience-point-${index}`}
                  className="flex items-start"
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -20 : 20 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <Badge variant="outline" className="mr-2 mt-1 flex-shrink-0 bg-primary/10" />
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {point}
                  </p>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </VerticalTimelineElement>
  )
}

export default function Experience() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  useEffect(() => {
    setMounted(true)
    if (isInView) {
      controls.start({
        y: [50, 0],
        opacity: [0, 1],
        transition: { duration: 0.8, ease: "easeOut" },
      })
    }
  }, [controls, isInView])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-gradient-to-b from-background to-background/50 overflow-hidden"
      id="experience"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
        >
          Work Experience
        </motion.h2>

        {mounted && (
          <motion.div
            className="absolute left-9 top-[100px] bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20 origin-top"
            style={{ scaleY }}
          />
        )}

        <div className="mt-20">
          <VerticalTimeline lineColor="hsl(var(--primary))">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} isLeft={index % 2 === 0} index={index} />
            ))}
          </VerticalTimeline>
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            variant="outline"
            className="group border-primary/20 hover:border-primary/50 transition-all duration-300"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span>View My Projects</span>
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0) 50%)",
              "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0) 50%)",
            ],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ scaleX: [0, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ scaleX: [0, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          animate={{ scaleY: [0, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          animate={{ scaleY: [0, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </section>
  )
}

