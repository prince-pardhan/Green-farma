import express from "express";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  AddComment,
  AddLike,
} from "../controllers/post.controllers";
import upload from "../cloudinary/uploader";

const routerimage = express.Router();

// get apis
routerimage.get("/", getAllPosts);
routerimage.get("/:id", getSinglePost);

// post apis
routerimage.post("/create", upload.single("avtar"), createPost);
routerimage.post("/comment",  AddComment);
routerimage.post("/AddLike",  AddLike);

//put aps
routerimage.put("/:id", updatePost);

//delete aps
routerimage.delete("/:id", deletePost);

export default routerimage;