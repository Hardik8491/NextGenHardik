"use client";

import { useState, useEffect, useRef } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Github,
    Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Badge } from "@/components/ui/badge";

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

const ProjectItem = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.3 });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='w-full'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card className='w-full overflow-hidden bg-background/50 backdrop-blur-sm border-primary/10 hover:shadow-xl transition-all duration-500 group'>
                <CardContent className='p-0'>
                    <div className='flex flex-col md:flex-row'>
                        <div className='relative w-full md:w-1/2 aspect-video overflow-hidden'>
                            <motion.div
                                className='absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <Image
                                src={
                                    urlFor(project?.image?.asset?._ref).url() ||
                                    "/placeholder.svg"
                                }
                                alt={`Screenshot of ${project.title}`}
                                layout='fill'
                                objectFit='cover'
                                className='rounded-t-lg md:rounded-l-lg md:rounded-tr-none transition-transform duration-500 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'>
                                {project.linkToBuild && (
                                    <Link
                                        href={project.linkToBuild}
                                        passHref
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button
                                            variant='secondary'
                                            size='sm'
                                            className='m-2'
                                        >
                                            <Eye className='mr-2 h-4 w-4' />
                                            Preview
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className='p-6 md:w-1/2 flex flex-col justify-between'>
                            <div>
                                <h3 className='text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
                                    {project.title}
                                </h3>
                                <p className='text-muted-foreground mb-4 line-clamp-3 md:line-clamp-4'>
                                    {project.description}
                                </p>
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {project.technologies.map((tech) => (
                                        <Badge
                                            key={tech._id}
                                            className='flex items-center bg-primary/10 hover:bg-primary/20 transition-colors duration-300'
                                        >
                                            {tech.image && (
                                                <Image
                                                    src={
                                                        urlFor(
                                                            tech.image.asset
                                                                ._ref
                                                        ).url() ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={tech.title}
                                                    width={16}
                                                    height={16}
                                                    className='mr-2 rounded-full'
                                                />
                                            )}
                                            <span className='text-xs font-medium'>
                                                {tech.title}
                                            </span>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-4 mt-4'>
                                {project.githubUrl && (
                                    <Link
                                        href={project.githubUrl}
                                        passHref
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            className='flex items-center group/btn hover:bg-primary/10 border-primary/20'
                                        >
                                            <Github className='w-4 h-4 mr-2 group-hover/btn:text-primary transition-colors' />
                                            <span className='group-hover/btn:text-primary transition-colors'>
                                                Code
                                            </span>
                                        </Button>
                                    </Link>
                                )}
                                {project.linkToBuild && (
                                    <Link
                                        href={project.linkToBuild}
                                        passHref
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button
                                            variant='default'
                                            size='sm'
                                            className='bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300'
                                        >
                                            <ExternalLink className='w-4 h-4 mr-2' />
                                            Live Demo
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const Projects = ({ projects, limit = 5 }: ProjectListProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const displayedProjects = limit ? projects?.slice(0, limit) : projects;

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (autoplay && displayedProjects?.length > 1) {
            autoplayRef.current = setInterval(() => {
                setCurrentIndex(
                    (prevIndex) => (prevIndex + 1) % displayedProjects.length
                );
            }, 5000);
        }

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [autoplay, displayedProjects]);

    const nextProject = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            setAutoplay(false);
        }
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % displayedProjects?.length
        );
    };

    const prevProject = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            setAutoplay(false);
        }
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + displayedProjects?.length) %
                displayedProjects?.length
        );
    };

    const goToProject = (index: number) => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            setAutoplay(false);
        }
        setCurrentIndex(index);
    };

    return (
        <section
            ref={ref}
            className='relative min-h-screen py-20 bg-gradient-to-b from-background to-background/80 overflow-hidden'
            id='projects'
        >
            <div className='container mx-auto max-w-7xl px-4'>
                <motion.div
                    style={{ y, opacity, scale }}
                    className='text-center mb-12'
                >
                    <motion.h2
                        className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5 }}
                    >
                        Featured Projects
                    </motion.h2>
                    <motion.p
                        className='text-muted-foreground max-w-2xl mx-auto'
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Explore some of my recent work and personal projects.
                        Each project showcases different skills and
                        technologies.
                    </motion.p>
                </motion.div>

                <AnimatePresence mode='wait'>
                    {displayedProjects && displayedProjects.length > 0 && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className='w-full flex justify-center mb-8'
                        >
                            <ProjectItem
                                project={displayedProjects[currentIndex]}
                                index={0}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {displayedProjects && displayedProjects.length > 1 && (
                    <>
                        <motion.div
                            className='flex justify-center mt-8 gap-4'
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button
                                onClick={prevProject}
                                variant='outline'
                                size='icon'
                                className='rounded-full hover:bg-primary hover:text-primary-foreground transition-colors'
                                aria-label='Previous project'
                            >
                                <ChevronLeft className='h-4 w-4' />
                            </Button>
                            <Button
                                onClick={nextProject}
                                variant='outline'
                                size='icon'
                                className='rounded-full hover:bg-primary hover:text-primary-foreground transition-colors'
                                aria-label='Next project'
                            >
                                <ChevronRight className='h-4 w-4' />
                            </Button>
                        </motion.div>

                        <motion.div
                            className='flex justify-center mt-4 gap-2'
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {displayedProjects.map((_, index) => (
                                <Button
                                    key={index}
                                    variant='ghost'
                                    size='sm'
                                    className={`w-3 h-3 rounded-full p-0 transition-colors ${
                                        index === currentIndex
                                            ? "bg-primary"
                                            : "bg-muted hover:bg-primary/50"
                                    }`}
                                    onClick={() => goToProject(index)}
                                    aria-label={`Go to project ${index + 1}`}
                                />
                            ))}
                        </motion.div>
                    </>
                )}

                {displayedProjects && displayedProjects.length > limit && (
                    <motion.div
                        className='flex justify-center mt-12'
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Link href='/projects'>
                            <Button
                                variant='outline'
                                className='border-primary/20 hover:border-primary/50 transition-all duration-300'
                            >
                                View All Projects
                                <ExternalLink className='ml-2 h-4 w-4' />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>

            <div className='absolute inset-0 -z-10'>
                <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]' />
                <motion.div
                    className='absolute inset-0'
                    animate={{
                        background: [
                            "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0) 50%)",
                            "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0) 50%)",
                        ],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent'
                    animate={{ scaleX: [0, 1] }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.div
                    className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent'
                    animate={{ scaleX: [0, 1] }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </section>
    );
};

export default Projects;
