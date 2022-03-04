import {Schema,model} from "mongoose"
import bcrypt from 'bcrypt'
//import { IUserModel,IUserDocument } from "../Interface";
//import { ModuleBlock } from "typescript";

const userSchema = new Schema({
    email : {type : String,required : true,unique : true},
    password : {type : String,required : true},
    createdAt : {type:Date,required:true,default : Date.now}

})

userSchema.pre('save',async function(this:any, next){
    let user = this;

    if(user.isModified("password")){
            const salt = bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(user.password, await salt);
            console.log(hashedPassword);
            user.password = hashedPassword;

    }

    next()
});
const User = model("User",userSchema);

export async function login(email:string,password:string){

const user = await User.findOne({email})

if(!user){
    throw new Error("User not exits")
}else{
const isValid = await bcrypt.compare(password,user.password)
if(isValid){
    return user;
}else{
    throw new Error("Provided creadentials are not valid")
}
}

}

export default User;