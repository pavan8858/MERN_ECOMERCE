import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    
    const { currency, delivery_fee=1, getCartAmount , products } = useContext(ShopContext);

    const cartAmount = getCartAmount() || 0; // Make sure it's a valid number

   
    const total = cartAmount + delivery_fee;
    
    
    

    
  if (!products || products.length === 0) {
    return <p>Loading products...</p>; // Prevents error before products load
  }

  return (
    <div className='w-full'>
        <div className='text-2xl'>
             
            <Title text1={'CART'} text2={'TOTAL'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {cartAmount}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{total}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal;  