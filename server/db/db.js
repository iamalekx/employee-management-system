import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/crud");
    } catch (error) {
        console.log("Database connection error:", error);
    } 
}