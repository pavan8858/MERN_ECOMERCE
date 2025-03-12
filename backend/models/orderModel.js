 import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   userId: { type: String,  required: true },
   items:{type:Array, required: true},
   amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [1, "Amount must be a valid number greater than zero."], // ✅ Ensures amount is at least 1
  },
  
   address:{type:Object, required: true},
   status:{type:String, required: true,default:"order Placed"},
   paymentMethod:{type:String, required: true},
   payment: {    
    type: Boolean,
    required: true,
    default: false,
    
  },
  
   date:{type: Number,required:true}
   
 });

const orderModel =mongoose.models.order || mongoose.model("order", orderSchema);
 export default orderModel;
