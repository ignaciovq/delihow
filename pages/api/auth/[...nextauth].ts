// @ts-nocheck
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/prisma/prismaClient'
import { getUserByEmailAndPassword } from '@/services/user.service'
import { createHash } from 'crypto'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, req) {
        const { email, password } = credentials

        if (!email || !password) {
          return null
        }
        if (email?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
          return null
        }

        const passwordHash = createHash('sha256').update(password).digest('hex')
        const user = await getUserByEmailAndPassword(email, passwordHash)
        if (user) return user

        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.user = user
      }
      return Promise.resolve(token)
    },
    async session ({ session, token }) {
      session.user = token.user
      return Promise.resolve(session)
    }
  }
}

export default NextAuth(authOptions)
