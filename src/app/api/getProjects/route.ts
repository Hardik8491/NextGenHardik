import { groq } from "next-sanity";

import { NextResponse } from "next/server";
import { Project } from "../../../../typings";
import { sanityClient } from "@/lib/sanity";

const query = groq`*[_type=='project']{...,technologies[]->}`;

type Data = {
    projects: Project[];
};
export const revalidate = 0;
export async function GET() {
    const projects: Project[] = await sanityClient.fetch(query);
    return NextResponse.json(projects);
}
