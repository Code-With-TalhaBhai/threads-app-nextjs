'use client'
import React, { useState,ChangeEvent } from 'react'
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useRouter,usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThreadValidation } from '@/lib/zod-validations/thread';
import { createThread } from '@/lib/actions/thread.action';
import Image from 'next/image';
import { Input } from '../ui/input';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthings';


type Props = {
    userId: string;
}

export default function PostThread({userId}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [files, setFiles] = useState<File[]>([]);
    const {startUpload} = useUploadThing('imageUploader');


    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues:{
            text: '',
            accountId: userId,
            thread_image: ''
        }
    });

    const submit = async({text,accountId,thread_image}:z.infer<typeof ThreadValidation>)=>{
      const blob  = thread_image;
      const hasImagechanged = isBase64Image(blob as string);
  
      if(hasImagechanged){
        const imgRes = await startUpload(files);
        
        if(imgRes && imgRes[0].url){
          thread_image = imgRes[0].url
        }
      }
      else{
        thread_image = null;
      }

        await createThread(
        {
          text,
          communityId: null,
          path:pathname,
          author: accountId,
          image: thread_image
        }
        );

        router.push('/');
  }

    function handleImage(e:ChangeEvent<HTMLInputElement>,fieldChange:(data:string)=>void){
      e.preventDefault();
  
      const fileReader = new FileReader();
  
      if(e.target.files && e.target.files?.length>0){
        const img_file = e.target.files[0];
  
        console.log(e.target.files);
        setFiles(Array.from(e.target.files)); // Array.from() make it Array type from fileList Type
        console.log(files);
  
  
        if(!img_file.type.includes('image')) return ;
  
        fileReader.readAsDataURL(img_file);
  
        fileReader.onload = (data)=>{
          // let url = fileReader.result;
          let url = data.target?.result?.toString();
          fieldChange(url as string);
        }
  
      }
    }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}
            className="flex flex-col justify-start gap-10 text-gray-200 text-base-semibold">

          <FormField
          control={form.control}
          name="thread_image"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='flex h-24 w-24 rounded-full items-center justify-center bg-dark-4'>
                {field.value ?
                  <Image
                    src={field.value}
                    alt='profile photo'
                    width={96}
                    height={96}
                    priority={true}
                    className='rounded-full object-contain'
                  /> : <Image
                  src="/profile.svg"
                  alt='Profile photo'
                  width={24}
                  height={24}
                  className='object-contain'
                  />
                }
              </FormLabel>
              <FormControl className='cursor-pointer flex-1 text-base-semibold text-gray-200'>
                <Input 
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='border-none bg-transparent outline-none file:cursor-pointer file:text-blue'
                  onChange={(e)=>handleImage(e,field.onChange)}
                />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3'>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea className='no-focus bg-dark-3 text-light-1  border border-dark-4'
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />

        <Button className='bg-primary-500' type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}