import { PrismaClient } from '@prisma/client'
import 'next-auth'

declare global {
  namespace globalThis {
    var prisma: PrismaClient
    var cardWidth: 300
  }

  interface Prompt {
    id: string
    type: 'language' | 'image'
    prompt: string
    // image prompt
    image?: string
    imageHeight?: number
    imageWidth?: number
    model?: string
    // language prompt
    title?: string
    likesCount: number
    likedByCurrentUser: boolean
  }
}

declare module 'next-auth' {
  interface Session {
    userId?: string
  }
}
