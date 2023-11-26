import { errorHandler } from "./error.js";
import  Jwt  from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{

    const token = req.cookies.access_token;
    // console.log(token)

    if(!token) return next(errorHandler(401,'unauthorized'))

    Jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{

        if(error) return next(errorHandler(403,'forbidden task'))
        req.user = user;
        next();
    });

}