import Listing from "../modules/Listing.js"
import User from "../modules/User.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


export const test = (req,res)=>{
    res.json({message:'hello charles',})
}

export const updateUser = async(req,res,next)=>{

    // console.log(req.user.id)
    // console.log(req.params.id)
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only update your own account'))

    try{

    
        if(req.body.password){
             req.body.password = bcryptjs.hashSync(req.body.password,10)
           
        }

        // console.log(req.body)

        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:{
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            avatar:req.body.avatar}},{new:true})

        const {password:pass,...rest} = updateUser._doc;
        res.status(200).json(rest);

    }catch(error){
        next(error)
    
    }

}

export const deleteUser = async(req,res,next)=>{

    if(req.params.id!==req.user.id) return next(errorHandler(401,'you can only delete your own account'));

    try{

        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token').status(200).json('account deleted successfully')
        

    }catch(error){
        next(error)
    }
}

export const getUserListings = async(req,res,next)=>{

    // console.log(req.user.id)
    // console.log(req.params.id)
    

    if(req.params.id===req.user.id) {

        try{

            const userListings = await Listing.find({userRef:req.params.id})
            res.status(200).json(userListings)

        }catch(error){


            next(error)
        }

        
    }else{
        return next(errorHandler(401,'you can only view your own listing'))
    }
}

