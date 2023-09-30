'use client'
import { sideBarLinks } from '@/constants'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation';
import { SignOutButton, SignedIn, currentUser, useAuth } from '@clerk/nextjs';

type Props = {}

export default function LeftSidebar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  // const user = currentUser();
  const {userId} = useAuth();
  return (
    <section className='custom-scrollbar sticky left-0 top-0 z-20 flex h-screen flex-col justify-between overflow-auto w-fit border-r border-r-dark-1 bg-dark-2 pb-5 pt-28 max-md:hidden'>
      <div className="flex flex-col w-full flex-1 md:gap-4 gap-6 px-6">
          {sideBarLinks.map((element,index)=>{
            const isActive = (pathname.includes(element.route) && (element.route.length > 1))  || (pathname == element.route);
            if(element.route == '/profile'){
              element.route = `/profile/${userId}`
            }
            return(
              <Link className={`relative flex justify-start rounded-lg gap-4 p-4 ${isActive && 'bg-primary-500'}`} key={index} href={element.route}>
                <Image width={24} height={24} src={element.imgURL} alt='link'/>
                <p className='text-light-1 max-lg:hidden'>{element.label}</p>
              </Link>
            )
        })}
        </div>

        <div className='relative'>
          <SignedIn>
            <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
              <div className='absolute bottom-0 left-2 flex cursor-pointer gap-4 p-4'>
              <Image width={24} height={24} src='/logout.svg' alt='logout'/>
              <p className='text-light-2 max-lg:hidden'>Logout</p>
              </div>
            </SignOutButton>
            </SignedIn>

      </div>
    </section>
  )
}