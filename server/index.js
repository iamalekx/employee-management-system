import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/crud");

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number,
// });

// const User = mongoose.model("users", userSchema);

// app.get("/getUsers", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
