'use server'

import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import { connectToDb } from "../mongoose"
import User from "../models/user.model"

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


        await User.findByIdAndUpdate(author,{
            $push: {threads: createdThread._id}
        });


        revalidatePath(path);
        
    } catch (error:any) {
        throw new Error(`ERror in creating thread: ${error.message}`)
    }
};


export const fetchThreadbyId = async(id:string)=>{
    await connectToDb();
    try {
        const thread = await Thread.findById(id).populate({
            path: 'author',
            model: User,
            select: "_id image name"
        }).populate({
            path: 'children',
            populate:{
                path: 'author',
                model: User
            },
            model: Thread
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



export async function fetchThreads(pageNumber=1,pageSize=20){
    const skipAmount = (pageNumber - 1) * pageSize;
    await connectToDb();
    try {
        console.log('connected');
        const threads = await Thread.find({parentId:{$in:[null,undefined]}})
        .populate({
            path: 'author',
            model: User,
            select: 'id image name'
        })
        .populate({
            path: 'children',
            populate: {
            path: 'author',
            model: User,
            select: 'id name image'
        },
            model: Thread
        }).limit(pageSize)
        .skip(skipAmount)
        .sort({createdAt: 'desc'})
        ;

        const totalDocs = await Thread.countDocuments(
            {parentId: {$in:[null,undefined]}}
        );

        const isNext = totalDocs > threads.length + skipAmount;

        return {threads,isNext};

    } catch (error) {
        console.log(error);
    }
}