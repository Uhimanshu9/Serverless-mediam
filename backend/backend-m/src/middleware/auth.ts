import { MiddlewareHandler } from "hono";
import {verify } from 'hono/jwt'

//if jwt is not present or invalid, return 401 Unauthorized
//if jwt is valid, set userId in context and call next middleware`
// export const auth : MiddlewareHandler = async (c, next)=>{
//     const jwt  = c.req.header("authorization")
//     if(!jwt){
//          return c.json({ error: 'Unauthorized' }, 401);
//     }
//     const payload = await verify(jwt  , c.env.JWT_SECRET) 
//     if(!payload){
//         return c.json({ error: 'Invalid or expired token' }, 403);
//     }
//     c.set("userId",payload.id )
//     await next();
// }

// import { MiddlewareHandler } from "hono";
// import { verify } from "hono/jwt";

export const auth: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("authorization");
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const jwt = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  const payload = await verify(jwt, c.env.JWT_SECRET);

  if (!payload || typeof payload.id !== "string") {
    return c.json({ error: "Invalid or expired token" }, 403);
  }

  c.set("userId", payload.id);
  await next();
};
