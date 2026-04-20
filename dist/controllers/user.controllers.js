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
exports.UpdatePhoto = exports.VerifyOTP = exports.Login = exports.Signup = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = require("../email/sendEmail");
const cloudinary_1 = __importDefault(require("../cloudinary/cloudinary"));
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
/* SIGN*/
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone } = req.body;
        console.log("sing :", name, email, password, phone);
        const userExists = yield user_model_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "उपयोगकर्ता पहले से मौजूद है",
            });
        }
        const otp = generateOTP();
        const hashPassword = yield bcrypt_1.default.hash(password, 17);
        const user = yield user_model_1.default.create({
            email,
            phone,
            password: hashPassword,
            otp
        });
        // send welcome email to user/////////////////////////////////////////////////////////////
        (0, sendEmail_1.SendEmailOTP)(email, otp);
        res.status(201).json({
            message: "Signup successful",
            user: {
                id: user._id,
                email: user.email,
                password: user.password
            },
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Signup error",
        });
    }
});
exports.Signup = Signup;
/*//////////////////////////////////////////////////////////////////////////////////////
/*login*/
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log("login :", email, password);
        const user = yield user_model_1.default.findOne({ email });
        console.log("user : ", user);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        bcrypt_1.default.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(404).json({
                    message: "password glat h  ",
                });
            }
        });
        res.status(200).json({
            message: "Login succeful",
            user: {
                id: user._id,
                email: user.email,
                password: user.password,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Login error",
        });
    }
});
exports.Login = Login;
// {otp code}////////////////////////////////////////////////////////////////////////////
const VerifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        }
        console.log("user?.otp : ", user === null || user === void 0 ? void 0 : user.otp, otp);
        if ((user === null || user === void 0 ? void 0 : user.otp) === otp) {
            res.status(200).json({
                message: "Login Success",
            });
        }
        else {
            res.status(400).json({
                message: "Invalid OTP",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.VerifyOTP = VerifyOTP;
//image updat ///////////////////////////////////////////////////////////////////////////////
const UpdatePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required (field name: avatar)",
            });
        }
        const result = yield cloudinary_1.default.uploader.upload(file.path, {
            folder: "green-farma",
            resource_type: "image",
        });
        const user = new user_model_1.default();
        user.avatar = result.secure_url;
        yield user.save();
        res.status(200).json({
            success: true,
            message: "Photo uploaded & saved successfully",
            avatar: result.secure_url,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
});
exports.UpdatePhoto = UpdatePhoto;
