import React from "react";
import { NavLink } from "react-router-dom";

export default function FooterItem({ item }) {
  return (
    <div className="flex flex-col px-6">
      <h1 className="text-2xl font-medium py-8">{item[0].title}</h1>
      <div className="flex flex-col space-y-3 px-1 text-neutral-400">
        {item.map((singleItem, i) => (
          <NavLink
            to={singleItem.path}
            className="hover:text-white text-[1.2rem] hover:underline hover:tracking-wide transition ease-in-out duration-500"
            key={i}
          >
            {singleItem.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
