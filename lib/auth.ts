import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
 
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
    error:"/login"
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  },
  callbacks: {
    async signIn({ user }) {
      // Récupère les domaines autorisés depuis la variable d'environnement
      const allowedDomains = (process.env.ALLOWED_DOMAINS || '').split(',');
  
      // Vérifie si l'email se termine par l'un des domaines autorisés
      const isAllowed = allowedDomains.some(domain => user.email?.endsWith(domain.trim()));
  
      if (!isAllowed) {
        throw new Error("You are not allowed to access this platform");
      }
  
      return true;
    },
  

    jwt: async ({ token, user }) => {
      if (user) {
      
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }) {
     
      if (session.user) {
        session.user.role = token.role;
        
      }
      return session;
    },
    
  },
  
};