import { z } from 'zod';
export declare const signinSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signupSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export declare const postBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const putBlogSchema: z.ZodObject<{
    id: z.ZodUUID;
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type PostBlogSchema = z.infer<typeof postBlogSchema>;
export type PutBlogSchema = z.infer<typeof putBlogSchema>;
