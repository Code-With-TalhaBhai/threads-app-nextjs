import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";

type Props = {
    params:{
        id: string;
    }
}

export default async function Page({params}:Props){
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo.onboarded) redirect('/on-boarding');

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
            <Tabs defaultValue="threads" className="w-full">

            
            <TabsList className="flex min-h-[50px] flex-1 items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 !important">
            {
                profileTabs.map((element,index)=>(
                    <TabsTrigger key={index} className="flex min-h-[50px] flex-1 items-center gap-3 bg-dark-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 text-light-2 ml-1" value="account">
                        <Image
                            src={element.icon}
                            width={24}
                            height={24}
                            className="object-contain"
                            alt="Icon not found"
                        />
                        <p className="max-sm:hidden">{element.label}</p>
                            {
                                element.label == 'Threads' && 
                                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">{userInfo.threads.length}</p>
                            }
                    </TabsTrigger>
                ))
            }
            </TabsList>

            {
                profileTabs.map((element,index)=>(
                    <TabsContent className="w-full text-light-1" key={index} value={element.value}>
                        <ThreadsTab
                            currentUserId={user.id}
                            accountId={userInfo.id}
                            accountType="User"
                        />
                    </TabsContent>
                ))
            }


            </Tabs>

            </div>

        </section>
    );
}