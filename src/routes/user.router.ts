import express from "express";
import { Login, Signup, VerifyOTP } from "../controllers/user.controllers";
import { getProfile, UpdateProfile } from "../controllers/profile.controllers";

const routerUser = express.Router();

routerUser.post("/signup", Signup);
routerUser.post("/login", Login);
routerUser.post("/verify", VerifyOTP);
routerUser.post("/profile", UpdateProfile);
routerUser.get("/profile/:userId", getProfile);
export default routerUser;
