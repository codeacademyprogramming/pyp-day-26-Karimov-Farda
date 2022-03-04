import {Router,Response} from 'express'
import * as yup from 'yup'
import {IRegisterPayload} from '../Interface/index'
import dotenv from 'dotenv'
import UserModel,{login} from '../models/user'
import jwt from "jsonwebtoken"
// import { string } from 'yup/lib/locale'
export const AuthRouter = Router()
dotenv.config()

let registerPayloadSchema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required(),
   
  });
  
const JWT_SECRET = process.env.JWT_SECRET_KEY || ""

AuthRouter.post("/register",async (req,res:Response) => {
    const registerPayload : IRegisterPayload = req.body;
    
    try{
    const isPayloadValid = await registerPayloadSchema.isValid(registerPayload)
    const newUserObj = new UserModel(isPayloadValid);
    const newUser = await newUserObj.save();
    console.log(isPayloadValid)
    res.status(201).json({
        _id : newUser._id,
        email : newUser.email,
        createdAt : newUser.createdAt

    })

    }catch(err){
        console.log(err);
        res.status(422).json({errors : err.errors})
    }







})


AuthRouter.post("/login", async (req,res) => {
    const loginPayload : IRegisterPayload = req.body;

    try{
    const validPayload = await registerPayloadSchema.validate(loginPayload) 
    
    try{
        const user = await login(validPayload.email,validPayload.password)
        const token = jwt.sign({_id:user._id,email:user.email},JWT_SECRET)
        res.json({token})
    }
    catch(err){
        res.status(422).json({errors:['user not exits']})
   
    }
       

}catch(err){
        res.status(500).json({errors:err.message})
    }
})