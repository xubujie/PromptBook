import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }
  const models = await prisma.model.findMany(
    // return id and name
    { select: { id: true, name: true } },
  )
  res.json(models)
}
