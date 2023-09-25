'use client'
import Image from "next/image";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentValidation } from '@/lib/zod-validations/thread';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname,useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthings";
import { useForm } from "react-hook-form";
import { addCommentToThread } from "@/lib/actions/thread.actions";



type Props = {
    threadId: string,
    currentUserImage: string;
    currentUserId: string
}


export default function Comment({threadId,currentUserImage,currentUserId}:Props){
    const router = useRouter();
    const pathname = usePathname();


    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues:{
            comment: '',
        }
    });

    const submit = async({comment}:z.infer<typeof CommentValidation>)=>{
        // console.log(comment);
        addCommentToThread(threadId.toString(),comment,currentUserId,pathname);

        form.reset();
  }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}
                className="mt-10 border-y border-y-dark-4 py-5 flex items-center gap-4 max-xs:flex-col !important">
     
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className='flex items-center w-full gap-3'>
                  <FormLabel>
                    <Image
                        src={currentUserImage}
                        alt="Profile Image"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                  </FormLabel>
                  <FormControl className="bg-transparent border-none">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    // className='no-focus bg-dark-3 border border-dark-4 text-light-1 outline-none'
                    className='no-focus text-light-1 outline-none'
                    {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
    
            <Button className='comment-form_btn' type="submit">
              Replay
            </Button>
          </form>
        </Form>
      )
}