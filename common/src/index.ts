// write all zod schemas to a file
// export zod infreeence 

import { z } from 'zod';

// signin schema
export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})


//signup schema
export const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().min(1, 'Name is required'),
})

//post blog schema
export const postBlogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    published: z.boolean().optional(),
})

//put blog schema
export const putBlogSchema = z.object({
    id: z.uuid('Invalid post ID'),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    published: z.boolean().optional(),
})



export type SigninSchema = z.infer<typeof signinSchema>; 
export type SignupSchema = z.infer<typeof signupSchema>;
export type PostBlogSchema = z.infer<typeof postBlogSchema>;
export type PutBlogSchema = z.infer<typeof putBlogSchema>;