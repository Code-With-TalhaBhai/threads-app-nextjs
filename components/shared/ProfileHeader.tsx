'use client';

type Props = {
    accountId:string,
    authUserId:string,
    name:string,
    username:string,
    imgUrl:string,
    bio:string
}

export async function ProfileHeader({accountId,authUserId,name,username,imgUrl,bio}:Props){
    return (
        <div>
            <h1>ProfileHeader</h1>
        </div>
    )
}