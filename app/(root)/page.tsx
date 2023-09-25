import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreads } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs"

 
export default async function Home() {
  
    const result : any = await fetchThreads(1,30);
    // const result : any = {threads:[]};
    const user = await currentUser();
    
    // console.log('fetching threads testing ',await fetchThreads(1,30));
    // console.log('author',result.threads[0].author);
    // console.log('author_name',result.threads[0].author.name);

    // const id = result.threads[0].author._id.toString();
    // console.log('author_id type',typeof(result.threads[0].author._id));
    // console.log('id: ',id);
    // console.log('author',result.threads[0].author);
    // console.log('childre',result.threads[0].children);
    // console.log(result)

    // const result : any = {threads: [
    //   {
    //     _id: 'new ObjectId("6501911bfbb62776c459d922")',
    //     text: 'Its test content',
    //     author: [],
    //     image: null,
    //     community: null,
    //     children: [],
    //     createdAt: '2023-09-13T10:38:19.594Z',
    //     __v: 0
    //   },
    //   {
    //     _id: 'new ObjectId("650189e0fbb62776c459d91a")',
    //     text: 'This is my CS Degree outline',
    //     author: [],
    //     image: 'https://uploadthing.com/f/162e9d3c-fb57-49ca-8b81-856699e6170b_BSCS-semester-wise.png',
    //     community: null,
    //     children: [],
    //     createdAt: '2023-09-13T10:07:28.383Z',
    //     __v: 0
    //   }
    // ]};


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
                      key={thread.text}
                      id={thread._id.toString()}
                      thread_image={thread.image}
                      parentId={thread.parentId}
                      content={thread.text}
                      author={{ name:thread.author.name,
                         image:thread.author.image,
                          _id:thread.author._id.toString()
                        }} // Because of MongoDb Id bug
                      community={thread.community}
                      createdAt={thread.createdAt}
                      comments={thread.children}
                      currentUserId={user?.id || ''}
                      isComment={thread.children.length > 0 ? true : false}
                    />

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

// _id: new ObjectId("6501911bfbb62776c459d922"),
// text: 'Its test content',
// author: [Object],
// image: null,
// community: null,
// children: [],
// createdAt: 2023-09-13T10:38:19.594Z,