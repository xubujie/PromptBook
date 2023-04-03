import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, promptId } = req.body

  if (req.method === 'GET') {
    try {
      const start = parseInt(req.query.start as string) || 0
      const limit = parseInt(req.query.limit as string) || 10
      const likes = await prisma.like.findMany({
        where: {
          userEmail,
        },
        skip: start,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          prompt: {
            include: {
              likes: true,
            },
          },
        },
      })
      const prompts = likes.map((like) => ({
        ...like.prompt,
        likedByCurrentUser: true,
        likesCount: like.prompt.likes.length,
      }))
      res.status(200).json(prompts)
    } catch (error) {
      res.status(400).json({ message: 'Unable to get likes' })
    }
  } else if (req.method === 'POST') {
    try {
      const data = { userEmail, promptId }
      console.log(data)
      const like = await prisma.like.create({ data })
      res.status(201).json(like)
    } catch (error) {
      res.status(400).json({ message: 'Unable to create like' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const like = await prisma.like.delete({
        where: {
          userEmail_promptId: {
            userEmail,
            promptId,
          },
        },
      })
      res.status(200).json(like)
    } catch (error) {
      res.status(400).json({ message: 'Unable to delete like' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
