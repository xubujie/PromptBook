// components/PromptForm.tsx
import { ChangeEvent, FormEvent, useState } from 'react'
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'

interface PromptFormProps {
  onSubmit: (prompt: string, model: string, image: string | File | null) => void
  initialPrompt?: string
  initialModel?: string
  initialImage?: string
}

const PromptForm: React.FC<PromptFormProps> = ({
  onSubmit,
  initialPrompt = '',
  initialModel = '',
  initialImage = '',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [model, setModel] = useState(initialModel)
  const [image, setImage] = useState<string | File | null>(initialImage)
  const getImageFileObject = (imageFile: File) => {
    console.log({ imageFile })
  }

  const runAfterImageDelete = (file: File) => {
    console.log({ file })
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault()
  //   if (content && model && output) {
  //     onSubmit(content, model, output, contactAuthor)
  //   }
  // }

  // Predefined model names
  const models = ['Stabel difussion 2', 'Midjounery v4', 'Model 3']

  return (
    <form className='flex flex-col items-center mx-auto mt-10 w-1/2 h-full'>
      <div className='card w-full bg-base-100 shadow-xl'>
        <div className='flex items-center justify-center w-full'>
          <ImageUploader
            style={{ height: '100%', width: '100%' }}
            onFileAdded={(img) => getImageFileObject(img)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
          />
        </div>
        {/* <div className='py-4 px-10 w-full'>
          <label htmlFor='image' className='block text-sm font-medium text-primary-content'>
            Upload Image
          </label>
          <input
            type='file'
            id='image'
            name='image'
            onChange={handleImageChange}
            className='w-full mt-1 bg-black text-green-400'
            accept='image/*'
          />
          {imagePreview && (
            <div className='mt-4'>
              <img src={imagePreview} alt='Preview' className='w-full h-auto' />
            </div>
          )}
        </div> */}
        <div className='card-body'>
          <textarea className='textarea textarea-primary w-full' placeholder='Prompt'></textarea>
          <select className='select select-primary w-full'>
            <option disabled selected>
              Which model are you using?
            </option>
            {models.map((modelName, index) => (
              <option key={index} value={modelName}>
                {modelName}
              </option>
            ))}
          </select>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>Fashion</div>
          </div>
        </div>
      </div>
      {/* <div className='py-4 px-10 w-full'>
        <label htmlFor='prompt' className='block text-sm font-medium text-primary-content'>
          Prompt
        </label>
        <textarea className='textarea textarea-primary w-full' placeholder='Prompt'></textarea>
      </div>
      <div className='py-4 px-10 w-full'>
        <label htmlFor='model' className='block text-sm font-medium text-primary-content'>
          Model
        </label>
        <select className='select select-primary w-full'>
          <option disabled selected>
            Which model are you using?
          </option>
          {models.map((modelName, index) => (
            <option key={index} value={modelName}>
              {modelName}
            </option>
          ))}
        </select>
      </div>
      <div className='py-4 px-10 w-full'>
        <label htmlFor='output' className='block text-sm font-medium text-primary-content'>
          Output Image
        </label>
        <input
          type='file'
          id='output'
          name='output'
          onChange={handleFileChange}
          className='w-full mt-1 bg-black text-green-400'
          accept='image/*'
        />
      </div> */}
      <div className='flex-grow self-end'>
        <button type='submit' className='px-4 py-4 m-10 btn-primary rounded-md'>
          Post Prompt
        </button>
      </div>
    </form>
  )
}

export default PromptForm
