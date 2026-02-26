import { Request, Response } from "express";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import { SendEmailOTP } from "../email/sendEmail";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* SIGN*/
export const Signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    console.log("sing :", name, email, password, phone);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "उपयोगकर्ता पहले से मौजूद है",
      });
    }

    const otp = generateOTP()

    const hashPassword = await bcrypt.hash(password, 17);
    const user = await User.create({
      email,
      phone,
      password: hashPassword,
      otp
    });

    // send welcome email to user/////////////////////////////////////////////////////////////
    SendEmailOTP(email, otp)

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        email: user.email,
        password: user.password
        
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Signup error",
    });
  }
};

/*//////////////////////////////////////////////////////////////////////////////////////
/*login*/
export const Login = async (req: Request, res: Response) => {
  try {


    const { email, password } = req.body;

    console.log("login :", email, password);

    const user = await User.findOne({ email });

    console.log("user : ", user);


    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) {
        return res.status(404).json({
          message: "password glat h  ",
        });
      }

    });

    res.status(200).json({
      message: "Login succeful",
      user: {
        id: user._id,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Login error",
    });
  }
};

// {otp code}////////////////////////////////////////////////////////////////////////////
export const VerifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
       res.status(404).json({
        message: "User not found",
      });
    }

   console.log("user?.otp : ",user?.otp,otp);
   
    if (user?.otp === otp) {
       res.status(200).json({
        message: "Login Success",
      });
    } else {
       res.status(400).json({
        message: "Invalid OTP",
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
