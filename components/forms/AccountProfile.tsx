'use client'
import React, { ChangeEvent, useState } from 'react'
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { UserSchema } from '@/lib/validations/user';
import Image from 'next/image';




type Props = {
  user:{
    id:string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  },
  btnTitle: string;
}

export default function AccountProfile({user,btnTitle}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  type form_type = z.infer<typeof UserSchema>;

  const form = useForm<form_type>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || ''
    }
  });

  function submit(data:form_type){
    console.log(data);
  }

  function handleImage(e:ChangeEvent<HTMLInputElement>,fieldChange:(data:string)=>void){
    e.preventDefault();

    const fileReader = new FileReader();

    if(e.target.files && e.target.files?.length>0){
      const img_file = e.target.files[0];

      console.log(e.target.files);
      setFiles(Array.from(e.target.files)); // Array.from() make it Array type from fileList Type
      console.log(files);
      // fileReader.readAsDataURL(img_file);
      // fileReader.onload = (data)=>{
        // setFiles(img_file);
      // }

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
          name="profile_photo"
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
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input 
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='cursor-pointer border-none bg-transparent outline-none file:text-blue'
                  onChange={(e)=>handleImage(e,field.onChange)}
                />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className='no-focus bg-dark-3 text-light-1  border border-dark-4'
                 {...field}
                 />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3'>
              <FormLabel>Username</FormLabel>
              <FormControl>
              <Input className='no-focus bg-dark-3 text-light-1  border border-dark-4'
                 {...field}
                 />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3'>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea className='no-focus bg-dark-3 text-light-1  border border-dark-4'
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />


        <Button className='bg-primary-500' type="submit">
          {btnTitle}
        </Button>
      </form>
    </Form>
  )
}