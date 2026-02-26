import express from "express";
import {
  createProfile,
} from "../controllers/profile.controllers";

const routerprofile = express.Router();

routerprofile.post("/profile", createProfile);


export default routerprofile;