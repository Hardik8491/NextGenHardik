'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, GitlabIcon as GitHub, Linkedin, ArrowDown } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'


interface PageInfo {
  backgroundInformation?: string
  heroImage?: string
  skills?: string[]
  name?:string,
  background?:string,
  role?:string
}

interface Props {
  pageInfo: PageInfo
}
export default function AboutPage({pageInfo}:Props) {
 
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')

  const controls = useAnimation()
  const backgroundControls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [50, 0],
      opacity: [0, 1],
      transition: { duration: 0.8, ease: "easeOut" }
    })
    backgroundControls.start({
      opacity: [0, 0.5],
      scale: [0.9, 1],
      transition: { duration: 1, ease: "easeOut" }
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [controls, backgroundControls])

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      opacity: 1,
    },
    button: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "var(--primary)",
      mixBlendMode: "difference" as const,
    }
  }

  const springConfig = { type: "spring", stiffness: 500, damping: 28 }

  const handleMouseEnter = () => setCursorVariant("button")
  const handleMouseLeave = () => setCursorVariant("default")

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
          variants={itemVariants}
        >
          About Me
        </motion.h1>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="overflow-hidden bg-background/50 backdrop-blur-sm border-primary/10">
          <CardContent className="p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8">
            <motion.div
              className="flex-shrink-0"
              variants={itemVariants}
            >{pageInfo?.heroImage && (
              <Image
              src={urlFor(pageInfo.heroImage).url() || '/placeholders.svg'}
                alt="John Doe"
                
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                width={300}
                height={300}
                className="rounded-xl object-cover"
              />
                )}
            </motion.div>
            <div className="flex-grow">
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold mb-4"
                variants={itemVariants}
              >
                {pageInfo?.name}
              </motion.h2>
              <motion.h3 
                className="text-xl text-muted-foreground mb-4"
                variants={itemVariants}
              >
               {pageInfo?.role}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground mb-6"
                variants={itemVariants}
              >
                { pageInfo?.backgroundInformation ||"Hi there! I'm John, a passionate Full Stack Developer with over 5 years of experience. I specialize in creating robust and scalable web applications using modern technologies like React, Node.js, and GraphQL. When I'm not coding, you can find me exploring new hiking trails or experimenting with new recipes in the kitchen."}
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Link href="mailto:hardikbhammar808@gmail.com">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 group relative overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Mail className="h-4 w-4" />
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </Button>
                </Link>
                <Link href="https://github.com/Hardik8491">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 group relative overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <GitHub className="h-4 w-4" />
                  <span className="relative z-10">GitHub</span>
                  <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </Button>
                </Link>
            <Link href="https://linkedin.com/in/hardikbhammar">
            <Button 
                  variant="outline" 
                  className="flex items-center gap-2 group relative overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="relative z-10">LinkedIn</span>
                  <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </Button>
            </Link>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary/50 pointer-events-none z-50 mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={springConfig}
      />



      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={backgroundControls}
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0) 50%)",
              "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0) 50%)"
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
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