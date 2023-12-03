import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import listingRouter from './routes/listing.js'
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

//express middleware
app.use(express.json());
app.use(cookieParser());

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
app.use('/listing',listingRouter)


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
