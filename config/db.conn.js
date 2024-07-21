import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "task-db",
    });
    console.log(
      `mongodb connected ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (error) {
    console.error("mongodb connection error", error);
    process.exit(1);
  }
};
