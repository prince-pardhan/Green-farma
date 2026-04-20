"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controllers_1 = require("../controllers/post.controllers");
const uploader_1 = __importDefault(require("../cloudinary/uploader"));
const routerimage = express_1.default.Router();
// get apis
routerimage.get("/", post_controllers_1.getAllPosts);
routerimage.get("/:id", post_controllers_1.getSinglePost);
// post apis
routerimage.post("/create", uploader_1.default.single("avtar"), post_controllers_1.createPost);
routerimage.post("/comment", post_controllers_1.AddComment);
routerimage.post("/AddLike", post_controllers_1.AddLike);
//put aps
routerimage.put("/:id", post_controllers_1.updatePost);
//delete aps
routerimage.delete("/:id", post_controllers_1.deletePost);
exports.default = routerimage;
