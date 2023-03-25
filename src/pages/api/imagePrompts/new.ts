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
  const { promptInput, negativePrompt, model, outputImage, imageWidth, imageHeight, authorId } =
    req.body
  const newImagePrompt = await prisma.imagePrompt.create({
    data: {
      promptInput,
      negativePrompt,
      model,
      outputImage,
      imageWidth,
      imageHeight,
      authorId,
    },
  })
  res.status(201).json(newImagePrompt)
}
