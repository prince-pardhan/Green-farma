"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhoto = exports.getProfile = exports.UpdateProfile = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const cloudinary_1 = __importDefault(require("../cloudinary/cloudinary"));
const UpdateProfile = async (req, res) => {
    try {
        const { userId, bio, gender, address, dateOfBirth } = req.body;
        console.log("req.body: ", req.body);
        let profile = await user_model_1.default.findById(userId);
        console.log("profile :", profile);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
exports.UpdateProfile = UpdateProfile;
const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await user_model_1.default.findOne({ userId }).populate("userId");
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
exports.getProfile = getProfile;
const UpdatePhoto = async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            status: 400,
            message: "Logo file is required (field: 'logo')",
        });
    }
    console.log("file : ", file);
    const result = await cloudinary_1.default.uploader.upload(file.path, {
        folder: "green-farma",
        resource_type: "image",
    });
    console.log("Cloudinary URL:", result.secure_url);
    res.status(200).json({
        message: "Image uploaded successfully",
        url: result.secure_url,
    });
};
exports.UpdatePhoto = UpdatePhoto;
//# sourceMappingURL=profile.controllers.js.map