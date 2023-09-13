'use server'

import { revalidatePath } from "next/cache";
import user from "../models/user.model";
import { connectToDb } from "../mongoose"

type Params = {
    userId:string,
    username:string,
    bio:string,
    image:string,
    name:string,
    path:string
  }

//   type check_onboarded = {
//     onboarded: boolean;
//     [key:string]: string | boolean; // For addition not known types
// }

export async function updateUser({userId,username,bio,image,name,path}:Params):Promise<void>
    {
    connectToDb();

    try{
    await user.findOneAndUpdate({id:userId},{
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true
        },
        {upsert: true} // Create one if didn't exist otherwise update it
        )

        if(path === '/profile/edit'){
            revalidatePath(path);
        }

    }
    catch(error:any){
        throw Error(`Failed to create / update user ${error.message}`);
    }
}


// export async function fetchUser(userId:string):Promise<check_onboarded | null>{
export async function fetchUser(userId:string){
    await connectToDb();

    try {
            return await user.findOne({id:userId});
    
        // .populate()
    } catch (error:any) {
        // console.log(error);
        throw new Error(`Error in fetching ${error.message}`);
    }
}