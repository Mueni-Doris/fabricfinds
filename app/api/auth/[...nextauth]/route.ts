// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy login logic for now
        if (
          credentials?.username === "love" &&
          credentials?.password === "secretsauce"
        ) {
          return {
            id: "1",
            name: "Love",
            email: "love@example.com",
          };
        }

        return null; // ❌ invalid login
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // add this in .env
});

export { handler as GET, handler as POST };
