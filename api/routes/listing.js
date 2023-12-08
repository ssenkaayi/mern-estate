
import  express  from "express";
import { createListing } from "../contoller/listing.js";
import { verifyToken } from "../utils/verifyUser.js";


const route = express.Router();


route.post('/create',createListing);

export default route;