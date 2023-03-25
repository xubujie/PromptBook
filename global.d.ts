import { PrismaClient } from '@prisma/client'
import 'next-auth'

declare global {
  namespace globalThis {
    var prisma: PrismaClient
    var cardWidth: 300
  }
  interface ImagePrompt {
    id: string
    userId: string
    userImage: string
    promptInput: string
    model: string
    outputImage: string
    imageHeight: number
    imageWidth: number
    currentUser: string | undefined // Add this line
  }
}

declare module 'next-auth' {
  interface Session {
    userId?: string
  }
}
