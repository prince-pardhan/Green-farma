import express from "express";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/post.controllers";

const routerimage = express.Router();

routerimage.post("/create", createPost);
routerimage.get("/", getAllPosts);
routerimage.get("/:id", getSinglePost);
routerimage.put("/:id", updatePost);
routerimage.delete("/:id", deletePost);

export default routerimage;