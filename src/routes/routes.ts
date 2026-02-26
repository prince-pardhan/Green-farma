import express from "express";
import {
  createpost,
  getpost,
  updatepost,
  deletepost,
} 
from "../controllers/controllers";

const routerPost = express.Router();

routerPost.post("/create", createpost);
routerPost.get("/", getpost);
routerPost.put("/:id", updatepost); 
routerPost.delete("/:id", deletepost);

export default routerPost;
