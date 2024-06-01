import React, { useEffect, useState } from "react";
import VenderPreformanceCard from "./VenderPreformanceCard";
import { FaProductHunt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import AllListedItems from "./AllListedItems";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import { toast } from "react-toastify";
import useRedirectLogoutUser from "../../customHooks/useRedirectLogoutUser";
import LoadingSpinner from "../loader/Loader";

export default function VenderDashboard() {
  useRedirectLogoutUser("/login");
  
  const [data,setData]=useState("")
  const [loading,setLoading]=useState(false)
  
  
  const getAllListedItems=async()=>{
    try {
      setLoading(true)
      const response = await axios.get(BACKEND_BASEURL+"api/vendor/getProducts")
      setData(response.data)
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
        getAllListedItems()
      },[]) 
      
      const venderStats = [
        {
          title: "Total Product",
          number: data?.length,
          icon: <FaProductHunt />,
          bgColor: "bg-violet-700",
        },
        // {
        //   title: "Total Sale",
        //   number: "50000",
        //   icon: <GiMoneyStack />,
        //   bgColor: "bg-green-700",
        // },
        // {
        //   title: "Monthly Sale",
        //   number: "10000",
        //   icon: <FcSalesPerformance />,
        //   bgColor: "bg-sky-500",
        // },
      ];
      return (
        <div>
          {loading&&<LoadingSpinner/>}
      <div className="w-[90%] md:w-[80%] mx-auto ">
        <div className="text-center">
          <h1 className="text-2xl font-bold py-4">Vender Stats</h1>
        </div>
        <div className="flex flex-row mx-auto justify-center gap-4 flex-wrap">
          {venderStats.map((item, i) => (
            <VenderPreformanceCard
              key={i}
              title={item.title}
              members={item.number} //exlclude the admin so users-1
              icon={item.icon}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>
      <div className="w-[90%] md:w-[80%] mx-auto">
        <AllListedItems data={data&&data}/>
      </div>
    </div>
  );
}
