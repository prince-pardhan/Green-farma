import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  image?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  comments:{userId:mongoose.Schema.Types.ObjectId,text:string}[]
likes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
]
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
 post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: [String], 
      default:  []
    },
    like:{
      type: [String], 
      default:  []
    }
  },
);

export default mongoose.model<IPost>("Post", PostSchema);