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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Check password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Create Token
        const token = await user.createJWT();

        const isProduction = process.env.NODE_ENV === 'production';

        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000     // 1 Day in milliseconds
        }

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            message: "Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}