import { PrismaClient } from '@prisma/client'

declare global {
  namespace globalThis {
    var prisma: PrismaClient
    var cardWidth: 300
  }

  interface ImagePrompt {
    id: string
    promptInput: string
    model: string
    outputImage: string
    imageHeight: number
    imageWidth: number
  }
}
