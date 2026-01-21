import express from "express";

import userRoutes from "./modules/users/user.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is healthy"
    })
});

export default app;
