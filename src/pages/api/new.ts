// api/imagePrompts/new.ts
// post request to create a new image prompt
// returns the new image prompt
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }
  const data = req.body
  console.log('data', data)
  const newPrompt = await prisma.prompt.create({
    data,
  })
  res.status(201).json(newPrompt)
}
