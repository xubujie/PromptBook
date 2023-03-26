import { PrismaClient } from '@prisma/client'
import 'next-auth'

declare global {
  namespace globalThis {
    var prisma: PrismaClient
    var cardWidth: 300
  }
}

declare module 'next-auth' {
  interface Session {
    userId?: string
  }
}
