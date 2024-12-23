import mongoose from "mongoose";

export const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};
