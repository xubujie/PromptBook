import Layout from '@/components/Layout'
import { useState } from 'react'
import PromptForm from '@/components/PromptForm'

const Prompts: React.FC = () => {
  const [mode, setMode] = useState('image')
  return (
    <Layout>
      <div className='flex tabs tabs-boxed items-center justify-center'>
        <a className='tab tab-active'>Image</a>
        <a className='tab'>Text</a>
      </div>
      <PromptForm />
    </Layout>
  )
}

export default Prompts
