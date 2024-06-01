import React from 'react'
import { NavLink } from 'react-router-dom'
import { ShowOnlyAdmin } from '../../protectLinks/protectedLinks'

export default function MnRNav() {
  return (
    <div>
    <div className="flex justify-center items-center bg-red-600 text-white p-4 space-x-2 font-semibold">
      <NavLink to={"/profile/admin/messages"}>
        <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300">
          Messages
        </h1>
      </NavLink>
      <div> | </div>
      <NavLink to={"/profile/admin/reports"}>
        <h1 className="cursor-pointer hover:text-red-800 transition-all ease-linear duration-300">
          Reports
        </h1>
      </NavLink>
    </div>
  </div>
  )
}
