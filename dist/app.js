"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const database_1 = require("./config/database");
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_router_1.default);
app.use('/image', post_routes_1.default);
const port = process.env.PORT || 9797;
(0, database_1.Database)();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
