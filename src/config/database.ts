import mongoose from "mongoose";
export const Database = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("databasse contct  susscfli");
  } catch (error) {
    console.error("DB Error:", error);
  }
};

