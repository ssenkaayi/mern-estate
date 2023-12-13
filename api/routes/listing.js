
import  express  from "express";
import { createListing, deleteListing } from "../contoller/listing.js";
import { verifyToken } from "../utils/verifyUser.js";


const route = express.Router();


route.post('/create',verifyToken,createListing);
route.delete('/delete/:id',verifyToken,deleteListing);

export default route;