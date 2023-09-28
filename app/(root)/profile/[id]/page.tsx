import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

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
                    <TabsTrigger className="text-light-2 ml-1 bg-light-4" value="account">
                        <Image
                            src="/reply.svg"
                            width={24}
                            height={24}
                            className="object-contain"
                            alt="Icon not found"
                        />
                        <p className="max-sm:hidden">Account</p>
                    </TabsTrigger>
                    <TabsTrigger className="text-light-2 ml-1 bg-light-4" value="password">Password</TabsTrigger>
                </TabsList>
            </Tabs>

            </div>

        </section>
    );
}