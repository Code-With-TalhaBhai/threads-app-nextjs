'use server'

import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import { connectToDb } from "../mongoose"
import user from "../models/user.model"

type Params = {
    text: string,
    author: string,
    community: string | null,
    path: string,
    image: string | null
}


export async function createThread({text,image,author,community,path}:Params){

    try {        
        await connectToDb();
        const createdThread = await Thread.create({
            text,
            community,
            author,
            image,
            parentId: null
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

    try{
        await connectToDb();
        console.log('connected');
    const skipAmount = (pageNumber - 1) * pageSize;

    // $in --> matches multiple values given through array
    // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
    const threadsQuery = Thread.find({parentId:{$in:[null,undefined]
    // const threadsQuery = await Thread.find({parentId:{$in:[null,undefined]
    }}).sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
        path: 'author',
        model: user,
        select: '_id image name'
    })
    // .populate({
    //     path: 'children',
    //     populate : {
    //         path: 'author',
    //         model: user,
    //         select: '_id name parentId image'
    //     }
    // });

    const totalDocs = await Thread.countDocuments({
        parentId: {$in: [null,undefined]}
    });

    // const totalDocs = 60;
    
    // exec() --> This allows the function to be async and run when the data is made available (after the db findOne returns in this instance, or "lazy" loading ...
    const threads = await threadsQuery.exec(); // all threads

    const isNext = totalDocs > threads.length + skipAmount;
    // const isNext = totalDocs > threadsQuery.length + skipAmount;

    // return {threadsQuery,isNext};
    return {threads,isNext};
    }
    catch(error:any){
        throw new Error(`Error in fetching threads: ${error.message}`);
    }
}


export const fetchThreadbyId = async(id:string)=>{
    await connectToDb();
    try {
        const thread = await Thread.findById(id).populate({
            path: 'author',
            model: user,
            select: "_id image name"
        })
        ;
        return thread;
    } catch (error) {
        // console.log(error)   
        throw new Error(`Error in fetch by id ${error}`)
    }
}


export async function addCommentToThread(
    threadId:string,
    comment: string,
    userId: string,
    path: string
){
    try {
        await connectToDb();

        const originalThread = await Thread.findById(threadId);

        if(!originalThread){
            throw new Error("Error in fetching main thread");
        };


        // Create a new thread with the comment text
        const commentThread = new Thread({
            text: comment,
            image: null,
            author: userId,
            parentId: threadId
        });

        const savedComment = await commentThread.save();
        
        originalThread.children.push(savedComment._id);

        await originalThread.save();
        revalidatePath(path);

    } catch (error) {
        throw new Error(`Error in adding comment to thread: ${error}`);
    }
}