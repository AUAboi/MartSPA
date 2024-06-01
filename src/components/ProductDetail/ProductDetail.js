import React from 'react'
import img from "../../Asset/image/p_details.jpg"
import {FaShareAlt} from 'react-icons/fa'
export default function ProductDetail() {
  return (
    <div className='bg-red-500 text-white mx-28 my-6 rounded max-sm:mx-0 max-md:max-4 max-lg:mx-12'>
      <div className='flex py-8 max-lg:flex-col'>
        <div className='ps-28 pe-12 flex justify-center items-center max-lg:ps-4 lg:ps-10 max-lg:justify-start'>
            <img src={img} alt="name of product" />
        </div>
        <div className='flex flex-col justify-center max-lg:px-4 max-lg:justify-start max-lg:mt-2'>
            <div><h1 className='text-3xl font-semibold mb-[9px]'>Name of product Lorem ipsum dolor sit amet.</h1></div>
            <div className='text-sm mb-[30px]'>by mr abc</div>
            <div className='pb-2 text-xl'>Price: $ 50</div>
            <div className='text-xl'>Rating</div>
            <div className='flex pt-9'>
              <div className='relative group'>
                {/* <div className='w-0 rounded-full absolute left-0 top-0 bottom-0 bg-red-600 transition-w ease-linear duration-200 group-hover:shadow-2xl group-hover:w-[142px]'></div> */}
                <button className='w-[142px] h-[48px] px-4 py-2 mr-2 border-2 border-white bg-white text-black font-medium  rounded-full transition ease-linear duration-300 group-hover:text-white group-hover:bg-red-500'>Add to Cart</button>
              </div>
                <button className='w-[70px] h-[48px] px-4 py-3 border-2 border-white rounded-full text-lg flex justify-center transition ease-linear duration-300 hover:text-red-500 hover:bg-white'><FaShareAlt className='grid self-center'/></button>
            </div>
        </div>
      </div>
    </div>
  )
}
