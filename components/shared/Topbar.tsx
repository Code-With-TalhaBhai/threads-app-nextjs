import Link from 'next/link'
import Image from 'next/image';
import React from 'react'
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';

type Props = {}

export default function Topbar({}: Props) {
  return (
    <nav className='fixed top-0 z-30 flex items-center justify-between px-6 py-3 bg-dark-2 w-full text-light-1'>
      <Link href='/' className='flex items-center gap-4'>
          <Image src="/logo.svg" alt='logo' width={28} height={28}/>
          <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
      </Link>

      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <button className='flex cursor-pointer'>
                  <Image width={24} height={24} src="/logout.svg" alt='logout'/>
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher appearance={{
          elements:{
            organizationSwitcherTrigger: "py-2 px-4"
          }
        }}/>

      </div>
    </nav>
  )
}