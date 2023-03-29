import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle API logic here
  const id = req.query.id as string

  const prompt = await prisma.prompt.findUnique({
    where: { id },
    include: {
      likes: {
        select: {
          userEmail: true,
        },
      },
    },
  })

  if (!prompt) {
    res.status(404).json({ message: 'Prompt not found' })
    return
  }

  const promptData = {
    ...prompt,
    likesCount: prompt.likes.length,
    likedByCurrentUser: false,
  }

  res.status(200).json(promptData)
}
