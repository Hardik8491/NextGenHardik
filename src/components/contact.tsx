"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import {
    PhoneIcon,
    InboxIcon as EnvelopeIcon,
    MapPinIcon,
    CheckCircle,
    Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    message: z
        .string()
        .min(10, { message: "Message must be at least 10 characters" }),
});

const myContact = [
    {
        icon: <PhoneIcon className='text-primary h-7 w-7' />,
        label: "Phone",
        line1: "+91 7046478268",
        line2: "+91 8469208491",
        href: "tel:+917046478268",
    },
    {
        icon: <EnvelopeIcon className='text-primary h-7 w-7' />,
        label: "Email",
        line1: "hardikbhammar808@gmail.com",
        line2: "hardikbhammar88@gmail.com",
        href: "mailto:hardikbhammar808@gmail.com",
    },
    {
        icon: <MapPinIcon className='text-primary h-7 w-7' />,
        label: "Address",
        line1: "sector 27 Gandhinagar Gujarat 382027",
        line2: "Gujarat, India",
        href: "https://maps.google.com/?q=Gandhinagar+Gujarat+382027",
    },
];

type FormState = {
    name: string;
    email: string;
    message: string;
};

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
};

export default function Contact({ contact }: { contact: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });

    const [formData, setFormData] = useState<FormState>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0]
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.8, 1, 1, 0.8]
    );

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const validateField = (name: keyof FormState, value: string) => {
        try {
            const fieldSchema = contactSchema.shape[name];
            fieldSchema.parse(value);
            setErrors((prev) => ({ ...prev, [name]: undefined }));
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: error.errors[0].message,
                }));
                return false;
            }
            return false;
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name as keyof FormState, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        Object.entries(formData).forEach(([key, value]) => {
            const fieldValid = validateField(key as keyof FormState, value);
            if (!fieldValid) isValid = false;
        });

        if (!isValid) {
            toast({
                title: "Form validation failed",
                description: "Please check the form for errors",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              });
          
              const result = await response.json();

            // Success state
            setIsSuccess(true);
            toast({
                title: "Message sent successfully!",
                description:
                    "Thank you for reaching out. I'll get back to you soon.",
            });

            // Reset form after success
            setFormData({ name: "", email: "", message: "" });

            // Reset success state after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            toast({
                title: "Failed to send message",
                description:
                    "Please try again later or contact me directly via email.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * i,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    return (
        <section
            id='contact'
            ref={containerRef}
            className='relative py-20 bg-gradient-to-b from-background to-background/50 overflow-hidden'
        >
            <div className='container mx-auto max-w-7xl px-4'>
                <motion.div
                    style={{ opacity, scale }}
                    className='text-center mb-16'
                >
                    <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
                        Contact Me
                    </h2>
                    <p className='text-muted-foreground max-w-2xl mx-auto'>
                        Let&apos;s connect! Whether you have a project in mind
                        or just want to say hello, I&apos;d love to hear from
                        you.
                    </p>
                </motion.div>

                <div className='grid gap-8 md:grid-cols-2'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{
                            opacity: isInView ? 1 : 0,
                            x: isInView ? 0 : -50,
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className='h-full bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden'>
                            <CardHeader>
                                <CardTitle className='text-2xl font-bold'>
                                    Get in Touch
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='grid gap-6'>
                                {myContact.map((item, index) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        target={
                                            item.label === "Address"
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            item.label === "Address"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className='flex items-center space-x-4 rounded-lg p-4 bg-primary/5 hover:bg-primary/10 transition-colors duration-300'
                                        custom={index}
                                        variants={contactItemVariants}
                                        initial='hidden'
                                        animate={
                                            isInView ? "visible" : "hidden"
                                        }
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow:
                                                "0 4px 20px rgba(0,0,0,0.1)",
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.div
                                            whileHover={{
                                                rotate: 360,
                                                scale: 1.2,
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className='shrink-0 bg-primary/10 p-3 rounded-full'
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <div>
                                            <h3 className='font-medium'>
                                                {item.label}
                                            </h3>
                                            <p className='text-sm text-muted-foreground'>
                                                {item.line1}
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                {item.line2}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                            opacity: isInView ? 1 : 0,
                            x: isInView ? 0 : 50,
                        }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className='h-full bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden'>
                            <CardHeader>
                                <CardTitle className='text-2xl font-bold'>
                                    Send a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className='grid gap-4'
                                >
                                    <div className='grid gap-2'>
                                        <Label htmlFor='name'>Name</Label>
                                        <Input
                                            id='name'
                                            name='name'
                                            placeholder='Your name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`bg-background/50 backdrop-blur-sm border-primary/10 transition-all duration-300 focus:ring-2 focus:ring-primary ${errors.name ? "border-red-500" : ""}`}
                                            aria-invalid={!!errors.name}
                                            aria-describedby={
                                                errors.name
                                                    ? "name-error"
                                                    : undefined
                                            }
                                        />
                                        {errors.name && (
                                            <motion.p
                                                id='name-error'
                                                className='text-red-500 text-xs mt-1'
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </div>
                                    <div className='grid gap-2'>
                                        <Label htmlFor='email'>Email</Label>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='Your email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`bg-background/50 backdrop-blur-sm border-primary/10 transition-all duration-300 focus:ring-2 focus:ring-primary ${errors.email ? "border-red-500" : ""}`}
                                            aria-invalid={!!errors.email}
                                            aria-describedby={
                                                errors.email
                                                    ? "email-error"
                                                    : undefined
                                            }
                                        />
                                        {errors.email && (
                                            <motion.p
                                                id='email-error'
                                                className='text-red-500 text-xs mt-1'
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </div>
                                    <div className='grid gap-2'>
                                        <Label htmlFor='message'>Message</Label>
                                        <Textarea
                                            id='message'
                                            name='message'
                                            placeholder='Your message'
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`bg-background/50 backdrop-blur-sm border-primary/10 transition-all duration-300 focus:ring-2 focus:ring-primary min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                                            aria-invalid={!!errors.message}
                                            aria-describedby={
                                                errors.message
                                                    ? "message-error"
                                                    : undefined
                                            }
                                        />
                                        {errors.message && (
                                            <motion.p
                                                id='message-error'
                                                className='text-red-500 text-xs mt-1'
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.message}
                                            </motion.p>
                                        )}
                                    </div>
                                    <AnimatePresence mode='wait'>
                                        <motion.div
                                            key={
                                                isSubmitting
                                                    ? "submitting"
                                                    : isSuccess
                                                      ? "success"
                                                      : "idle"
                                            }
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Button
                                                type='submit'
                                                className='w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300'
                                                disabled={
                                                    isSubmitting || isSuccess
                                                }
                                            >
                                                {isSubmitting ? (
                                                    <motion.div className='flex items-center'>
                                                        <Loader2 className='h-5 w-5 mr-2 animate-spin' />
                                                        Sending...
                                                    </motion.div>
                                                ) : isSuccess ? (
                                                    <motion.div
                                                        className='flex items-center'
                                                        initial={{ scale: 0.8 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 200,
                                                            damping: 10,
                                                        }}
                                                    >
                                                        <CheckCircle className='h-5 w-5 mr-2' />
                                                        Sent Successfully!
                                                    </motion.div>
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
            </div>

            {/* Background elements */}
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
}
