import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
    // Get the header
    const authHeader = req.headers.authorization;

    // Check if header exists & starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Authentication Invalid" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    try {
        // Verify token using JWT verify
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { userId: payload.userId, role: payload.role };

        next();

    } catch (error) {
        return res.status(401).json({ message: "Authentication Invalid" });
    }
}