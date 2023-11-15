import User from "../modules/User.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import  Jwt  from "jsonwebtoken";

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

export const signin = async(req,res,next)=>{

  
  const {username,password} = req.body;

  try{

    const isValidUser = await User.findOne({username});
    if(!isValidUser) return next(errorHandler(404,'no user with username is found'));
    const isValidPassword = bcryptjs.compareSync(password,isValidUser.password);
    if(!isValidPassword) return next(errorHandler(404,'incorrrect username and password'));

    const token = Jwt.sign({id:isValidUser.id},process.env.JWT_SECRET);
    const{password:pass,...rest} = isValidUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);


  }catch(error){
    next(error)
  }
}