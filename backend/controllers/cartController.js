import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is initialized

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is initialized

        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            cartData[itemId][size] = quantity;
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Mark the field as modified
        userData.markModified("cartData");

        await userData.save(); // Save changes

        res.json({ success: true, message: "Cart updated" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body; // Preferably from `req.params` or authentication middleware

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };






// // Add product to user cart
// const addToCart = async (req, res) => {
//     try {
//         const { productId } = req.body;
//         const userId = req.user.id; // Get userId from token

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {}; // Ensure cartData exists

//         if (!cartData[productId]) {
//             cartData[productId] = 1; // Default quantity
//         } else {
//             cartData[productId] += 1;
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData });

//         res.json({ success: true, message: "Item added to cart", cartData });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update user cart
// const updateCart = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         const userId = req.user.id; // Get userId from token

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {}; 

//         if (quantity > 0) {
//             cartData[productId] = quantity;
//         } else {
//             delete cartData[productId]; // Remove item if quantity is 0
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData });

//         res.json({ success: true, message: "Cart updated", cartData });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get user cart
// const getUserCart = async (req, res) => {
//     try {
//         const userId = req.user.id; 

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         res.json({ success: true, cartData: userData.cartData || {} });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { addToCart, updateCart, getUserCart };
