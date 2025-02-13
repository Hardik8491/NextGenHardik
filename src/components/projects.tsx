"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

interface Project {
  title: string;
  description: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  technologies: {
    _id: string;
    title: string;
    image: {
      asset: {
        _ref: string;
      };
    };
  }[];
  githubUrl?: string;
  linkToBuild?: string;
}

interface ProjectListProps {
  projects: Project[];
  limit?: number;
}

const ProjectItem = ({ project }: { project: Project }) => (
  
  <Card className="w-full max-w-7xl overflow-hidden">
    <CardContent className="p-0">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 aspect-video ">
          <Image
            src={urlFor(project?.image?.asset?._ref).url()}
            alt={`Screenshot of ${project.title}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <div
                  key={tech._id}
                  className="flex items-center bg-primary/10 rounded-full px-3 py-1"
                >
                  <Image
                    src={urlFor(tech.image.asset._ref).url()}
                    alt={tech.title}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <span className="text-xs font-medium">{tech.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            {project.githubUrl && (
              <Link href={project.githubUrl} passHref>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </Link>
            )}
            {project.linkToBuild && (
              <Link
                href={project.linkToBuild}
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Projects = ({ projects, limit }: ProjectListProps) => {
  console.log(projects);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + displayedProjects.length) % displayedProjects.length
    );
  };

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
    },
  };

  const springConfig = { type: "spring", stiffness: 500, damping: 28 };

  const handleMouseEnter = () => setCursorVariant("button");
  const handleMouseLeave = () => setCursorVariant("default");

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-20 bg-gradient-to-b from-background to-background/80 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div style={{ y, opacity, scale }} className="text-center mb-12">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore some of my recent work and personal projects. Each project
            showcases different skills and technologies.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center mb-8"
          >
            <ProjectItem project={displayedProjects[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="flex justify-center mt-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            onClick={prevProject}
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Previous project"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={nextProject}
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Next project"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          className="flex justify-center mt-4 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {displayedProjects.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-3 h-3 rounded-full p-0 transition-colors ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-muted hover:bg-primary/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to project ${index + 1}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary/50 pointer-events-none z-50 mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={springConfig}
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0) 50%)",
              "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0) 50%)",
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
      </div>
    </section>
  );
};

export default Projects;
