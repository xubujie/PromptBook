// pages/post.tsx
import { useRouter } from 'next/router'
import PromptForm from '@/components/PromptForm'
import Layout from '@/components/Layout'

const PostPage: React.FC = () => {
  const router = useRouter()

  const handleSubmit = async (content: string, model: string, output: string) => {
    // Replace this with your actual API call to create a new prompt
    // or update an existing one based on your application logic.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/') // Redirect to the home page or any other page after a successful submission.
  }

  return (
    <Layout>
      <div className='p-4 mx-auto mt-8 max-w-3xl'>
        <h1 className='mb-4 text-lg font-bold text-green-400'>Post/Edit Prompt</h1>
        <PromptForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  )
}

export default PostPage
