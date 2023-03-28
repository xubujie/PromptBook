import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const start = parseInt(req.query.start as string) || 0
  const limit = parseInt(req.query.limit as string) || 10
  const searchQuery = req.query.q ? (req.query.q as string).toLowerCase() : ''

  const prompts = await prisma.prompt.findMany({
    where: {
      // if the query param is not present, no filtering will be applied
      type: req.query.t !== 'all' ? (req.query.t as string) : undefined,
      OR: [{ title: { contains: searchQuery } }, { prompt: { contains: searchQuery } }],
    },
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
