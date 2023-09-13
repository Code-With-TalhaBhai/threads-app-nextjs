'use server'

import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import { connectToDb } from "../mongoose"
import user from "../models/user.model"

type Params = {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
    image: string | null
}


export async function createThread({text,image,author,communityId,path}:Params){

    try {        
        connectToDb();
        const createdThread = await Thread.create({
            text,
            community: null,
            author,
            image
        });


        await user.findByIdAndUpdate(author,{
            $push: {threads: createdThread._id}
        });


        revalidatePath(path);
        
    } catch (error:any) {
        throw new Error(`ERror in creating thread: ${error.message}`)
    }
};



export async function fetchThreads(pageNumber=1,pageSize=20){
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;


    // $in --> matches multiple values given through array
    const threadsQuery = Thread.find({parentId:{$in:[null,undefined]
    // const threadsQuery = await Thread.find({parentId:{$in:[null,undefined]
    }}).sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
        path: 'author',
        model: user
    })
    .populate({
        path: 'children',
        populate : {
            path: 'author',
            model: user,
            select: '_id name parentId image'
        }
    });

    const totalDocs = await Thread.countDocuments({
        parentId: {$in: [null,undefined]}
    });
    
    // exec() --> This allows the function to be async and run when the data is made available (after the db findOne returns in this instance, or "lazy" loading ...
    const All_Threads = await threadsQuery.exec();

    const isNext = totalDocs > All_Threads.length + skipAmount;
    // const isNext = totalDocs > threadsQuery.length + skipAmount;

    // return {threadsQuery,isNext};
    return {All_Threads,isNext};
}
