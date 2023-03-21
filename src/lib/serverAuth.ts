import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import prismadb from '@/lib/prisma'

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req })
  if (!session?.user?.email) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  const user = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })
  return { user }
}

export default serverAuth
