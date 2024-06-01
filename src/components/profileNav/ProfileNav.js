import React from 'react'
import { NavLink } from 'react-router-dom'
import { ShowOnlyAdmin, ShowOnlyUser, ShowOnlyVendor } from '../../protectLinks/protectedLinks'

export default function ProfileNav() {
  return (
    <div>
        <div className="flex justify-center items-center bg-red-600 text-white p-4 space-x-2 font-semibold">
          <NavLink to={"/profile"}>
            <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300 cool-link">
              Profile{" "}
            </h1>
          </NavLink>
          <div> | </div>
          <NavLink to={"/profile/changePassword"}>
            <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300 cool-link">
              Change Password{" "}
            </h1>
          </NavLink>
          <ShowOnlyUser>
          <div> | </div>
            <NavLink to={"/user/myWishList/myOrderList"}>
              <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300 cool-link">
                {" "}
                My Orders
              </h1>
            </NavLink>
          </ShowOnlyUser>
          <ShowOnlyAdmin>
          <div> | </div>
            <NavLink to={"/profile/users"}>
              <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300 cool-link">
                {" "}
                Users
              </h1>
            </NavLink>
          </ShowOnlyAdmin>
          <ShowOnlyVendor>

          <div> | </div>
            <NavLink to={"/profile/dashboard"}>
              <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300 cool-link">
                {" "}
                My Listing
              </h1>
            </NavLink>
          
            <div> | </div>
            <NavLink to={"/profile/dashboard/vendor/orderList"}>
              <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300 cool-link">
                {" "}
                All Orders
              </h1>
            </NavLink>
          </ShowOnlyVendor>
        </div>
      </div>
  )
}
