import { Request, Response } from "express";
import Post from "../model/post.model";
import cloudinary from "../cloudinary/cloudinary";

// ✅ CREATE POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, user } = req.body;
    console.log("itle, description, user :", title, description, user);

    
      const file = (req as any).file as Express.Multer.File | undefined;
    
        if (!file) {
          return res.status(400).json({
            status: 400,
            message: "Logo file is required (field: 'logo')",
          });
        }
    
        console.log("file : ",file);
    
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "green-farma",
          resource_type: "image",
        })
    
        console.log("Cloudinary URL:", result.secure_url);
    

//////////////////////////////////////////////////////////

    const newPost = await Post.create({
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
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

    //////////////////// add comments/////////////////////////
 export const AddComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      userId,
      text,
    });

    await post.save();

    res.json({
      message: "Comment added",
      comments: post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
////////////////////// add like //////////////////////////////

export const AddLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user already liked
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    post.likes.push(userId);

    await post.save();

    res.json({
      message: "Post liked successfully",
      likes: post.likes,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

///////////////////////////////////////////////////////////////////////////

// ✅ GET ALL POSTS
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("user");

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ GET SINGLE POST
export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate("user");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};