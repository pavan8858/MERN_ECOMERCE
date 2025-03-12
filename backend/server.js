import express from "express";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cors from "cors";
import cartRouter from "./routes/cartRoute.js";
import authUser from "./middleware/auth.js";
import orderRouter from "./routes/orederRoute.js";




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database & Cloudinary
connectDB();
connectCloudinary();
app.get('/api/protected', authUser, (req, res) => {
  res.json({ success: true, message: "You have access!" });
});

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());  // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(cors());



// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart' , cartRouter)
app.use('/api/order', orderRouter)



// Root Route
app.get("/", (req, res) => {
  res.send("Server is Running!");
});

// 404 - Not Found Middleware (for any undefined routes)
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found!" });
});

// General Error Handler Middleware (captures all errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
