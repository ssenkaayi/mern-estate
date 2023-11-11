import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/router.js'
dotenv.config();


const app = express();

app.use('/',userRouter)


const connect = async ()=>{
    await mongoose.connect(process.env.MONGO);
    console.log('server connected to db');
    runServer()
}


const runServer = ()=>
{
    app.listen
    (
        5000,
        ()=>console.log('serever is runing on port 5000')
    )
}

connect()