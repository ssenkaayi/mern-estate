import  express  from "express";
import { signup } from "../contoller/auth.js";


const route = express.Router();


route.post('/',signup)

export default route;