import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import axios from "axios";

const Cart = () => {
  const { products, currency, cartitem, updateQuantity , navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if(products.length > 0){
      const tempData = [];
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        if(cartitem[items][item]>0){
          tempData.push({
            _id: items,
            size: item,
            quantity: cartitem[items][item],
          });
        }
        
        } 
      }
    
    setCartData(tempData);

    }
     // Update cart data
  }, [cartitem,products]);

  return (
    <div className="border-t pt-10 px-4 sm:px-8">
      <div className="text-2xl mb-6 text-center font-semibold">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="space-y-6">
        
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-gray-200 grid grid-cols-[4fr_1fr_1fr] sm:grid-cols-[3fr_1fr_1fr] gap-4 items-center"
            >
              {/* Product Details */}
              <div className="flex items-start gap-4">
                <img
                  className="w-20 h-20 object-cover rounded-md"
                  src={productData?.image?.[0]}
                  alt=""
                />
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-800">
                    {productData.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currency}
                    {productData.price}
                  </p>
                  <p className=" w-20 text-xs px-2 py-1 rounded bg-gray-50 text-gray-700">
                    Size: {item.size}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex justify-center">
                <input
                  className="border w-16 text-center px-2 py-1 rounded focus:outline-none focus:ring focus:ring-gray-300"
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (!isNaN(newValue) && newValue >= 0) {
                      updateQuantity(item._id, item.size, newValue);
                    }
                  }}
                  
                />
              </div>
              <div className="mr-4">
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 sm:w-6 cursor-pointer hover:opacity-80"
                  src={assets.bin_icon}
                  alt="Delete item"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>

          <div className="w-full text-end">
            <button onClick={()=>navigate('/place-order')} className="bg-black text-white text-sm my-3 py-3 px-3 border">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
