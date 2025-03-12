import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }); // Token expires in 1 day
};

// Route for user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = createToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }, // Sending user info (excluding password)
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Route for user register 
const registerUser = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Saving user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Debugging JWT secret
        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check if secret is loaded

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        console.log("Generated Token:", token); // Log token to debug

        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Route for admin login 
const adminLogin = async (req, res) => {
    try{
        console.log(req.body)
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token:token})

        }else{
            res.json({success:false, message:"Invalid credintials"})
        }
    }catch(error){
       console.log("You Have Not Admin");
       res.json({success:false, message:"Invalid User"})
    }
};

export { loginUser, registerUser, adminLogin };

