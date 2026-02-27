import { Request, Response } from "express";
import signup from "../model/user.model";
import cloudinary from "../cloudinary/cloudinary";


//    CREATE OR UPDATE PROFILE    //////////////////////////////////////////////////////////////////////////
export const UpdateProfile = async (req: Request, res: Response) => {
  try {
    const { userId, bio, gender, address, dateOfBirth } = req.body;

console.log("req.body: ", req.body);

    let profile = await signup.findById( userId );

console.log("profile :",profile);

    if (profile) {
      profile.bio = bio;
      profile.gender = gender;
      profile.address = address;
      profile.dateOfBirth = dateOfBirth;

      await profile.save();
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });
    }  

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

// GET PROFILE
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const profile = await signup.findOne({ userId }).populate("userId");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};


export const UpdatePhoto = async(req: Request, res: Response)=>{
   const { id } = req.params;

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

    res.status(200).json({
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
    
}