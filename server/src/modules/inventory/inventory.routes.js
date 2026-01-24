import express from "express";
import { createInventory, deleteInventory, getInventory, updateInventory } from "./inventory.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();
// /api/inventory

router.post("/create", authenticateUser, createInventory);
router.get("/", authenticateUser, getInventory);
router.patch("/:id", authenticateUser, updateInventory);
router.delete("/:id", authenticateUser, deleteInventory);

export default router;