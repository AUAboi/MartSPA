import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { RESET, deleteUser, getUsersList, upgradeUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendAutoMail } from './../../redux/features/email/emailSlice';

export default function UserTable({ i, id, name, email, isVerified, role }) {
  let userData={
    subject:"Account Status - AppName",
    sendTo:email
    ,
    url:"/login"

  }
  const [roleToSet,setRoleToSet]=useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, message } = useSelector((state) => state.auth);

const handleChangeRole=async(id,roleToBe,email)=>{
  if(!roleToBe){
    toast.error("Please choose the role type")
    return
  }
await dispatch(upgradeUser({id:id,role:roleToBe}))
dispatch(getUsersList())
}





  const handleDelete = (id, email) => {
    confirmAlert({
      title: "Delete the user",
      message: `Are you sure to delete user with email: ${email}`,
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDeleteUser(id),
        },
        {
          label: "Cancel",
        },
      ],
      closeOnClickOutside: false,
    });
  };
  const handleDeleteUser = async (id) => {
    await dispatch(RESET())
    await dispatch(deleteUser(id));
    dispatch(getUsersList())
  };

  useEffect(() => {
    if (isSuccess && message?.includes("User deleted successfully")) {
      dispatch(RESET());
    }
  },[dispatch,isSuccess,message]);
  // useEffect(() => {
  //   if (isSuccess && message.includes("User role changed to")) {
  //     dispatch(RESET());
  //     sendAutoMail(userData)
  //   }
  // },[dispatch,isSuccess,message]);

  return (
    <>
      <tr>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{i}</td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {name.length > 15 ? name.substring(0, 15) : name}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{email}</td>
        <td
          className={`p-3 text-sm text-gray-700 whitespace-nowrap 
          ${
            role !== "suspended"
              ? isVerified
                ? "bg-green-300"
                : "bg-red-300"
              : ""
          }`}
        >
          {role === "suspended" ? "" : isVerified ? "verified" : "unverify"}
        </td>
        <td className={`p-1 text-sm text-gray-700 whitespace-nowrap`}>
          <span
            className={`p-3 rounded ${
              role === "admin"
                ? "bg-violet-300 text-violet-900"
                : role === "suspended"
                ? "bg-red-300 text-red-900"
                : role === "user"
                ? "bg-sky-300 text-sky-900"
                : role === "vendor"
                ? "bg-green-300 text-green-900"
                : role === "pending"
                ? "bg-red-300 text-red-900"
                : ""
            } capitalize`}
          >
            {role}
          </span>
        </td>
        <td className="flex items-center  p-3 text-sm text-gray-700 whitespace-nowrap">
           {email==="muhammadarslan9707@gmail.com"?<div className=" text-violet-900">Super Admin</div>:<>
          <div className="border-b border-gray-400  ">
           <select className="outline-none w-28 bg-gray-200 py-1 " onChange={e=>setRoleToSet(e.target.value)}>
              <option selected value="">
                --select--
              </option>
              <option value="admin">Admin</option>
              <option value="vendor">Vendor</option>
              <option value="user">User</option>
              <option value="suspended">Suspend</option>
            </select>
          </div>
          <button className="bg-sky-500 p-[.23rem]" onClick={()=>handleChangeRole(id,roleToSet,email)}>
            <TiTick className="w-[1.4rem] h-[1.4rem] hover:scale-150  transition-all ease-linear duration-200" />
          </button>
          </>}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {email==="muhammadarslan9707@gmail.com" ? null :<>
          <button
            className="text-red-700"
            onClick={() => handleDelete(id, email)}
          >
            <FaTrashAlt className="size-6 hover:scale-125 transition-all ease-linear duration-300" />
          </button></>}
          
        </td>
      </tr>
    </>
  );
}
