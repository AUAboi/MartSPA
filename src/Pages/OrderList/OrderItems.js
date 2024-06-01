import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../../components/loader/Loader";
import { confirmAlert } from "react-confirm-alert";

export default function CartItems({
  sn,
  id,
  product_image,
  product_name,
  price,
  quantity,
  paymentType,
  getItemData,
  status
}) {

  const [loading, setLoading] = useState(false);

  const handleCancelOrder=async(id)=>{

    try {
      setLoading(true);

      const response = await axios.delete(`${BACKEND_BASEURL}api/user/order/deleteOrder/${id}`)
toast.success(response.data.message)
getItemData()
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
  }

  const handleConfirmOrderStatus = (id) => {
    confirmAlert({
      title: "Status update",
      message: `Are you sure you want to change the status,
      once it done it cannot be change`,
      buttons: [
        {
          label: "Confirm",
          onClick: () => handlConfirmOrder(id),
        },
        {
          label: "Cancel",
        },
      ],
      closeOnClickOutside: false,
    });
  };



const handlConfirmOrder=async(id)=>{
  const data={
    statusFromVendor:"Confirm"
  }
  try {
    setLoading(true);
const response = await axios.patch(`${BACKEND_BASEURL}api/user/order/changeOrderStatus/${id}`,data) 
    toast.success(response.data.message)
    getItemData()
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
}


  return (<>
      {loading&& <LoadingSpinner/>}
    <tr>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{sn}</td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <img
          src={product_image}
          alt={product_name}
          className="w-12 h-12 border-2 border-gray-300 rounded-md object-cover"
          />
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-wrap">
        {product_name}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {quantity}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        Rs: {quantity*price}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
       {paymentType ==='cash' ? 'Cash On Delivery': 'Paid'}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap space-x-2">{
        status==="Pending"  && <>
       <button className="text-white bg-red-500 rounded-md py-2 px-3" onClick={()=>handleCancelOrder(id)}>
          Cancel
        </button> 
        </>}
        {status ==="Deliver" && 
        <button className="text-white bg-green-500 rounded-md py-2 px-3" onClick={()=>handleConfirmOrderStatus(id)}>
          Confirm Delivery
        </button>
        }
         
      </td>
    </tr>
          </>
  );
}
