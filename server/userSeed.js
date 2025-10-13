import User from "./models/user.js";
import bycrypt from "bcrypt";

const userRegister = async () => {
    try {
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
