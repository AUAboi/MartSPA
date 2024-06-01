import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import { NavLink } from "react-router-dom";

export default function CartItems({
  id,
  index,
  product_image,
  product_name,
  price,
  quantity,
  handleDelete,
  value,
}) {
  const [totalItemQuantity, setTotalItemQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [resData, setResData] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleDecrement = () => {
  //   totalItemQuantity > 0 && setTotalItemQuantity(totalItemQuantity - 1);
  // };

  // const handleIncrement = () => {
  //   if (discount) {
  //     totalItemQuantity < 5 && setTotalItemQuantity(totalItemQuantity + 1);
  //   } else {
  //     totalItemQuantity < totalStock &&
  //       setTotalItemQuantity(totalItemQuantity + 1);
  //   }
  // };
  useEffect(() => {
    handleSubTotal();
  }, [price, quantity]);

  const handleSubTotal = () => {
    setSubTotal(quantity * price);
  };

  return (
    <tr>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{index}</td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
      <NavLink to={`/item/${value}`}>
          <img
            src={product_image}
            alt={product_name}
            className="w-20 h-20 object-cover"
          />
      </NavLink>
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-wrap">
      <NavLink to={`/item/${value}`}>
          {product_name}
      </NavLink>
        </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <div className="flex items-center border-gray-400 w-max ">
            {quantity} &#215; {price}
          </div>
        </div>
      </td>
      {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {totalStock}
      </td> */}
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        Rs: {subTotal}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <button
          className="text-red-700 hover:scale-125 transition-all ease-linear duration-300"
          onClick={() => handleDelete(id)}
        >
          <FaTrashAlt size={20} />
        </button>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <NavLink to={`/user/myWishList/checkout/${id}`}>
          <button
            className={`max-sm:px-6 px-4 py-3  rounded text-white transition-all ease-linear duration-300 bg-blue-600 hover:bg-blue-800`}
          >
            Pay Now
          </button>
        </NavLink>
      </td>
    </tr>
  );
}
