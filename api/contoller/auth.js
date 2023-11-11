import User from "../modules/User.js";
import bcryptjs from 'bcryptjs'

export const signup = async(req,res)=>{
  const {username,email,password} = req.body;
  
  const hashedPassword = bcryptjs.hashSync(password,10);

  const createUser  = new User({username:username,email:email,password:hashedPassword})

  const saveUser = await createUser.save();

  res.status(201).json({success:"true"});

}