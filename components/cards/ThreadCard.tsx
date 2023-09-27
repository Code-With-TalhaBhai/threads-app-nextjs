'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// type Props = {
//   thread: thread;
//   // thread: thread
// }

// type thread = {
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
  createdAt: Date,
  comments: {
    author: {
      image: string
    }
  }[],
  thread_image: string | null,
  isThread: boolean,
  onCommentPage: boolean
}

// export default function ThreadCard({id,currentUserId,parentId,content,author,community,createdAt,comments,thread_image,isComment}: Props) {
export default function ThreadCard({id,currentUserId,parentId,content,author,community,createdAt,comments,thread_image,isThread,onCommentPage}: Props) {
// export default function ThreadCard({thread}: Props) {
  // const {id,currentUserId,parentId,content,author,community,createdAt,comments,thread_image,isComment} = thread;
// export default function ThreadCard({id,currentUserId,parentId,content,community,createdAt,comments,thread_image,isComment}: Props) {
  // console.log('thread props',author);
  // console.log('author props',author.name);
  console.log('from ThreadCard');
  // console.log(thread);
  // console.log({id,currentUserId,parentId,content,author,community,createdAt,comments,thread_image,isComment})
  return (

    <article className={`mb-6 flex w-full flex-col rounded-xl ${isThread ? 'bg-dark-2 p-7' : 'px-0 xs:px-7'}`}>
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

            {/* Line below image */}
            {(!onCommentPage && isThread && comments?.length > 0 || !isThread) &&
            <div className='thread-card_bar py-5'/>
            }
          </div>

          {/* name */}
          <div className={`ml-5 flex flex-col gap-1.5 ${isThread ? '' : 'text-subtle-semibold'}`}>
            {/* Username */}
            <div>
              <Link href='/profile/post' className=''>
                  <h4 className={`cursor-pointer ${isThread?'text-heading4-medium':'text-body-bold'}`}>{author.name}</h4>
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
              <div className={`my-4 flex w-[105%] ${(isThread && !onCommentPage) ? 'md:w-[90%]': 'md:w-[100%] -ml-4'} h-72`}>
              <Link className='' 
               href={thread_image!}>
               <Image width={1050} height={1050}
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
            {(!onCommentPage && isThread) &&
            <div className='flex mt-6 gap-3.5 [&>*]:cursor-pointer [&>*]:object-contain'>
                <Image width={24} height={24} src="/heart-gray.svg" alt="Not found"/>
                <Link href={`threads/id`}>
                <Image width={24} height={24} src="/reply.svg" alt="Not found"/>
                </Link>
                <Image width={24} height={24} src="/repost.svg" alt="Not found"/>
                <Image width={24} height={24} src="/share.svg" alt="Not found"/>
            </div>
            }

          </div>
      </div>

      {(!onCommentPage && isThread && comments?.length > 0) &&
      <div>
        <Link href={`thread/${id}`}>
          <p className='mt-1 text-subtle-medium text-gray-1'>3 replies</p>
        </Link>
      </div>
      }
      
    </article>
  )
}