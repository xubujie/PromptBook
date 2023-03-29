import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany({
        where: { promptId: String(id) },
        orderBy: { createdAt: 'desc' },
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
          content,
          author: { connect: { email: authorEmail } },
          prompt: { connect: { id: String(id) } },
        },
      })

      res.status(200).json(newComment)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create comment' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
