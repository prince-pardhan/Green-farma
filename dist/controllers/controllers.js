"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletepost = exports.updatepost = exports.getpost = exports.createpost = void 0;
const model_farming_1 = __importDefault(require("../model/model.farming"));
const createpost = async (req, res) => {
    try {
        const payload = req.body;
        console.log("payload : ", payload);
        if (payload) {
            const todo = await model_farming_1.default.create(payload);
            res.status(200).json({ message: "create Todo ho g ya ", data: todo });
        }
        else {
            res.status(200).json({ message: "payload is empty " });
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.createpost = createpost;
const getpost = async (req, res) => {
    try {
        const todos = await model_farming_1.default.find({});
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getpost = getpost;
const updatepost = async (req, res) => {
    try {
        const updatedTodo = await model_farming_1.default.findByIdAndUpdate(req.params.id, req.body, {});
        res.status(200).json({ message: "ok (don)", data: updatedTodo });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.updatepost = updatepost;
const deletepost = async (req, res) => {
    try {
        await model_farming_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "delete Todo ho g ya h " });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.deletepost = deletepost;
//# sourceMappingURL=controllers.js.map