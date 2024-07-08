import React from 'react'

const Container = ({children}) => {
  return (
    <div className='flex flex-col gap-[20px] h-full w-full bg-red-500 p-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-red-100'>
      {children}
    </div>
  )
}

export default Container
