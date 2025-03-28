import { groq } from "next-sanity";

import { NextResponse } from "next/server";
import { PageInfo } from "../../../../typings";
import { sanityClient } from "@/lib/sanity";

const query = groq`
*[_type=='pageInfo'][0]`;

type Data = {
    pageInfo: PageInfo[];
};
export const revalidate = 0;
export async function GET() {
    
    const pageInfo: PageInfo[] = await sanityClient.fetch(query);
    return NextResponse.json(pageInfo);
}
