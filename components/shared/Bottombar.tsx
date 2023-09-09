'use client'
import { sideBarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

type Props = {}

export default function Bottombar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className='fixed left-0 bottom-0 z-20 flex w-full rounded-t-3xl bg-glassmorphism backdrop-blur-lg p-4 xs:px-7 md:hidden'>
      <div className="flex w-full items-center justify-between gap-3 xs:gap-5">
          {sideBarLinks.map((element,index)=>{
            const isActive = (pathname.includes(element.route) && pathname.length > 1) || (pathname == element.route);
            return (
              <Link className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:-py-2.5 ${isActive && 'bg-primary-500'}`} key={index} href={element.route}>
                <Image width={24} height={24} src={element.imgURL} alt='link'/>
                <p className='text-subtle-medium text-light-1 max-sm:hidden'>{element.label.split(/\s+/)[0]}</p>
              </Link>
            )
        })}
        </div>
    </section>
  )
}