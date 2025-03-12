// import React, { useEffect, useState, useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";

// const OrderPage = () => {
//   const { backendUrl, token } = useContext(ShopContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/order/my-orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.success) {
//           setOrders(response.data.orders);
//         } else {
//           console.error("Error:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Fetch Orders Error:", error.message);
//       }
//     };

//     if (token) {
//       fetchOrders();
//     }
//   }, [token, backendUrl]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Orders</h2>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order._id} className="border p-4 rounded shadow">
//               <p className="text-gray-600">Order ID: {order._id}</p>
//               <p>Status: <span className="font-bold">{order.status}</span></p>
//               <p>Total: ₹{order.totalAmount}</p>

//               <ul className="mt-2 space-y-1">
//                 {order.items.map((item) => (
//                   <li key={item._id} className="flex justify-between">
//                     <span>{item.product.name} ({item.size})</span>
//                     <span>₹{item.price} x {item.quantity}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderPage;
