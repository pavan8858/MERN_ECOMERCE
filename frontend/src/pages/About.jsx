import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t '>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flx-col md:flex-row gap-16 '>
        <img className='w-full md:max-w-[450px] ' src={assets.about_img}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A provident molestias quia similique dolore atque corrupti rerum, sunt, eveniet modi praesentium dicta aut iste nemo explicabo quidem laborum ducimus est!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia accusantium illum et quam, hic ex sunt blanditiis! Quod facere sunt placeat voluptatum perferendis aliquam, ut ipsam eligendi, optio odit quis?</p>
          <b className='text-gray-800'>Our Misson</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam neque voluptatum placeat non vero pariatur dolorem ea laboriosam nostrum corrupti a iure quae reiciendis nemo expedita excepturi, ad dolorum! Quibusdam.</p>
        </div>
      </div>
      <div className='text-4xl py-4 '>
        <Title text1={'WHY'} text2={"CHOOSE US"}/>
      </div>
      <div className='flex felx-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Quality Assuarnce</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deserunt earum dicta, perspiciatis hic? Recusandae error, quibusdam, tenetur reprehenderit aspernatur minus ullam eligendi voluptate perferendis nihil neque nam. Doloribus.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deserunt earum dicta, perspiciatis hic? Recusandae error, quibusdam, tenetur reprehenderit aspernatur minus ullam eligendi voluptate perferendis nihil neque nam. Doloribus.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis deserunt earum dicta, perspiciatis hic? Recusandae error, quibusdam, tenetur reprehenderit aspernatur minus ullam eligendi voluptate perferendis nihil neque nam. Doloribus.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About