import User from "../modules/User.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup = async(req,res,next)=>{

  // collect request from client
  const {username,email,password} = req.body;
  // hashing the passowrd 
 

  try{
    const hashedPassword = bcryptjs.hashSync(password,10);
    // creating a new account
    const createUser  = new User({username:username,email:email,password:hashedPassword})
    // saving data to the database
    const saveUser = await createUser.save();
    // sending a reponse to the client
    res.status(201).json({success:"true"});

  }catch(error){
    next(error);
  }

}