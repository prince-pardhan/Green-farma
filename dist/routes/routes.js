"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/controllers");
const routerPost = express_1.default.Router();
routerPost.post("/create", controllers_1.createpost);
routerPost.get("/", controllers_1.getpost);
routerPost.put("/:id", controllers_1.updatepost);
routerPost.delete("/:id", controllers_1.deletepost);
exports.default = routerPost;
//# sourceMappingURL=routes.js.map