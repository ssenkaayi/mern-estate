import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
dotenv.config();


const app = express();

//express middleware
app.use(express.json());


//router middleware
app.use('/user',userRouter)
app.use('/auth',authRouter)



//connecting to the db
const connect = async ()=>{
    await mongoose.connect(process.env.MONGO);
    console.log('server connected to db');
    runServer()
}

//starting the server
const runServer = ()=>
{
    app.listen
    (
        5000,
        ()=>console.log('serever is runing on port 5000')
    )
}

connect()