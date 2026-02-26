import mongoose, { Schema } from "mongoose";

export interface signup{
  username: string;
  email: string;
  password: string;
  phone: string;
  otp:string;
    bio: string;
  gender: string;
  address: string;
  dateOfBirth: Date;
}

const signupSchema: Schema = new Schema<signup>(
  {
    username: {
      type: String,

    },
    email: {
      type: String,

    },
    password: {
      type: String,
   
    },
    phone:{
        type: String,
    },
    otp:{
        type: String,
    },
      bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
  },
);

const signup = mongoose.model<signup>("singnup", signupSchema);
export default signup;