"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const profile_controllers_1 = require("../controllers/profile.controllers");
const uploader_1 = __importDefault(require("../cloudinary/uploader"));
const routerUser = express_1.default.Router();
routerUser.post("/signup", user_controllers_1.Signup);
routerUser.post("/login", user_controllers_1.Login);
routerUser.post("/verify", user_controllers_1.VerifyOTP);
routerUser.post("/profile", profile_controllers_1.UpdateProfile);
routerUser.get("/profile/:userId", profile_controllers_1.getProfile);
routerUser.put("/avtar/:id", uploader_1.default.single("avtar"), profile_controllers_1.UpdatePhoto);
exports.default = routerUser;
