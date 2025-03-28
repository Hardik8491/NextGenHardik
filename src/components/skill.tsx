'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity'

type Skill = {
  title: string
  image: {
    asset: {
      _ref: string
    }
  }
}

type SkillSet = {
  title: string
  skills: Skill[]
}

type Props = {
  skillsSet: SkillSet[] | null
}


const SkillItem = ({ data }: { data: Skill }) => {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden bg-background/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4 flex flex-col items-center gap-3">
          {data?.image && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-0.5">
              <Image
                src={urlFor(data.image.asset._ref).url()}
                alt={data.title}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </div>
          )}
          <p className="text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">{data.title}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Skills({ skillsSet }: Props) {
  const [filter, setFilter] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!skillsSet) return null

  const filteredSkills = skillsSet.filter(category =>
    filter === 'All' || category.title === filter
  )

  const allSkills = filteredSkills.flatMap(category =>
    category.skills.filter(skill =>
      skill.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const visibleCategories = showAllCategories ? skillsSet : skillsSet.slice(0, 5)

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">My Skills</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore my diverse skill set across various technologies and domains.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              variant={filter === 'All' ? 'default' : 'outline'}
              onClick={() => setFilter('All')}
              className="rounded-full"
            >
              All
            </Button>
            {visibleCategories.map(category => (
              <Button
                key={category.title}
                variant={filter === category.title ? 'default' : 'outline'}
                onClick={() => setFilter(category.title)}
                className="rounded-full"
              >
                {category.title}
              </Button>
            ))}
            {!showAllCategories && skillsSet.length > 5 && (
              <Button
                variant="outline"
                onClick={() => setShowAllCategories(true)}
                className="rounded-full"
              >
                More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search skills..."
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="sync">
          {filteredSkills.map((category, categoryIndex) => (
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
                      {category.skills.map((skill, index) => (
                        <SkillItem key={`${category.title}-skill-${index}`} data={skill} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {allSkills.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mt-8"
          >
            No skills found matching your search.
          </motion.p>
        )}
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
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
      </div>
    </section>
  )
}