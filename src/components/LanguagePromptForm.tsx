import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LanguagePromptForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm()
  const { data: session } = useSession()
  const router = useRouter()
  const onSubmit = async (data: any) => {
    const res = await axios.post('/api/new', {
      type: 'language',
      title: data.title,
      link: data.link,
      prompt: data.prompt,
      authorEmail: session?.user?.email,
    })
    if (res.status === 201) {
      // use toast to show success message
      toast.success('Prompt posted successfully!')
      // redirect to prompt page after message is shown
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } else {
      // use toast to show error message
      toast.error('Failed to post prompt. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='container flex-col mx-auto justify-center items-start mb-10 space-y-10 w-3/4 lg:w-1/2'
    >
      <input
        {...register('title', { required: 'Title is required', minLength: 10, maxLength: 10 })}
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
    </form>
  )
}

export default LanguagePromptForm
