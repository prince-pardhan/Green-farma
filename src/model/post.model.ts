import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  image?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
            likes: {
            type: String,
        },
        comment: {
              type: [String],
            deflate:[],
            ref:"comment"
        },
        pincomment: {
            type: String,
        },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);