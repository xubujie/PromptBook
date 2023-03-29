import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

function getDateRange(timeframe) {
  const now = new Date()
  let startDate = new Date(now)

  switch (timeframe) {
    case 'weekly':
      startDate.setDate(now.getDate() - 7)
      break
    case 'monthly':
      startDate.setMonth(now.getMonth() - 1)
      break
    default:
      startDate.setFullYear(2020)
  }

  return startDate
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const start = parseInt(req.query.start as string) || 0
  const limit = parseInt(req.query.limit as string) || 20
  const searchQuery = req.query.q ? (req.query.q as string).toLowerCase() : ''
  const orderByParam = (req.query.orderBy as string) || 'recent'

  const startDate = getDateRange(orderByParam)

  // Fetch all prompts with the specified criteria
  const allPrompts = await prisma.prompt.findMany({
    where: {
      OR: [{ title: { contains: searchQuery } }, { prompt: { contains: searchQuery } }],
      type: req.query.t !== 'all' ? (req.query.t as string) : undefined,
    },
    include: {
      likes: {
        where: startDate ? { createdAt: { gte: startDate } } : {},
        select: {
          userEmail: true,
        },
      },
    },
  })

  // Sort prompts based on the orderByParam
  const sortedPrompts = allPrompts.sort((a, b) => {
    if (orderByParam === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      const aLikes = a.likes.length
      const bLikes = b.likes.length

      if (aLikes > bLikes) return -1
      if (aLikes < bLikes) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  // Paginate sorted prompts
  const prompts = sortedPrompts.slice(start, start + limit)

  const promptsWithLikes = prompts.map((prompt) => ({
    ...prompt,
    likesCount: prompt.likes.length,
    likedByCurrentUser: !!prompt.likes.find((like) => like.userEmail === session?.user?.email),
  }))

  res.status(200).json(promptsWithLikes)
}
