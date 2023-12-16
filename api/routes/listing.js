
import  express  from "express";
import { createListing, deleteListing, getListing, updateListing } from "../contoller/listing.js";
import { verifyToken } from "../utils/verifyUser.js";


const route = express.Router();


route.post('/create',verifyToken,createListing);
route.delete('/delete/:id',verifyToken,deleteListing);
route.post('/update/:id',verifyToken,updateListing)
route.get('/getListing/:id',getListing)

export default route;