import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8000;
const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log("Server is running on port 8000")
        });
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()