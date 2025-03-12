import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }

  return (
    <div className="flex items-center justify-between py-5 px-4 font-medium">
     <Link to="/"><img  src={assets.logo} className="w-36" alt="Logo" /></Link> 

      
      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-8 text-gray-700">
        {['Home', 'Collection', 'About', 'Contact'].map((item) => (
          <NavLink 
            key={item} 
            to={`/${item.toLowerCase()}`} 
            className="flex flex-col items-center gap-1"
          >
            <p>{item}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>
      
      {/* Right Section */}
      <div className="flex items-center gap-6">
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <img onClick={()=>token ? null : navigate('/login')} className="w-5 cursor-pointer" src={assets.profile_icon} alt="" />
          {/* code for dropdown */}
         {token && 
         <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500">
              <p className="cursor-pointer hover:text-black">My profile</p>
              <p onClick={()=> navigate('/order')} className="cursor-pointer hover:text-black">Order</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full">{getCartCount()}</p>
        </Link>
        <img 
          onClick={() => setVisible(true)} 
          src={assets.menu_icon} 
          className="w-5 cursor-pointer sm:hidden" 
          alt="menu" 
        />
      </div>
      
      {/* Sidebar Menu for Small Screen */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white z-50 transition-all ${
          visible ? 'w-full' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div 
            onClick={() => setVisible(false)} 
            className="flex items-center gap-4 p-4 border-b text-gray-600"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>
          <div className="flex flex-col gap-6 mt-4 px-4 text-gray-700">
            {['Home', 'Collection', 'About', 'Contact'].map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase()}`} 
                onClick={() => setVisible(false)}
                className="text-lg"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



