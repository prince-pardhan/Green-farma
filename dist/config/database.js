"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Database = async () => {
    try {
        await mongoose_1.default.connect("mongodb://127.0.0.1:27017/test");
        console.log("database contact successful");
    }
    catch (error) {
        console.error("DB Error:", error);
    }
};
exports.Database = Database;
//# sourceMappingURL=database.js.map