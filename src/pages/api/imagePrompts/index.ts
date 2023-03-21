// api/auth/imagePrompts/index.ts
// get all image prompts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }
  console.log('req', req)
  const imagePrompts = await prisma.imagePrompt.findMany()
  console.log('imagePrompts', imagePrompts)
  res.status(200).json(imagePrompts)
}
