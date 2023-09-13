import * as z from 'zod';


export const ThreadValidation = z.object({
    text: z.string().nonempty().min(3,{
        message: 'Minimum 3 characters'
    }),
    accountId: z.string(),
    thread_image: z.string().nullable()
    // thread_image: z.string()
});


export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3,{
        message: 'Minimum 3 characters'
    })
})