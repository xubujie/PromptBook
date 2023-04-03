import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
// import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import primsadb from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID || '',
    //   clientSecret: process.env.FACEBOOK_SECRET || '',
    // }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  theme: {
    colorScheme: 'dark',
    logo: '/images/logo-color.png',
  },
  adapter: PrismaAdapter(primsadb),
  callbacks: {
    async jwt({ token }) {
      return token
    },
  },
}

export default NextAuth(authOptions)
