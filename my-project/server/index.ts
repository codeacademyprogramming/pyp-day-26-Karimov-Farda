import dotenv from "dotenv"
import mongoose from 'mongoose'
import express from 'express'
import {Request,Response} from 'express'


import ROUTES from './routes'

dotenv.config()

const uri = process.env.MONGO_DB_URI || ""
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
// mongoose.connect('mongodb://localhost/project',{
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//         useCreateIndex:true,
//     })
const db = mongoose.connection;
db.on('error',(err) => console.error(err));
db.once('open',() => console.log('db connected'))

const app = express()

app.use(express.json())


app.get('/',(req:Request,res:Response) => res.send("Hello Whole World"))


ROUTES.forEach(route => {
    app.use(route.path , route.router);
})

app.listen(8000, () => console.log('server started at http://localhost:8000'))