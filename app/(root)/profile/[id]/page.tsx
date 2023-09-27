import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
    id: string;
}

async function Page(params:Props){
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
        </section>
    );
}