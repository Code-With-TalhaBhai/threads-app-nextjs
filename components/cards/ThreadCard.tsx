import React from 'react';
import Image from 'next/image';

type Props = {}

export default function ThreadCard({}: Props) {
  return (
    <article className='flex w-full flex-col rounded-xl bg-dark-2 p-7'>
      <div className='flex items-center justify-between'>

        <h2 className='text-small-regular text-light-2'>
            This is my CS degree outline
        </h2>   
      </div>
    </article>
  )
}