import express from "express";
import { Login, Signup, VerifyOTP, } from "../controllers/user.controllers";

const routerUser = express.Router();

routerUser.post("/signup", Signup);
routerUser.post("/login", Login);
routerUser.post("/verify", VerifyOTP);
export default routerUser;
