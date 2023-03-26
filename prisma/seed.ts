import { PrismaClient } from '@prisma/client'
import { imagePrompts } from '../data/prompts'
import { langPrompts } from '../data/langPrompts'

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      id: '1',
      email: 'user1@example.com',
      name: 'User1',
    },
    {
      id: '2',
      email: 'user2@example.com',
      name: 'User2',
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    })
  }
  await prisma.prompt.deleteMany({})
  for (const prompt of imagePrompts) {
    await prisma.prompt.create({
      data: { ...prompt, type: 'image' },
    })
  }

  for (const prompt of langPrompts) {
    await prisma.prompt.create({
      data: { ...prompt, type: 'language' },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
