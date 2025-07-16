import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'



export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


userRouter.get('/',(c)=>{
    return c.text('Hello Hono user!')
})



userRouter.post('/signup', async (c) => {
  // return c.text('api/v1/user/signup!')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const user = await c.req.json()
  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password
      }
    })
    const payload = {
      sub: newUser.id
    }
    const secret = c.env.JWT_SECRET
    const token = await sign(payload, secret)
    return c.json({
      message: 'User created successfully',
      token: token,
    })
  }
  catch (error) {
    console.error('Error creating user:', error)
    return c.text('Error creating user', 500)
  }
})



userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
            password:body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})