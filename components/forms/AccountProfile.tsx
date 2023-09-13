'use client'
import React, { ChangeEvent, useState } from 'react'
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {usePathname,useRouter} from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { UserValidation } from '@/lib/zod-validations/user';
import Image from 'next/image';
import { updateUser } from '@/lib/actions/user.actions';
import { useUploadThing } from '@/lib/uploadthings';
import { isBase64Image } from '@/lib/utils';


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

type Params = {
  userId:string,
  username:string,
  bio:string,
  image:string,
  name:string,
  path:string
}

export default function AccountProfile({user,btnTitle}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const  pathname  = usePathname();
  const router = useRouter();
  type form_type = z.infer<typeof UserValidation>;

  const {startUpload} = useUploadThing('imageUploader');

  const form = useForm<form_type>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || ''
    }
  });

  async function submit({username,profile_photo,bio,name}:form_type){
    // Remaining
    const blob  = profile_photo;
    const hasImagechanged = isBase64Image(blob);

    if(hasImagechanged){
      const imgRes = await startUpload(files);
      
      if(imgRes && imgRes[0].url){
        profile_photo = imgRes[0].url;
      }
    }

    updateUser({
      userId:user.id,
      username,bio,
      image:profile_photo,
      name,
      path:pathname
    });

    if(pathname == '/profile/edit'){
      router.back();
    }
    else{
      router.push('/')
    }
  
    console.log(username);;
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