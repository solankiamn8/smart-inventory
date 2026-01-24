import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import apiRoutes from "./routes/index.js";

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true   // to allow cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRoutes);

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is healthy"
    })
});

export default app;
