interface Props {
  image: string
  name: string
}
const Avatar: React.FC<Props> = ({ image, name }) => {
  return (
    <div className='flex space-x-2'>
      <div className='avatar'>
        <div className='w-6 rounded-full'>
          <img src={image} />
        </div>
      </div>
      <div className='text-sm'>{name}</div>
    </div>
  )
}

export default Avatar
