import React from 'react'

type Props = {}

export default function RightSidebar({}: Props) {
  return (
    <div className='custom-scrollbar sticky top-0 right-0 z-20 flex h-screen w-fit pt-28 flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 max-xl:hidden'>
      <div className='flex flex-1 flex-col justify-start'> 
        <h3 className='text-heading4-medium text-light-1'>Suggested Commnities</h3>
       </div>


      <div className='flex flex-1 flex-col justify-start'> 
        <h3 className='text-heading4-medium text-light-1'>Suggested Users</h3>
       </div>
    </div>
  )
}