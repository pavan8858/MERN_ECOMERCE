import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm  '>
            <div>
                <img src= {assets.logo} className='md-5 w-32 ' alt=''/>
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque molestias, totam modi dicta officia soluta, inventore et reprehenderit ipsum necessitatibus adipisci saepe odio asperiores error, facere sit aut dolores velit.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us </li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 '>GET IN TOUCH </p>
                <ul className='flex felx-row gap-1 text-gray-600'>
                    <li>+1-212-456-7909</li>
                    <li>Ecom12345@gmail.com</li>

                </ul>
            </div>

        </div>
        <div>
            < hr className=''/>
            <p className='py-5 text-sm text-center'>Copyright 2024@ Secure-all services </p>
        </div>
    </div>
  )
}

export default Footer