import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsEnv
  .split(",")
  .map((origin) => origin.trim());

console.log("Allowed Origins:", allowedOrigins);

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // to allow cookies
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy",
  });
});

export default app;
