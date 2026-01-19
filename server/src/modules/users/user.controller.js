import mongoose from "mongoose";
import User from "./user.schema.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create the new User
        // 1. we create a new instance of the User model
        const newUser = new User({
            name,
            email,
            password,
            role
        });

        // Save it to the database (This triggers the pre-save hook for hashing)
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
