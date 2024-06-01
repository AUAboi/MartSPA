import React from 'react'
import noResult from "../../Asset/image/nopage.jpg"

export default function PageNotFound() {
  return (
<div className='flex justify-center items-center bg-[#FFF0C5]'>
<div className='flex justify-center items-center text-2xl max-sm:text-lg text-red-600 my-40 font-semibold'>
        <div className='flex flex-col justify-center items-center'>
          <img src={noResult} alt="noResult" className='w-72'/>
        {/* Error 404
        <p>Page not found</p> */}
        </div>
        </div>
    </div>
  )
}
