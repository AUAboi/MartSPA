import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function ItemData({
  id,
  sn,
  image,
  productName,
  price,
  totalStock,
  discount,
  handleDeleteItem
}) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleEditProduct = (id) => {
    alert(id);
  };

 
  return (
    <>
      <tr>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {sn + 1}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <img src={image} alt="" className="size-20" />
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-wrap">
          {productName}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span>Rs:</span> {price}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {totalStock}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {Math.round((discount / price) * 100)}%
        </td>
        {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <div className="flex items-center justify-center gap-2">
            <div className="border-b border-gray-400  ">
              <select
                className="outline-none w-28 bg-gray-200 py-1 "
                value={selectedValue}
                onChange={handleChange}
              >
                <option selected value="">
                  --select--
                </option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
              </select>
            </div>
            <span>
              {selectedValue === "sm"
                ? "10"
                : selectedValue === "md"
                ? "12"
                : selectedValue === "lg"
                ? "17"
                : selectedValue === "xl"
                ? "11"
                : ""}
            </span>
          </div>
        </td> */}
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <NavLink to={`/profile/dashboard/editable/${id}`}>
            <button className="text-blue-700">
              <FaEdit className="size-6 hover:scale-125 transition-all ease-linear duration-300" />
            </button>
          </NavLink>
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <button className="text-red-700" onClick={() => handleDeleteItem(id)}>
            <FaTrashAlt className="size-6 hover:scale-125 transition-all ease-linear duration-300" />
          </button>
        </td>
      </tr>
    </>
  );
}
