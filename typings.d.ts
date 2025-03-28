interface SanityBody {
}
interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}
export interface PageInfo extends SanityBody {
    _type?: "pageInfo";
    address?: string;
    backgroundInformation?: string;
    email?: string;
    role?: string;
    heroImage?: Image;
    name?: string;
    phoneNum?: string;
    profilePic?: Image;
    img?: string;
}

export interface Technology extends SanityBody {
    _type: "skill";
    image: Image;
    progress: number;
    title: string;
}

export interface Skill extends SanityBody {
    _type: "skill";
    image: Image;
    progress: number;
    title: string;
}
export interface SkillSet extends SanityBody {
    _type: "skillSet";
    title: string;
    skills: Skill[];
}
export interface Project extends SanityBody {
    title: string;
    _type: "project";
    Image: Image;
    linkToBuild: string;
    githubUrl?: String;
    summary: string;
    technologies: Technology[];
}
export interface Education extends SanityBody {
    _type: "education";
    company: string;
    dateStarted: string;
    dateEnded: string;
    jobTitle: string;
    points: string[];
}
export interface Social extends SanityBody {
    _type: "social";
    title: string;
    url: string;
    _id: string;


}

// /typings/index.ts

export interface Contact {
    _id: string;
    primaryMobile: string;
    secondaryMobile?: string;
    primaryEmail: string;
    secondaryEmail?: string;
    primaryAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    secondaryAddress?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  }
  