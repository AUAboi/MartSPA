import React, { useEffect, useState } from 'react'
import MnRNav from './MnRNav'
import axios from 'axios'
import { BACKEND_BASEURL } from '../../db/baseUrl'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/loader/Loader'
import MarkButton from './MarkButton'

export default function Reports() {
    const [ reports,setReports]=useState("")
    const [ getDataAgain,setGetDataAgain]=useState("")
    const [ loading,setLoading]=useState(false)
    const [ markAs,setMarkAs]=useState(true)




    const getReportsData=async()=>{
        try {
            setLoading(true)
            const response = await axios.get(`${BACKEND_BASEURL}api/support/reports`)
            setReports(response.data)
            setLoading(false)
            
        } catch (error) {
            const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setLoading(false)
        }
    }
useEffect(()=>{
    getReportsData()
},[])


const handleMarkAsView=async(id,isReviewed)=>{
  // toast.success(id)
    try {
        setLoading(true)
        const response  = await axios.patch(`${BACKEND_BASEURL}api/support/reports/${id}`,{isReviewed:!isReviewed})
        setGetDataAgain(response.data.message)
        getReportsData()
        setLoading(false)


        
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setLoading(false)
    }
}

  return (<>
  <MnRNav/>
    <div className='flex flex-col justify-center items-center'>
        <div>
        <h1 className='text-2xl font-semibold my-6'>Seller Reports</h1>
        </div>
        <div className='shadow-2xl rounded-md p-8 my-6 w-full'>
        {reports.length===0 && <div className="flex justify-center items-center font-semibold text-2xl">No resports found</div>}
      {loading?<LoadingSpinner/>:reports &&reports.map((item,i)=>(
          

          <div key={i} className={`shadow-2xl rounded-md my-6 p-4  ${item.isReviewed && "text-gray-400 bg-neutral-200"}`}>
            <div className='flex max-sm:items-center space-x-4 rounded-full'>
                <img src={item.photo} alt="img" className='w-14 h-14 rounded-full'/>
                <h2><span className='font-semibold'>{item.name}</span> reported the seller <span className='font-semibold text-red-600'>{item.vendorName}</span> with id "{item.vendorId}"</h2>
            </div>
            <div className='flex flex-col justify-center my-4'>
                <h2><span className='font-semibold'>Subject:</span> {item.subject}</h2>
                <p>{item.message}</p>
            </div>
            <div className='flex justify-end'>
                <button className={` max-sm:px-6 px-4 py-3  rounded text-white transition-all ease-linear duration-300 ${item.isReviewed? "bg-red-600 hover:bg-red-800":"bg-blue-600 hover:bg-blue-800"}`} onClick={()=>handleMarkAsView(item._id,item.isReviewed)}>{item.isReviewed ?"Mark as not reviewed":"Mark as reviewed"}</button>
    </div>
          </div>




        ))}
        </div>
    </div>
  </>
  )
}
