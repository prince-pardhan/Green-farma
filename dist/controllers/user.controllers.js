"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOTP = exports.Login = exports.Signup = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = require("../email/sendEmail");
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const Signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log("sing :", name, email, password, phone);
        const userExists = await user_model_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "उपयोगकर्ता पहले से मौजूद है",
            });
        }
        const otp = generateOTP();
        const hashPassword = await bcrypt_1.default.hash(password, 17);
        const user = await user_model_1.default.create({
            email,
            phone,
            password: hashPassword,
            otp
        });
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
};
exports.Signup = Signup;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("login :", email, password);
        const user = await user_model_1.default.findOne({ email });
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
};
exports.Login = Login;
const VerifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await user_model_1.default.findOne({ email });
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
};
exports.VerifyOTP = VerifyOTP;
//# sourceMappingURL=user.controllers.js.map