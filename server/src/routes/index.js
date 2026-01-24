import { Router } from "express"
import userRoutes from "../modules/users/user.routes.js";
import inventoryRoutes from "../modules/inventory/inventory.routes.js";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/inventory", inventoryRoutes);

export default router;