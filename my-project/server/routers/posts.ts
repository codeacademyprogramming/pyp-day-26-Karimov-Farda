import { Router,Request,Response,NextFunction} from 'express'
import {verify } from 'jsonwebtoken'
import dotenv from 'dotenv'
export const PostRouter = Router()

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET_KEY || ""

async function requireAuth(req:Request,res:Response,next:NextFunction){
 const authHeader = req.headers['authorization']
 const token = authHeader && authHeader.split(" ")[1];
 if(token){
     try{
    const userPayload = await verify(token,JWT_SECRET)
if(userPayload){
    console.log(userPayload)
    next()
}     
}catch(error){
        res.status(401).json({
            errors : error.message
        })
     }


}else{
     res.status(401).json({
         errors : ['not allowed']
     })
 }
}

PostRouter.get('/',requireAuth, (req,res) => res.json({
    post : []
}))