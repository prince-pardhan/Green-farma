import mongoose, { Schema, Document } from "mongoose";

export interface comment  {
  _id: string;
  text:string;
}

const commentSchema: Schema = new Schema<comment>(
  {
    _id: {
      type: String,
    },
    text:{
        type: String,
    },
  },
);    

const comment = mongoose.model<comment>("comment", commentSchema);
export default comment;
