import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { userId, imagePromptId, languagePromptId } = req.body

  if (req.method === 'GET') {
    try {
      const likes = await prisma.like.findMany({
        where: {
          userId,
        },
      })
      res.status(200).json(likes)
    } catch (error) {
      res.status(400).json({ message: 'Unable to get likes' })
    }
  } else if (req.method === 'POST') {
    try {
      const data = { userId, imagePromptId, languagePromptId }
      console.log(data)
      const like = await prisma.like.create({ data })
      res.status(201).json(like)
    } catch (error) {
      res.status(400).json({ message: 'Unable to create like' })
    }
  } else if (req.method === 'DELETE') {
    try {
      let like
      if (languagePromptId === undefined) {
        like = await prisma.like.delete({
          where: {
            userId_imagePromptId: {
              userId,
              imagePromptId,
            },
          },
        })
      } else {
        like = await prisma.like.delete({
          where: {
            userId_languagePromptId: {
              languagePromptId,
              userId,
            },
          },
        })
      }
      res.status(200).json(like)
    } catch (error) {
      res.status(400).json({ message: 'Unable to delete like' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
