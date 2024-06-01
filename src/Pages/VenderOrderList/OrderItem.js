import axios from "axios";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import { confirmAlert } from "react-confirm-alert";
// import image from "../Asset/shoes.jpeg";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function ItemData({id,sn,userName,productName,address,mobile,price,quantity,status,getAllOrders}) {
 const [orderStatus,setOrderStatus]=useState("")



 const handleChangeStatus = (status,id) => {
  confirmAlert({
    title: "Status update",
    message: `Are you sure you want to change the status,
    once it done it cannot be change`,
    buttons: [
      {
        label: "Confirm",
        onClick: () => handleUpdateStatus(status,id),
      },
      {
        label: "Cancel",
      },
    ],
    closeOnClickOutside: false,
  });
};

 const handleUpdateStatus=async(status,id)=>{
  if(!orderStatus){
    toast.error("Please choose status")
    return
  }
  const data = {
    statusFromVendor:status
  }
  try {
    const response = await axios.patch(`${BACKEND_BASEURL}api/user/order/changeOrderStatus/${id}`,data) 
    toast.success(response.data.message)
    getAllOrders()
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
  toast.error(message);
  }

 }

















  return (
    <>
      <tr className="ring-1 ring-red-600">
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{sn}</td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {userName}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap  text-wrap">
          {productName}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-wrap">
        {address}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-wrap">
        {mobile}
        </td>

        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span>Rs:{price*quantity}</span> 
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{quantity}</td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <div className="flex items-center">
            <div className="border-gray-400 flex items-center space-x-1">
              <select className={`outline-none w-28 bg-gray-200 py-1 ${status==="Pending"?"bg-red-300":status==="Deliver"?"bg-yellow-300":"bg-green-300"}`} onChange={e=>setOrderStatus(e.target.value)}>
                <option selected value="">
                  {status}
                </option>{status==="Pending" && <option value="Deliver">Deliver</option>}
                
              </select>
              <button className="bg-sky-500 p-[.16rem]" onClick={()=>handleChangeStatus(orderStatus,id)}>
            <TiTick className="w-[1.4rem] h-[1.4rem] hover:scale-150  transition-all ease-linear duration-200" />
          </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
