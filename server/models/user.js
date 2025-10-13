import mongoose from "mongoose";
import { extname } from "path/win32";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee",
        required: true,
    },
    profileImage: { type: String },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
