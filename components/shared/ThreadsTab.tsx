import { fetchUserPost } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'
import ThreadCard from '../cards/ThreadCard';

type Props = {
  currentUserId:string;
  accountId:string;
  accountType:string
}

async function ThreadsTab({currentUserId,accountId,accountType}: Props) {
    let query = await fetchUserPost(accountId);
    if(!query) redirect('/');
    const result = JSON.parse(JSON.stringify(query));
    console.log(result);

  return (
    <section className='mt-9 flex flex-col gap-1'>
      {
        result.threads.map((thread:any)=>(
          <ThreadCard
                      key={thread._id}
                      id={thread._id}
                      thread_image={thread.image}
                      parentId={thread.parentId}
                      content={thread.text}
                      author={accountType == 'User' ?
                      {name: result.name, image:result.image, id: result.id}:
                      {name: thread.author.name, image:thread.author.image, id: thread.author.id}
                      }
                      community={thread.community}
                      createdAt={thread.createdAt}
                      comments={thread.children}
                      currentUserId={accountId}
                      onCommentPage={false}
                      isThread={true}
          />
        ))
      }
    </section>
  )
}

export default ThreadsTab