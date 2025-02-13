//@ts-nocheck
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion'
import { Github, Linkedin, Send, Instagram, Twitter, Mail, Download, MousePointer2, ArrowDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { sanityClient } from '@/lib/sanity'


interface PageInfo {
  name: string
  role: string
  resumeUrl: string
}
// Define the ISocials type
interface ISocials {
  _id: string;
  url: string;
  title: string;
}

interface Props {
  pageInfo: PageInfo
  socials:ISocials
}


const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Hardik8491', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/hardikbhammar', icon: Linkedin },
  { name: 'Telegram', url: 'https://t.me/hardik8491', icon: Send },
  { name: 'Instagram', url: 'https://instagram.com/hardik_8491', icon: Instagram },
  { name: 'Twitter', url: 'https://twitter.com/hardik_8491', icon: Twitter },
  { name: 'Email', url: 'mailto:hardikbhammar808@gmail.com', icon: Mail },
]

export default function HeroSection({ pageInfo,socials}: Props) {
 
  const [isDownloading, setIsDownloading] = useState(false)
  //const [fileUrl, setFileUrl] = useState('https://drive.google.com/file/d/1Lr-BiH7L9YQaMB_CI0eI-zXMgyv6xxXk/view?usp=sharing');
  const fileUrl = "https://drive.google.com/uc?export=download&id=1Lr-BiH7L9YQaMB_CI0eI-zXMgyv6xxXk";

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isHovering, setIsHovering] = useState(false)
  const [error, setError] = useState(null);

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const controls = useAnimation()
  const textControls = useAnimation()
  const backgroundControls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [50, 0],
      opacity: [0, 1],
      transition: { duration: 0.8, ease: "easeOut" }
    })
    textControls.start({
      opacity: [0, 1],
      transition: { duration: 0.8, delay: 0.5, ease: "easeOut" }
    })
    backgroundControls.start({
      opacity: [0, 0.5],
      scale: [0.9, 1],
      transition: { duration: 1, ease: "easeOut" }
    })
  }, [controls, textControls, backgroundControls])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])


  const handleDownload = async () => {
    if (pageInfo?.resumeUrl) {
      setIsDownloading(true);
      try {
        const response = await fetch(pageInfo.resumeUrl);
        if (!response.ok) throw new Error('Failed to fetch resume');
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        toast({
          title: "Resume downloaded successfully",
          description: "Check your downloads folder.",
        });
      } catch (error) {
        console.error("Failed to download resume:", error);
        toast({
          title: "Download failed",
          description: "Please try again later or contact for support.",
          variant: "destructive",
        });
      } finally {
        setIsDownloading(false);
      }
    } else {
      toast({
        title: "Resume not available",
        description: "The resume file is currently not available.",
        variant: "destructive",
      });
    }
  };
  

  // Fetch the file URL from Sanity based on the file reference



  const cursorVariants: Variants = {
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
      mixBlendMode: "difference" as const, // Correctly asserting the value
    }
  };

  const springConfig = { type: "spring", stiffness: 500, damping: 28 }

  const handleMouseEnter = () => {
    setCursorVariant("button")
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setCursorVariant("default")
    setIsHovering(false)
  }

  return (
    <section ref={ref} className="relative  min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50 ">
      <motion.div
        style={{ y, opacity, scale }}
        className="z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          {pageInfo?.name?.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h2 
          className="text-2xl md:text-3xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={textControls}
        >
          <AnimatePresence>
            {pageInfo?.role?.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.h2>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
           <Link href="#contact">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-lg font-semibold relative overflow-hidden group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.span
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Let&apos;s Talk
            </motion.span>
            <motion.span 
              className="absolute inset-0 bg-primary-foreground"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </Button>
         </Link>
          <a href={fileUrl} download>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto text-lg font-semibold relative overflow-hidden group"

            // disabled={isDownloading || !pageInfo?.resumeUrl}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              {isDownloading ? (
                <motion.span
                  key="downloading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </motion.span>
              ) : (
                <motion.span
                  key="download"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Download className="mr-2 h-5 w-5" /> Download Resume
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span 
              className="absolute inset-0 bg-primary"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </Button>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden">
          <motion.div 
            className="flex flex-wrap justify-center gap-6 p-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >


{socials &&  socials.map((link: ISocials, index: number) => {
  // Determine the correct icon based on the index
  const IconComponent = (() => {
    switch (index) {
      case 0:
        return SiLeetcode;
      case 1:
        return FaLinkedin;
      case 2:
        return FaFacebook;
      case 3:
        return FaGithub;
      default:
        return null;
    }
  })();

  return (
    <motion.div
      key={link._id}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
    >
      <Link
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 rounded-full',
          'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300',
          'group relative overflow-hidden'
        )}
        aria-label={link.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="absolute inset-0 bg-primary-foreground"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />
        {/* Render the selected icon */}
        {IconComponent && <IconComponent className="w-5 h-5 z-10 relative" />}
      </Link>
    </motion.div>
  );
})}
          </motion.div>
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
            background: isHovering 
              ? [
                  "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0) 50%)",
                  "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0) 50%)"
                ]
              : "none",
          }}
          transition={{ duration: 0.3 }}
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
        <motion.div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
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

