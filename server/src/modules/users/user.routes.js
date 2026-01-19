import express from "express";
import { registerUser, loginUser } from "./user.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();
// /api/users

// Register Route
router.post("/register", registerUser);
// Login Route
router.post("/login", loginUser)

//Protected Route
router.get("/profile", authenticateUser, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user  // sending the data attached by the middleware
    });
});


export default router;