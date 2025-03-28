"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, GraduationCap, Search, Filter, BookOpen } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { urlFor } from "@/lib/sanity"

type Category = {
  title: string
  skills: Skill[]
}

interface Skill {
  title: string
  image: {
    asset: {
      _ref: string
    }
  }
}

const EducationItem = ({
  data,
  isActive,
  onClick,
  index,
}: {
  data: any
  isActive: boolean
  onClick: () => void
  index: number
}) => {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="w-full cursor-pointer"
    >
      <Card
        className={`h-full transition-all duration-300 ${isActive ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"} bg-background/50 backdrop-blur-sm border-primary/10`}
      >
        <CardContent className="p-6 flex flex-col items-center justify-between h-full">
          <div className="text-center">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 bg-primary/10 p-4 rounded-full"
            >
              <GraduationCap className="w-12 h-12 text-primary" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">{data.jobTitle || data.degree}</h3>
            <p className="text-muted-foreground">{data.company || data.institution}</p>
          </div>
          <div className="mt-4 px-3 py-1 border border-primary text-primary rounded-full text-sm">
            {data.dateStarted || data.startDate} - {data.dateEnded || data.endDate}
          </div>
          <AnimatePresence mode="sync">
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-center"
              >
                <p className="text-sm">{data.points || data.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const SkillItem = ({ data, index }: { data: Skill; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
      whileHover={{ y: -5 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-primary/10">
        <CardContent className="p-4 flex flex-col items-center gap-3">
          {data?.image && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-0.5 group-hover:shadow-glow transition-all duration-300">
              <Image
                src={urlFor(data.image.asset._ref).url() || "/placeholder.svg"}
                alt={data.title}
                width={64}
                height={64}
                className="rounded-full object-cover p-1 bg-background/80 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}
          <p className="text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">
            {data.title}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function EducationAndSkills({ education, skillsSet }: { education: any; skillsSet: any }) {
  const [activeEducationIndex, setActiveEducationIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("education")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const nextEducation = () => {
    setActiveEducationIndex((prev) => (prev === null || prev === education?.length - 1 ? 0 : prev + 1))
  }

  const prevEducation = () => {
    setActiveEducationIndex((prev) => (prev === null || prev === 0 ? education?.length - 1 : prev - 1))
  }

  const filteredSkills = skillsSet?.filter((category: Category) => filter === "All" || category?.title === filter)

  const allSkills = filteredSkills?.flatMap((category: Category) =>
    category.skills.filter((skill: Skill) => skill.title.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-gradient-to-b from-background to-background/50 overflow-hidden"
      id="education-and-skills"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Education & Skills
        </motion.h2>

        <Tabs defaultValue="education" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="education" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Education</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Skills</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="education" className="mt-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView && activeTab === "education" ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
             <AnimatePresence mode="sync">
                {education &&
                  education.map((edu: any, index: number) => (
                    <EducationItem
                      key={`education-${index}`}
                      data={edu}
                      isActive={index === activeEducationIndex}
                      onClick={() => setActiveEducationIndex(index === activeEducationIndex ? null : index)}
                      index={index}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="flex justify-center mt-8 gap-4"
              variants={itemVariants}
              initial="hidden"
              animate={isInView && activeTab === "education" ? "visible" : "hidden"}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={prevEducation}
                variant="outline"
                size="icon"
                aria-label="Previous education"
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={nextEducation}
                variant="outline"
                size="icon"
                aria-label="Next education"
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView && activeTab === "skills" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search skills..."
                    className="pl-10 rounded-full w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="relative w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full sm:w-auto"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    <span>{filter === "All" ? "All Categories" : filter}</span>
                  </Button>

                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-2 w-full bg-background/90 backdrop-blur-sm rounded-lg shadow-lg border border-primary/10 p-2"
                      >
                        <Button
                          variant={filter === "All" ? "default" : "ghost"}
                          className="w-full justify-start mb-1"
                          onClick={() => {
                            setFilter("All")
                            setIsFilterOpen(false)
                          }}
                        >
                          All Categories
                        </Button>
                        {skillsSet?.map((category: Category) => (
                          <Button
                            key={category.title}
                            variant={filter === category.title ? "default" : "ghost"}
                            className="w-full justify-start mb-1"
                            onClick={() => {
                              setFilter(category.title)
                              setIsFilterOpen(false)
                            }}
                          >
                            {category.title}
                          </Button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence>
                {filteredSkills?.map((category: any, categoryIndex: number) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    className="mb-12"
                  >
                    <Card className="overflow-hidden bg-background/50 backdrop-blur-sm border-primary/10">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-6 inline-block relative">
                          <span className="relative z-10">{category.title}</span>
                          <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-10"></span>
                        </h3>
                        {category.skills.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {category.skills.map((skill: Skill, index: number) => (
                              <SkillItem key={`${category.title}-skill-${index}`} data={skill} index={index} />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {allSkills?.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8">
                  <div className="mb-4 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-lg">No skills found matching your search.</p>
                  </div>
                  <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-2">
                    Clear Search
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
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

