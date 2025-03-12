import React from 'react';
import { assets } from '../assets/assets'; // Ensure this path is correct

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between bg-gray-100 shadow-md'>
      {/* Logo */}
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />

      {/* Logout Button */}
      <button onClick={()=>setToken('')}  className=" bg- blue- 500 text white p x-4 b-r-50%">Logout</button>


    </div>
  );
};

export default Navbar;
