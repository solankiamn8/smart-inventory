import { Router } from "express"
import userRoutes from "../modules/users/user.routes.js";
import inventoryRoutes from "../modules/inventory/inventory.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/inventory", inventoryRoutes);

export default router;