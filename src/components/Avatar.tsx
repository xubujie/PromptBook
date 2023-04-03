import Image from 'next/image'
interface Props {
  image: string
  name: string
}
const Avatar: React.FC<Props> = ({ image, name }) => {
  return (
    <div className='flex space-x-2'>
      <div className='avatar'>
        <div className='w-6 rounded-full'>
          <Image src={image} alt={name} width='100' height='100' />
        </div>
      </div>
      <div className='text-sm'>{name}</div>
    </div>
  )
}

export default Avatar
