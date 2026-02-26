import mongoose, { Schema, Document } from "mongoose";
export interface Post  {
    _id: string;
    descrip: string;
    photo: string;
    video: string;
    likes: string;
    comment: string;
    pincomment:string;
}

const postSchema: Schema = new Schema<Post>(
    {
        _id: {
            type: String,
        },
        descrip: {
            type: String,
        },
        photo: {
            type: String,
        },
        video: {
            type: String,
        },
        likes: {
            type: String,
        },
        comment: {
              type: [],
            deflate:[],
            ref:"comment"
        },
        pincomment: {
            type: String,
        },
    },
);

const post = mongoose.model<Post>("post", postSchema);
export default post;
