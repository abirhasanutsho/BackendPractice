import expresss from "express";
import {getUserProfile} from "../controller/profilecontroller";
import { verifyToken } from "../../middleware/authmiddleware";

const route = expresss.Router();

 route.get("/api/profile",verifyToken,getUserProfile);

 export default route;