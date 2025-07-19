"use strict";
// write all zod schemas to a file
// export zod infreeence 
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBlogSchema = exports.postBlogSchema = exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = require("zod");
// signin schema
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
//signup schema
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    name: zod_1.z.string().min(1, 'Name is required'),
});
//post blog schema
exports.postBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    published: zod_1.z.boolean().optional(),
});
//put blog schema
exports.putBlogSchema = zod_1.z.object({
    id: zod_1.z.uuid('Invalid post ID'),
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    published: zod_1.z.boolean().optional(),
});
