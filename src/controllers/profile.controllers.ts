import { Request, Response } from "express";
import Profile from "../model/profile.model";

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { userId, bio, gender, address,} = req.body;

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const profile = await Profile.create({
      userId,
      bio,
      gender,
      address,
    });

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
