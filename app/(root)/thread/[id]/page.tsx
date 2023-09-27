import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment";
import { fetchThreadbyId } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";


export default async function Page({params}:{params:{id:string}}){
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo.onboarded) redirect('/on-boarded');

    const threadQuery = await fetchThreadbyId(params.id);
    // console.log('complete thread');
    // To fix serializable data types bug because of (_id,data etc.)
    const thread = JSON.parse(JSON.stringify(threadQuery));
    console.log('single thread working');
    console.log(thread);
    // console.log('author',thread.author);

    return(
        <section className="relative -mt-10">
            <div>
            <ThreadCard
                      key={thread._id}
                      id={thread._id}
                      thread_image={thread.image}
                      parentId={thread.parentId}
                      content={thread.text}
                      author={thread.author}
                      community={thread.community}
                      createdAt={thread.createdAt}
                      comments={thread.children}
                      currentUserId={user?.id || ''}
                      onCommentPage={true}
                      isThread={true}
                    />
            </div>

            <div className="mt-7">
              <Comment
                threadId={params.id}
                // threadId={thread._id.toString()}
                currentUserImage={user.imageUrl}
                currentUserId={userInfo._id.toString()}
              />
            </div>


            <div className="mt-10">
              {
                thread.children.map((childItem:any)=>(
                  <ThreadCard
                      key={childItem._id}
                      id={childItem._id}
                      parentId={childItem.parentId}
                      content={childItem.text}
                      author={childItem.author}
                      comments={childItem.children}
                      thread_image={childItem.image}
                      community={childItem.community}
                      createdAt={childItem.createdAt}
                      currentUserId={user?.id || ''}
                      onCommentPage={true}
                      isThread={false}
                    />
                ))
              }
            </div>

        </section>
    )
}