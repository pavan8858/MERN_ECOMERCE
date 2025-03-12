
import { createContext, useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{
    const currency = '₹';
    const delevery_fee = 10;
    const backendUrl = "http://localhost:4000";

    const[search , setSearch] = useState('');
    const[showSearch , setShowSearch] = useState(false);
    const [cartitem ,setCartItem] = useState({});
    const[products, setProducts] = useState([]);
    const[token , setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {
      console.log(itemId,size);

        if(!size){
            toast.error('product size  ?????');
        }
        let cartData = structuredClone(cartitem);
        //console.log(cartData);
       

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);

        if (token) {
          try {
            
            
        
            await axios.post(`${backendUrl}/api/cart/add`, 
              { itemId, size }, 
              { headers: { Authorization: `Bearer ${token}` } }  // ✅ Correct
            );
            
        
          } catch (error) {
            console.log("Error Response:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
          }
        }
        
    }

    const getCartCount = ()=>{
      
      
        let totalCount = 0;
        for(const items in cartitem){
            for(const item in cartitem[items]){
                try{
                    if(cartitem[items][item] > 0){
                        totalCount += cartitem[items][item]
                    }
                }catch(error){
                  console.log("3rtu74twe",error)
                }
            }
        }
        
        return totalCount;
    }

  

    // const updateQuantity = async (itemId, size, quantity) => {
    //     // Clone the current cart state
    //     console.log("------------------------------------",itemId, size, quantity);
        
    //     let cartData = structuredClone(cartitem);
    //     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",cartitem);
    //     console.log("***************************",cartData);
      
    //     if (quantity === 0) {
    //       // Remove the size key if quantity is 0
    //       delete cartData[itemId][size];
      
    //       // If no sizes are left for the item, remove the item
    //       if (Object.keys(cartData[itemId]).length === 0) {
    //         delete cartData[itemId];
    //       }
    //     } else {
    //       // Update the quantity for the specified size
    //       cartData[itemId][size] = quantity;
    //     }
      
    //     // Update the state
    //     setCartItem(cartData);
    //   };

    const updateQuantity = async (itemId, size, quantity) => {
      // Clone the current cart state
      let cartData = structuredClone(cartitem);
    
      // Ensure the item exists before updating
      if (!cartData[itemId]) {
        console.error("Item not found in cart");
        return;
      }
    
      // Save previous quantity in case API fails
      const previousQuantity = cartData[itemId][size];
    
      // Update local state optimistically
      cartData[itemId][size] = quantity;
      setCartItem(cartData);
    
      // Make API request only if the user is logged in
      if (token) {
        console.log(token);
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, size, quantity },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Correct way to send the token
                "Content-Type": "application/json", // Ensure JSON format
              },
            }
          );
          
        } catch (error) {
          console.error("Failed to update cart:", error);
          toast.error(error.response?.data?.message || "Failed to update cart");
    
          // Revert back if API call fails
          let revertedCartData = structuredClone(cartitem);
          revertedCartData[itemId][size] = previousQuantity;
          setCartItem(revertedCartData);
        }
      }
    };
    
  




    const getCartAmount = () => {
      if (!products || products.length === 0) {
        console.warn("⚠️ Products list is empty, skipping cart amount calculation.");
        return 0; // Return 0 if products are not loaded yet
      }
    
      let totalAmount = 0;
      for (const itemId in cartitem) {
        const itemInfo = products.find(product => String(product._id) === String(itemId));
        if (!itemInfo) continue;
    
        for (const size in cartitem[itemId]) {
          totalAmount += itemInfo.price * cartitem[itemId][size];
        }
      }
    
      return totalAmount;
    };
    

      
      
    
    

      // const getCartAmount = () => {
      //   let totalAmount = 0;
      //     //console.log("Available Products:", products);
      //     console.log("Cart Items:", cartitem);
      //     //console.log("Cart Items:", cartitem.map(item => item.productId));
      //     //console.log("Product List IDs:", products.map(product => product._id));

      
      //   for (const itemId in cartitem) {
      //     // Find the product information for the current item
      //     const itemInfo = products.find((product) => product._id === itemId);
      //     console.log("Intem info :",itemInfo);
      //     //console.log("item info hello check exist or not",itemId)
      
      //      if (! itemInfo) {
      //        // Skip if product info is not found
      //        console.error(`Product with ID : ${itemId} not found`);
      //        continue;
      //      }
      
      //     for (const size in cartitem[itemId]) {
      //       try {
      //         const quantity = cartitem[itemId][size];
      //         // console.log(quantity)
      //         // console.log(itemInfo.price)
      
      //          if (quantity > 0) {
      //            // Multiply product price by quantity
      //            totalAmount += itemInfo.price * quantity;
      //          }
      //       } catch (error) {
      //         console.error("Error calculating total amount:", error);
      //       }
      //     }
      //   }
      
      //   return totalAmount;
      // };
      
      
    useEffect(()=>{
        //console.log(cartitem);
        
    },[cartitem])


    const getProductsData = async () => {
      try {
        console.log("🔵 Fetching products from API...");
        const response = await axios.get(`${backendUrl}/api/product/list`);
    
        if (response.data.success && response.data.products.length > 0) {
          setProducts(response.data.products);
          console.log("✅ Products updated:", response.data.products);
        } else {
          setProducts([]); // Ensure state updates even if empty
          console.warn("⚠️ No products found!");
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to fetch products.");
      }
    };
    

    const getUserCart = async (token) => {
      try {
        //console.log("Token being sent:", token);
    
        const response = await axios.post(
          `${backendUrl}/api/cart/get`, 
          {}, 
          { headers: { Authorization: `Bearer ${token}` }} // Check if this is the expected format
        );
    
        if (response.data?.success) {
         // console.log("Cart Data:", response.data.cartData);
          setCartItem(response.data.cartData);
        }
      } catch (error) {
        console.error("Error in getUserCart component:", error);
        console.error("Response Error Data:", error.response?.data); // Log backend error response
        console.error("Status Code:", error.response?.status);
        toast.error(error.response?.data?.message || "Failed to fetch cart.");
      }
    };
    
    




    useEffect(()=>{
      getProductsData()
    },[])
    useEffect(() => {
      console.log("📌 Updated Products:", products);
    }, [products]);
    

    useEffect(()=>{
      if(!token && localStorage.getItem('token') ){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
      }
    },[])



    const value = {
        products , currency , delevery_fee,
        search, setSearch,showSearch,setShowSearch,
        cartitem,addToCart,setCartItem,
        getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,setToken,token
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}




export default ShopContextProvider;




