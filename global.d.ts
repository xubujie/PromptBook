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
    npromt?: string
    // image prompt
    image?: string
    imageHeight?: number
    imageWidth?: number
    model?: string
    // language prompt
    title?: string
    link?: string
    likesCount: number
    likedByCurrentUser: boolean
    author: any
  }
  interface Comment {
    id: string
    promptId: string
    author: any
    authorEmail: string
    content: string
    createdAt: Date
  }
}

declare module 'next-auth' {
  interface Session {
    userId?: string
  }
}
