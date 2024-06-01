import React, { useEffect, useState } from "react";
import VenderOrderCard from "./VenderOrderCard";

import AllOrderItems from "./AllOrderItems";
import { TbTruckDelivery } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import { BsFillCartCheckFill } from "react-icons/bs";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loader/Loader";
import { GiConfirmed } from "react-icons/gi";

export default function VenderOrderList({}) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);


  const totalDeliver=data && data?.filter((item,i)=>{
    return item.status==="Deliver"
  })
  const totalPending=data && data?.filter((item,i)=>{
    return item.status==="Pending"
  })
  const totalConfirm=data && data?.filter((item,i)=>{
    return item.status==="Confirm"
  })


  const venderStats = [
    {
      title: "Total Order",
      number: data?.length,
      icon: <BsFillCartCheckFill />,
      bgColor: "bg-violet-700",
    },
    {
      title: "Delivered",
      number: totalDeliver?.length,
      icon: <TbTruckDelivery />,
      bgColor: "bg-yellow-700",
    },
    {
      title: "Pending",
      number: totalPending?.length,
      icon: <BiLoaderCircle />,
      bgColor: "bg-red-500",
    },
    {
      title: "Confirmed",
      number: totalConfirm?.length,
      icon: <GiConfirmed />,
      bgColor: "bg-green-700",
    },
  ];



  const getAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_BASEURL}api/user/order/getAllOrderListVendor`
      );
      setData(response.data);
      console.log(response.data);

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
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);










  return (
    <div>
      {loading&&<LoadingSpinner/>}
      <div className="w-[90%] md:w-[80%] mx-auto mb-16 ">
        <div className="text-center">
          <h1 className="text-2xl font-bold py-4">Order Stats</h1>
        </div>
        <div className="flex flex-row mx-auto justify-center gap-4 flex-wrap">
          {venderStats?.map((item, i) => (
            <VenderOrderCard
              key={i}
              title={item.title}
              members={item.number}
              icon={item.icon}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>
      <div className="w-[90%] md:w-[80%] mx-auto">
        <AllOrderItems data={data && data} getAllOrders={getAllOrders}/>
      </div>
    </div>
  );
}
