import { Request, Response } from "express";
import Todo from "../model/model.farming";

//create  //////////////////////////////////////////////////////////////////////////////
export const createpost = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body
    console.log("payload : ", payload);

    if (payload) {
      const todo = await Todo.create(payload);
      res.status(200).json({ message: "create Todo ho g ya ", data: todo });
    } else {
      res.status(200).json({ message: "payload is empty " });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
//get ///////////////////////////////////////////////////////////////////////////////////////
export const getpost = async (req: Request, res: Response): Promise<void> => {
  try {

    const todos = await Todo.find({})
    res.status(200).json({todos});
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
// upbate //////////////////////////////////////////////////////////////////////////////////////
export const updatepost = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {}
    );

    res.status(200).json({ message: "ok (don)", data: updatedTodo });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
// delet /////////////////////////////////////////////////////////////////////////////////
export const deletepost = async (req: Request, res: Response): Promise<void> => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "delete Todo ho g ya h " });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
