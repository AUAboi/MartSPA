import React from 'react'
import noResult from "../../Asset/image/noresultfound.jpg"
import ProductCard from '../../components/ProductCard/ProductCard'
import { useLocation } from 'react-router-dom';

export default function SearchResult() {
    const {state} = useLocation();  
  return (
    <div className='flex justify-center items-baseline flex-wrap space-x-8 space-y-6'>
      {/* {data && data.map((item,i)=>(
<ProductCard/>
      ))} */}
      {state && state.length===0?<div className='flex justify-center items-center text-2xl max-sm:text-lg text-red-600 my-32 font-semibold'>
        <div className='flex flex-col justify-center items-center'>
          <img src={noResult} alt="noResult" />
        No Result found for your search
        </div>
        </div>
        :state && state.map((item,i)=>(
          <div className='flex justify-center items-center'>

        <ProductCard productName={item.productName} storeName={item.storeName} price={item.price} discount={item.discount} id={item._id} image={item.image}  rating = {item.rating}/>
          </div>
      ))}


      
    </div>
  )
}
