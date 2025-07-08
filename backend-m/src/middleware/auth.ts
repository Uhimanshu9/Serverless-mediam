import { MiddlewareHandler } from "hono";
import {verify } from 'hono/jwt'


export const auth : MiddlewareHandler = async (c, next)=>{
    const jwt  = c.req.header("authorization")
    if(!jwt){
         return c.json({ error: 'Unauthorized' }, 401);
    }
    const payload = await verify(jwt  , c.env.JWT_SECRET) 
    if(!payload){
        return c.json({ error: 'Invalid or expired token' }, 403);
    }
    c.set("userId",payload.id )
    await next();
}