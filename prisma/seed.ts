import { PrismaClient } from '@prisma/client'
import { langPrompts } from '../data/langPrompts'

const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany({
    // where: {
    //   type: 'language',
    // },
  })

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
