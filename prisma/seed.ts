import { PrismaClient } from '@prisma/client'
import { langPrompts } from '../data/langPrompts'

const prisma = new PrismaClient()

async function main() {
  const user = {
    name: 'promptbook',
    email: 'admin@promptbook.com',
    image:
      'https://earbhfzccdgjsmqbynfy.supabase.co/storage/v1/object/public/promptbook/logo.png?t=2023-04-03T07%3A10%3A18.305Z',
  }

  await prisma.user.create({
    data: user,
  })

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
