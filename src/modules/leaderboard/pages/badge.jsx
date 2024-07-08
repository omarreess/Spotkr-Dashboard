import React from 'react'

const Badge = ({title, background}) => {
  return (
    <div style={{background:background}} className='w-fit h-fit rounded-md shadow-2xl p-2'>
      {title}
    </div>
  )
}

export default Badge
