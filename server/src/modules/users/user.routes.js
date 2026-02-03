import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile } from "./user.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();
// /api/users

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile", authenticateUser, getUserProfile);

export default router;
