import React from 'react'

const NofificationCard = () => {
  return (
    <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold" href="#">Sara Salah</span> replied on the <span className="font-bold text-blue-500" href="#">Upload Image</span> article . 2m
                </p>
              </a>
  )
}

export default NofificationCard
