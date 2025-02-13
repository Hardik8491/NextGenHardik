'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { PhoneIcon, InboxIcon as EnvelopeIcon, MapPinIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import toast from 'react-hot-toast'

const myContact = [
  {
    icon: <PhoneIcon className="text-primary h-7 w-7" />,
    label: "Phone",
    line1: "+91 7046478268",
    line2: "+91 8469208491",
  },
  {
    icon: <EnvelopeIcon className="text-primary h-7 w-7" />,
    label: "Email",
    line1: "hardikbhammar808@gmail.com",
    line2: "hardikbhammar88@gmail.com",
  },
  {
    icon: <MapPinIcon className="text-primary h-7 w-7" />,
    label: "Address",
    line1: "sector 27 Gandhinagar Gujarat 382027",
    line2: "Gujarat, India",
  },
]

export default function Contact({contact}:{contact:any}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulating an API call
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        toast.success(
          "Thank you for reaching out. I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(
        'Failed to send message. Please try again later'
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later"      );
    } finally {
      setIsSubmitting(false);
    }
  
    await new Promise(resolve => setTimeout(resolve, 1500))
    window.location.href = `mailto:hardikbhammar808@gmail.com?subject=New Message From ${formData.name}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`
    toast.success(
       "Thank you for reaching out. I'll get back to you soon."
    )
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id='contact'  ref={containerRef} className="relative py-20 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Contact Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s connect! Whether you have a project in mind or just want to say hello, I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                {myContact.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center space-x-4 rounded-lg p-4 bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="shrink-0"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.line1}</p>
                      <p className="text-sm text-muted-foreground">{item.line2}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50 backdrop-blur-sm border-primary/10 transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50 backdrop-blur-sm border-primary/10 transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-background/50 backdrop-blur-sm border-primary/10 transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isSubmitting ? 'submitting' : 'idle'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          © {new Date().getFullYear()} All Rights Reserved by Hardik.
        </motion.div> */}
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