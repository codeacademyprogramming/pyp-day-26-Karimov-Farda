import {Document,Model} from "mongoose"


export interface IRegisterPayload{
    email:string,
    password:string,
}

export interface IUserDocument{
    email : string,
    password : string,
    createdAt:Date
}
export interface IUserModel extends Model<IUserDocument>{
    login(email: string,password : string) : Promise<Document>
}