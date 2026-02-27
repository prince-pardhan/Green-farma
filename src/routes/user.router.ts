import express from "express";
import { Login, Signup, VerifyOTP } from "../controllers/user.controllers";
import { getProfile, UpdatePhoto, UpdateProfile } from "../controllers/profile.controllers";
import upload from "../cloudinary/uploader";

const routerUser = express.Router();

routerUser.post("/signup", Signup);
routerUser.post("/login", Login);
routerUser.post("/verify", VerifyOTP);
routerUser.post("/profile", UpdateProfile);
routerUser.get("/profile/:userId", getProfile);
routerUser.put("/avtar/:id", upload.single("avtar"), UpdatePhoto);
export default routerUser;
