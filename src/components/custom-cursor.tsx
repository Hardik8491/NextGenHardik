"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Only show cursor on desktop
      if (!isVisible && window.innerWidth > 768) {
        setIsVisible(true)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = () => {
      const allClickables = document.querySelectorAll("a, button, [role='button'], input, select, textarea")

      allClickables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true))
        el.addEventListener("mouseleave", () => setIsHovered(false))
      })
    }

    // Setup event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Run once to set up hover events
    handleMouseEnter()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      const allClickables = document.querySelectorAll("a, button, [role='button'], input, select, textarea")
      allClickables.forEach((el) => {
        el.removeEventListener("mouseenter", () => setIsHovered(true))
        el.removeEventListener("mouseleave", () => setIsHovered(false))
      })
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Large outer cursor */}
      <motion.div
        className="hidden md:block fixed pointer-events-none z-50 w-10 h-10 rounded-full border-2 border-primary/50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovered ? 1.5 : 1,
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
          opacity: { duration: 0.2 },
        }}
      />

      {/* Small inner cursor */}
      <motion.div
        className="hidden md:block fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1,
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          mass: 0.1,
          opacity: { duration: 0.2 },
          scale: { type: "spring", stiffness: 500, damping: 10 },
        }}
      />
    </>
  )
}

