import { sanityClient } from "@/lib/sanity";
import { groq } from "next-sanity";

import { NextResponse } from "next/server";
import { SkillSet } from "../../../../typings";

const query = groq`*[_type=='skillSet']{...,skills[]->}`;

type Data = {
    socials: SkillSet;
};
export const revalidate = 0;
export async function GET() {
    const skills: SkillSet = await sanityClient.fetch(query);
    return NextResponse.json(skills);
}
