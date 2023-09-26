import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreads } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs"

 
export default async function Home() {
  
    const user = await currentUser();   
    const fetchQuery : any = await fetchThreads(1,30);
    // To fix serializable data types bug because of (_id,data etc.)
    const result = JSON.parse(JSON.stringify(fetchQuery));

  return (
    <div>
      <div className="head-text text-left">
          <section className="mt-4 flex flex-col gap-10">
            {
            result.threads.length == 0 ? (
              <p className='no-result'> No Threads Found </p>
            ):(
              <div>
              {
                result.threads.map((thread:any,index:number)=>(
                    <ThreadCard
                      key={index}
                      id={thread._id}
                      thread_image={thread.image}
                      parentId={thread.parentId}
                      content={thread.text}
                      // author={{ name:thread.author.name,
                      //    image:thread.author.image,
                      //     _id:thread.author._id
                      //   }} // Because of MongoDb Id bug
                      author={thread.author}
                      community={thread.community}
                      createdAt={thread.createdAt}
                      comments={thread.children}
                      currentUserId={user?.id || ''}
                      isComment={thread.children.length > 0 ? true : false}
                    />

                    // return <ThreadCard thread={thread}/>
                    // return <ThreadCard thread={index}/>

                ))
              }
              </div>
            )
            }
          </section>
      </div>
    </div>
  )
}