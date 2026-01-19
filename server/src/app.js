import express from "express";

import userRoutes from "./modules/users/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is healthy"
    })
});

export default app;
