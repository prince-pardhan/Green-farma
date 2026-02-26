import mongoose, { Schema } from "mongoose";

export interface signup{
  username: string;
  email: string;
  password: string;
  phone: string;
  otp:string;
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
    
  },
);

const signup = mongoose.model<signup>("singnup", signupSchema);
export default signup;