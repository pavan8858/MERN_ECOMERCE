import React from 'react'

const NewsletterBox = (event) => {
  const onSubmitHandler = () =>{
    event.preventDefault();
  }

  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-700'>Subscribe now & get 20% off </p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi ratione iusto id. Culpa non nihil doloremque eius aspernatur repellat tempora rem voluptas nesciunt accusamus at, iste, omnis impedit a earum.
        </p>
        <form onSubmit = {onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-3'>
            <input type='email' placeholder='enter your email'className='w-full sm:flex-1 outline-none type="email" placeholder:enter your email 
            '></input>
            <button type='submit' className='bg-black text-white text-xs px-4'>SUBSCRIBE</button>
        </form>

    </div>
  )
}

export default NewsletterBox