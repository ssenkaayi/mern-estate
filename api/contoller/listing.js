import Listing from "../modules/Listing.js";


export const createListing = async(req,res,next)=>{

   

    try{

        const listing = await Listing.create(req.body);
        return res.status(200).json(listing)

    }catch(error){
        next(error)
    }

}