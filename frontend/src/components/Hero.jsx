import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">Our Best Seller</p>
          </div>
          <h1 className=" .prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrival</h1>
          <div className="flex items-center gap-2 mt-4">
            <p className="font-semibold text-sm md:text-base cursor-pointer">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2">
        <img className="w-full h-auto" src={assets.hero_img} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;


