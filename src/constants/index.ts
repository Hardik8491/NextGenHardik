import type { TExperience, TNavLink, TTechnology } from "../types";

import {
    cisco,
    css,
    docker,
    figma,
    git,
    html,
    javascript,
    mongodb,
    nodejs,
    reactjs,
    redux,
    tailwind,
    threejs,
    typescript,
} from "../../public/assets/index";
import ibm from "../../public/ibm.svg"
import amey from "../../public/amey.svg";
export const navLinks: TNavLink[] = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const technologies: TTechnology[] = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "figma",
        icon: figma,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences: TExperience[] = [
    {
        title: "Internship Trainee",
        companyName: "IBM SkillBuild ,Work From Home India",
        icon: ibm,
        iconBg: "#383E56",
        date: "June 2024 - July 2024",
        points: [
            "The IBM SkillsBuild eLearning-based internship provides a virtual platform for learners to gain practical skills in areas such as cybersecurity, data analysis, AI, and cloud computing.",
            "Through self-paced courses, interactive modules, and real-world projects, interns can enhance their technical expertise.",
            "The program offers mentorship from IBM professionals, ensuring personalized guidance and industry insights.",
            "Participants can earn badges and certifications that are recognized by employers.",
            "With a focus on developing job-ready skills, the internship supports career advancement and employability.",
            "The global accessibility of SkillsBuild allows for diverse networking opportunities, fostering collaboration across different regions.",
            "Overall, it combines theoretical learning with practical application in a flexible, online environment.",
          ],
    },  {
        title: "Software Engineer Intern",
        companyName: "AMEY EDUTECH LLP, Hybrid, Gandhinagar, Gujarat, India",
        icon: amey,
        iconBg: "#383E56",
        date: "Jun 2024 - Jul 2024",
        points: [
          "Worked on Full-Stack Development and Artificial Intelligence (AI).",
          "Developed and optimized front-end features using React.js.",
          "Implemented back-end services and APIs using Node.js and Express.",
          "Collaborated with cross-functional teams to gather requirements and design solutions.",
          "Performed data analysis and built machine learning models to enhance product features.",
          "Conducted code reviews and provided feedback to ensure code quality and best practices.",
          "Integrated third-party services and APIs to extend application functionalities.",
          "Participated in daily stand-ups and sprint planning sessions to ensure timely delivery of tasks.",
        ],
      }
];

export { experiences, technologies };
