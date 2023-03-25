import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { MAX_IMAGE_FILE_SIZE_MB } from '@/config/config'
import axios from 'axios'
import { supabase } from '@/lib/supabase'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormData = {
  image: FileList
  prompt: string
  nprompt: String
  outputImage: string
  model: string
}

const ImagePromptForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null)
  const [imageSize, setImageSize] = React.useState<[number, number] | null>(null)
  const { data: session } = useSession()
  const router = useRouter()
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.size > MAX_IMAGE_FILE_SIZE_MB * 1024 * 1024) {
          setErrorMessage(`Image file size must be less than ${MAX_IMAGE_FILE_SIZE_MB}MB`)
          event.target.value = ''
          return
        } else {
          setErrorMessage(null)
          const img = new Image()
          img.src = URL.createObjectURL(file)
          img.onload = () => {
            setImageSize([img.width, img.height])
          }
          setImagePreviewUrl(URL.createObjectURL(file))
          setValue('image', files)
        }
      })
    }
  }

  const onSubmit = async (data: FormData) => {
    // Handle the form data, such as uploading the image, and creating a new prompt entry.
    // After successful submission, redirect to the prompt page.
    // call post request to create prompt
    console.log('data', data)
    const file = data.image[0]
    const uniqueFileName = `${Date.now()}-${file.name}`
    console.log('uniqueFileName', uniqueFileName)
    const { data: image, error } = await supabase.storage
      .from('promptbook')
      .upload(`${session?.userId}/${uniqueFileName}`, data.image[0], {
        cacheControl: '3600',
        upsert: false,
      })
    if (error) {
      console.log('error', error)
      toast.error('Image upload failed. Please try again.')
      return
    }
    const imageUrl = image?.path
    // post prompt to database
    const res = await axios.post('/api/imagePrompts/new', {
      promptInput: data.prompt,
      negativePrompt: data.nprompt,
      model: data.model,
      outputImage:
        process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/promptbook/' + imageUrl,
      imageWidth: imageSize && imageSize[0],
      imageHeight: imageSize && imageSize[1],
      authorId: session?.userId,
    })
    if (res.status === 201) {
      // use toast to show success message
      toast.success('Prompt posted successfully!')
      router.push('/')
    } else {
      // use toast to show error message
      toast.error('Failed to post prompt. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='container flex flex-col md:flex-row justify-center items-start mx-auto mb-10 space-x-10 text-white'
    >
      <div className='container w-1/2'>
        <input
          type='file'
          onChange={handleImageChange}
          className='file-input file-input-bordered file-input-secondary w-full'
        />
        {errorMessage && (
          <div className='alert alert-error shadow-lg'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
        {imagePreviewUrl && (
          <img className='mx-auto self-center' src={imagePreviewUrl} alt='Image Preview' />
        )}
      </div>
      <div className='container flex flex-col  w-1/2 space-y-5'>
        <textarea
          {...register('prompt', { required: 'prompt is required', maxLength: 500 })}
          className='textarea textarea-secondary w-full h-40 placeholder:text-white'
          placeholder='Enter prompt'
        />
        {errors.prompt && <div className='text-red-600 mt-1'>{errors.prompt.message}</div>}
        <textarea
          {...register('nprompt', { required: false, maxLength: 500 })}
          className='textarea textarea-secondary w-full h-40 placeholder:text-white'
          placeholder='Negative prompt (optional)'
        />
        <select
          {...register('model', { required: 'model is required' })}
          className='select select-secondary'
        >
          <option value=''>Select a model</option>
          <option value='model1'>Model 1</option>
          <option value='model2'>Model 2</option>
          {/* Add more models here */}
        </select>
        {errors.model && <div className='text-red-600 mt-1'>{errors.model.message}</div>}
        <button type='submit' className='btn btn-secondary self-end'>
          Post
        </button>
      </div>
      <ToastContainer />
    </form>
  )
}

export default ImagePromptForm
