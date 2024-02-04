import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_SOLARLOGS_URI;

let connection;

export const connectToMongoDB = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(MONGODB_URI);
      console.log("MongoDB connected successfully.");
    }
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB.");
  }
};
