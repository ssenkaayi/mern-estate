import  express  from "express";
import { signup,signin ,google,signOut} from "../contoller/auth.js";


const route = express.Router();


route.post('/signup',signup)
route.post('/signin',signin)
route.post('/google',google)
route.get('/signout',signOut);

export default route;