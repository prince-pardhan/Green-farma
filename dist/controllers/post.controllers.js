"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getSinglePost = exports.getAllPosts = exports.AddLike = exports.AddComment = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../model/post.model"));
const cloudinary_1 = __importDefault(require("../cloudinary/cloudinary"));
// ✅ CREATE POST
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, user } = req.body;
        console.log("itle, description, user :", title, description, user);
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                status: 400,
                message: "Logo file is required (field: 'logo')",
            });
        }
        console.log("file : ", file);
        const result = yield cloudinary_1.default.uploader.upload(file.path, {
            folder: "green-farma",
            resource_type: "image",
        });
        console.log("Cloudinary URL:", result.secure_url);
        //////////////////////////////////////////////////////////
        const newPost = yield post_model_1.default.create({
            title,
            description,
            user,
            image: result.secure_url,
        });
        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: newPost,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.createPost = createPost;
//////////////////// add comments/////////////////////////
const AddComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { userId, text } = req.body;
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        post.comments.push({
            userId,
            text,
        });
        yield post.save();
        res.json({
            message: "Comment added",
            comments: post,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.AddComment = AddComment;
////////////////////// add like //////////////////////////////
const AddLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Check if user already liked
        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
            return res.status(400).json({ message: "You already liked this post" });
        }
        post.likes.push(userId);
        yield post.save();
        res.json({
            message: "Post liked successfully",
            likes: post.likes,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.AddLike = AddLike;
///////////////////////////////////////////////////////////////////////////
// ✅ GET ALL POSTS
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find().populate("user");
        res.status(200).json({
            success: true,
            data: posts,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getAllPosts = getAllPosts;
// ✅ GET SINGLE POST
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id).populate("user");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({
            success: true,
            data: post,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getSinglePost = getSinglePost;
// ✅ UPDATE POST
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            data: updatedPost,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.updatePost = updatePost;
// ✅ DELETE POST
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield post_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.deletePost = deletePost;
