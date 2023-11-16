import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import cors from 'cors';
dotenv.config();

const app = express();

//express middleware
app.use(express.json());
// app.use(cors())

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

//router middleware
app.use('/user',userRouter)
app.use('/auth',authRouter)

//creating an error Handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message,
    });
})
