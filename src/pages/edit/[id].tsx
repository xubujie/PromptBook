// src/pages/edit/[id].tsx
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '@/components/Layout'
import ImagePromptForm from '@/components/ImagePromptForm'
import LanguagePromptForm from '@/components/LanguagePromptForm'

const EditPrompt: React.FC = (props) => {
  const router = useRouter()
  const { id } = router.query
  const [prompt, setPrompt] = useState<Prompt | null>(null)

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await axios.get(`/api/prompts/${id}`)
        setPrompt(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (id) {
      fetchPrompt()
    }
  }, [id])

  if (!prompt) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='container mx-auto max-w-6xl my-20 px-4'>
        <h1 className='text-4xl font-bold mb-4'>Edit Prompt</h1>
        {prompt?.type === 'image' && <ImagePromptForm prompt={prompt} mode='edit' />}
        {prompt?.type === 'language' && <LanguagePromptForm prompt={prompt} mode='edit' />}
      </div>
    </Layout>
  )
}

export default EditPrompt
