import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import PlaceOrder from './pages/PlaceOrder';
import Home from './pages/Home'; // Assuming this exists
import About from './pages/About'; // Assuming this exists
import Product from './pages/Product'; // Assuming this exists
import Cart from './pages/Cart'; // Assuming this exists
import Login from './pages/Login'; // Assuming this exists
import Orders from './pages/Orders'; // Assuming this exists
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';





import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify';



const App = () => {
  //console.log("All ENV variables:", import.meta.env);
  //console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
  //console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
  
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;

