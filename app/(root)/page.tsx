import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreads } from "@/lib/actions/thread.action"
import { currentUser } from "@clerk/nextjs"

 
export default async function Home() {
    // const result : any = await fetchThreads(1,30);
    const user = await currentUser();
    // console.log(result);
    // console.log('author',result.All_Threads[0].author);
    const result = {
      post: ['fkdsl']
    }
  return (
    <div>
      <div className="head-text text-left">
          <section className="mt-9 flex flex-col gap-10">
            {
            result.post.length == 0 ? (
              <p className='no-result'>No Threads Found</p>
            ):(
              <>
              {
                result.post.map((post:any)=>(
                    <ThreadCard
                      // key={post.id}
                      // id={post._id.toString()}
                      // currentUserId={user?.id}
                      // parentId={post.parentId}
                      // content={post.text}
                      // author={post.author}
                      // community={post.community}
                      // createdAt={post.createdAt}
                      // comments={post.comments}
                    />
              ))
              }
              </>
            )
            }
          </section>
      </div>
    </div>
  )
}