import { Hono } from 'hono'
import { blogRouter } from './routes/blog'
import { userRouter } from './routes/user'

// const app = new Hono()

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string,
}
const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {

  return c.text('Hello Hono tst!')
})

app.route('/api/v1/blog',blogRouter);
app.route('/api/v1/user', userRouter);

export default app
