import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany({
        where: { promptId: String(id) },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      })

      res.status(200).json(comments)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' })
    }
  } else if (req.method === 'POST') {
    const { content, authorEmail } = req.body

    try {
      const newComment = await prisma.comment.create({
        data: {
          promptId: String(id),
          content,
          authorEmail,
        },
        include: {
          author: true,
        },
      })

      res.status(200).json(newComment)
    } catch (error) {
      res.status(500).json({ error: `Failed to create comment with ${error}` })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
