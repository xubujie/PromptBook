import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CREATE_PROMPT_TIEM_OUT } from '@/config/config'
import { ErrorMessage } from '@hookform/error-message'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  prompt?: Prompt
  mode?: 'create' | 'edit'
}
const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(10, 'Title should be at least 10 characters')
    .max(100, 'Title should be at most 100 characters'),
  prompt: yup
    .string()
    .required('Prompt is required')
    .min(20, 'Prompt should be at least 20 characters')
    .max(1000, 'Prompt should be at most 1000 characters'),
  link: yup.string().url('Link should be a valid URL').nullable(),
})

const LanguagePromptForm: React.FC<Props> = ({ prompt, mode = 'create' }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
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
        {...register('title')}
        placeholder='Title (summarize usage here)'
        className='input input-secondary w-full'
      />
      <span className='text-red-500'>
        <ErrorMessage errors={errors} name='title' />
      </span>
      <textarea
        {...register('prompt')}
        className='textarea textarea-secondary w-full h-40'
        placeholder='Enter Prompt'
      />
      <span className='text-red-500'>
        <ErrorMessage errors={errors} name='prompt' />
      </span>
      <input
        {...register('link')}
        placeholder='Source Link (optional)'
        className='input input-secondary w-full'
      />
      <ErrorMessage errors={errors} name='link' />
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
