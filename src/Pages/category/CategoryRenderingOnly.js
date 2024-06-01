import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_BASEURL } from '../../db/baseUrl'
import { toast } from 'react-toastify'
import ProductCard from '../../components/ProductCard/ProductCard'
import LoadingSpinner from '../../components/loader/Loader'

export default function CategoryRenderingOnly() {


    
    const [data,setData]=useState("")
    const [loading,setLoading]=useState(false)
    const {category}=useParams()




    const getCategory=async()=>{
        try {
            setLoading(true);
const response = await axios.get(`${BACKEND_BASEURL}api/${category}`)

setData(response.data)
console.log(response.data)
            setLoading(false);
            
        } catch (error) {
            const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setLoading(false);
      setData("")
        }
    }

    useEffect(()=>{
getCategory()
    },[category])

  return (
    <>
{loading&&<LoadingSpinner/>}
<div className='p-8 flex items-center  text-3xl'>

            <h1>{category}</h1>
</div>
        <div className="flex flex-wrap justify-center my-8">
          {data.length > 0 &&
            data &&
            data?.map((item, i) => (
              <ProductCard
                productName={item.productName}
                storeName={item.storeName}
                price={item.price}
                discount={item.discount}
                id={item._id}
                image={item.image}
                rating={item.rating}
              />
            ))}
        </div>
    </>
  )
}
