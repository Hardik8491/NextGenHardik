import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import type { MouseEventHandler, ReactNode, RefObject } from "react";

export interface INavMenuItem {
    id: string;
    title: string;
    path: string;
    section: string;
    submenu?: INavMenuItem[];
}

export interface INavItem {
    name: string;
    link: string;
    icon: IconProp;
}

export interface IExperienceItem {
    designation: string;
    company: string;
    startDate: string;
    endDate: string;
    isCurrentJob: boolean;
    location: string;
    shortDescription: string;
    description: string;
}

export enum RepoType {
    Public,
    Private,
}

export enum ProjectType {
    Personal,
    JobWork,
    Freelance,
}

export interface IProjectItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    repoType: RepoType;
    projectType?: ProjectType;
    githubUrl?: string;
    url?: string;
    tags?: string[];
    sceenshots?: string[];
    about?: string;
}

export type IServiceItem = {
    id: number | string;
    title: string;
    icon?: IconDefinition;
    shortDescription: string;
    description: string;
    icons: string[];
};

export interface ISkillListItem {
    title: string;
    items: ISkillItem[];
}

export enum SkillLevel {
    Expert,
    Intermediate,
    Begginer,
}

export interface ISkillItem {
    title: string;
    level?: SkillLevel;
    icon?: string;
}

export interface ISocialLinkItem {
    url: string;
    icon: IconDefinition;
    text: string;
    name?: string;
}

export interface MenutItemProps {
    items: INavMenuItem;
    depthLevel: number;
    mobileNav: boolean;
    handleCloseMobileMenu: () => void;
    current?: string;
}

export interface DropdownMenuProps
    extends Omit<MenutItemProps, "items" | "current"> {
    submenus: INavMenuItem[];
    dropdown: boolean;
}

export interface ButtonComponentProps {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    name?: string;
}

export interface CoreComponentsProps {
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    id?: string;
    elementRef?: RefObject<HTMLDivElement>;
}

export interface ViewportProps {
    root?: null | undefined;
    rootMargin?: string | undefined;
    threshold?: number | undefined;
}

export interface ShootingStarProps {
    vw: number;
    vh: number;
}
export type TCommonProps = {
    title?: string;
    name?: string;
    icon?: string;
};

export type TExperience = {
    companyName: string;
    iconBg: string;
    date: string;
    points: string[];
} & Required<Omit<TCommonProps, "name">>;

export type TTestimonial = {
    testimonial: string;
    designation: string;
    company: string;
    image: string;
} & Required<Pick<TCommonProps, "name">>;

export type TProject = {
    description: string;
    tags: {
        name: string;
        color: string;
    }[];
    image: string;
    sourceCodeLink: string;
} & Required<Pick<TCommonProps, "name">>;

export type TTechnology = Required<Omit<TCommonProps, "title">>;

export type TNavLink = {
    id: string;
} & Required<Pick<TCommonProps, "title">>;

export type TService = Required<Omit<TCommonProps, "name">>;

export type TMotion = {
    direction: "up" | "down" | "left" | "right" | "";
    type: "tween" | "spring" | "just" | "";
    delay: number;
    duration: number;
};