'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id: string,
  currentUserId: string,
  parentId: string | null,
  content: string,
  author: {
    name: string | null,
    image: string,
    _id: string
  },
  community: {
    id: string,
    name: string,
    image: string
  } | null,
  createdAt: string,
  comments?: {
    author: {
      image: string
    }
  }[],
  thread_image?: string,
  isComment: boolean
}

// export default function ThreadCard({id,currentUserId,parentId,content,author,community,createdAt,comments,thread_image,isComment}: Props) {
export default function ThreadCard({id,currentUserId,parentId,content,author,community,createdAt,comments,thread_image,isComment}: Props) {
// export default function ThreadCard({id,currentUserId,parentId,content,community,createdAt,comments,thread_image,isComment}: Props) {
  // console.log('thread props',author);
  console.log('author props',author.name);
  return (
    // <article className='flex w-full flex-col rounded-xl bg-dark-2 p-7'>
    //   <div className='flex items-center justify-between'>
    //       <div className='flex items-center justify-center z-10'>
    //         <div className='flex w-full flex-1 flex-row gap-4'>
    //           <div className='flex flex-col items-center'>
    //             <Link href='/profile/id' className='relative w-11 h-11'>
    //               <Image className='rounded-full' fill src="https://utfs.io/f/64ebebfd-bdad-4a41-8ed7-36f4cde1685b_developer.png" alt='not found'/>
    //             </Link>
    //           </div>

    //           <div>
    //             <Link href='/profile/post' className='w-fit'>
    //                 <h4 className='cursor-pointer'>Talha Bhai</h4>
    //             </Link>
    //           </div>

    //         </div>
    //       {/* <Image width={150} height={150} src="https://utfs.io/f/162e9d3c-fb57-49ca-8b81-856699e6170b_BSCS-semester-wise.png" alt='not found'/> */}
    //       </div>
    //     <h2 className='text-small-regular text-light-2'>
    //         This is my CS degree outline
    //     </h2>   
    //   </div>
    // </article>

    <article className='mb-6 flex w-full flex-col rounded-xl bg-dark-2 p-7'>
      <div className='flex text-small-regular text-light-2'>

           {/* photo */}
          <div className='flex flex-col items-center'>
            {/* <Link href={author.image} className='relative w-11 h-11 border-2 rounded-full'> */}
            <Link href={'author.image'} className='relative w-11 h-11 border-2 rounded-full'>
              <Image className='rounded-full'
              fill
              // src="https://utfs.io/f/64ebebfd-bdad-4a41-8ed7-36f4cde1685b_developer.png"
              src={author.image} // ! --> not null
              alt="not found"
              />
            </Link>

            <div className='thread-card_bar'/>
          </div>

          {/* name */}
          <div className='ml-5 flex flex-col gap-1.5'>
            {/* Username */}
            <div>
              <Link href='/profile/post' className=''>
                  <h4 className='cursor-pointer text-heading4-medium'>{author.name}</h4>
              </Link>
            </div>
              {/* Content */}
              <div>
                <h2>
                    {content}
                </h2>  
              </div>

              {/* Content with Image */}
              {/* <div className='flex w-[60%] h-20'> */}

              {thread_image && (
              <div className='my-4 flex w-[105%] md:w-[90%] h-72'>
              <Link className='' 
               href={thread_image!}>
               <Image width={950} height={950}
              // <Image fill
              // className='rounded-lg border-2 md:border-[1px] border-light-2'
              //  src="https://utfs.io/f/162e9d3c-fb57-49ca-8b81-856699e6170b_BSCS-semester-wise.png"
              src={thread_image}
              alt='not found'/>
              </Link>
              </div>
              )}

            {/* Icons */}
            {/* [&>*]: --> children selector, selects all childs */}
            <div className='flex mt-6 gap-3.5 [&>*]:cursor-pointer [&>*]:object-contain'>
                <Image width={24} height={24} src="/heart-gray.svg" alt="Not found"/>
                <Link href={`threads/id`}>
                <Image width={24} height={24} src="/reply.svg" alt="Not found"/>
                </Link>
                <Image width={24} height={24} src="/repost.svg" alt="Not found"/>
                <Image width={24} height={24} src="/share.svg" alt="Not found"/>
            </div>

          </div>
      </div>

      {isComment &&
      <div>
        <Link href={`thread/${id}`}>
          <p className='mt-1 text-subtle-medium text-gray-1'>3 replies</p>
        </Link>
      </div>
      }
      
    </article>
  )
}