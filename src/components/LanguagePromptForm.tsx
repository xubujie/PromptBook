import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {CREATE_PROMPT_TIEM_OUT} from '@/config/config'

interface Props {
  prompt?: Prompt
  mode?: 'create' | 'edit'
}

const LanguagePromptForm: React.FC<Props> = ({ prompt, mode = 'create' }) => {
  const { register, handleSubmit, setValue } = useForm()
    const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (prompt) {
      setValue('title', prompt.title)
      setValue('prompt', prompt.prompt)
      setValue('link', prompt.link || '')
    }
  }, [prompt, setValue])

  const onSubmit = async (data: any) => {
    const postData = {
      type: 'language',
      title: data.title,
      link: data.link,
      prompt: data.prompt,
      authorEmail: session?.user?.email,
    }
    try {
      let res
      if (mode === 'edit') {
        res = await axios.put(`/api/prompts/${prompt?.id}`, postData)
      } else {
        res = await axios.post('/api/new', postData)
      }

      if (res.status === 200 || res.status === 201) {
        toast.success('Prompt updated successfully!')
        setTimeout(() => {
          router.push('/')
        }, CREATE_PROMPT_TIEM_OUT)
      } else {
        toast.error('Failed to update the prompt. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to update the prompt. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='container flex-col mx-auto justify-center items-start mb-10 space-y-10 w-3/4 lg:w-1/2'
    >
      <input
        {...register('title', { required: 'Title is required', minLength: 10, maxLength: 100 })}
        placeholder='Title (summarize usage here)'
        className='input input-secondary w-full'
      />
      <textarea
        {...register('prompt', { required: 'Prompt is required', minLength: 20, maxLength: 1000 })}
        className='textarea textarea-secondary w-full h-40'
        placeholder='Enter Prompt'
      />
      <input
        {...register('link', { required: false })}
        placeholder='Source Link (optional)'
        className='input input-secondary w-full'
      />
      <div className='flex justify-end'>
        <button type='submit' className='btn btn-secondary self-end'>
          Post
        </button>
      </div>
      <ToastContainer />
    </form>
  )
}

export default LanguagePromptForm
