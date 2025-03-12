import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received Token:", token);
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", token_decode);
        console.log("Authorization Header:", req.headers.authorization);


        req.body.userId = token_decode.id; // Attach user data to request
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token. Please log in again." });
    }
};

export default authUser;

