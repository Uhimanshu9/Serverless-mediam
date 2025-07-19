import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { auth } from '../middleware/auth'


type Variables = {
    userId: string
}


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: Variables
}>();


// blogRouter.get('/',(c)=>{
//     return c.text('Hello Hono blog!')
// })
blogRouter.use('*', auth)


// model Post {
//   id        String   @id @default(uuid())
//   title     String
//   content   String
//   published Boolean  @default(false)
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  String
// }

blogRouter.post('/b', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const { title, content, published } = await c.req.json();
    const userId = c.get('userId')
    if (!userId) {
        return c.json({ error: 'Unauthorized' }, 401);c.get('userId')
    }
    try {
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                published: published ? published : false,
                authorId: userId
            }
        })
        return c.json({
            message: 'Post created successfully',
            post: post,
            postId: post.id,
        })
    }
    catch (error) {
        console.error('Error creating post:', error)
        return c.text('Error creating post', 500)
    }

})


blogRouter.put('/p', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id, title, content, published } = await c.req.json();
  const userId = c.get('userId');

  try {
    const updatedPost = await prisma.post.update({
      where: { id, authorId: userId }, // Ensure only the author can update
      data: {
        title,
        content,
        published: published ?? false,
      }
    });

    return c.json({
      message: 'Post updated successfully',
      post: updatedPost,
      postId: updatedPost.id,
    });
  } catch (error:any) {
    if (error.code === 'P2025') { // Post not found or unauthorized
      return c.json({ error: 'Post not found or not allowed' }, 404);
    }
    return c.json({ error: 'Error updating post' }, 500);
  }
});



blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const allPosts = await prisma.post.findMany()
        return c.json({
            message: 'All posts fetched successfully',
            posts: allPosts,
        })
    }catch(error){
        console.error('Error fetching posts:', error)
        return c.text('Error fetching posts', 500)
    }
})


blogRouter.get('/:id', async (c) => {
    try {
        // Optionally, validate JWT here (if not in middleware)
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
        const postId = c.req.param('id')
        // Validate postId here as needed
        const post = await prisma.post.findUnique({
            where: { id: postId }
        })
        if (!post) {
            return c.json({ error: 'Post not found' }, 404)
        }
        return c.json(post)
    } catch (error:any) {
        // Add specific error type checks here
        return c.json({ error: error.message || 'Error fetching post' }, 500)
    }
})





