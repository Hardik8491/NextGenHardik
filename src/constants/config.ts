type TSection = {
    p: string;
    h2: string;
    content?: string;
};

type TConfig = {
    html: {
        title: string;
        fullName: string;
        email: string;
    };
    hero: {
        name: string;
        p: string[];
    };
    contact: {
        form: {
            name: {
                span: string;
                placeholder: string;
            };
            email: {
                span: string;
                placeholder: string;
            };
            message: {
                span: string;
                placeholder: string;
            };
        };
    } & TSection;
    sections: {
        about: Required<TSection>;
        experience: TSection;
        feedbacks: TSection;
        works: Required<TSection>;
    };
};

export const config: TConfig = {
    html: {
        title: "John Doe — 3D Portfolio",
        fullName: "John Doe",
        email: "johndoe@mail.com",
    },
    hero: {
        name: "John Doe",
        p: ["I develop 3D visuals, user", "interfaces and web applications"],
    },
    contact: {
        p: "Get in touch",
        h2: "Contact.",
        form: {
            name: {
                span: "Your Name",
                placeholder: "What's your name?",
            },
            email: { span: "Your Email", placeholder: "What's your email?" },
            message: {
                span: "Your Message",
                placeholder: "What do you want to say?",
            },
        },
    },
    sections: {
        about: {
            p: "Introduction",
            h2: "Overview.",
            content: `I'm a skilled software developer with experience in TypeScript and
      JavaScript, and expertise in frameworks like React, Node.js, and
      Three.js. I'm a quick learner and collaborate closely with clients to
      create efficient, scalable, and user-friendly solutions that solve
      real-world problems. Let's work together to bring your ideas to life!`,
        },
        experience: {
            p: "",
            h2: "Work Experience",
        },
        feedbacks: {
            p: "What others say",
            h2: "Testimonials.",
        },
        works: {
            p: "My work",
            h2: "Projects.",
            content: `Following projects showcases my skills and experience through
    real-world examples of my work. Each project is briefly described with
    links to code repositories and live demos in it. It reflects my
    ability to solve complex problems, work with different technologies,
    and manage projects effectively.`,
        },
    },
};

export const LocalConfig = {
    values: {
      TZ: process.env.TZ,
      NODE_ENV: process.env.NODE_ENV,
      AUTOPREFIXER_GRID: process.env.AUTOPREFIXER_GRID,
      NEXT_PUBLIC_GTAG_ID: process.env.NEXT_PUBLIC_GTAG_ID,
      NEXT_PUBLIC_GITHUB_TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      NEXT_PUBLIC_VERCEL_TOKEN: process.env.NEXT_PUBLIC_VERCEL_TOKEN,
      NEXT_PUBLIC_RESUME_LINK: process.env.NEXT_PUBLIC_RESUME_LINK || "#",
    },
  };