import express from "express";
import { registerUser, loginUser } from "./user.controller.js";

const router = express.Router();
// /api/users

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser)

export default router;