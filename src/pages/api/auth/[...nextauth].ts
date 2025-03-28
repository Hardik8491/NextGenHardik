
import NextAuth, { NextAuthOptions } from "next-auth";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions:NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  
};

export default NextAuth(authOptions);