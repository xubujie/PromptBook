import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const start = parseInt(req.query.start as string) || 0
  const limit = parseInt(req.query.limit as string) || 10

  const prompts = await prisma.prompt.findMany({
    // where: {
    //   type: (req.query.type as string) || 'image',
    // },
    skip: start,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      likes: {
        select: {
          userEmail: true,
        },
      },
    },
  })
  const promptsWithLikes = prompts.map((prompt) => ({
    ...prompt,
    likesCount: prompt.likes.length,
    likedByCurrentUser: !!prompt.likes.find((like) => like.userEmail === session?.user?.email),
  }))

  res.status(200).json(promptsWithLikes)
}
