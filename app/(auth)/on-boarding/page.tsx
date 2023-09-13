import AccountProfile from '@/components/forms/AccountProfile'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

type Props = {}

export default async function OnBoarding({}: Props) {
    const currUser : any  = await currentUser();

    const userInfo = await fetchUser(currUser.id);


  const user = {
    id: currUser?.id,
    objectId: userInfo?._id.toString(),
    username: userInfo?.username || currUser?.username,
    name: userInfo?.name || currUser?.firstName,
    bio: userInfo?.bio || "",
    image: userInfo?.image || currUser?.imageUrl,
  }

  return (
    <main className='flex flex-col mx-auto justify-start px-10 py-20 max-w-3xl'>
        <h1 className='head-text'>Onboarding</h1>
        <p className='mt-3 text-base-regular text-light-2'>Complete your profile now to use Threads</p>

        <section className='mt-9 bg-dark-2 p-10'>
          <AccountProfile user={user} btnTitle='Continue'/>
        </section>
    </main>
  )
}