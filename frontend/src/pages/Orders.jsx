import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Orders = () => {

  const {backendUrl, token , currency , userId} = useContext(ShopContext);
  const [orderData,setOrderData] = useState([])
  const loadOrderData = async () =>{
    try{
      if(!token){
        return null
      }
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {}, // Send userId in the request body
        { headers: { Authorization: `Bearer ${token}` } } // Use proper header format
      );
      // console.log("orders-------response",response.data)
      if(response.data.success){
        let allOrdersItem  = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
        
      }
      
    }catch(error){
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  }
  useEffect(()=>{
    loadOrderData()
  },[token , userId])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div className=''>
        {
         orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:item-center md:justify-between gap-4 '>
              <div className='flex items-start gap-6 text-sm'>
                 <img className='w-16 sm:w-20' src={item.image[0]} alt=''/>
                 <div>
                  <p className='sm:text-base font-medium'>
                    {item.name}
                  </p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-4'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-4'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                 </div>

              </div>
              <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm h-14'>Track Order</button>
                 
              </div>

            </div>

          ))
        }
      </div>
    </div>
  )
}

export default Orders