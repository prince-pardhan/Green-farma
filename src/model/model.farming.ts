import mongoose, { Schema } from "mongoose";
export interface Farmar {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    Post: string;
}

const FarmarSchema: Schema = new Schema(
    {
        _id: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        Post: {
            type: [],
            deflate:[],
            ref:"post"
            
        },
       
   
    },
);

const Farmar = mongoose.model<Farmar>("Farmar", FarmarSchema);
export default Farmar;
