import * as z from 'zod';


export const UserValidation = z.object({
    profile_photo: z.string().nonempty(),
    name: z.string()
    .min(3,{message:"name at least 2 characters long"})
    .max(15,{message:"name can be maximum 15 characters"}),
    username: z.string()
    .max(15,{message:"username can be maximum 15 characters"}),
    bio: z.string()
    .max(1000,{message:"biodata can be maximum 1000 characters"}),
})