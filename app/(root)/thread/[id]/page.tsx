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

    const thread = await fetchThreadbyId(params.id);
    console.log('complete thread');
    console.log(thread);
    // console.log('author',thread.author);

    return(
        <section className="relative">
            <div>
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
            </div>

            {/* <div className="mt-7">
              <Comment
                threadId={params.id}
                // threadId={thread._id.toString()}
                currentUserImage={user.imageUrl}
                currentUserId={userInfo._id.toString()}
              />
            </div> */}


            {/* <div className="mt-10">
              {
                thread.children.map((childItem:any)=>(
                  <ThreadCard
                      key={childItem.text}
                      id={childItem._id.toString()}
                      parentId={childItem.parentId}
                      content={childItem.text}
                      author={{ name:childItem.author?.name,
                        image:childItem.author?.image,
                        _id:childItem.author?._id.toString()
                        }} // Because of MongoDb Id bug
                      community={childItem.community}
                      createdAt={childItem.createdAt}
                      currentUserId={user?.id || ''}
                      isComment={false}
                    />
                ))
              }
            </div> */}

        </section>
    )
}