// api/auth/imagePrompts/index.ts
// get all image prompts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }
  const page = parseInt(req.query.page as string) || 1
  const perPage = 8 // Customize this value as needed

  const imagePrompts = await prisma.imagePrompt.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
  })

  res.status(200).json(imagePrompts)
}
