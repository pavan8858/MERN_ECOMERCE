import express from "express";

import adminAuth from '../middleware/adminAuth.js' 
import authUser from '../middleware/auth.js'
import { verifyRazorpay , verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from "../controllers/orederController.js";




const orderRouter = express.Router();
//Admin Feature 
orderRouter.post("/list", adminAuth,allOrders); 
orderRouter.post("/status", adminAuth,updateStatus); 

//Payment Features 

orderRouter.post('/place', authUser ,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User feature 
orderRouter.post('/userorders',authUser,userOrders)

//verify payment 

orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',verifyRazorpay)



export default orderRouter
