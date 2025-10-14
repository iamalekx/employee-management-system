import User from "./models/user.js";
import bycrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
    connectToDatabase();
    try {
        const existing = await User.findOne({
            email: "admin@gmail.com",
        }).lean();
        if (existing) {
            console.log("Admin user already exists. Skipping.");
            return;
        }
        const hashPassword = await bycrypt.hash("admin123", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin",
        });
        await newUser.save();
    } catch (error) {
        console.log(error);
    }
};

userRegister();
